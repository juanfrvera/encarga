import { Component, ContentChild, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BaseFilter } from 'src/app/data/base/base-filter';
import { Util } from 'src/app/util';
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
  private item: Dto = {} as Dto;

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

  public cancelar() {
    this.cerrar();
  }

  /** Muestra el modal en modo edicion */
  public editar(entity: Entity) {
    // TODO: mostrar "cargando"
    this.service.getById(entity.id).subscribe(item => {
      // Hacer una copia profunda para no modificar el original
      this.item = Util.copiaProfunda(item);
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
      target: this.modal.Element.nativeElement,
      preConfirm: () => {
        return this.service.delete(this.item.id).toPromise().then(() => {
          console.log("Eliminado");
        }).catch(
          () => {
            Swal.showValidationMessage('Ocurrió un error al intentar eliminar');
          });
      },
      // Sirve para que al apretar Escape no se cierre el modal
      keydownListenerCapture: true
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
        this.service.edit(this.Item).subscribe(itemServer => {
          console.log("Item editado");
        })
      }
      else {
        // Creando
        this.service.create(this.Item).subscribe(itemCreado => {
          console.log("Creado");
        });
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
    this.item = {} as Dto;
  }

}
