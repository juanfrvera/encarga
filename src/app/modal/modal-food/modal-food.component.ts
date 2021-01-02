import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-food',
  templateUrl: './modal-food.component.html',
  styleUrls: ['./modal-food.component.scss'],
})
export class ModalFoodComponent implements OnInit {
  // Data passed in by componentProps
  @Input() food;

  constructor() { }

  ngOnInit() {
  }

}
