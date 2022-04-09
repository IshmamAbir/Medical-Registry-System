import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TooltipPosition } from '@angular/material/tooltip';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);

  isLogin: boolean = false;
  user: any = '';

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.isLogin = this.loginService.isLoggedIn();
    this.user = this.loginService.getUserDetails();

    this.loginService.notify.asObservable().subscribe((data) => {
      this.isLogin = this.loginService.isLoggedIn();
      this.user = this.loginService.getUserDetails();
    });
  }
  /* ---------------------------------------- */
  public customLink(user: any) {
    if (user.roleList[0] === 'ADMIN') {
      return ['admin'];
    } else if (user.roleList[0] === 'DOCTOR') {
      return ['doctor'];
    } else if (user.roleList[0] === 'COMPOUNDER') {
      return ['compounder'];
    } else {
      return ['patient'];
    }
  }
  /* ---------------------------------------- */
  public logout() {
    this.loginService.logout();
    window.location.reload();
  }
  /* ---------------------------------------- */
}
