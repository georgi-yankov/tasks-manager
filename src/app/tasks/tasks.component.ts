import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { TaskService } from '../services/task.service';
import { HeaderService } from '../services/header.service';
import { MessageService } from '../services/message.service';
import { Task } from '../task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private headerService: HeaderService,
    private location: Location,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }


  getTasks(): void {
    this.taskService.getTasks()
        .subscribe(tasks => {
          this.tasks = tasks;
          this.messageService.add(`You have ${tasks.length} tasks to accomplish`);
        });
  }
  
  /**
   * Gets the new added task through the child
   * component template "<app-add-task>"
   */ 
  updateTasks(task: Task): void {
    this.tasks.push(task);
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
    this.taskService.deleteTask(task.id).subscribe();
  }

}