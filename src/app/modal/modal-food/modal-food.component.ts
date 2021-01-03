import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-food',
  templateUrl: './modal-food.component.html',
  styleUrls: ['./modal-food.component.scss'],
})
export class ModalFoodComponent implements OnInit {
  // Data passed in by componentProps
  @Input() food;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  public close() {
    this.modalCtrl.dismiss();
  }

}
