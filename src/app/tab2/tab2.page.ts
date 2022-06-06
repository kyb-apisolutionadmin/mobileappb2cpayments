import { Component } from '@angular/core';
import { Stripe } from '@awesome-cordova-plugins/stripe/ngx';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  
  StripeConfirmation = '';
  Forecast: any;

ForecastContainer = 

{
  "uuid": "",
  "account": {
      "uuid": "",
      "code": ""
  },
  "flowCode": {
      "uuid": "",
      "code": ""
  },
  "budgetCode": {
      "uuid": "",
      "code": ""
  },
  "date": {
      "transactionDate": "",
      "valueDate": "",
      "accountingDate": "",
      "updateDateTime": ""
  },
  "flowAmount": {
      "amount": 0,
      "currency": {
          "uuid": "",
          "code": ""
      }
  },
  "accountAmount": {
      "accountAmount": 0
  },
  "status": "INTRADAY",
  "reference": "",
  "userZones": {},
  "description": ""
}

  constructor(private stripe: Stripe, private http: HttpClient) {

this.GetLoanSchedule();

  }

  GetStripeToken() {

    this.stripe.setPublishableKey('pk_test_51L6NpnHT7bwjNCrQZ6yPUuoxjcTyYNLBuNFlLUpCagl8qvSz2OqOKX9E0YdmueHWWmBC4joyM24S0tXyiCB4s5Ab00bpFJ7MDT');

    let card = {
      number: '',
      expMonth: null,
      expYear: null,
      cvc: ''
     }
     
     this.stripe.createCardToken(card)
        .then(token => console.log(token.id))
        .catch(error => console.error(error));
    
      
    }





  renameKey (object, key, newKey) {

    const clonedObj = this.clone(object);
  
    const targetKey = clonedObj[key];
  
  console.log('Outputting object ' + JSON.stringify(Object));

  
    delete clonedObj[key];
  
    clonedObj[newKey] = targetKey;
  
    return clonedObj;
  
  };


  clone = (obj) => Object.assign({}, obj);



  


    MakePaymentClicked(Amount, Currency, Cashflowuuid){

      console.log('Item clicked amount is ' + Amount + ' ' + Currency + ' ' + Cashflowuuid);


this.PaymentToCreate.Currency = Currency;
this.PaymentToCreate.amount = parseInt(Amount);
this.PaymentToCreate.uuid = Cashflowuuid;


this.UpdateForecastbyuuid(Cashflowuuid);



//this.CreateCharge(this.PaymentToCreate);


    }

  
      
    PaymentToCreate = {
      "customerEmail": '',
      "paymentMethodId": '',
      "Currency": null,
      "amount": 100,
      "uuid":''
      
    }


    CreateCharge(PaymentToCreate:any){

      var headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', '*/*')
    .set('Authorization','Bearer ' + window.localStorage.getItem('access_token'));
  
       var body = PaymentToCreate;
    
      this.http.post<any>('https://localhost:7287/Charge?customerEmail=' + this.PaymentToCreate.customerEmail +'&paymentMethodId=' 
      + this.PaymentToCreate.paymentMethodId + '&Currency=' + this.PaymentToCreate.Currency +'&amount=' + this.PaymentToCreate.amount, body,  { headers:headers }).subscribe(data =>  {
        
    });
    
    }

    async UpdateForecastbyuuid(uuid: string){

     // console.log('1/2 Getting forecast data');
      await this.GetForecastbyuuid(uuid).then(async (data: any) => {
        //console.log('2/2 Forecast data returned by get');
        
        this.Forecast = data;
  

//console.log('Forecast data is ' + JSON.stringify(this.Forecast))



this.ForecastContainer.uuid = data.uuid;
this.ForecastContainer.account.code = data.account.code;
this.ForecastContainer.account.uuid = data.account.uuid;

this.ForecastContainer.flowCode.code = data.flowCode.code;
this.ForecastContainer.flowCode.uuid = data.flowCode.uuid;

this.ForecastContainer.budgetCode.code = data.budgetCode.code;
this.ForecastContainer.budgetCode.uuid = data.budgetCode.uuid;

this.ForecastContainer.date.accountingDate = data.date.accountingDate;
this.ForecastContainer.date.transactionDate = data.date.transactionDate;
this.ForecastContainer.date.updateDateTime = data.date.updateDateTime;
this.ForecastContainer.date.valueDate = data.date.valueDate;

this.ForecastContainer.flowAmount.amount = data.flowAmount.amount;
this.ForecastContainer.flowAmount.currency = data.flowAmount.currency;
this.ForecastContainer.flowAmount.currency.uuid = data.flowAmount.currency.uuid;
this.ForecastContainer.flowAmount.currency.code = data.flowAmount.currency.code;

this.ForecastContainer.accountAmount.accountAmount = data.accountAmount.amount;
this.ForecastContainer.status = data.status;
this.ForecastContainer.reference = data.reference;
this.ForecastContainer.userZones = data.userZones;


        
        let a = 1;


if(a == 1)

{

  this.ForecastContainer.description = 'Payment confirmed by Stripe. Reference is: ch_4356634545';
  this.ForecastContainer.status = 'INTRADAY';
  

    await this.UpdateForecast(uuid,this.ForecastContainer).then(

      (response: any) => {
        // Success callback
       // console.log('Update was successful -here is the updated forecast ' + JSON.stringify(this.Forecast));
      }


    ).catch(async (error: any) => {
  // Error callback
 
  //console.log(error);
});


  
}

      





      })
  
    //}
  

  

}






    GetForecastbyuuid(uuid:string): Promise<any> {

      var headers = new HttpHeaders()
      .set('Accept', '*/*')
      .set('Authorization','Bearer ' + window.localStorage.getItem('access_token'));
     
      
      return this.http.get<any>('https://demo.kyriba.com/gateway/api/v1/cash-flows/' + uuid + '/detail',  {headers:headers}).toPromise(
      );
      
        
      }


    UpdateForecast(uuid: string, body: Object){

      var headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', '*/*')
    .set('Authorization','Bearer ' + window.localStorage.getItem('access_token'));
    
      return this.http.put<any>('https://demo.kyriba.com/gateway/api/v1/cash-flows/' + uuid, body,  { headers:headers }).toPromise();
    

      
    }



    LoanSchedule = [];


 


  GetLoanSchedule() {

    var headers = new HttpHeaders()
    .set('Accept', '*/*')
    .set('Authorization','Bearer ' + window.localStorage.getItem('access_token'));
   
    
    return this.http.get<any>('https://demo.kyriba.com/gateway/api/v1/cash-flows?dateType=TRANSACTION&filter=reference==JUMATATU&endDate=2023-01-01',  {headers:headers}).subscribe(data =>{
      this.LoanSchedule = data.results;

    

    });
    
      
    }

  


}



