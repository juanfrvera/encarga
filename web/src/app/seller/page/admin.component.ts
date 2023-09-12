import { Component, OnInit } from '@angular/core';
import { ShopFacade } from '../feature/shop/shop.facade';
import { ShopLite } from '../data/shop/shop-lite.data';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public view: {
    shopList?: ShopLite[]
  } = {}

  constructor(
    private readonly shopFacade: ShopFacade
    ) { }

  ngOnInit(): void {
    this.view.shopList = this.shopFacade.getList();
  }

}
