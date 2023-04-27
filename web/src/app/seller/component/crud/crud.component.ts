import { Component, ContentChild, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Util } from 'src/app/util';
import Swal from 'sweetalert2';
import { SwalService } from '../../service/swal.service';
import { FormularioComponent } from '../../../shared/component/formulario/formulario.component';
import { ICrudable } from '../../service/interface/crudable.interface';
import { Ideable } from '../../data/ideable.interface';
import { ModalCrudComponent } from '../modal-crud/modal-crud.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent<Dto extends Ideable, LightDto extends Ideable> implements OnInit {
  @Input() service: ICrudable;
  @Input() public title: string;

  @ViewChild(FormularioComponent) form: FormularioComponent;
  @ViewChild(ModalCrudComponent) modal: ModalCrudComponent;

  // Utilizado para obtener el template que irá dentro del formulario del modal y poblarlo con el item actual
  @ContentChild('formTemplate') formTemplate: TemplateRef<any>;
  @ContentChild('listTemplate') listTemplate: TemplateRef<any>;

  /** Item inside modal */
  public item: Dto = {} as Dto;

  public view: {
    list?: Array<LightDto>;
    showEmptyState?: boolean;
    modal: {
      editing?: boolean;
      loading: boolean;
      saving: boolean;
    }
  }

  constructor(
    private readonly swalService: SwalService
  ) { }

  ngOnInit(): void {
    this.view = {
      modal: {
        loading: false,
        saving: false,
      }
    };

    this.service.getList$().subscribe(list => {
      if (list) {
        this.view.list = list;
        this.view.showEmptyState = list.length <= 0;
      }
    });
  }

  /** Muestra el modal en modo creacion */
  public add() {
    this.clearItem();
    this.openModal();
  }

  /** Muestra el modal en modo edicion */
  public itemClicked(dto: LightDto) {
    this.view.modal.loading = true;
    this.view.modal.editing = true;

    this.openModal();

    this.service.get(dto.id).then(item => {
      // Hacer una copia profunda para no modificar el original
      this.item = Util.deepCopy(item);

      this.view.modal.loading = false;
    });
  }

  public close() {
    this.modal.close();
  }

  /** Muestra alerta de eliminar */
  public delete() {
    this.swalService.fire({
      icon: 'warning',
      iconColor: '#fc453c',
      title: '¿Estás seguro?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return this.service.delete(this.item.id).then(() => { })
          .catch(
            () => {
              Swal.showValidationMessage('Ocurrió un error al intentar eliminar');
            }
          );
      },
      // Sirve para que al apretar Escape no se cierre el modal
      keydownListenerCapture: true
    }).then(result => {
      // Si se eliminó sin errores
      if (result.isConfirmed) {
        this.close();
      }
    });
  }

  /** Guarda lo que se ha hecho en el modal */
  public save() {
    if (this.form.isValid()) {
      this.view.modal.saving = true;

      if (this.item.id) {
        // Updating
        this.service.update(this.item).then(
          // Success
          () => {
            this.close();
            this.view.modal.saving = false;
          })
          .catch(
            // Error
            () => {

              this.view.modal.saving = false;
            }
          );
      }
      else {
        // Creating
        this.service.create(this.item).then(
          // Success
          () => {
            this.close();

            this.view.modal.saving = false
          }
        ).catch(
          // Error
          () => {
            this.swalService.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ocurrió un error inesperado',
              keydownListenerCapture: true,
              confirmButtonText: 'Continuar'
            });

            this.view.modal.saving = false
          }
        );
      }
    }
    else {
      this.form.showFeedback();
    }
  }

  private openModal() {
    this.form.hideFeedback();
    this.modal.open();
  }

  private clearItem() {
    this.item = {} as Dto;
  }
}
