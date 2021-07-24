import { Component, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { FormularioComponent } from '../../../component/formulario/formulario.component';
import { ModalComponent } from '../../../component/modal/modal.component';
import { Item } from '../../../data/item';
import { ItemService } from '../../../service/item.service';
import { SwalService } from '../../../service/swal.service';
import { Util } from '../../../util';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @ViewChild(FormularioComponent) formulario: FormularioComponent;
  @ViewChild(ModalComponent) modal: ModalComponent;

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
      target: this.modal.Element.nativeElement
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
    this.modal.abrir();
  }

  private cerrar() {
    this.modal.cerrar();
  }

  private limpiarItem() {
    this.item = {} as Item;
  }

}
