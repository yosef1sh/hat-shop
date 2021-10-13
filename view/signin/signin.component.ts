import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/model/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() { }

}
