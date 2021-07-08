import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Item } from '../../data/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  public form: FormGroup;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    this.form = new FormGroup({
      titulo: new FormControl(this.item?.titulo, Validators.required),
      precio: new FormControl(this.item?.precio, [Validators.required, Validators.min(0)]),
      descripcion: new FormControl(this.item?.descripcion)
    });
  }

  public cancelar() {
    this.cerrar();
  }

  public submit() {
    if (this.form.valid) {
      console.log("ok");
      this.cerrar();
    }
    else {
      console.log("invalid");
    }
  }

  private cerrar() {
    this.modalController.dismiss();
  }

}
