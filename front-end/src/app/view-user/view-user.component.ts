import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
})
export class ViewUserComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: any = MatSort;
  assignedValue: string | undefined;
  faUserTie = faUserTie;
  donationData: any;
  donationID: any;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private cookieservice: CookieService,
    private toastr: ToastrService
  ) {}
  onSelectionChange = (event: any) => {
    this.assignedValue = event.value;
  };
  assignExec = async () => {
    if (this.assignedValue == undefined) {
      this.toastr.error('Please select an executive');
    } else {
      const url = environment['apiBaseUrl'] + '/assign_executive';
      const res = await axios.post(url, {
        donationID: this.donationID,
        executiveID: this.assignedValue,
        ngoID: JSON.parse(this.cookieservice.get('user_data'))['id'],
      });

      if (res.data.message == 'Executive assigned successfully') {
        this.toastr.success('Executive assigned successfully');
        // close the dialog
        this.dialog.closeAll();
        this.getNgoData();
      } else {
        this.toastr.error(res.data.message);
      }
    }
  };

  openDialog(templateRef: any, element: any) {
    console.log(element.donationID);
    this.donationID = element.donationID;
    this.rowData = element;
    let dialogRef = this.dialog.open(templateRef, {
      maxWidth: '100%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  getOrders() {
    return this.http.get(environment['apiBaseUrl'] + '/get_donations');
  }
  getNgoData() {
    this.getOrders().subscribe((data: any) => {
      this.donationData = new MatTableDataSource<any>(data['donations']);
      this.donationData.paginator = this.paginator;
      this.donationData.sort = this.sort;
      // this.ngoData = data['ngo'];
      console.log(data['donations']);

      return data;
      // console.log(this.ngoData);
    });
  }

  executive: any;

  usersDataSource = new MatTableDataSource<any>([]);

  rowData: any;

  public userDisplayedColumns: string[] = [
    'donationID',
    'userName',
    'userEmail',
    'userMobile',
    'userCity',
    'userState',
    'actions',
  ];

  ngAfterViewInit(): void {
    this.getNgoData();
  }

  ngOnInit(): void {
    const url = environment['apiBaseUrl'] + '/get_executives';
    axios.get(url).then((response) => {
      this.executive = response.data['executives'];
      console.log(this.executive);
    });
  }
}
