import { Component } from '@angular/core';
import { Stripe } from '@awesome-cordova-plugins/stripe/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {



  type: string = 'all';

  card = {
    name:'Juma Tatu',
    number: '',
    expMonth: 12,
    expYear: 2024,
    cvc: '220'
   }


  constructor(private stripe: Stripe) {

  }



  GetStripeToken() {

    

    this.stripe.setPublishableKey('pk_test_51L6NpnHT7bwjNCrQZ6yPUuoxjcTyYNLBuNFlLUpCagl8qvSz2OqOKX9E0YdmueHWWmBC4joyM24S0tXyiCB4s5Ab00bpFJ7MDT');

    let card = {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 2024,
      cvc: '220'
     }
     
     this.stripe.createCardToken(card)
        .then(token => console.log(token.id))
        .catch(error => console.error(error));
    
      
    }


}
