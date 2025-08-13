import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Task {
  id: number;
  title: string;
  priority: string;
  completed: boolean;
}

@Injectable()
export class TaskService {
  // BUG: wrong port, should be 3001
  private api = 'http://localhost:3001/tasks';

  constructor(private http: HttpClient) {}

  // BUG: getTasks uses wrong endpoint ('/task' instead of '/tasks')
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.api);
  }

  // BUG: addTask does not send priority
  addTask(title: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(this.api, title); // missing priority
  }

  // MISSING: updateTask for marking as completed
  completeTask(id: number): Observable<Task> {
    return this.http.patch<Task>(`${this.api}/${id}`, {completed: true});
  }
}