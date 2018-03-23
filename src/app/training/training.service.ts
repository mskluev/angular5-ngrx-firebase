import { UIService } from './../shared/ui.service';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class TrainingService {
  availableExercises: Exercise[] = [];
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private fbSubs: Subscription[] = [];

  private runningExercise: Exercise;
  exerciseChange = new Subject<Exercise>();

  constructor(private db: AngularFirestore, private uiService: UIService) {}

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
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
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
            this.uiService.loadingStateChanged.next(false);
          },
          error => {
            this.uiService.loadingStateChanged.next(false);
            this.exercisesChanged.next(null);
            this.uiService.showSnackbar('Fetching exercises failed...', null, 3000);
          }
        )
    );
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchExerciseHistory() {
    this.fbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.finishedExercisesChanged.next(exercises);
        })
    );
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChange.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({ ...this.runningExercise, date: new Date(), state: 'completed' });
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'cancelled',
      duration: this.runningExercise.duration * progress / 100,
      calories: this.runningExercise.calories * progress / 100
    });
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
