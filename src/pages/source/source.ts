import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CartPage } from '../cart/cart';

/**
 * Generated class for the SourcePage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-source',
  templateUrl: 'source.html'
})
export class SourcePage {

  homeRoot = HomePage
  carrito = CartPage


  constructor(public navCtrl: NavController) {}

}
 