import { UIService } from './../../shared/ui.service';
import { Subscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { TrainingService } from './../training.service';
import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Exercise } from '../exercise.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  private exerciseSubscription: Subscription;
  isLoading = false;
  private loadingSubscription: Subscription;

  constructor(public trainingService: TrainingService, private uiService: UIService) {}

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => {
      this.exercises = exercises;
    });
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
    this.fetchExercises();
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }
}
