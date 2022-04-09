import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test/test.service';
interface Test {
  testId: number;
  testName: string;
  cost: number;
  testDay: string;
  time: string;
  prerequisite: string;
}
@Component({
  selector: 'app-search-test',
  templateUrl: './search-test.component.html',
  styleUrls: ['./search-test.component.css'],
})
export class SearchTestComponent implements OnInit {
  selectedTest = 0;
  testList: Test[] = [];

  test = {
    testId: 0,
    testName: '',
    cost: '',
    testDay: '',
    time: '',
    prerequisite: '',
  };

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.testService.getAllTest().subscribe(
      (response: any) => {
        this.testList = response;
      },
      (error: any) => {}
    );
  }

  getTestInfo() {
    this.testService.getTestInfo(this.selectedTest).subscribe(
      (response:any)=>{
        this.test=response;
      },
      (error:any)=>{
        alert(error);
      },

    )
  }
}
