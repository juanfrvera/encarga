import { AfterContentInit, AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentInit {
  /** Flash Of Unstyled Content: usado para eliminar efecto feo de cargar la pagina sin estilos */
  private fouc: boolean;
  title = 'web';

  public get Fouc() {
    return this.fouc;
  }

  ngAfterContentInit(): void {
    this.fouc = true;
  }
}
