import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewassigned-users',
  templateUrl: './viewassigned-users.component.html',
  styleUrls: ['./viewassigned-users.component.css'],
})
export class ViewassignedUsersComponent implements OnInit {
  constructor() {}
  displayedColumns: string[] = [
    'id',
    'username',
    'name',
    'email',
    'city',
    'state',
    'mobile',
    'actions',
  ];

  ngOnInit(): void {}
}
