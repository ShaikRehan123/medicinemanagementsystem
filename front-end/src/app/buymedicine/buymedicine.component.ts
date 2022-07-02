import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-buymedicine',
  templateUrl: './buymedicine.component.html',
  styleUrls: ['./buymedicine.component.css'],
})
export class BuymedicineComponent implements OnInit, AfterViewInit {
  ordersData: any;
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: any = MatSort;
  quantity: number | undefined = 1;
  selectedMedicineID: number | undefined;

  buyMedicine = async () => {
    console.log(this.quantity);
    console.log(this.selectedMedicineID);
    const url = environment['apiBaseUrl'] + '/new_order';
    const res = await axios.post(url, {
      userID: JSON.parse(this.cookieservice.get('user_data'))['id'],
      medID: this.selectedMedicineID,
      quantity: this.quantity,
    });
    if (res.data.message == 'Order placed successfully') {
      this.toastr.success('Order placed successfully');
      // close the dialog
      this.dialog.closeAll();
    } else {
      this.toastr.error(res.data.message);
      this.router.navigate(['/buymedicine']);
    }
  };

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private cookieservice: CookieService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  getOrders() {
    return this.http.get(environment['apiBaseUrl'] + '/get_medicines');
  }
  getNgoData() {
    this.getOrders().subscribe((data: any) => {
      this.ordersData = new MatTableDataSource<any>(data['medicines']);
      this.ordersData.paginator = this.paginator;
      this.ordersData.sort = this.sort;
      // this.ngoData = data['ngo'];
      console.log(data['medicines']);

      return data;
      // console.log(this.ngoData);
    });
  }
  openDialog(templateRef: any, element: any) {
    console.log(element);
    this.selectedMedicineID = element.id;
    let dialogRef = this.dialog.open(templateRef, {
      maxWidth: '100%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  executive: any;

  usersDataSource = new MatTableDataSource<any>([]);

  rowData: any;

  public orderdisplayedColumns: string[] = [
    'id',
    'name',
    'price',
    'mfg_date',
    'exp_date',
    'quantity',
    'action',
  ];

  ngAfterViewInit(): void {
    this.getNgoData();
  }
  ngOnInit(): void {}
}
