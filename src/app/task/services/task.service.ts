// task.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) {}

  // Method to fetch tasks for a specific user
  getTasks(): Observable<Task[]> {
    const authToken = localStorage.getItem('authToken');

    // Include authentication token in request headers
    const headers = new HttpHeaders({
      Authorization: `Token ${authToken}`,
    });

    return this.http.get<Task[]>(`${this.baseUrl}api/tasks/list/`, { headers });
  }

  // Method to create a new task
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}api/tasks/create/`, task);
  }

  // Method to update an existing task
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(
      `${this.baseUrl}api/tasks/update/${task.id}/`,
      task
    );
  }

  // Method to delete a task
  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}api/tasks/delete/${taskId}/`);
  }
}
