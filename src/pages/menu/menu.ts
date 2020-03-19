import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, IonicPage } from 'ionic-angular';
import { CartPage } from "../cart/cart";
import { Storage } from "@ionic/storage";
import { WoocommerceProvider } from "../../providers/woocommerce/woocommerce";
import { HomePage } from '../home/home';




@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  homePage: any = HomePage;
  WooCommerce: any;
  categories: any[]=[];
  @ViewChild('content') childNavCtrl: NavController;
  loggedIn: boolean = false

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public modalCtrl: ModalController, private WP: WoocommerceProvider) {
    this.categories = [];
  

    this.WooCommerce = WP.init();

    this.WooCommerce.getAsync('products/categories').then( (data) => {
      this.categories= JSON.parse(data.body);
      console.log(JSON.parse(data.body))
}, (err) => {
    console.log(err)
  })

  }

  openCategoryPage(category) {
    this.childNavCtrl.push('ProductByCategoryPage', { "category": category } )
  }

  openPage(pageName: string){
    if (pageName == "cart") {
      let modal = this.modalCtrl.create(CartPage);
      modal.present();
    }
    if (pageName == "bosky") {
      this.navCtrl.push('Bosky3Page');
    }
    if (pageName == "santa") {
      this.navCtrl.push("ArPage");
    }
    if (pageName == "home") {
      this.navCtrl.push(HomePage);
    }
    if (pageName == "mapa") {
      this.navCtrl.push("MapaPage");
    }
    if (pageName == "encuesta") {
      this.navCtrl.push("EncuestaPage");
    }
  }

}
