import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { WoocommerceProvider } from '../../providers/woocommerce/woocommerce';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  WooCommerce: any;
  newOrder: any;
  paymentMethods: any[];
  paymentMethod: any;
  billing_shipping_same: boolean;
  userInfo: any;
  myForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public alertCtrl: AlertController,
    private payPal: PayPal,
    private WP: WoocommerceProvider,
    public fb: FormBuilder) {
    this.newOrder = {};
    this.newOrder.billing = {};
    this.newOrder.shipping = {};
    this.billing_shipping_same = false;

    this.myForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address_1: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postcode : ['', [Validators.pattern(/^[a-z0-9_-]{5,18}$/)]],
      phone: ['', [Validators.required]],

    });

    this.paymentMethods = [
      { method_id: "paypal", method_title: "PayPal" }];
    this.WooCommerce = WP.init();


  }
  saveData() {
    alert(JSON.stringify(this.myForm.value));
    
  }

  setBillingToShipping() {
    this.billing_shipping_same = !this.billing_shipping_same;

    if (this.billing_shipping_same) {
      this.newOrder.shipping = this.newOrder.billing;
    }

  }

  placeOrder() {

    let orderItems: any[]=[];
    let data: any = {};

    let paymentData: any = {};

    this.paymentMethods.forEach((element, index) => {
      if (element.method_id == this.paymentMethod) {
        paymentData = element;
      }
    });
    data = {

      //Fixed a bug here. Updated in accordance with wc/v2 API
      payment_method: paymentData.method_id,
      payment_method_title: paymentData.method_title,
      set_paid: true,

      billing: this.myForm.value,
      shipping: this.myForm.value,

      line_items: orderItems

    };

    if (paymentData.method_id == "paypal") {

      this.payPal.init({
        PayPalEnvironmentProduction: "AVNOvvhGRxLhUqUzHburwScJUM7RqQOrW536jKhnfnB0Ou2ObZoxwl-DNbHw8TNPmgD7JzKorPBVajF",
        PayPalEnvironmentSandbox: "AYRr5hfq00I-CcbYlhvqkhLpEMyRJ69i9lgut8_8QnhHL4f6WuHDq6RS8_ADSMlhmk9rqBHKGcnUK8KS"
      }).then(() => {
        // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
        this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
          // Only needed if you get an "Internal Service Error" after PayPal login!
          //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
        })).then(() => {
          this.storage.get("cart").then((cart) => {
          let total = 0;

          cart.forEach((element, index) => {
            orderItems.push({product_id: element.product.id, quantity: element.qty});
            total = total + (element.product.price * element.qty);
          });
            let payment = new PayPalPayment( total.toString(), 'USD', 'Description', 'sale');
            this.payPal.renderSinglePaymentUI(payment).then((response) => {
              // Successfully paid

              data.line_items = orderItems;
              //console.log(data);
              let orderData: any = {};

              orderData.order = data;

              this.WooCommerce.postAsync('orders', orderData.order).then((data) => {

                let response = (JSON.parse(data.body));

                this.alertCtrl.create({
                  title: "¡Gracias por tu compra!",
                  message: "Pedido realizado correctamente. Diviertete!",
                  buttons: [{
                    text: "OK",
                    handler: () => {
                      this.navCtrl.setRoot('MenuPage');
                    }
                  }]
                }).present();
              })

            })

          }, () => {
            // Error or render dialog closed without being successful
          });
        }, () => {
          // Error in configuration
        });
      }, () => {
        // Error in initialization, maybe PayPal isn't supported or something else
      });





    } else {

      let alert = this.alertCtrl.create({
        title: 'Pago',
        subTitle: 'Elije un método de pago',
        buttons: ['Lo haré']
      });
      alert.present();


    }


  }

}
