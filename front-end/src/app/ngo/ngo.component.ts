import { Component, OnInit } from '@angular/core';
declare var $: any;
import * as jQuery from 'jquery';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import axios from 'axios';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-ngo',
  templateUrl: './ngo.component.html',
  styleUrls: ['./ngo.component.css'],
})
export class NgoComponent implements OnInit {
  public ngoForm: FormGroup;
  name: string = '';
  email: string = '';
  phoneNumber: string = '';
  city: string = '';
  state: string = '';

  generatedUsername: string = '';
  generatedPassword: string = '';

  onSubmit = async () => {
    // console.log('Hello WHy are you here');s
    // get All Values
    this.name = this.ngoForm.value.ngo_name;
    this.email = this.ngoForm.value.ngo_email;
    this.phoneNumber = this.ngoForm.value.ngo_mobileno;
    this.city = this.ngoForm.value.ngo_city;
    this.state = this.ngoForm.value.ngo_state;

    if (
      this.name == '' ||
      this.email == '' ||
      this.phoneNumber == '' ||
      this.city == '' ||
      this.state == ''
    ) {
      this.toastr.error('Please fill all the fields');
    }
    // phone Number should be 10 digits
    else if (this.phoneNumber.length != 10) {
      this.toastr.error('Phone Number should be 10 digits');
    }
    // email should be valid
    else if (!this.email.includes('@') || !this.email.includes('.')) {
      this.toastr.error('Please enter valid email');
    } else if (this.name.length < 3 || this.name.length > 40) {
      this.toastr.error('Name should be atleast 3 characters and less than 40');
    }
    // CONVERT PHONE NUMBER TO INTEGER AND CHECK IF IT IS VALID
    else if (isNaN(parseInt(this.phoneNumber))) {
      this.toastr.error('Please enter valid phone number');
    } else {
      // this.toastr.success('Form Submitted Successfully', 'Success');
      const base_url = environment['apiBaseUrl'];
      const url = base_url + '/add_ngo';
      const data = {
        name: this.name,
        email: this.email,
        mobile: this.phoneNumber,
        city: this.city,
        state: this.state,
      };
      const res = await axios.post(url, data);
      if (res.data.message == 'Added ngo successfully') {
        this.toastr.success('Added ngo successfully', 'Success');
        this.ngoForm.reset();
      } else {
        this.toastr.error(res.data.message, 'Error');
      }
      console.log(res.data.user);
      this.generatedUsername = res.data.user['username'];
      this.generatedPassword = res.data.user['password'];
      // console.log(res.data.user.username);
      // console.log(this.generatedPassword);
      $('#showModalButton').click();
    }
  };

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder) {
    this.ngoForm = this.formBuilder.group({
      ngo_name: new FormControl(''),
      ngo_email: new FormControl(''),
      ngo_mobileno: new FormControl(''),
      ngo_city: new FormControl(''),
      ngo_state: new FormControl(''),
    });
  }

  ngOnInit(): void {
    (function ($) {
      // var test = $('#showModalButton');
      // test.click();
      // $('#showModalButton').click();
    })(jQuery);
  }
}
