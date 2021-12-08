import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Task } from '../task';
import { MessageService } from './message.service';
// import { HeaderService } from './header.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasksUrl = 'api/tasks';  // URL to web api

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * Shows in the header menu how many tasks are available.
   */
  public numberOfTasks!: number;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** GET tasks from the server */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl)
      .pipe(
        tap(val => this.numberOfTasks = val.length),
        catchError(this.handleError<Task[]>('getTasks', []))
      );
  }

  /** GET task by id. Will 404 if id not found */
  getTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url)
      .pipe(
        tap(_ => console.log("")),
        catchError(this.handleError<Task>(`getTask id=${id}`))
      );
  }

  /** PUT: update the task on the server */
  updateTask(task: Task): Observable<any> {
    return this.http.put(this.tasksUrl, task, this.httpOptions)
      .pipe(
        tap(_ => this.messageService.add("Task was updated")),
        catchError(this.handleError<any>('updateTask'))
      );
  }

  /** POST: add a new task to the server */
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.tasksUrl, task, this.httpOptions)
      .pipe(
        tap(_ => {
          this.messageService.add("New task added");
          this.numberOfTasks++;
        }),
        catchError(this.handleError<Task>('addTask'))
      );
  }

  /** DELETE: delete the task from the server */
  deleteTask(id: number): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete<Task>(url, this.httpOptions)
      .pipe(
        tap(_ => {
          this.messageService.add("Task successfully accomplished");
          this.numberOfTasks--;
        }),
        catchError(this.handleError<Task>('deleteTask'))
      );
  }

  /* GET tasks whose title contains search term */
  searchTasks(term: string): Observable<Task[]> {
    term = term.trim();

    if (!term) {
      // if not search term, return empty task array.
      return of([]);
    }
    
    return this.http.get<Task[]>(`${this.tasksUrl}/?title=${term}`)
    .pipe(
      tap(x => x.length ?
         console.log(`found tasks matching "${term}"`) :
         console.log(`no tasks matching "${term}"`)),
      catchError(this.handleError<Task[]>('searchTasks', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
