import { Component, OnInit } from '@angular/core';

import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {

  }

}
