import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TestService } from 'src/app/services/test/test.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css'],
})
export class AddTestComponent implements OnInit {
  data = {
    testName: '',
    cost: 0,
    day: '',
    time: '',
    prerequisite: '',
  };

  
  dayList: string[] = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thus', 'Fri'];

  constructor(
    private snackBar: MatSnackBar,
    private testService: TestService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  testDataSubmit() {
    if (
      this.data.testName != '' &&
      this.data.cost > 0 &&
      this.data.day != '' &&
      this.data.time != '' &&
      this.data.prerequisite != ''
    ) {
      this.testService.saveTest(this.data).subscribe(
        (response: any) => {
          if (response.message == 'Save') {
            Swal.fire('Save Successfully!', 'Test Info Store', 'success');
            this.router.navigate(['admin/all-test']);
          } else {
            this.snackBar.open("Test Already Exist", 'Close', {
              duration: 3000,
            });
          }
        },
        (error: any) => {
          this.snackBar.open('Operation Fail ! ! ! !', 'Close', {
            duration: 3000,
          });
        }
      );
    } else {
      this.snackBar.open('Fill all the Fields Properly ! ! ! !', 'Close', {
        duration: 3000,
      });
    }
  }
}
