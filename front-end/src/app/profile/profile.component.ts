import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public updateUserForm: any;
  username: string = '';
  password: string = '';
  name: string = '';
  city: string = '';
  state: string = '';
  mobile: string = '';
  email: string = '';
  qustion_answer: string = '';

  user: any = {};

  updateUser = async () => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const mobileRegex = /^[0-9]{10}$/;
    const userNameregex = /^(?=.{8,20}$)[a-zA-Z0-9_]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    console.log(this.updateUserForm.value);
    if (
      this.updateUserForm.get('username') == null ||
      this.updateUserForm.get('password') == null ||
      this.updateUserForm.get('name') == null ||
      this.updateUserForm.get('city') == null ||
      this.updateUserForm.get('state') == null ||
      this.updateUserForm.get('mobile') == null ||
      this.updateUserForm.get('email') == null ||
      this.updateUserForm.get('question_answer') == null
    ) {
      this.toastr.warning('Please fill all the fields', 'Warning', {
        timeOut: 4000,
      });
    } else if (
      this.updateUserForm.get('username')?.value.trim() == '' ||
      this.updateUserForm.get('password')?.value.trim() == '' ||
      this.updateUserForm.get('name')?.value.trim() == '' ||
      this.updateUserForm.get('city')?.value.trim() == '' ||
      this.updateUserForm.get('state')?.value.trim() == '' ||
      this.updateUserForm.get('mobile')?.value.trim() == '' ||
      this.updateUserForm.get('email')?.value.trim() == '' ||
      this.updateUserForm.get('question_answer')?.value.trim() == ''
    ) {
      this.toastr.warning('Please fill all the fields', 'Warning', {
        timeOut: 4000,
      });
    } else if (
      emailRegex.test(this.updateUserForm.get('email')?.value) == false
    ) {
      this.toastr.warning('Please enter valid email', 'Warning', {
        timeOut: 4000,
      });
    } else if (
      mobileRegex.test(this.updateUserForm.get('mobile')?.value) == false
    ) {
      this.toastr.warning('Please enter valid mobile number', 'Warning', {
        timeOut: 4000,
      });
    } else if (
      userNameregex.test(this.updateUserForm.get('username')?.value) == false
    ) {
      this.toastr.warning('Please enter valid username', 'Warning', {
        timeOut: 4000,
      });
    } else if (
      passwordRegex.test(this.updateUserForm.get('password')?.value) == false
    ) {
      this.toastr.warning('Please enter valid password', 'Warning', {
        timeOut: 4000,
      });
    } else {
      const url = environment['apiBaseUrl'] + '/edit_profile';
      const res = await axios.post(url, {
        userID: JSON.parse(this.cookieservice.get('user_data'))['id'],
        username: this.updateUserForm.get('username')?.value,
        password: this.updateUserForm.get('password')?.value,
        name: this.updateUserForm.get('name')?.value,
        city: this.updateUserForm.get('city')?.value,
        state: this.updateUserForm.get('state')?.value,
        mobile: this.updateUserForm.get('mobile')?.value,
        email: this.updateUserForm.get('email')?.value,
        security_question: this.updateUserForm.get('question_answer')?.value,
      });
      console.log(res);
      if (res.data.message == 'Profile updated successfully') {
        this.cookieservice.set('user_data', JSON.stringify(res.data.user));
        this.toastr.success('Profile updated successfully', 'Success', {
          timeOut: 4000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        this.toastr.error('Something went wrong', 'Error', {
          timeOut: 4000,
        });
      }
    }
  };

  constructor(
    private cookieservice: CookieService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(this.cookieservice.get('user_data'));
    console.log(this.user);
    this.updateUserForm = new FormGroup({
      username: new FormControl(this.user.username),
      password: new FormControl(this.user.password),
      name: new FormControl(this.user.name),
      city: new FormControl(this.user.city),
      state: new FormControl(this.user.state),
      mobile: new FormControl(
        // remove the +91 from the mobile number
        this.user.mobile.replace(/^\+91/, '')
      ),
      email: new FormControl(this.user.email),
      question_answer: new FormControl(this.user.question_answer),
    });
  }
}
