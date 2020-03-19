import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController, IonicPage, LoadingController, ModalController } from 'ionic-angular';
import { WoocommerceProvider } from "../../providers/woocommerce/woocommerce";

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  WooCommerce: any;
  products: any[];
  page: number;

  produc: any[] = [];
  @ViewChild('productSlides') productSlides: Slides;
  loading: any;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public toastCtrl: ToastController, private WP: WoocommerceProvider, public loadingCtrl: LoadingController) {
    this.page = 2;

    this.WooCommerce = WP.init();

    ;
    this.loading = this.loadingCtrl.create({
      content: 'Cargando productos'
    });
    this.loading.present()
   this.WooCommerce.getAsync('products').then( (data) => {
      this.products= JSON.parse(data.body);
      console.log(JSON.parse(data.body))
  for(var k = 0; k <= this.products.length; k++){
 this.produc.push(this.products[k]);
}}, (err) => {
        console.log(err)
      }).then((err) => {
        this.loading.dismiss()
      }
      )
  }
 
  openProductPage(product) {
    this.navCtrl.push('ProductDetailsPage', { "product": product })
  }


}
