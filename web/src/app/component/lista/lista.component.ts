import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent<T> {
  @Input() items: T[];
  @Output() itemClick = new EventEmitter<T>();
  // Utilizado para poder enviar los items del ngFor hacia afuera
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  constructor() { }

  public click(item: T) {
    this.itemClick.emit(item);
  }
}
