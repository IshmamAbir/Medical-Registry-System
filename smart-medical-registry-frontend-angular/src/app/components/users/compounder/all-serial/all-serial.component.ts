import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login/login.service';
import { SerialService } from 'src/app/services/serial/serial.service';
import Swal from 'sweetalert2';

interface Serial {
  patientName: string;
  age: string;
  gender: string;
  mobile: string;
  id: string;
}

@Component({
  selector: 'app-all-serial',
  templateUrl: './all-serial.component.html',
  styleUrls: ['./all-serial.component.css'],
})
export class AllSerialComponent implements OnInit {
  myDate = Date.now();
  public ProcessDate: any;
  date = '';
  username = '';
  serialList: Serial[] = [];
  constructor(
    private serialService: SerialService,
    private snackBar: MatSnackBar,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    /* --Convert Date in Correct Format-- */
    this.date = new Date(this.myDate).toDateString();

    this.username = this.loginService.getUserDetails().username;
    this.serialService
      .getAllSerialForCompounder(this.username, this.date)
      .subscribe(
        (response: any) => {
          this.serialList = response;
        },
        (error: any) => {
          Swal.fire(
            'Get No Data ! ! ! !',
            'There is an Error From Server',
            'error'
          );
          console.log(error);
        }
      );
  }
  /* -------------------------------------------------------- */
  searchByDate() {
    /* --Convert Date in Correct Format-- */
    this.date = new Date(this.ProcessDate).toDateString();

    this.username = this.loginService.getUserDetails().username;
    this.serialService
      .getAllSerialForCompounder(this.username, this.date)
      .subscribe(
        (response: any) => {
          this.serialList = response;
        },
        (error: any) => {
          Swal.fire(
            'Get No Data ! ! ! !',
            'There is an Error From Server',
            'error'
          );
          console.log(error);
        }
      );
  }
}
