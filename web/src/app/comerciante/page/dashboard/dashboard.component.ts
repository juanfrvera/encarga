import { Component, OnInit } from '@angular/core';
import { ItemAdminService } from 'src/app/service/item-admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private itemCount: number;

  public get ItemCount() {
    return this.itemCount;
  }

  constructor(private readonly itemService: ItemAdminService) { }

  ngOnInit(): void {
    this.itemService.count().subscribe(itemCount => this.itemCount = itemCount);
  }

}
