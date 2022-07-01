import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import * as jQuery from 'jquery';
import axios from 'axios';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    if (this.cookieService.get('user_data') != '') {
      this.toastr.warning('You are already logged in', 'Warning', {
        timeOut: 4000,
      });
      this.routingRouter.navigate(['/dashboard']);
    } else {
      this.router.queryParams.subscribe((params) => {
        this.role_id = params['role_id'];
        console.log(this.role_id);
      });
      (function ($) {
        var panelOne = $('.form-panel.two').height(),
          panelTwo = $('.form-panel.two')[0].scrollHeight;

        $('.form-panel.two')
          .not('.form-panel.two.active')
          .on('click', function (e) {
            e.preventDefault();

            $('.form-toggle').addClass('visible');
            $('.form-panel.one').addClass('hidden');
            $('.form-panel.two').addClass('active');
            $('.form').animate(
              {
                height: panelTwo,
              },
              200
            );
          });

        $('.form-toggle').on('click', function (e) {
          e.preventDefault();
          $(this).removeClass('visible');
          $('.form-panel.one').removeClass('hidden');
          $('.form-panel.two').removeClass('active');
          $('.form').animate(
            {
              height: panelOne,
            },
            200
          );
        });
      })(jQuery);
    }
  }

  public registerForm: FormGroup;
  name: string = '';
  myusername: string = '';
  password: string = '';
  cpassword: string = '';
  //login formconroll
  public loginForm: FormGroup;
  loginusername: string = '';
  loginpassword: string = '';
  role_id: number = 4;
  register = async () => {
    // console.log(environment.apiBaseUrl);
    // console.log('I got called');
    this.name = this.registerForm.get('name')?.value;
    this.myusername = this.registerForm.get('username')?.value;
    this.password = this.registerForm.get('password')?.value;
    this.cpassword = this.registerForm.get('cpassword')?.value;

    // if(this.myusername.includes(''))
    const regex = /^(?=.{8,20}$)[a-zA-Z0-9_]+$/;
    const pagex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (regex.test(this.myusername) == false) {
      this.toastr.error('this error');
    } else if (pagex.test(this.password) == false) {
      this.toastr.error('this password error');
    } else if (this.cpassword !== this.password) {
      this.toastr.error('Password and confirm Password should be same');
    } else {
      // this.toastr.success('You are ready to call api');
      const res = await axios.post(`${environment.apiBaseUrl}/register`, {
        username: this.myusername,
        password: this.password,
        name: this.name,
      });
      console.log(res.data);

      // this.toastr.success(res.data.message);
      if (res.data.message == 'Registration successful') {
        this.toastr.success('Registration successful');
        var panelOne = $('.form-panel.two').height();
        $('.form-toggle').removeClass('visible');
        $('.form-panel.one').removeClass('hidden');
        $('.form-panel.two.four').removeClass('active');
        $('.form').animate(
          {
            height: panelOne,
          },
          200
        );
      } else {
        this.toastr.error(res.data.message);
      }
    }

    // axios.post('');
    // this.toastr.success('You clicked on register Button', this.myusername);
  };
  login = async () => {
    this.loginusername = this.loginForm.get('loginusername')?.value;
    this.loginpassword = this.loginForm.get('loginpassword')?.value;
    console.log(this.loginpassword, this.loginusername);

    if (
      this.loginusername == null ||
      this.loginusername.trim() == '' ||
      this.loginpassword == null ||
      this.loginpassword.trim() == ''
    ) {
      this.toastr.error('you should fill all fields');
    } else {
      const res = await axios.post(`${environment.apiBaseUrl}/login`, {
        username: this.loginusername,
        password: this.loginpassword,
        role_id: this.role_id,
      });
      console.log(res.data);
      if (res.data.message == 'Login successful') {
        this.toastr.success('Login successful');
        this.cookieService.set('user_data', JSON.stringify(res.data.user));
        // console.log(JSON.parse(this.cookieService.get('user_data')));
        this.routingRouter.navigate(['dashboard']);
      } else {
        this.toastr.error(res.data.message);
      }
    }
  };

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private cookieService: CookieService,
    private routingRouter: Router
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      cpassword: new FormControl(),
    });
    this.loginForm = new FormGroup({
      loginusername: new FormControl(),
      loginpassword: new FormControl(),
    });
  }
  // set role_id to role_id from query params on ngViewInit
}
