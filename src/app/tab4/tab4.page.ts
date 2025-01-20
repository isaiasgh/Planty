import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PLANTAS } from '../elements/plants';
import { PlantClassifierService } from '../services/plant-classifier.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: false,
})
export class Tab4Page implements OnInit {


  constructor(private router: Router, public photoService: PhotoService) { }

  async ngOnInit() {
    try {
      const response = await fetch('../../assets/data/plants.json');
      this.photoService.plantasData = await response.json();
    } catch (error) {
      console.error('Error al cargar el archivo JSON:', error);
    }
  }
  goToPlantDetail(id: number) {
    this.router.navigate(['/tabs/tab5', id]);  // Redirige a la página de detalles de la planta
  }
  verDetalle(id: number) {
    this.router.navigate(['/tab5', id]).catch(error => {
      console.error('Error al navegar:', error);
    });
  }

  async tomarFoto() {
    await this.photoService.detectarPlantaFoto();
  }

  eliminarPlanta(event: Event, id: number) {
    event.stopPropagation();  
    this.photoService.eliminarPlanta(id)
  }

}
