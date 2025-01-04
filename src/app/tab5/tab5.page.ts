import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PLANTAS } from '../elements/plants';
import { Planta } from '../interface/interface.plants';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
  standalone: false,
})
export class Tab5Page implements OnInit {
  /*planta:{
    id: number;
    nombre: string;
    nombreCientifico: string;
    imagen: string;
    temperaturaIdeal: string;
    frecuenciaRiego: string;
    tipo: string;
    categoria: string;
    espacioMinimo: string;
    descripcion: string;
    link: string;
    fotos: string[];
  };*/
  planta: Planta;

  constructor(private route: ActivatedRoute) {
    this.planta = {
      id: 0,
      nombre: "",
      nombreCientifico: "",
      imagen: "",
      temperaturaIdeal: "",
      frecuenciaRiego: "",
      tipo: "",
      categoria: "",
      espacioMinimo: "",
      descripcion: "",
      link: "",
      fotos: [],
    }
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const numericId: number = +id;
      const foundPlant = PLANTAS.find(p => p.id === numericId);

      if (foundPlant) {
        this.planta = foundPlant;
      } else {
        console.error(`No se encontró una planta con el ID ${numericId}`);
      }

    }

  }
}
