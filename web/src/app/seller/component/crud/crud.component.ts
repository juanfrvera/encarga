import { Component, ContentChild, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Util } from 'src/app/util';
import Swal from 'sweetalert2';
import { SwalService } from '../../service/swal.service';
import { FormularioComponent } from '../../../shared/component/formulario/formulario.component';
import { ICrudable } from '../../service/interface/crudable.interface';
import { Ideable as Idable } from '../../data/ideable.interface';
import { ModalCrudComponent } from '../modal-crud/modal-crud.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent<Full extends Idable, Lite extends Idable> implements OnInit {
  @Input() service: ICrudable<Full, Lite>;
  @Input() public title: string;

  @ViewChild(FormularioComponent) form: FormularioComponent;
  @ViewChild(ModalCrudComponent) modal: ModalCrudComponent;

  // Used to get the template that will go inside the modal's form and populate it with the current item
  @ContentChild('formTemplate') formTemplate: TemplateRef<any>;
  @ContentChild('listTemplate') listTemplate: TemplateRef<any>;

  /** Item inside modal */
  public item: Full = {} as Full;

  public view: {
    list?: Array<Lite>;
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
    this.refresh();
  }

  public refresh() {
    this.view = {
      modal: {
        loading: false,
        saving: false,
      }
    };

    this.service.getList().then(list => {
      if (list) {
        this.view.list = list;
        this.view.showEmptyState = list.length <= 0;
      }
    });
  }

  public addClicked() {
    this.clearItem();
    this.openModal();
  }

  public itemClicked(dto: Lite) {
    this.view.modal.loading = true;
    this.view.modal.editing = true;

    this.openModal();

    this.service.get(dto._id).then(item => {
      // So we don't modify the original
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
        return this.service.delete(this.item._id).then(() => { })
          .catch(
            () => {
              Swal.showValidationMessage('Ocurrió un error al eliminar');
            }
          );
      },
      // So when Escape key is pressed, the modal isn't closed
      keydownListenerCapture: true
    }).then(result => {
      // If deleted without errors
      if (result.isConfirmed) {
        this.swalService.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Se ha eliminado exitosamente',
          keydownListenerCapture: true,
          confirmButtonText: 'Continuar'
        });
        this.close();

        if(this.view.list){
          const index = this.view.list.findIndex(i => i._id === this.item._id);
          if(index > -1){
            this.view.list.splice(index, 1);
          }
        }

      }
    });
  }

  public save() {
    if (this.form.isValid()) {
      this.view.modal.saving = true;

      if (this.item._id) {
        // Updating
        this.service.update(this.item).then(
          // Success
          (item) => {
            this.swalService.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Se ha actualizado exitosamente',
              keydownListenerCapture: true,
              confirmButtonText: 'Continuar'
            });
            this.close();
            this.view.modal.saving = false;

            if(this.view.list){
              const index = this.view.list.findIndex(i => i._id === item._id);
              if(index > -1){
                this.view.list[index] = item;
              }
            }
          })
          .catch(
            // Error
            () => {
              this.swalService.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error inesperado',
                keydownListenerCapture: true,
                confirmButtonText: 'Continuar'
              });
              this.view.modal.saving = false;
            }
          );
      }
      else {
        // Creating
        this.service.create(this.item).then(
          // Success
          (item) => {
            this.swalService.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Se ha creado exitosamente',
              keydownListenerCapture: true,
              confirmButtonText: 'Continuar'
            })
            this.close();
            this.view.modal.saving = false;
            this.view.list?.push(item);

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
    this.item = {} as Full;
  }
}
