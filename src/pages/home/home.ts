import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController, IonicPage, LoadingController, ModalController } from 'ionic-angular';
import { WoocommerceProvider } from "../../providers/woocommerce/woocommerce";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[];
  page: number;

  produc: any[]=[];
  @ViewChild('productSlides') productSlides: Slides;
  loading: any;


  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public toastCtrl: ToastController, private WP: WoocommerceProvider, public loadingCtrl: LoadingController) {

    this.page = 2;

    this.WooCommerce = WP.init();

this.loading = this.loadingCtrl.create({
  content: 'Cargando productos'
});
this.loading.present()
this.WooCommerce.getAsync("products?category=21").then( (data) => {
  console.log(JSON.parse(data.body));
  this.products = JSON.parse(data.body);
/*    this.WooCommerce.getAsync('products').then( (data) => {
      this.products= JSON.parse(data.body);
      console.log(JSON.parse(data.body))
  for(var k = 0; k <= this.products.length; k++){
 this.produc.push(this.products[k]);
}*/}, (err) => {
    console.log(err)
  }).then( (err) => {
    this.loading.dismiss()}
  )

  }

  openProductPage(product)
  {
    this.navCtrl.push('ProductDetailsPage', {"product": product} )
  }

    openPage(pageName: string){
      if (pageName == "ar") {
        this.navCtrl.push('ArPage');
      }
      if(pageName == "mapa" ){
        this.navCtrl.push('MapaPage');
      }
      if (pageName == "bosky" ) {
        this.navCtrl.push('Bosky3Page');
      }
      if (pageName == "compras" ) {
        this.navCtrl.push('AboutPage');
      }
    }
}
 