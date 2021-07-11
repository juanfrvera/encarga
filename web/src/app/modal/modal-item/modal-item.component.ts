import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.scss'],
})
export class ModalItemComponent implements OnInit {
  // Data passed in by componentProps
  @Input() item;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  public close() {
    this.modalCtrl.dismiss();
  }

}
