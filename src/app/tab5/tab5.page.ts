import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Planta } from '../interface/interface.plants';

import { PlantService } from '../services/plant.service';
import { FAQ } from '../interface/interface.faq'; 

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss'],
  standalone: false,
})

export class Tab5Page implements OnInit {
  planta: Planta;
  faqs: FAQ[] = [];

  constructor(private route: ActivatedRoute, private apiService: PlantService) {
    this.planta = {
      id: 0,
      nombre: '',
      nombreCientifico: '',
      imagen: '',
      categoria: '',
      link: '',
      preguntasFrecuentes: [],
    };
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const numericId: number = +id;
      this.apiService.getPlantDetails(numericId).subscribe((data) => {
        this.planta.nombre = data.common_name;
        this.planta.nombreCientifico = data.scientific_name.join(', ');
        this.planta.imagen = data.default_image.regular_url;
        this.planta.categoria = data.type;
        this.planta.link = `https://perenual.com/species/${data.id}`;
        
        this.apiService.getFAQs(numericId).subscribe((faqs) => {
          this.faqs = faqs.data;
        });
      });
    }
  }
}
