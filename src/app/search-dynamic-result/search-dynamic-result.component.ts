import { Component, OnInit, Input } from '@angular/core';

import { Task } from '../task';

@Component({
  selector: 'app-search-dynamic-result',
  templateUrl: './search-dynamic-result.component.html',
  styleUrls: ['./search-dynamic-result.component.css']
})
export class SearchDynamicResultComponent implements OnInit {

  @Input() task!: Task;
  @Input() term!: string;

  firstTitlePart!: string;
  middleTitlePart!: string;
  lastTitlePart!: string;

  constructor() { }

  ngOnInit(): void {
    this.termEmphasis();
  }

  /** 
   * Marks the search term in red color
   */
  private termEmphasis(): void {
    let taskTitle = this.task.title;
    let term = this.term;
    const termLength = term.length;
    let firstIndexOccurrence;

    firstIndexOccurrence = taskTitle.toUpperCase().indexOf(term.toUpperCase());

    this.firstTitlePart = taskTitle.slice(0, firstIndexOccurrence);
    this.middleTitlePart = taskTitle.slice(firstIndexOccurrence, firstIndexOccurrence + termLength);
    this.lastTitlePart = taskTitle.slice(firstIndexOccurrence + termLength);
  }

}