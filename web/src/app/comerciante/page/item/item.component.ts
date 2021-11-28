import { Component, OnInit } from '@angular/core';
import { ItemAdminService } from 'src/app/service/item-admin.service';
import { CategoriaLightDto } from '../../dto/categoria.light.dto';
import { CategoriaService } from '../../service/categoria.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  private categoriaList: CategoriaLightDto[];

  public get CategoriaList() {
    return this.categoriaList;
  }

  public get Service() {
    return this.service;
  }

  constructor(private service: ItemAdminService, private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.getList().subscribe(list => {
      this.categoriaList = list;
    });
  }
}
