import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import {PersonService} from "../../app/services/PeopleService";
import {HttpW} from "../../app/services/httpw";
import {PersonDetailPage} from "../person-detail/person-detail";
import {PersonCreatePage} from "../person-create/person-create";

/*
  Generated class for the PersonList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-person-list',
  templateUrl: 'person-list.html',
    providers : [
        PersonService,
        HttpW
    ]
})
export class PersonListPage {
    _pageStatus : any = "searching";
    _items : any = [];
    _filter : any = {};
    _shouldGoBack : boolean = false;
    _resolve;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _service : PersonService,
              public modalCtrl: ModalController,
  ) {
      this._resolve = navParams.get('resolve') || undefined;
  }
    ionViewDidLoad() {
        console.log("Ion loaded.");
        this.fetchAll(this._filter);
    }
    fetchAll(options){
        this._service.all(options)
            .then((res) => {
                console.log(res);
                this._items = res;
                this._pageStatus = "loaded";
            })
            .catch((err) => {
                console.error(err);
            });
    }
    openItem(item : any){
        if(this._resolve){
            this._resolve(item);
            return this.navCtrl.pop();
        }
        this.navCtrl.push(PersonDetailPage, {
            item: item
        });
    }
    addItem(){
        let addModal = this.modalCtrl.create(PersonCreatePage);
        addModal.present();
    }
}
