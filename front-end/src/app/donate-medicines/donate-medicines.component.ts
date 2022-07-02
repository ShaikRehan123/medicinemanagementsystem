import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-donate-medicines',
  templateUrl: './donate-medicines.component.html',
  styleUrls: ['./donate-medicines.component.css'],
})
export class DonateMedicinesComponent implements OnInit {
  ordersData = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: any = MatSort;
  initialSelection = [];
  selection = new SelectionModel<any>(true, this.initialSelection);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.ordersData.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.ordersData.data.forEach((row) => this.selection.select(row));
  }

  donateMedicines = async () => {
    console.log(this.selection.selected);
    const body = {
      userID: JSON.parse(this.cookieservice.get('user_data'))['id'],
      // map trough the selected medicines and get the id
      donatedMedicinesOrderID: this.selection.selected.map(
        (medicine) => medicine.orderID
      ),
    };
    console.log(body);
    const url = environment['apiBaseUrl'] + '/donate_medicine';
    const res = await axios.post(url, body);
    if (res.data.message == 'Medicine donated successfully') {
      this.toastr.success(res.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      this.toastr.error(res.data.message);
    }
  };

  constructor(
    private http: HttpClient,
    private cookieservice: CookieService,
    private toastr: ToastrService
  ) {}
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
    'select',
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
