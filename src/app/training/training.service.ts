import { Store } from '@ngrx/store';
import { UIService } from './../shared/ui.service';
import { Subscription } from 'rxjs/Subscription';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import { take } from 'rxjs/operators/take';

@Injectable()
export class TrainingService {
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        })
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(new Training.SetAvailableTrainings(exercises));
            this.store.dispatch(new UI.StopLoading());
          },
          error => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Training.SetAvailableTrainings(null));
            this.uiService.showSnackbar('Fetching exercises failed...', null, 3000);
          }
        )
    );
  }

  fetchExerciseHistory() {
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new Training.SetFinishedTrainings(exercises));
        })
    );
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store
      .select(fromTraining.getActiveExercise)
      .pipe(take(1))
      .subscribe(ex => {
        this.addDataToDatabase({
          ...ex,
          date: new Date(),
          state: 'completed'
        });
        this.store.dispatch(new Training.StopTraining());
      });
  }

  cancelExercise(progress: number) {
    this.store
      .select(fromTraining.getActiveExercise)
      .pipe(take(1))
      .subscribe(ex => {
        this.addDataToDatabase({
          ...ex,
          date: new Date(),
          state: 'cancelled',
          duration: ex.duration * progress / 100,
          calories: ex.calories * progress / 100
        });
        this.store.dispatch(new Training.StopTraining());
      });
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
