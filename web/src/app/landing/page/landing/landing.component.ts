import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  @ViewChild('inicio') homeSection!: ElementRef<HTMLElement>;
  @ViewChild('caracteristicas') caracteristicasSection!: ElementRef<HTMLElement>;
  @ViewChild('nosotros') nosotrosSection!: ElementRef<HTMLElement>;
  @ViewChild('contacto') contactoSection!: ElementRef<HTMLElement>;

  activeSection: string = 'inicio';

  constructor() { }

  ngOnInit(): void {
    //Get the button
    let mybutton = document.getElementById("btn-back-to-top");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function () {
      scrollFunction();
    };

    function scrollFunction() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        if (mybutton != null)
          mybutton.style.display = "block";
      } else {
        if (mybutton != null)
          mybutton.style.display = "none";
      }
    }
    // When the user clicks on the button, scroll to the top of the document
    if (mybutton != null)
      mybutton.addEventListener("click", backToTop);

    function backToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }

  }

  
  // add animation to dot at navbar
  startHoverAnimation(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const dot = target.querySelector('.dot');
    if (dot) {
      dot.classList.add('hover');
    }
  }

  // remove animation to dot at navbar
  stopHoverAnimation(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    const dot = target.querySelector('.dot');
    if (dot) {
      dot.classList.remove('hover');
    }
  }

  // Go to section smoothly
  scrollToSection(tag: string) {
    let section = document.getElementById(tag);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Scrolling detect for dot animation in navbar
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (this.homeSection && scrollPos >= this.homeSection.nativeElement.offsetTop && scrollPos < this.homeSection.nativeElement.offsetTop + this.homeSection.nativeElement.offsetHeight - 200) {
      this.activeSection = 'inicio';
    }
    else if (this.caracteristicasSection && scrollPos >= (this.caracteristicasSection.nativeElement.offsetTop - 200) && scrollPos < this.caracteristicasSection.nativeElement.offsetTop + this.caracteristicasSection.nativeElement.offsetHeight - 200) {
      this.activeSection = 'caracteristicas';
    }
    else if (this.nosotrosSection && scrollPos >= this.nosotrosSection.nativeElement.offsetTop - 200 && scrollPos < this.nosotrosSection.nativeElement.offsetTop + this.nosotrosSection.nativeElement.offsetHeight - 800) {
      this.activeSection = 'nosotros';
    }
    else if (this.contactoSection && scrollPos >= this.contactoSection.nativeElement.offsetTop - 1500) {
      this.activeSection = 'contacto';
    }
    else {
      this.activeSection = '';
    }
  }




}




