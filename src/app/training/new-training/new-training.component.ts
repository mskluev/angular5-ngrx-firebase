import { Store } from '@ngrx/store';
import { UIService } from './../../shared/ui.service';
import { NgForm } from '@angular/forms';
import { TrainingService } from './../training.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Exercise } from '../exercise.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as fromTraining from './../training.reducer';
import * as fromRoot from '../../app.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(
    public trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit() {
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.fetchExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }
}
