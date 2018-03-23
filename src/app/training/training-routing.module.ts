import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TrainingComponent } from './training.component';

const routes = [{ path: '', component: TrainingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraningRoutingModule {}
