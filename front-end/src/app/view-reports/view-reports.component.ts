import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.component.html',
  styleUrls: ['./view-reports.component.css'],
})
export class ViewReportsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: any = MatSort;
  userDataSource = new MatTableDataSource<any>([]);

  userDisplayedColumns: any[] = [
    { id: 0, name: 'Available' },
    { id: 1, name: 'Ready' },
    { id: 2, name: 'Started' },
  ];
  cookieservice: any;

  constructor(private http: HttpClient) {}
  // getOrders() {
  //   return this.http.get(
  //     environment['apiBaseUrl'] +
  //       `/get_donations_assigned?executiveID=${
  //         JSON.parse(this.cookieservice.get('user_data'))['id']
  //       }`
  //   );
  // }
  // getNgoData() {
  //   this.getOrders().subscribe((data: any) => {
  //     this.userDisplayedColumns = new MatTableDataSource<any>(data['donations']);
  //     this.userDisplayedColumns.paginator = this.paginator;
  //     this.userDisplayedColumns.sort = this.sort;

  //     console.log(data['donations']);

  //     return data;

  //   });
  // }

  // ngAfterViewInit(): void {
  //   this.getNgoData();
  // }
  ngOnInit(): void {}
}
