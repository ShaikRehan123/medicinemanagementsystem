import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css'],
})
export class MyordersComponent implements OnInit {
  ordersData = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: any = MatSort;

  constructor(private http: HttpClient, private cookieservice: CookieService) {}
  getOrders() {
    console.log(
      environment['apiBaseUrl'] +
        `/get_orders?userID=${
          JSON.parse(this.cookieservice.get('user_data'))['id']
        }`
    );
    return this.http.get(
      environment['apiBaseUrl'] +
        `/get_orders?userID=${
          JSON.parse(this.cookieservice.get('user_data'))['id']
        }`
    );
  }
  getNgoData() {
    this.getOrders().subscribe((data: any) => {
      this.ordersData = new MatTableDataSource<any>(data['orders']);
      this.ordersData.paginator = this.paginator;
      this.ordersData.sort = this.sort;
      // this.ngoData = data['ngo'];
      console.log(data['orders']);

      return data;
      // console.log(this.ngoData);
    });
  }

  rowData: any;

  public orderdisplayedColumns: string[] = [
    'medicineName',
    'medicinePrice',
    'medicineMfg_Date',
    'medicineExp_Date',
    'purchasedQuantity',
  ];

  ngAfterViewInit(): void {
    this.getNgoData();
  }
  ngOnInit(): void {}
}
