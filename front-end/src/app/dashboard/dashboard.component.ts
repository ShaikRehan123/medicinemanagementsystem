import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import axios from 'axios';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public changePasswordForm: FormGroup;

  old_password: string = '';
  new_password: string = '';
  confirm_password: string = '';

  onSubmit = async () => {
    const data = {
      username: JSON.parse(this.cookieService.get('user_data'))['username'],
      old_password: this.changePasswordForm.value.old_password,
      new_password: this.changePasswordForm.value.new_password,
      confirm_password: this.changePasswordForm.value.confirm_password,
    };
    // console.log(data);
    if (
      data.old_password.trim() == '' ||
      data.new_password.trim() == '' ||
      data.confirm_password.trim() == ''
    ) {
      this.toastr.error('Please fill all the fields');
    } else if (data.new_password == data.old_password) {
      this.toastr.error('New password and old password should not be same');
    } else if (data.new_password != data.confirm_password) {
      this.toastr.error('New password and confirm password does not match');
    } else {
      const url = environment.apiBaseUrl + '/ngo_change_password';
      const res = await axios.post(url, {
        username: data.username,
        password: data.new_password,
        current_password: data.old_password,
      });
      if (res.data.message == 'Password updated successfully') {
        this.toastr.success('Password changed successfully');
        this.cookieService.set('user_data', res.data['user']);
        this.changePasswordForm.reset();
      } else {
        this.toastr.error('Invalid current password');
      }
    }
  };

  username: string = 'John Doe';
  public role_id: number = 0;
  public is_first_login: boolean = true;

  constructor(
    private cookieService: CookieService,
    private title: Title,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.changePasswordForm = new FormGroup({
      old_password: new FormControl(''),
      new_password: new FormControl(''),
      confirm_password: new FormControl(''),
    });
  }

  ngOnInit(): void {
    // if cookieservice is empty, redirect to login page
    console.log(this.cookieService.get('user_data'));
    if (this.cookieService.get('user_data') == '') {
      this.toastr.error('Please login first');
      // setTimeout(() => {
      this.router.navigate(['/']);
      // }, 2000);
    } else {
      this.username = JSON.parse(this.cookieService.get('user_data'))['name'];
      this.role_id = JSON.parse(this.cookieService.get('user_data'))['role_id'];
      if (JSON.parse(this.cookieService.get('user_data'))['is_firstime'] == 1) {
        this.is_first_login = true;
      } else {
        this.is_first_login = false;
      }
    }
  }
}
