import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';
import { FormularioComponent } from '../../../component/formulario/formulario.component';
import { Item } from '../../../data/item';
import { ItemService } from '../../../service/item.service';
import { SwalService } from '../../../service/swal.service';
import { Util } from '../../../util';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements AfterViewInit {
  @ViewChild(FormularioComponent) formulario: FormularioComponent;
  @ViewChild('modal', { static: true }) modalElement: ElementRef;
  private modal: Modal;

  /** Item en modal */
  private item: Item = {} as Item;

  public get Item() {
    return this.item;
  }

  public get Items() {
    return this.itemService.Items;
  }

  constructor(
    private itemService: ItemService,
    private swalService: SwalService
  ) { }

  ngAfterViewInit(): void {
    this.modal = new Modal(this.modalElement.nativeElement);
  }

  /** Muestra el modal en modo creacion */
  public agregar() {
    this.limpiarItem();
    this.abrir();
  }

  /** Muestra el modal en modo edicion */
  public editar(item: Item) {
    this.item = Util.copiaProfunda(item);
    this.abrir();
  }

  public eliminar() {
    this.swalService.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return this.itemService.delete(this.item).toPromise().then(deletedItem => {
          return deletedItem;
        },
          error => {
            Swal.showValidationMessage('Ocurrió un error al intentar eliminar');
          });
      },
      // Sirve para que al apretar Escape no se cierre el modal
      target: this.modalElement.nativeElement
    }).then(result => {
      // Si se eliminó sin errores
      if (result.isConfirmed) {
        this.cerrar();
      }
    });
  }

  public guardar() {
    if (this.formulario.esValido()) {
      if (this.Item.id) {
        // Editando
        this.itemService.edit(this.Item);
      }
      else {
        // Creando
        this.itemService.create(this.Item);
      }

      this.cerrar();
    }
    else {
      this.formulario.mostrarFeedback();
    }
  }

  private abrir() {
    this.formulario.ocultarFeedback();
    this.modal.show();
  }

  private cerrar() {
    this.modal.hide();
  }

  private limpiarItem() {
    this.item = {} as Item;
  }

}
