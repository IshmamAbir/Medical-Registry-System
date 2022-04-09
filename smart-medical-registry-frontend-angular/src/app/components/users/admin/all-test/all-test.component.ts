import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/services/test/test.service';
interface Test {
  testName: string;
  cost: number;
  testDay: string;
  time: string;
  prerequisite: string;
}
@Component({
  selector: 'app-all-test',
  templateUrl: './all-test.component.html',
  styleUrls: ['./all-test.component.css'],
})
export class AllTestComponent implements OnInit {
  testList: Test[] = [];

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.testService.getAllTest().subscribe(
      (response: any) => {
        this.testList = response;
      },
      (error: any) => {}
    );
  }
}
