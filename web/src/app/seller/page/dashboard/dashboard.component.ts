import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../service/shop.service';
import { ShopLite } from '../../data/shop/shop-lite.data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public view: {
    shopList?: ShopLite[]
  } = {}
  
  constructor(
    private readonly shopService: ShopService
  ) { }

  ngOnInit(): void {
    this.view.shopList = this.shopService.getList();
  }
}
