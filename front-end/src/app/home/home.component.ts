import { Component, OnInit } from '@angular/core';
import {
  faUserGear,
  faUserTie,
  faUserAlt,
  faUsersCog,
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public param: any;

  faUserGear = faUserGear;
  faUserTie = faUserTie;
  faUserAlt = faUserAlt;
  faUsersCog = faUsersCog;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
