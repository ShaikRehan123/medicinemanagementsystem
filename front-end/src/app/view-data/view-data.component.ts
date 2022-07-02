import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.css'],
})
export class ViewDataComponent implements AfterViewInit {
  @ViewChild('allPaginator', { static: false }) paginator: any = MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: any = MatSort;

  ngoDataSource = new MatTableDataSource<any>([]);

  @ViewChild('allPaginator1', { static: false }) userPaginator: any =
    MatPaginator;
  @ViewChild(MatSort, { static: false }) userSort: any = MatSort;

  userDataSource = new MatTableDataSource<any>([]);

  @ViewChild('allPaginator2', { static: false }) medicinePaginator: any =
    MatPaginator;
  @ViewChild(MatSort, { static: false }) medicineSort: any = MatSort;

  medicineDataSource = new MatTableDataSource<any>([]);

  medicionDisplayedColumns: string[] = [
    'id',
    'name',
    'price',
    'mfg_date',
    'exp_date',
    'quantity',
  ];

  // @ViewChild(MatPaginator) paginatoMatPaginator | undefinedtor;
  constructor(private http: HttpClient) {}

  displayedColumns: string[] = [
    'id',
    'username',
    'name',
    'email',
    'city',
    'state',
    'mobile',
  ];

  getOrders() {
    return this.http.get(environment['apiBaseUrl'] + '/get_data');
  }
  getNgoData() {
    this.getOrders().subscribe((data: any) => {
      // this.ngoData = data['ngo'];
      this.ngoDataSource = new MatTableDataSource<any>(data['ngo']); //pass the array you want in the table
      this.ngoDataSource.sort = this.sort;
      this.ngoDataSource.paginator = this.paginator;
      this.userDataSource = new MatTableDataSource<any>(data['users']); //pass the array you want in the table
      this.userDataSource.sort = this.userSort;
      this.userDataSource.paginator = this.userPaginator;
      this.medicineDataSource = new MatTableDataSource<any>(data['medicines']); //pass the array you want in the table
      this.medicineDataSource.sort = this.medicineSort;
      this.medicineDataSource.paginator = this.medicinePaginator;

      return data;
      // console.log(this.ngoData);
    });
  }
  ngAfterViewInit(): void {
    this.getNgoData();
  }
}
