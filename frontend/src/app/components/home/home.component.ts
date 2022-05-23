import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('visuals', { static: true }) visuals!: ElementRef<HTMLDivElement>;

  @ViewChild('imgUno', { static: true }) imgUno!: ElementRef<HTMLDivElement>;

  @ViewChild('btnConsultar', { static: true }) btnConsultar!: ElementRef<HTMLDivElement>;

  constructor(@Inject(DOCUMENT) private document: Document, private router: Router) { }

  ngOnInit(): void {
    this.initScrollAnumations();
  }

  initScrollAnumations(): void {

    //imagen 1

    if (screen.width > 1024) {
      gsap.to(this.imgUno.nativeElement, {//movimiento de las escaleras
        scrollTrigger: {
          trigger: this.imgUno.nativeElement,
          scrub: true,
          markers: false,
          start: '1% top',
          end: '70% top',
        } as gsap.plugins.ScrollTriggerInstanceVars,
        duration: 1.1,
        scale: 0.5,
      });



      gsap.to(this.document.querySelector('.piano'), { //Piano del titulo
        scrollTrigger: {
          trigger: this.document.querySelector('.piano'),
          scrub: true,
          markers: false,
          start: 'top top',
          end: '100% top',
        },
        duration: 1.1,
        x: -400,
      });
      gsap.to(this.document.querySelector('.hover'), { //Hover del titulo
        scrollTrigger: {
          trigger: this.document.querySelector('.hover'),
          scrub: true,
          markers: false,
          start: 'top top',
          end: '100% top',
        },
        duration: 1.1,
        x: 400,
      });

      gsap.to(this.document.querySelector('.subtitulo'), { //Subtitulo
        scrollTrigger: {
          trigger: this.document.querySelector('.subtitulo'),
          scrub: true,
          markers: false,
          start: '-430% top',
          end: '100% top',
        },
        duration: 1.1,
        y: -400,
      });

      //Imagen 2

      gsap.to(this.document.querySelector('.conciertos'), { //titulo
        scrollTrigger: {
          trigger: this.document.querySelector('.conciertos'),
          scrub: true,
          markers: false,
          start: '-1400% top',
          end: '0% center',
        },
        duration: 1.1,
        y: 150,
        x: 600,
        opacity: 1,
      });
      gsap.to(this.document.querySelector('.sub-conciertos'), { //Subtitulo
        scrollTrigger: {
          trigger: this.document.querySelector('.sub-conciertos'),
          scrub: true,
          markers: false,
          start: '-400% top',
          end: '150% center',
        },
        duration: 1.1,
        y: 250,
        x: 610,
        opacity: 1,
      });
      gsap.to(this.btnConsultar.nativeElement, {//Boton
        scrollTrigger: {
          trigger: this.btnConsultar.nativeElement,
          scrub: true,
          markers: false,
          start: '-1000% center',
          end: '-100% center',
        } as gsap.plugins.ScrollTriggerInstanceVars,
        duration: 1.1,
        scale: 1.5,
        opacity: 1,
      });

      //Imagen 3

      gsap.to(this.document.querySelector('.espacio'), { //titulo
        scrollTrigger: {
          trigger: this.document.querySelector('.espacio'),
          scrub: true,
          markers: false,
          start: '150 bottom',
          end: '300 center',
        },
        duration: 1.1,
        y: "30vh",
        x: "-35vw",
        opacity: 1,
      });
      gsap.to(this.document.querySelector('.sub-espacio'), { //Subtitulo
        scrollTrigger: {
          trigger: this.document.querySelector('.sub-espacio'),
          scrub: true,
          markers: false,
          start: '100 center',
          end: '370 center',
        },
        duration: 1.1,
        y: "20vh",
        x: "-35vw",
        opacity: 1,
      });
      gsap.to(this.document.querySelector('.imgcuatroTxt'), { //Subtitulo
        scrollTrigger: {
          trigger: this.document.querySelector('.imgcuatroTxt'),
          scrub: true,
          markers: false,
          start: '-200 center',
          end: '200 center',
        },
        duration: 1.1,
        opacity: 1,
      });
    }
  }


}
