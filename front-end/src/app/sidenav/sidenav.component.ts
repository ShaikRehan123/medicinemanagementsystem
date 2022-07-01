import { Component, ContentChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  public href: string = 'dashboard';
  public is_first_login: boolean = true;

  constructor(private router: Router, private cookieservice: CookieService) {}
  public role_id: number = 0;
  ngOnInit(): void {
    // console.log(this.router.url);
    // remove / from url
    this.href = this.router.url.replace('/', '');
    // console.log(this.href);
    // console.log(JSON.parse(this.cookieservice.get('user_data')));
    this.role_id = JSON.parse(this.cookieservice.get('user_data')).role_id;
    console.log(this.role_id);
    if (this.cookieservice.get('user_data') == '') {
    } else {
      if (JSON.parse(this.cookieservice.get('user_data'))['is_firstime'] == 1) {
        this.is_first_login = true;
      } else {
        this.is_first_login = false;
      }
    }
  }
}
