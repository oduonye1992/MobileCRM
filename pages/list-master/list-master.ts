import {Component} from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';

import { ItemDetailPage } from '../item-detail/item-detail';
import { ItemCreatePage } from '../item-create/item-create';

import { Items } from '../../providers/providers';
import { Item } from '../../models/item';
import {DealService} from "../../app/services/DealService";

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html',
    providers : [
        DealService
    ]
})
export class ListMasterPage{
  currentItems: Item[];
  _pageStatus : any = "searching";
  _items : any = [];
  _filter : any = {};
    _resolve;

  constructor(
      public navCtrl: NavController,
      public items: Items,
      public modalCtrl: ModalController,
      public dealService : DealService,
      public navParams : NavParams
  ) {
    this.currentItems = this.items.query();
      this._resolve = navParams.get('resolve') || undefined;
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
      console.log("Ion loaded.");
      this.fetchDeals(this._filter);
      this._pageStatus = "loaded";
  }
  fetchDeals(options){
      this.dealService.getAllDeals(options)
          .then((res) => {
              console.log(res);
              this._items = res;
          })
          .catch((err) => {
              console.error(err);
          });
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create(ItemCreatePage);
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    });
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: Item) {
      if(this._resolve){
          this._resolve(item);
          return this.navCtrl.pop();
      }
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }
}
