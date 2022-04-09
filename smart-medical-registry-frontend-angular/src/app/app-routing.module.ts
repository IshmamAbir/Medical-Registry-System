import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AddTestComponent } from './components/users/admin/add-test/add-test.component';
import { AddUsersComponent } from './components/users/admin/add-users/add-users.component';
import { AllTestComponent } from './components/users/admin/all-test/all-test.component';
import { DashboardComponent as AdminDashboardComponent } from './components/users/admin/dashboard/dashboard.component';
import { MappingComponent } from './components/users/admin/mapping/mapping.component';
import { PatientTestDueComponent } from './components/users/admin/patient-test-due/patient-test-due.component';
import { PatientTestUploadComponent } from './components/users/admin/patient-test-upload/patient-test-upload.component';
import { PatientTestsComponent } from './components/users/admin/patient-tests/patient-tests.component';
import { TestReportUploadComponent } from './components/users/admin/test-report-upload/test-report-upload.component';
import { TestRepostListComponent } from './components/users/admin/test-repost-list/test-repost-list.component';
import { TestComponent } from './components/users/admin/test/test.component';
import { AddPatientComponent } from './components/users/compounder/add-patient/add-patient.component';
import { AllSerialComponent } from './components/users/compounder/all-serial/all-serial.component';
import { DashboardComponent as CompounderDashboardComponent } from './components/users/compounder/dashboard/dashboard.component';
import { NewSerialComponent } from './components/users/compounder/new-serial/new-serial.component';
import { PrescriptionComponent as CompounderPrescriptionComponent } from './components/users/compounder/prescription/prescription.component';
import { ReportComponent as CompounderReportComponent } from './components/users/compounder/report/report.component';
import { SaveDocumentsComponent as CompounderSaveDocumentsComponent} from './components/users/compounder/save-documents/save-documents.component';
import { DashboardComponent as DoctorDashboardComponent } from './components/users/doctor/dashboard/dashboard.component';
import { DocumentsListComponent } from './components/users/doctor/documents-list/documents-list.component';
import { SearchPatientComponent } from './components/users/doctor/search-patient/search-patient.component';
import { SerialsComponent } from './components/users/doctor/serials/serials.component';
import { ShowDocumentsComponent } from './components/users/doctor/show-documents/show-documents.component';
import { AddBloodPressureComponent } from './components/users/patient/add-blood-pressure/add-blood-pressure.component';
import { AddDiabeticComponent } from './components/users/patient/add-diabetic/add-diabetic.component';
import { AddPrescriptionComponent } from './components/users/patient/add-prescription/add-prescription.component';
import { AddReportComponent } from './components/users/patient/add-report/add-report.component';
import { BkashComponent } from './components/users/patient/bkash/bkash.component';
import { BloodPressureListComponent } from './components/users/patient/blood-pressure-list/blood-pressure-list.component';
import { DashboardComponent as PatientDashboardComponent } from './components/users/patient/dashboard/dashboard.component';
import { DiabeticListComponent } from './components/users/patient/diabetic-list/diabetic-list.component';
import { ImageShowComponent } from './components/users/patient/image-show/image-show.component';
import { PaymentComponent } from './components/users/patient/payment/payment.component';
import { PrscriptionListComponent } from './components/users/patient/prscription-list/prscription-list.component';
import { ReportListComponent } from './components/users/patient/report-list/report-list.component';
import { SaveDocumentsComponent as PatientSaveDocumentsComponent} from './components/users/patient/save-documents/save-documents.component';
import { SearchTestComponent } from './components/users/patient/search-test/search-test.component';
import { TestDuePaymentComponent } from './components/users/patient/test-due-payment/test-due-payment.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AdminGuard } from './guard/admin/admin.guard';
import { CompounderGuard } from './guard/compounder/compounder.guard';
import { DoctorGuard } from './guard/doctor/doctor.guard';
import { PatientGuard } from './guard/patient/patient.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: '', component: WelcomeComponent, pathMatch: 'full' },

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'add-users', component: AddUsersComponent },
      { path: 'mapping', component: MappingComponent },
      { path: 'add-test', component: AddTestComponent },
      { path: 'all-test', component: AllTestComponent },
      { path: 'test', component: TestComponent },
      { path: 'patient-test', component: PatientTestsComponent },
      { path: 'patient-test-due', component: PatientTestDueComponent },
      { path: 'patient-test-upload', component: PatientTestUploadComponent },
      { path: 'test-report-list/:patientTestId/:patientId', component: TestRepostListComponent },
      { path: 'test-report-upload/:testName/:patientId', component: TestReportUploadComponent },
    ],
  },
  {
    path: 'compounder',
    component: CompounderDashboardComponent,
    canActivate: [CompounderGuard],
    children: [
      { path: 'add-patient', component: AddPatientComponent },
      { path: 'all-serial', component: AllSerialComponent },
      { path: 'new-serial', component: NewSerialComponent },
      { path: 'save-documents', component: CompounderSaveDocumentsComponent },
      { path: 'com-report', component: CompounderReportComponent },
      { path: 'com-prescription', component: CompounderPrescriptionComponent },
    ],
  },
  {
    path: 'doctor',
    component: DoctorDashboardComponent,
    canActivate: [DoctorGuard],
    children: [
      { path: 'serials', component: SerialsComponent },
      { path: 'show/:imageId/:type/:description', component: ShowDocumentsComponent },
      { path: 'all/:patientId', component: DocumentsListComponent },
      { path: 'search-patient', component: SearchPatientComponent },
    ],
  },
  {
    path: 'patient',
    component: PatientDashboardComponent,
    canActivate: [PatientGuard],
    children: [
      { path: 'documents-save', component: PatientSaveDocumentsComponent },
      { path: 'prescription-list', component: PrscriptionListComponent },
      { path: 'report-list', component: ReportListComponent },
      { path: 'add-prescription', component: AddPrescriptionComponent },
      { path: 'add-report', component: AddReportComponent },
      { path: 'image-show/:imageId/:type/:description', component: ImageShowComponent },
      { path: 'add-diabetic', component: AddDiabeticComponent },
      { path: 'diabetic-list', component: DiabeticListComponent },
      { path: 'add-blood-pressure', component: AddBloodPressureComponent },
      { path: 'blood-pressure-list', component: BloodPressureListComponent },
      { path: 'search-test', component: SearchTestComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'bkash', component: BkashComponent },
      { path: 'test-due-payment', component: TestDuePaymentComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
