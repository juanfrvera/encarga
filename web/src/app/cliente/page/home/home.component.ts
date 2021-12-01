import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PedidoService } from '../../service/pedido.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Toast } from 'bootstrap';
import { CategoriaService } from 'src/app/cliente/service/categoria.service';
import { CategoriaLightDto } from '../../dto/categoria.light.dto';
import { ItemService } from '../../service/item.service';
import { ItemLightDto } from '../../dto/item.light.dto';
import { ItemData } from '../../data/item.data';

interface CategoriaWithItemsViewModel {
  categoria: CategoriaLightDto;
  itemDataList?: Array<ItemData>;
  itemDataListLoaded: boolean;
  errorText?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('accordion', { static: true }) accordionElement: ElementRef;
  @ViewChild('toast', { static: true }) toastElement: ElementRef;

  private toast: Toast;

  /** Categoría actual en accordion */
  private currentCategoriaIndex?: number;

  public model: {
    categoriaWithItemsList?: Array<CategoriaWithItemsViewModel>;
    loadingCategoriaList: boolean;
    total?: number;
  };

  public get CurrentCategoriaIndex() {
    return this.currentCategoriaIndex;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly categoriaService: CategoriaService,
    private readonly itemService: ItemService,
    private readonly pedidoService: PedidoService,
  ) { }

  ngOnInit() {
    this.toast = new Toast(this.toastElement.nativeElement, { autohide: false });

    this.model = {
      loadingCategoriaList: true
    };

    this.categoriaService.getList().subscribe(list => {
      this.model.categoriaWithItemsList = list.map(c => {
        return {
          categoria: c,
          itemDataListLoaded: false
        };
      });

      this.model.loadingCategoriaList = false;
    });

    if (this.pedidoService.hayPedido()) {
      this.reflectPedido();
    }
  }

  ngOnDestroy() {
    this.hideToast();
  }


  /** Agrega el producto al pedido, sumandolo al total */
  public add(item: ItemLightDto) {
    const itemData = this.getItemData(item.id);

    if (itemData) {
      itemData.count++;

      if (!this.model.total) {
        this.model.total = 0;
      }

      this.model.total += item.price ?? 0;
      this.showToast();

      this.pedidoService.add(item.id);
    }
    else {
      console.error('Ocurrió un error al querer agregar el item');
    }
  }

  // Cuando una categoría será mostrada (todavía no se hizo la animación de abrir accordion)
  public categoriaWillShow(index: number) {
    if (this.model.categoriaWithItemsList) {
      const categoriaWithItems = this.model.categoriaWithItemsList[index];
      if (!categoriaWithItems.itemDataListLoaded) {
        this.loadItemDataListForCategoria(categoriaWithItems);
      }
    }

    this.currentCategoriaIndex = index;
  }

  // Cuando una categoría fue ocultada (la animación de ocultar accordion ya terminó)
  public categoriaHidden(index: number) {
  }

  public itemCount(itemId: string) {
    return this.getItemData(itemId)?.count ?? 0;
  }

  public getListByCategoria(categoriaId: string) {
    return this.itemService.getListByCategoriaId(categoriaId);
  }

  public getItemData(itemId: string) {
    let itemData: ItemData | undefined;

    if (this.model.categoriaWithItemsList) {
      if (this.CurrentCategoriaIndex) {
        const categoriaWithItems = this.model.categoriaWithItemsList[this.CurrentCategoriaIndex];

        if (categoriaWithItems) {
          const itemDataList = categoriaWithItems.itemDataList;

          if (itemDataList) {
            itemData = itemDataList.find(d => d.id == itemId);

            if (itemData) {
              return itemData;
            }
          }
        }
      }

      for (const categoriaWithItems of this.model.categoriaWithItemsList) {
        if (categoriaWithItems.itemDataList) {
          itemData = categoriaWithItems.itemDataList.find(d => d.id == itemId);

          if (itemData) {
            return itemData;
          }
        }
      }
    }

    return null;
  }

  /** Quita el producto al pedido, restandolo del total */
  public removeItem(item: ItemLightDto) {
    const objetoCantidad = this.getItemData(item.id);
    // Se fija que la cantidad este en 0 para no pasar a nros negativos
    if (!objetoCantidad || objetoCantidad.count <= 0) return;

    objetoCantidad.count--;

    if (this.model.total) {
      // Resta el producto del total
      this.model.total -= item.price ?? 0;
    }

    // Si el total esta en 0, no muestra ningun toast con total
    // tslint:disable-next-line: triple-equals
    if (!this.hasPedido()) {
      this.hideToast();
    }
    // Si el total es mayor que 0, borra el toast anterior y crea uno nuevo con el total actualizado
    else {
      this.showToast();
    }

    this.pedidoService.remove(item.id);
  }

  /** Continua a la pagina de detalle */
  public continue() {
    this.router.navigate(['detalle'], { relativeTo: this.route });
  }

  private hasPedido() {
    return this.model.total;
  }

  private loadItemDataListForCategoria(categoriaWithItems: CategoriaWithItemsViewModel) {
    this.itemService.getListByCategoriaId(categoriaWithItems.categoria.id).subscribe(list => {
      categoriaWithItems.itemDataList = list.map(item => {
        return {
          id: item.id,
          count: this.pedidoService.getItemCount(item.id),
          description: item.description,
          name: item.name,
          price: item.price
        }
      });

      categoriaWithItems.itemDataListLoaded = true;
    },
      () => {
        categoriaWithItems.errorText = 'Ocurrió un error inesperado';
      })
  }

  /** Muestra el toast */
  private showToast() {
    this.toast.show();
  }

  /** Oculta el toast */
  private hideToast() {
    this.toast.hide();
  }

  /** Carga las cantidades pedidas a los items con cantidad y calcula la variable total */
  private reflectPedido() {
    this.model.total = 0;

    const pedido = this.pedidoService.get();

    const itemIdList = pedido.lines.map(l => l.itemId);
    this.itemService.getListByIdList(itemIdList).subscribe(items => {
      pedido.lines.forEach(line => {
        const item = items.find(i => i.id === line.itemId);
        // El item puede haber sido eliminado de la base de datos mientras estaba guardado en el pedido de un cliente
        // Este chequeo es para que no haya un error de referencia
        if (item) {
          if (item.price) {
            this.model.total! += item.price * line.count;
          }
        }
        else {
          // Como el item guardado no existe mas, eliminar la linea del pedido
          this.pedidoService.deleteLine(line);
          console.log('Se eliminó el item \'' + line.itemId + '\' porque ya no existe en el catálogo');
        }
      });

      this.showToast();
    });
  }
}
