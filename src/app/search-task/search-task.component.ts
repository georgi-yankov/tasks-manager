import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Task } from '../task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.css']
})
export class SearchTaskComponent implements OnInit {

  tasks$!: Observable<Task[]>;
  
  searchTerms = new Subject<string>();

  term!: string;

  constructor(private taskService: TaskService ) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    term = term.trim();
    this.term = term;
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.tasks$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.taskService.searchTasks(term))
    );
  }

}
