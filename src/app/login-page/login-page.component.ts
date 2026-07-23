import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LoginPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  username: string = "admin"
  password: string | undefined

}
