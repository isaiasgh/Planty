import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { PlantService } from '../services/plant.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})

export class Tab2Page implements OnInit {
  plantas: any[] = [];

  page: number = 1;
  totalPages: number = 0;
  loading: boolean = false;

  constructor(private router: Router, private plantService: PlantService) { }

  ngOnInit() {
    this.loadPlants(); 
  }

  loadPlants() {
    if (this.loading) return;
    this.loading = true;

    this.plantService.getAllPlants(this.page).subscribe(
      (response) => {
        if (response?.data) {
          this.plantas = [...this.plantas, ...response.data.map((planta: any) => ({
            id: planta.id,
            nombre: planta.common_name || 'Nombre no disponible',
            nombreCientifico: planta.scientific_name?.[0] || 'Nombre científico no disponible',
            imagen: planta.default_image?.thumbnail || 'assets/placeholder.png',
          }))];
          this.page++;
          this.totalPages = response?.last_page;
          //this.savePlantsToFile(this.plantas);
        }
      },
      (error) => {
        console.error('Error al cargar plantas:', error);
      },
      () => {
        this.loading = false;
      }
    );
  }

  savePlantsToFile(data: any) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plants.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  loadData(event: any) {
    if (this.page <= this.totalPages) {
      this.loadPlants();
    }
    event.target.complete();
  }

  redirectDetail(id: number) {
    this.router.navigate(['tabs/tab5', id]).catch(error => {
      console.error('Error al navegar:', error);
    });

  }
}