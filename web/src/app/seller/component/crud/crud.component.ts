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
export class CrudComponent<Dto extends Idable, Lite extends Idable> implements OnInit {
  @Input() service: ICrudable;
  @Input() public title: string;

  @ViewChild(FormularioComponent) form: FormularioComponent;
  @ViewChild(ModalCrudComponent) modal: ModalCrudComponent;

  // Used to get the template that will go inside the modal's form and populate it with the current item
  @ContentChild('formTemplate') formTemplate: TemplateRef<any>;
  @ContentChild('listTemplate') listTemplate: TemplateRef<any>;

  /** Item inside modal */
  public item: Dto = {} as Dto;

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

    this.service.get(dto.id).then(item => {
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
      title: 'Are you sure?',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Yes, delete',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return this.service.delete(this.item.id).then(() => { })
          .catch(
            () => {
              Swal.showValidationMessage('An error occurred when trying to delete');
            }
          );
      },
      // So when Escape key is pressed, the modal isn't closed
      keydownListenerCapture: true
    }).then(result => {
      // If deleted without errors
      if (result.isConfirmed) {
        this.close();
      }
    });
  }

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
