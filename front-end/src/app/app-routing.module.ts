import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgoComponent } from './ngo/ngo.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ViewassignedUsersComponent } from './viewassigned-users/viewassigned-users.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canLoad: [AuthGuard],
  },
  { path: 'ngo', component: NgoComponent },
  { path: 'viewdata', component: ViewDataComponent },
  { path: 'addmedicine', component: AddMedicineComponent },
  { path: 'viewuser', component: ViewUserComponent },
  { path: 'assignedUsers', component: ViewassignedUsersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}