import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paymentmethod',
  templateUrl: './paymentmethod.page.html',
  styleUrls: ['./paymentmethod.page.scss'],
})
export class PaymentmethodPage implements OnInit {


  type: string = 'all';

  card = {
    name:'Juma Tatu',
    number: '',
    expMonth: 12,
    expYear: 2024,
    cvc: '220'
   }


  constructor() { }

  ngOnInit() {
  }

}
