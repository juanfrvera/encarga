import { Component, ContentChild, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Util } from 'src/app/util';
import Swal from 'sweetalert2';
import { SwalService } from '../../service/swal.service';
import { FormularioComponent } from '../../../shared/component/formulario/formulario.component';
import { ICrudService } from '../../service/interface/crud.service.interface';
import { ModalComponent } from '../modal/modal.component';
import { Ideable } from '../../data/ideable.interface';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent<Dto extends Ideable, LightDto extends Ideable> implements OnInit {
  @Input() service: ICrudService;
  @Input() title: string;

  @ViewChild(FormularioComponent) form: FormularioComponent;
  @ViewChild(ModalComponent) modal: ModalComponent;

  // Utilizado para obtener el template que irá dentro del formulario del modal y poblarlo con el item actual
  @ContentChild('formTemplate') formTemplate: TemplateRef<any>;
  @ContentChild('listTemplate') listTemplate: TemplateRef<any>;

  /** Item en modal */
  private item: Dto = {} as Dto;
  private list: Observable<LightDto[]>;

  public get Item() {
    return this.item;
  }

  public get List() {
    return this.list;
  }

  public get Title() {
    return this.title;
  }


  constructor(
    private readonly swalService: SwalService
  ) { }

  ngOnInit(): void {
    this.list = this.service.getList();
  }

  /** Muestra el modal en modo creacion */
  public add() {
    this.clearItem();
    this.open();
  }

  public cancel() {
    this.close();
  }

  /** Muestra el modal en modo edicion */
  public update(dto: LightDto) {
    // TODO: mostrar "cargando"
    this.service.get(dto.id).subscribe(item => {
      // Hacer una copia profunda para no modificar el original
      this.item = Util.deepCopy(item);
      this.open();
    });
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
        this.close();
      }
    });
  }

  /** Guarda lo que se ha hecho en el modal */
  public save() {
    if (this.form.isValid()) {
      if (this.Item.id) {
        // Editando
        this.service.update(this.Item).subscribe(itemServer => {
          console.log("Item editado");
        })
      }
      else {
        // Creando
        this.service.create(this.Item).subscribe(itemCreado => {
          console.log("Creado");
        });
      }

      this.close();
    }
    else {
      this.form.showFeedback();
    }
  }

  private open() {
    this.form.hideFeedback();
    this.modal.open();
  }

  private close() {
    this.modal.close();
  }

  private clearItem() {
    this.item = {} as Dto;
  }

}
