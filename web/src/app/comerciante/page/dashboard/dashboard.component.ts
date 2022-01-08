import { Component, OnInit } from '@angular/core';
import { CategoriaFacade } from '../../categoria/categoria.facade';
import { ItemFacade } from '../../feature/item/item.facade';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private model: {
    categoria: {
      loading: boolean;
      count: number;
    };
    item: {
      loading: boolean;
      count: number;
    }
  }

  public get Model() {
    return this.model;
  }

  constructor(
    private readonly categoriaFacade: CategoriaFacade,
    private readonly itemFacade: ItemFacade
  ) { }

  ngOnInit(): void {
    this.model = {
      categoria: {
        loading: true,
        count: 0
      },
      item: {
        loading: true,
        count: 0
      }
    };

    this.itemFacade.count().subscribe(
      // Success
      itemCount => {
        this.model.item.count = itemCount;
      },
      // Error
      () => { },
      // Completed
      () => {
        this.model.item.loading = false;
      }
    );

    this.categoriaFacade.count().subscribe(
      count => {
        this.model.categoria.count = count;
      },
      () => { },
      () => {
        this.model.categoria.loading = false;
      }
    )

  }
}
