import { take } from 'rxjs/operators/take';
import { Exercise } from './../exercise.model';
import { Store } from '@ngrx/store';
import { TrainingService } from './../training.service';
import { StopTrainingComponent } from './stop-training.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit() {
    this.startOrResumetimer();
  }

  startOrResumetimer() {
    this.store
      .select(fromTraining.getActiveExercise)
      .pipe(take(1))
      .subscribe(x => {
        const step = x.duration / 100 * 1000;
        console.log(step);
        this.timer = setInterval(() => {
          this.progress = this.progress + 1;
          if (this.progress >= 100) {
            this.trainingService.completeExercise();
            clearInterval(this.timer);
          }
        }, step);
      });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumetimer();
      }
    });
  }
}
