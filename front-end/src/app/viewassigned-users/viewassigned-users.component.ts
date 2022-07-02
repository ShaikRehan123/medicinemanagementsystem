import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
// type simpleType = executiveDisplayedColumns[];

@Component({
  selector: 'app-viewassigned-users',
  templateUrl: './viewassigned-users.component.html',
  styleUrls: ['./viewassigned-users.component.css'],
})
export class ViewassignedUsersComponent implements OnInit, AfterViewInit {
  faUserTie = faUserTie;
  constructor(
    private http: HttpClient,
    private cookieservice: CookieService,
    private toastr: ToastrService
  ) {}

  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: any = MatSort;

  executiveDataSource = new MatTableDataSource<any>([]);

  collectmedicine = async (el: any) => {
    console.log(el);
    const url = environment['apiBaseUrl'] + '/change_status';
    const res = await axios.post(url, {
      donationID: el.donationID,
    });

    if (res.data.message == 'Changed status successfully') {
      this.toastr.success('Medicine collected successfully');
    } else {
      this.toastr.error(res.data.message);
    }
  };

  public executiveDisplayedColumns: any = [
    'userName',
    'userEmail',
    'userMobile',
    'userCity',
    'userState',
    'actions',
  ];

  getOrders() {
    return this.http.get(
      environment['apiBaseUrl'] +
        `/get_donations_assigned?executiveID=${
          JSON.parse(this.cookieservice.get('user_data'))['id']
        }`
    );
  }
  getNgoData() {
    this.getOrders().subscribe((data: any) => {
      this.executiveDataSource = new MatTableDataSource<any>(data['donations']);
      this.executiveDataSource.paginator = this.paginator;
      this.executiveDataSource.sort = this.sort;
      // this.ngoData = data['ngo'];
      console.log(data['donations']);

      return data;
      // console.log(this.ngoData);
    });
  }

  ngAfterViewInit(): void {
    this.getNgoData();
  }
  ngOnInit(): void {
    console.log('nggfdndgn', this.executiveDisplayedColumns);
  }
}
