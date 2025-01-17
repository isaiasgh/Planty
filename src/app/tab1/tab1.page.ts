import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PLANTAS } from '../elements/plants';
import { PlantClassifierService } from '../services/plant-classifier.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  constructor(public navCtrl: NavController, public photoService: PhotoService) { }
  async ngOnInit() {
    try {
      const response = await fetch('../../assets/data/plants.json');
      this.photoService.plantasData = await response.json();
    } catch (error) {
      console.error('Error al cargar el archivo JSON:', error);
    }
  }
  catalogueRedirect(): void {
    this.navCtrl.navigateForward('tab2')
  }
  myPlantsRedirect(): void {
    this.navCtrl.navigateForward('tab4')
  }
  creditsRedirect(): void {
    this.navCtrl.navigateForward('tab3')
  }

  async tomarFoto() {
    await this.photoService.detectarPlantaFoto()
  }


}
