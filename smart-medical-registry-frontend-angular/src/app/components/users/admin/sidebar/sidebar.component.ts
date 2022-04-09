import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  public logout() {
    this.loginService.logout();
    window.location.reload();
  }
}
