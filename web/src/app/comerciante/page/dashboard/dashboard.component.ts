import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../service/item.service';

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

  constructor(private readonly itemService: ItemService) { }

  ngOnInit(): void {
    this.itemService.count().subscribe(itemCount => this.itemCount = itemCount);
  }
}
