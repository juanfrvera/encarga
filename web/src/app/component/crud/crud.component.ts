import { Component, ContentChild, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BaseFilter } from 'src/app/data/base/base-filter';
import Swal from 'sweetalert2';
import { ObjetoConId } from '../../data/objeto-con-id';
import { CrudService } from '../../service/instance/crud.service';
import { SwalService } from '../../service/swal.service';
import { FormularioComponent } from '../formulario/formulario.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent<Entity extends ObjetoConId, Dto extends ObjetoConId, ListDto extends ObjetoConId, Filter extends BaseFilter> implements OnInit {
  @Input() service: CrudService<Entity, Dto, ListDto, Filter>;
  @Input() titulo: string;

  @ViewChild(FormularioComponent) formulario: FormularioComponent;
  @ViewChild(ModalComponent) modal: ModalComponent;

  // Utilizado para obtener el template que irá dentro del formulario del modal y poblarlo con el item actual
  @ContentChild('templateFormulario') templateFormulario: TemplateRef<any>;
  @ContentChild('templateLista') templateLista: TemplateRef<any>;

  /** Item en modal */
  private item: Entity = {} as Entity;

  public get Item() {
    return this.item;
  }

  public get Lista() {
    return this.service.Lista;
  }

  public get Titulo() {
    return this.titulo;
  }


  constructor(private swalService: SwalService) { }

  ngOnInit(): void {
  }

  /** Muestra el modal en modo creacion */
  public agregar() {
    this.limpiarItem();
    this.abrir();
  }

  /** Muestra el modal en modo edicion */
  public editar(entity: Entity) {
    // TODO: mostrar "cargando"
    this.service.getById(entity.id).subscribe(item => {
      this.item = item;
      this.abrir();
    });
  }

  /** Muestra alerta de eliminar */
  public eliminar() {
    this.swalService.fire({
      icon: 'warning',
      iconColor: '#fc453c',
      title: '¿Estás seguro?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return this.service.delete(this.item).toPromise().then(deletedItem => {
          return deletedItem;
        },
          () => {
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

  /** Guarda lo que se ha hecho en el modal */
  public guardar() {
    if (this.formulario.esValido()) {
      if (this.Item.id) {
        // Editando
        this.service.edit(this.Item);
      }
      else {
        // Creando
        this.service.create(this.Item);
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
    this.item = {} as Entity;
  }

}
