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
  @Input() title: string;

  @ViewChild(FormularioComponent) form: FormularioComponent;
  @ViewChild(ModalCrudComponent) modal: ModalCrudComponent;

  // Utilizado para obtener el template que irá dentro del formulario del modal y poblarlo con el item actual
  @ContentChild('formTemplate') formTemplate: TemplateRef<any>;
  @ContentChild('listTemplate') listTemplate: TemplateRef<any>;

  /** Item en modal */
  private item: Dto = {} as Dto;

  private model: {
    list: {
      value?: Array<LightDto>;
      empty: boolean;
      loaded: boolean;
    };
    modal: {
      loading: boolean;
      saving: boolean;
    }
  }

  public get Item() {
    return this.item;
  }

  public get Model() {
    return this.model;
  }

  public get Title() {
    return this.title;
  }


  constructor(
    private readonly swalService: SwalService
  ) { }

  ngOnInit(): void {
    this.model = {
      list: {
        empty: false,
        loaded: false,
      },
      modal: {
        loading: true,
        saving: false,
      }
    };

    this.service.getList$().subscribe(list => {
      if (list) {
        this.model.list.loaded = true;

        if (list.length) {
          this.model.list.value = list;
          this.model.list.empty = false;
        }
        else {
          this.model.list.empty = true;
        }
      }
    });
  }

  /** Muestra el modal en modo creacion */
  public add() {
    this.clearItem();
    this.openModal();
  }

  /** Muestra el modal en modo edicion */
  public clickItem(dto: LightDto) {
    this.model.modal.loading = true;

    this.openModal();

    // TODO: mostrar "cargando"
    this.service.get(dto.id).subscribe(item => {
      // Hacer una copia profunda para no modificar el original
      this.item = Util.deepCopy(item);

      this.model.modal.loading = false;
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
        return this.service.delete(this.item.id).toPromise().then(() => { })
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
      this.model.modal.saving = true;

      if (this.Item.id) {
        // Updating
        this.service.update(this.Item).subscribe(() => {
          this.close();
        }, () => { }, () => this.model.modal.saving = false);
      }
      else {
        // Creating
        this.service.create(this.Item).subscribe(() => {
          this.close();
        }, () => { }, () => this.model.modal.saving = false);
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
