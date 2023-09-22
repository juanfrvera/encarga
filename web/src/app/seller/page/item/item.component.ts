import { Component, OnInit, ViewChild } from '@angular/core';
import { Util } from 'src/app/util';
import { ItemFacade } from '../../feature/item/item.facade';
import { CategoryFacade } from '../../feature/category/category.facade';
import { ModalCrudComponent } from '../../component/modal-crud/modal-crud.component';
import { FormularioComponent } from 'src/app/shared/component/formulario/formulario.component';
import { CategoryLite } from '../../data/category/category-lite.data';
import { Item } from '../../data/item/item.data';
import { ItemLite } from '../../data/item/item-lite.data';
import { SwalService } from '../../service/swal.service';
import Swal from 'sweetalert2';
import { LocaleService } from 'src/app/shared/service/locale.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @ViewChild(ModalCrudComponent) modal: ModalCrudComponent;
  @ViewChild(FormularioComponent) form: FormularioComponent;

  public view: {
    categories?: CategoryLite[];
    items?: ItemLiteUI[];
    modal?: {
      editing?: boolean;
      saving?: boolean;
      disableSaveButton?: boolean;
      originalItem?: Item;
      item?: Item;
      error?: string;
    }
  } = {};

  constructor(
    private readonly categoryFacade: CategoryFacade,
    private readonly itemFacade: ItemFacade,
    private readonly swalService: SwalService,
    private readonly localeService: LocaleService
  ) { }

  ngOnInit(): void {
    this.categoryFacade.getList().then((list) => {
      this.view.categories = list;
      if (this.view.items && this.view.categories) {
        this.fillItemsWithCategories(this.view.items, this.view.categories);
      }
    });

    this.itemFacade.getList().then((list) => {
      this.view.items = list;
      if (this.view.items && this.view.categories) {
        this.fillItemsWithCategories(this.view.items, this.view.categories);
      }
    });
  }

  public productClick(item: ItemLiteUI) {
    this.view.modal = {
      editing: true,
    };
    this.modal.open();
    // Obtain full item
    this.itemFacade.get(item._id).then(item => {
      if (this.view.modal) {
        this.view.modal.originalItem = item;
        this.view.modal.item = { ...item };
      }
    })
      .catch((res: HttpErrorResponse) => {
        if (this.view.modal) {
          this.view.modal.error = this.localeService.getUserFriendlyError(res.error);
          this.view.modal.disableSaveButton = true;
        }
      })
  }

  public addProductClick() {
    this.view.modal = {
      item: {} as Item
    };
    this.modal.open();
  }

  public deleteProduct() {
    const item = this.view.modal!.item!;
    this.swalService.fire({
      icon: 'warning',
      iconColor: '#fc453c',
      title: '¿Estás seguro?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return this.itemFacade.delete(item._id).then(() => { })
          .catch(
            (res: HttpErrorResponse) => {
              const message = this.localeService.getUserFriendlyError(res.error);
              Swal.showValidationMessage('Error: ' + message);
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
        this.modal.close();

        if (this.view.items) {
          const index = this.view.items.findIndex(i => i._id === item._id);
          if (index > -1) this.view.items.splice(index, 1);
        }
      }
    });
  }

  public modalCloseClick() {
    this.modal.close();
  }

  public modalSaveClick() {
    if (this.form.isValid()) {
      if (this.view.modal) {
        this.view.modal.saving = true;
        if (this.view.modal.editing) {
          // Editing
          const originalItem = this.view.modal.originalItem!;
          const currentItem = this.view.modal.item!;

          const editedItem = Util.getObjectWithChangedFields(originalItem, currentItem);
          this.itemFacade.update(originalItem._id, editedItem).then((item) => {
            if (this.view.modal) {
              this.view.modal.saving = false;
              this.view.modal.editing = false;
            }

            this.swalService.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Se ha actualizado exitosamente',
              keydownListenerCapture: true,
              confirmButtonText: 'Continuar'
            })

            this.modal.close();
            if (this.view.items) {
              const index = this.view.items.findIndex(i => i._id === item._id);
              if (index > -1) this.view.items[index] = this.itemToItemUI(item, this.view.categories);
            }
          })
            .catch((res: HttpErrorResponse) => {
              if (this.view.modal) this.view.modal.saving = false;

              const text = this.localeService.getUserFriendlyError(res.error);
              this.swalService.fire({
                icon: 'error',
                title: 'Error',
                text,
                keydownListenerCapture: true,
                confirmButtonText: 'Continuar'
              })

              this.modal.close();
            })
        }
        else {
          // Creating
          const item = this.view.modal.item!;
          this.itemFacade.create(item).then((item) => {
            if (this.view.modal) this.view.modal.saving = false;

            this.swalService.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Se ha creado exitosamente',
              keydownListenerCapture: true,
              confirmButtonText: 'Continuar'
            })

            this.modal.close();
            if (this.view.items) this.view.items.push(this.itemToItemUI(item, this.view.categories));
          })
            .catch((res: HttpErrorResponse) => {
              if (this.view.modal) this.view.modal.saving = false;

              const text = this.localeService.getUserFriendlyError(res.error);
              this.swalService.fire({
                icon: 'error',
                title: 'Error',
                text,
                keydownListenerCapture: true,
                confirmButtonText: 'Continuar'
              })

              this.modal.close();
            })
        }
      }
    }
    else {
      this.form.showFeedback();
    }
  }

  /**
     * Fill items with their categories names
     * @param items List of items
     * @param categories List of categories
     */
  private fillItemsWithCategories(items: ItemLiteUI[], categories: CategoryLite[]) {
    items.forEach(i => {
      if (i.categoryIdList) {
        i.categoryNameList = categories.filter(c => i.categoryIdList.includes(c._id)).map(c => c.name);
      }
    })
  }
  private itemToItemUI(item: ItemLite, categories?: CategoryLite[]): ItemLiteUI {
    let categoryNameList;
    if (!categories) return { ...item };

    if (item.categoryIdList) {
      categoryNameList = categories.filter(c => item.categoryIdList.includes(c._id)).map(c => c.name);
    }
    return { ...item, categoryNameList }
  }

}

interface ItemLiteUI extends ItemLite {
  categoryNameList?: string[];
}