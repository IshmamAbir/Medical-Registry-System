import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestService } from 'src/app/services/test/test.service';
interface Test {
  testName: string;
  cost: number;
  testDay: string;
  time: string;
  prerequisite: string;
}
@Component({
  selector: 'app-test-repost-list',
  templateUrl: './test-repost-list.component.html',
  styleUrls: ['./test-repost-list.component.css'],
})
export class TestRepostListComponent implements OnInit {
  patientTestId = 0;
  patientId = '';
  testList: Test[] = [];
  
  constructor(
    private activeRoute: ActivatedRoute,
    private testService: TestService
  ) {}

  ngOnInit(): void {
    this.patientId = this.activeRoute.snapshot.params.patientId;
    this.patientTestId = this.activeRoute.snapshot.params.patientTestId;
    this.testService.getPatientTestInfo(this.patientTestId).subscribe(
      (response: any) => {
        this.testList = response.testDtoList;
      },
      (error: any) => {}
    );
  }

newTab(reportName:string){
  window.open('/admin/test-report-upload/'+reportName+'/'+this.patientId);
}

}
