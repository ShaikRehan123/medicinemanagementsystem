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
  public forgothide: boolean = false;
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
          panelTwo = $('.form-panel.two')[0].scrollHeight,
          panelThree = $('.form-panel.three')[0].scrollHeight;

        $('.form-panel.two')
          .not('.form-panel.two.active')
          .on('click', function (e) {
            e.preventDefault();
            $('.form-toggle').addClass('visible');
            $('.form-panel.one').addClass('hidden');
            $('.form-panel.two').addClass('active');
            $('.form-panel.three').addClass('hidden');
            $('.form').animate(
              {
                width: '1000px',
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
          $('.form-panel.three').removeClass('active');
          $('.form').animate(
            {
              width: '600px',
              height: panelOne,
              maxheight: '350px',
            },
            200
          );
        });
        $('.form-recovery').on('click', function (e) {
          e.preventDefault();
          $(this).addClass('visible');
          $('.form-toggle').addClass('visible');
          $('.form-panel.one').addClass('hidden');
          $('.form-panel.two').addClass('hidden');
          $('.form-panel.three').addClass('active');

          $('.form').animate(
            {
              width: '600px',
              height: panelThree,
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
  useremail: string = '';
  usercity: string = '';
  userstate: string = '';
  usersecurityquestion: string = '';
  usermobile: string = '';
  //login formconroll
  public loginForm: FormGroup;
  loginusername: string = '';
  loginpassword: string = '';
  role_id: number = 4;
  //forgot formconroll
  public forgotFrom: FormGroup;
  forgotsecurityquestion: string = '';
  forgotusername: string = '';
  forgotpassword: string = '';
  register = async () => {
    console.log(this.registerForm.value);
    // console.log('I got called');
    this.name = this.registerForm.get('name')?.value;
    this.myusername = this.registerForm.get('username')?.value;
    this.password = this.registerForm.get('password')?.value;
    this.cpassword = this.registerForm.get('cpassword')?.value;
    this.useremail = this.registerForm.get('useremail')?.value;
    this.usercity = this.registerForm.get('usercity')?.value;
    this.userstate = this.registerForm.get('userstate')?.value;
    this.usersecurityquestion = this.registerForm.get(
      'usersecurityquestion'
    )?.value;
    this.usermobile = this.registerForm.get('usermobile')?.value;

    // if(this.myusername.includes(''))
    const regex = /^(?=.{8,20}$)[a-zA-Z0-9_]+$/;
    const pagex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    if (
      this.name == null ||
      this.myusername == null ||
      this.password == null ||
      this.cpassword == null ||
      this.useremail == null ||
      this.usercity == null ||
      this.userstate == null ||
      this.usersecurityquestion == null ||
      this.usermobile == null
    ) {
      this.toastr.warning('Please fill all the fields', 'Warning', {
        timeOut: 4000,
      });
    } else if (
      this.name.trim() == '' ||
      this.myusername.trim() == '' ||
      this.password.trim() == '' ||
      this.cpassword.trim() == '' ||
      this.useremail.trim() == '' ||
      this.usercity.trim() == '' ||
      this.userstate.trim() == '' ||
      this.usersecurityquestion.trim() == '' ||
      this.usermobile.trim() == ''
    ) {
      this.toastr.warning('Please fill all the fields', 'Warning', {
        timeOut: 4000,
      });
    } else if (regex.test(this.myusername) == false) {
      this.toastr.error('Invalid username');
    } else if (this.usermobile.length != 10) {
      this.toastr.error('Invalid mobile number');
    } else if (pagex.test(this.password) == false) {
      this.toastr.error('Invalid Password');
    } else if (this.cpassword !== this.password) {
      this.toastr.error('Password and confirm Password should be same');
    } else {
      // this.toastr.success('You are ready to call api');
      const res = await axios.post(`${environment.apiBaseUrl}/register`, {
        username: this.myusername,
        password: this.password,
        name: this.name,
        email: this.useremail,
        city: this.usercity,
        state: this.userstate,
        security_question: this.usersecurityquestion,
        mobile: this.usermobile,
      });
      console.log(res.data);

      // this.toastr.success(res.data.message);
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

  forgotpass = async () => {
    this.forgotsecurityquestion = this.forgotFrom.get(
      'forgotsecurityquestion'
    )?.value;
    this.forgotusername = this.forgotFrom.get('forgotusername')?.value;
    this.forgotpassword = this.forgotFrom.get('forgotpassword')?.value;
    // console.log(
    //   this.forgotsecurityquestion,
    //   this.forgotusername,
    //   this.forgotpassword
    // );

    if (
      this.forgotsecurityquestion == null ||
      this.forgotsecurityquestion.trim() == '' ||
      this.forgotusername == null ||
      this.forgotusername.trim() == '' ||
      this.forgotpassword == null ||
      this.forgotpassword.trim() == ''
    ) {
      const res = await axios.post(
        `${environment.apiBaseUrl}/forgot_password`,
        {
          question_answer: this.forgotsecurityquestion,
          username: this.forgotusername,
          password: this.forgotpassword,
        }
      );
      console.log(res.data);
      if (res.data.message == 'Password reset successful') {
        this.toastr.success('Password reset successful');
        this.cookieService.set('user_data', JSON.stringify(res.data.user));
      } else {
        this.toastr.error(res.data.message);
      }
    } else {
      this.toastr.error('you should fill all fields');
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
      useremail: new FormControl(),
      usermobile: new FormControl(),
      usercity: new FormControl(),
      userstate: new FormControl(),
      usersecurityquestion: new FormControl(),
      password: new FormControl(),
      cpassword: new FormControl(),
    });
    this.loginForm = new FormGroup({
      loginusername: new FormControl(),
      loginpassword: new FormControl(),
    });
    this.forgotFrom = new FormGroup({
      forgotsecurityquestion: new FormControl(),
      forgotusername: new FormControl(),
      forgotpassword: new FormControl(),
    });
  }
  // set role_id to role_id from query params on ngViewInit
}
