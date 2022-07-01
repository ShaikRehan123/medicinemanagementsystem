import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css'],
})
export class AddMedicineComponent implements OnInit {
  public medicineForm: FormGroup;
  medicine_Name: string = '';
  medicine_Price: string = '';
  medicine_Mfd: string = '';
  medicine_exp_date: string = '';
  medicine_quantity: string = '';

  // constructor() {}

  onSubmit = async () => {
    // console.log('Hello WHy are you here');s
    // get All Values
    this.medicine_Name = this.medicineForm.get('medicine_Name')?.value;
    this.medicine_Price = this.medicineForm.get('medicine_Price')?.value;
    this.medicine_Mfd = this.medicineForm.get('medicine_MfgDate')?.value;
    this.medicine_exp_date = this.medicineForm.get('medicine_ExpDate')?.value;
    this.medicine_quantity = this.medicineForm.get('medicine_quantity')?.value;
    console.log(new DatePipe('en').transform(this.medicine_Mfd, 'yyyy-MM-dd'));
    console.log(
      new DatePipe('en').transform(this.medicine_exp_date, 'yyyy-MM-dd')
    );
    if (
      this.medicine_Name == '' ||
      this.medicine_Price == '' ||
      this.medicine_Mfd == '' ||
      this.medicine_exp_date == '' ||
      this.medicine_quantity == ''
    ) {
      this.toastr.error('Please fill all the fields');
    } else {
      // this.toastr.success('Form Submitted Successfully', 'Success');
      const base_url = environment['apiBaseUrl'];
      const url = base_url + '/add_medicine';
      const data = {
        medicine_name: this.medicine_Name,
        price: this.medicine_Price,
        mfg_date: this.medicine_Mfd,
        exp_date: this.medicine_exp_date,
        quantity: this.medicine_quantity,
      };
      const res = await axios.post(url, data);
      if (res.data.message == 'Added medicine successfully') {
        this.toastr.success('Added medicine successfully', 'Success');
        this.medicineForm.reset();
      } else {
        this.toastr.error(res.data.message, 'Error');
      }
      console.log(res.data.user);
    }
  };

  constructor(private toastr: ToastrService, private formBuilder: FormBuilder) {
    this.medicineForm = this.formBuilder.group({
      medicine_Name: new FormControl(''),
      medicine_Price: new FormControl(''),
      medicine_MfgDate: new FormControl(''),
      medicine_ExpDate: new FormControl(''),
      medicine_quantity: new FormControl(''),
    });
  }

  ngOnInit(): void {}
}
