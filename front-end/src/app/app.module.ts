import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { CookieService } from 'ngx-cookie-service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NgoComponent } from './ngo/ngo.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { MatTableModule } from '@angular/material/table';
import { AddMedicineComponent } from './add-medicine/add-medicine.component';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { ViewUserComponent } from './view-user/view-user.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ViewassignedUsersComponent } from './viewassigned-users/viewassigned-users.component';
import { BuymedicineComponent } from './buymedicine/buymedicine.component';
import { MyordersComponent } from './myorders/myorders.component';
import { DonateMedicinesComponent } from './donate-medicines/donate-medicines.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    HeaderComponent,
    SidenavComponent,
    NgoComponent,
    ViewDataComponent,
    AddMedicineComponent,
    ViewUserComponent,
    ViewassignedUsersComponent,
    BuymedicineComponent,
    MyordersComponent,
    DonateMedicinesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatTableModule,
    HttpClientModule,
    MatPaginatorModule,
    MatInputModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  providers: [CookieService, Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
