import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username: string = 'Municipal';
  email: string = '';
  logout = () => {
    this.cookieService.delete('user_data');
    this.router.navigate(['/']);
  };
  constructor(private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {
    if (this.cookieService.get('user_data') == '') {
    } else {
      this.username = JSON.parse(this.cookieService.get('user_data'))['name'];
      this.email = JSON.parse(this.cookieService.get('user_data'))['email'];
    }
    // this.username = JSON.parse(this.cookieService.get('user_data'))['name'];
  }
}
