import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-patient',
  templateUrl: './search-patient.component.html',
  styleUrls: ['./search-patient.component.css'],
})
export class SearchPatientComponent implements OnInit {
  patientId = '';
  constructor( private router: Router) {}

  ngOnInit(): void {}

  search(){
    this.router.navigate(['doctor/all/'+this.patientId]);
  }
}
