import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ItemService } from 'src/app/service/item.service';
import { Item } from '../../data/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  @Input() editando: boolean;
  public form: FormGroup;

  constructor(
    private modalController: ModalController,
    private itemService: ItemService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      titulo: new FormControl(this.item?.titulo, Validators.required),
      precio: new FormControl(this.item?.precio, [Validators.required, Validators.min(0)]),
      descripcion: new FormControl(this.item?.descripcion)
    });

    if (!this.item) {
      this.editando = false;
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar',
      message: 'Esta seguro que quiere eliminar este item?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'light',
          handler: () => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.itemService.delete(this.item);
            console.log('eliminado');
            this.cerrar();
          }
        }
      ]
    });

    await alert.present();
  }

  public submit() {
    if (this.form.valid) {
      if (!this.editando) {
        let nuevoId: number;
        // Obtiene los items
        const items = this.itemService.Items;
        // Si es vacio el nuevo item tendra id 1
        if (!items.length) {
          nuevoId = 1;
        }
        // Si hay items, se fija en el id del ultimo item y le suma 1
        else {
          const ultimoId = parseInt(items[items.length - 1].id);
          nuevoId = ultimoId + 1;
        }
        // Guarda los valores del formulario
        const itemForm = this.form.value;
        // Genera el nuevo item a guardar
        const nuevoItem = { id: nuevoId.toString(), titulo: itemForm.titulo, precio: itemForm.precio, descripcion: itemForm.descripcion };
        // Lo guarda en el local storage
        this.itemService.create(nuevoItem);
        console.log('ok');
        this.cerrar();
      }
      else {
        console.log('edicion');
        const itemForm = this.form.value;
        // Arma el item editado
        const itemEditado = { id: this.item.id, titulo: itemForm.titulo, precio: itemForm.precio, descripcion: itemForm.descripcion }
        //Se actualiza el item editado
        this.itemService.edit(itemEditado);
        console.log('ok');
        this.cerrar();
      }

    }
    else {
      console.log('invalid');
    }
  }

  private cerrar() {
    this.modalController.dismiss();
  }

  public cancelar() {
    this.cerrar();
  }


  public clickEliminarItem() {
    this.presentAlertConfirm();
  }



}
