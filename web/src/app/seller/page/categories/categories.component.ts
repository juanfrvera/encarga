import { Component, OnInit } from '@angular/core';
import { CategoryFacade } from '../../feature/category/category.facade';
import { CategoryLite } from '../../data/category/category-lite.data';
import { SwalService } from '../../service/swal.service';
import Swal from 'sweetalert2';
import { LocaleService } from 'src/app/shared/service/locale.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoryComponent implements OnInit {
  public view: {
    categories?: CategoryUI[];
    editing?: boolean;
    currentCategory?: CategoryUI;
  } = {};

  constructor(
    public categoryFacade: CategoryFacade,
    private swalService: SwalService,
    private localeService: LocaleService
  ) { }

  ngOnInit(): void {
    this.categoryFacade.getList().then((list) => {
      this.view.categories = list.reverse();
    });
  }

  addCategoryClick() {
    if (this.view.categories) {
      this.view.currentCategory = undefined;
      const categoryEmpty = {
        editing: true,
        name: ''
      }
      this.view.categories.unshift(categoryEmpty as CategoryUI);
    }
  }

  editCategoryClick(cat: CategoryUI) {
    cat.editing = true;
    this.view.currentCategory = { ...cat };
    setTimeout(() => {
      const input = document.getElementById(`input-${cat._id}`);
      if (input) input.focus();
    });
  }

  removeCategoryClick(id: string) {
    this.swalService.fire({
      icon: 'warning',
      iconColor: '#fc453c',
      title: '¿Estás seguro?',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, eliminar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return this.categoryFacade.delete(id).then(() => { })
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
        if (this.view.categories) {
          const index = this.view.categories.findIndex(i => i._id === id);
          if (index > -1) this.view.categories.splice(index, 1);
        }
      }
    });
  }

  saveCategoryClick(cat: CategoryUI) {
    // Editing
    if (cat._id) {
      cat.saving = true;
      this.categoryFacade.update(cat._id, { name: cat.name }).then(() => {
        cat.saving = false;
        cat.editing = false;

        this.swalService.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Se ha actualizado exitosamente',
          keydownListenerCapture: true,
          confirmButtonText: 'Continuar'
        })
      })
        .catch((res: HttpErrorResponse) => {
          cat.saving = false;

          const text = this.localeService.getUserFriendlyError(res.error);
          this.swalService.fire({
            icon: 'error',
            title: 'Error',
            text,
            keydownListenerCapture: true,
            confirmButtonText: 'Continuar'
          })

        })
    }
    // Creating
    else {
      cat.saving = true;
      this.categoryFacade.create({ name: cat.name }).then((catResponse) => {
        cat.saving = false;
        cat.editing = false;
        cat._id = catResponse._id;

        this.swalService.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Se ha creado exitosamente',
          keydownListenerCapture: true,
          confirmButtonText: 'Continuar'
        })

      })
        .catch((res: HttpErrorResponse) => {
          cat.saving = false;

          const text = this.localeService.getUserFriendlyError(res.error);
          this.swalService.fire({
            icon: 'error',
            title: 'Error',
            text,
            keydownListenerCapture: true,
            confirmButtonText: 'Continuar'
          })
        })
    }
  }

  cancelEditedClick(cat: CategoryUI) {
    if (cat._id) {
      cat.name = this.view.currentCategory!.name;
      cat.editing = false;
    }
    if (!cat._id) {
      if (this.view.categories) {
        const index = this.view.categories.findIndex(c => c === cat);
        if (index > -1) this.view.categories.splice(index, 1);
      }
    }
  }

}

interface CategoryUI extends CategoryLite {
  editing?: boolean;
  saving?: boolean;
}
