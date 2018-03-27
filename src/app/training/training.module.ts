import { TraningRoutingModule } from './training-routing.module';
import { SharedModule } from './../shared/shared.module';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { TrainingComponent } from './training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { StoreModule } from '@ngrx/store';
import { trainingReducer } from './training.reducer';

@NgModule({
  declarations: [
    NewTrainingComponent,
    CurrentTrainingComponent,
    PastTrainingsComponent,
    TrainingComponent,
    StopTrainingComponent
  ],
  imports: [
    SharedModule,
    TraningRoutingModule,
    StoreModule.forFeature('training', trainingReducer)
  ],
  exports: [],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}
