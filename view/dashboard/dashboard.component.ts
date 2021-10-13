import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';

import { Router } from "@angular/router";
import { AuthService } from '../../model/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) { }
  ngOnInit(): void {
          if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }
  }