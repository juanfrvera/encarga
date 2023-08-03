import { Component, OnInit } from '@angular/core';
import { ShopFacade } from '../feature/shop/shop.facade';
import { ShopLite } from '../data/shop/shop-lite.data';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  private shopList: ShopLite[];

  public get ShopList() {
    return this.shopList;
  }

  constructor(
    private shopFacade: ShopFacade
    ) { }

  ngOnInit(): void {
    this.shopList = this.shopFacade.getList();
  }

}
