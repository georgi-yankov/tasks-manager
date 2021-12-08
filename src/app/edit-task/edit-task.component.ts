import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Task } from '../task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  task: Task | undefined;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.getTask();
  }

  private getTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(id)
      .subscribe(task => this.task = task);
  }

  goBack(): void {
    this.location.back();
  }

  save(){
    if (this.task) {
      
      this.task.title = this.task.title.trim();
      if (!this.task.title) { return; }

      this.taskService.updateTask(this.task)
        .subscribe(() => this.goBack());
    }
  }

}
