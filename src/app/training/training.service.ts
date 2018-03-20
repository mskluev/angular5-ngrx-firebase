import { Subject } from 'rxjs/Subject';
import { Exercise } from './exercise.model';

export class TrainingService {
  availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 't2b', name: 'T2B', duration: 60, calories: 20 },
    { id: 'lunges', name: 'Lunges', duration: 120, calories: 20 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 12 }
  ];

  private runningExercise: Exercise;
  private exerciseHistory: Exercise[] = [];
  exerciseChange = new Subject<Exercise>();

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  getExerciseHistory() {
    return this.exerciseHistory.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChange.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.exerciseHistory.push({ ...this.runningExercise, date: new Date(), state: 'completed' });
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  cancelExercise(progress: number) {
    this.exerciseHistory.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'cancelled',
      duration: this.runningExercise.duration * progress / 100,
      calories: this.runningExercise.calories * progress / 100
    });
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }
}
