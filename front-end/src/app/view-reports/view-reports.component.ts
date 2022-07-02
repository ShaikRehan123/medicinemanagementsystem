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
  reportsDataSource = new MatTableDataSource<any>([]);

  reportsDisplayedColumns: any = [
    'medicineIDS',
    'userID',
    'username',
    'execID',
    'ExeName',
    'ngoID',
    'ngoName',
    'dateOfDonation',
  ];

  getOrders(endDate?: any, startDate?: any) {
    if (endDate && startDate) {
      return this.http.get(
        environment['apiBaseUrl'] +
          `/show_report?startDate=${startDate}&endDate=${endDate}`
      );
    } else {
      // get yesterday date as start date and end date as tomorrow date and format it as yyyy-mm-dd
      const startDate = new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .split('T')[0];
      const endDate = new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .split('T')[0];
      console.log(
        environment['apiBaseUrl'] +
          `/show_report?startDate=${startDate}&endDate=${endDate}`
      );
      return this.http.get(
        environment['apiBaseUrl'] +
          `/show_report?startDate=${startDate}&endDate=${endDate}`
      );
    }
  }
  getNgoData() {
    this.getOrders().subscribe((data: any) => {
      this.reportsDataSource = new MatTableDataSource<any>(data['report']);
      this.reportsDataSource.paginator = this.paginator;
      this.reportsDataSource.sort = this.sort;
      // this.ngoData = data['ngo'];
      console.log(data['report']);

      return data;
      // console.log(this.ngoData);
    });
  }

  ngAfterViewInit(): void {
    this.getNgoData();
  }
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}
}
