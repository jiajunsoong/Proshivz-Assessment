import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from './task.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>Task Tracker</h1>
    <form (ngSubmit)="addTask()">
      <input [(ngModel)]="newTitle" name="title" placeholder="Task title" required minlength="5" />
      <!-- BUG: missing priority input -->
      <select [(ngModel)]="newPriority" name="priority" required>
        <option value="" disable selected>Select Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      <button type="submit">Add</button>
    </form>
    <ul>
      <li *ngFor="let task of tasks">
        {{ task.title }} ({{ task.priority }}) <span *ngIf="task.completed">[Done]</span>
        <!-- MISSING: checkbox/button to mark as completed -->
        <button *ngIf="!task.completed" (click)="markCompleted(task.id)">Mark Completed</button>
      </li>
    </ul>
  `
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  newTitle = '';
  newPriotiry = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  addTask() {
    // BUG: should also provide priority
    if (!this.newTitle || !this.newPriotiry) {
      return ;
    }

    const newTask: Partial<Task> = {
      title: this.newTitle,
      priority: this.newPriotiry
    }

    this.taskService.addTask(newTask).subscribe(() => {
      this.newTitle = '';
      this.newPriotiry = '';
      this.loadTasks();
    });
  }

  markCompleter(id: number) {
    this.taskService.completeTask(id).subscribe(()=> {
      this.loadTasks();
    });
  }
}