import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { HttpClientModule } from '@angular/common/http';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginComponent } from './components/login/login.component';
import { authInterceptorProviders } from './interceptor/auth.interceptor';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from "ngx-ui-loader";
import { SidebarComponent as AdminSidebarComponent } from './components/users/admin/sidebar/sidebar.component';
import { DashboardComponent as AdminDashboardComponent} from './components/users/admin/dashboard/dashboard.component';
import { AddUsersComponent } from './components/users/admin/add-users/add-users.component';
import { SidebarComponent as CompounderSidebarComponent} from './components/users/compounder/sidebar/sidebar.component';
import { DashboardComponent as CompounderDashboardComponent} from './components/users/compounder/dashboard/dashboard.component';
import { SidebarComponent as PatientSidebarComponent} from './components/users/patient/sidebar/sidebar.component';
import { DashboardComponent as PatientDashboardComponent} from './components/users/patient/dashboard/dashboard.component';
import { SidebarComponent as DoctorSidebarComponent} from './components/users/doctor/sidebar/sidebar.component';
import { DashboardComponent as DoctorDashboardComponent} from './components/users/doctor/dashboard/dashboard.component';
import { MappingComponent } from './components/users/admin/mapping/mapping.component';
import { AddPatientComponent } from './components/users/compounder/add-patient/add-patient.component';
import { AllSerialComponent } from './components/users/compounder/all-serial/all-serial.component';
import { NewSerialComponent } from './components/users/compounder/new-serial/new-serial.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SaveDocumentsComponent as CompounderSaveDocumentsComponent} from './components/users/compounder/save-documents/save-documents.component';
import { ReportComponent as CompounderReportComponent} from './components/users/compounder/report/report.component';
import { PrescriptionComponent as CompounderPrescriptionComponent } from './components/users/compounder/prescription/prescription.component';
import { SerialsComponent } from './components/users/doctor/serials/serials.component';
import { ShowDocumentsComponent } from './components/users/doctor/show-documents/show-documents.component';
import { DocumentsListComponent } from './components/users/doctor/documents-list/documents-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SaveDocumentsComponent as PatientSaveDocumentsComponent} from './components/users/patient/save-documents/save-documents.component';
import { PrscriptionListComponent } from './components/users/patient/prscription-list/prscription-list.component';
import { ReportListComponent } from './components/users/patient/report-list/report-list.component';
import { AddReportComponent } from './components/users/patient/add-report/add-report.component';
import { AddPrescriptionComponent } from './components/users/patient/add-prescription/add-prescription.component';
import { ImageShowComponent } from './components/users/patient/image-show/image-show.component';
import { AddDiabeticComponent } from './components/users/patient/add-diabetic/add-diabetic.component';
import { DiabeticListComponent } from './components/users/patient/diabetic-list/diabetic-list.component';
import { BloodPressureListComponent } from './components/users/patient/blood-pressure-list/blood-pressure-list.component';
import { AddBloodPressureComponent } from './components/users/patient/add-blood-pressure/add-blood-pressure.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { SearchPatientComponent } from './components/users/doctor/search-patient/search-patient.component';
import { AddTestComponent } from './components/users/admin/add-test/add-test.component';
import { AllTestComponent } from './components/users/admin/all-test/all-test.component';
import { SearchTestComponent } from './components/users/patient/search-test/search-test.component';
import { TestComponent } from './components/users/admin/test/test.component';
import { PatientTestsComponent } from './components/users/admin/patient-tests/patient-tests.component';
import { PatientTestDueComponent } from './components/users/admin/patient-test-due/patient-test-due.component';
import { PatientTestUploadComponent } from './components/users/admin/patient-test-upload/patient-test-upload.component';
import { TestRepostListComponent } from './components/users/admin/test-repost-list/test-repost-list.component';
import { TestReportUploadComponent } from './components/users/admin/test-report-upload/test-report-upload.component';
import { PaymentComponent } from './components/users/patient/payment/payment.component';
import { BkashComponent } from './components/users/patient/bkash/bkash.component';
import { TestDuePaymentComponent } from './components/users/patient/test-due-payment/test-due-payment.component';



@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    AdminSidebarComponent,AdminDashboardComponent, AddUsersComponent, 
    CompounderSidebarComponent,CompounderDashboardComponent,
    PatientSidebarComponent,PatientDashboardComponent,
    DoctorSidebarComponent,DoctorDashboardComponent, MappingComponent, AddPatientComponent, 
    AllSerialComponent, NewSerialComponent, CompounderSaveDocumentsComponent, CompounderReportComponent, 
    CompounderPrescriptionComponent, SerialsComponent, ShowDocumentsComponent, DocumentsListComponent, WelcomeComponent, 
    PatientSaveDocumentsComponent, PrscriptionListComponent, ReportListComponent, AddReportComponent, AddPrescriptionComponent,
    ImageShowComponent, AddDiabeticComponent, DiabeticListComponent, BloodPressureListComponent, AddBloodPressureComponent, SearchPatientComponent, AddTestComponent, AllTestComponent, SearchTestComponent, TestComponent, PatientTestsComponent, PatientTestDueComponent, PatientTestUploadComponent, TestRepostListComponent, TestReportUploadComponent, PaymentComponent, BkashComponent, TestDuePaymentComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatButtonModule,MatCardModule,MatIconModule,MatInputModule,MatSnackBarModule,MatToolbarModule,MatDatepickerModule,MatNativeDateModule,
    MatFormFieldModule,MatDividerModule,MatListModule,FormsModule,MatSlideToggleModule,MatTooltipModule,
    MatSelectModule,MatRadioModule,MatPaginatorModule,ClipboardModule,HttpClientModule,NgxUiLoaderModule,NgxUiLoaderHttpModule,
    NgxMaterialTimepickerModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
