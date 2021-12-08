import { Component, OnInit } from '@angular/core';

// Import Location to query the current path
import { Location } from '@angular/common';

// Import Router to subscribe to events
import { Router } from '@angular/router';

import { HeaderService } from '../services/header.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = "Tasks Manager";

  activeNavItem: string = "tasks"; // by default

  private route: string;

  constructor(
    private location: Location,
    private router: Router,
    private headerService: HeaderService,
    public taskService: TaskService
  ) {
      this.route = "";
      // Within our constructor we can define our subscription
      // and then decide what to do when this event is triggered.
      // In this case simply update the route string.
      // See: https://tutorialedge.net/typescript/angular/angular-detecting-route-changes/
      router.events.subscribe(val => {
          const availableRouts: string[] = ["tasks", "trash", "search"];

          this.route = location.path();
          this.route = this.route.slice(1); // removes the slash before the route

          if(availableRouts.includes(this.route) && this.activeNavItem !== this.route) {
            this.activeNavItem = this.route;
          }
      });
  }

  ngOnInit(): void {
    /**
     * It's needed just to show in the header menu
     * how many tasks are available
     * 
     * .subscribe() is used because getTasks() returns an Observable
     */ 
    this.taskService.getTasks().subscribe();
  }

  checkNavItem(navItem: string) {
    // Update the activeNavItem only if there is a new value
    if(this.activeNavItem !== navItem) {
      this.activeNavItem = navItem;
    }    
  }

}