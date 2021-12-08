import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  isImportant: boolean = false;

  @Output() newTaskIsAdded = new EventEmitter<Task>();

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.changeButtonName();
  }

  /**
   * Here are used bootstrap Event types
   * https://getbootstrap.com/docs/5.1/components/collapse/ 
   */
  private changeButtonName(): void {
    const newButton: HTMLElement = document.getElementById("new-button")!;
    const newTaskWrapper: HTMLElement = document.getElementById("new-task")!;

    newTaskWrapper.addEventListener('show.bs.collapse', function () {
      newButton.innerHTML = "close";
    });

    newTaskWrapper.addEventListener('hide.bs.collapse', function () {
      newButton.innerHTML = "new";
    });    
  }

  add(title: string): void {
    title = title.trim();
    if (!title) { return; }

    const newTask: object = {
      title: title,
      important: this.isImportant
    };

    this.taskService.addTask(newTask as Task)
      .subscribe(task => {
        this.newTaskIsAdded.emit(task);
      });
  }

}