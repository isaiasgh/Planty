import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Injectable, OnInit } from '@angular/core';
import { PlantClassifierService } from './plant-classifier.service';
import { PLANTAS } from '../elements/plants';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  plantas = PLANTAS;
  plantasData: any[] = [];

  constructor(private plantClassifier: PlantClassifierService,  private router: Router) { }
  async detectarPlantaFoto() {
    try {
      let image;
      if (this.isMobile()) {
        image = await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
        });
        console.log('Foto tomada desde móvil:', image.webPath);
        image = image.webPath as string;

      } else {
        image = await this.tomarFotoWeb();
        console.log('Foto tomada desde webcam:', image);
      }

      const categoria = await this.plantClassifier.predict(image);

      let categoriaIngles = '';
      let plantaId = 1824;
      if (categoria.toLowerCase() === 'girasol') {
        categoriaIngles = 'sunflower';
        plantaId = 3384;
      } else if (categoria.toLowerCase() === 'rosa') {
        categoriaIngles = 'rose';
        plantaId = 1530;
      } else if (categoria.toLowerCase() === 'tulipan') {
        categoriaIngles = 'tulip';
        plantaId = 2269;
      } else if (categoria.toLowerCase() === 'cactus') {
        categoriaIngles = 'cactus';
        plantaId = 8902;
      } else if (categoria.toLowerCase() === 'manzanilla') {
        categoriaIngles = 'chamomile';
        plantaId = 1824;
      } else if (categoria.toLowerCase() === 'orquideas') {
        categoriaIngles = 'orchid';
        plantaId = 1299;
      }
      const plantaEncontrada = await this.plantasData.find(
        (planta) => planta.id === plantaId
      );
      this.plantas.push({
        id: plantaEncontrada.id,
        nombre: plantaEncontrada.nombre,
        nombreCientifico: plantaEncontrada.nombreCientifico,
        imagen: image || '',
        categoria: plantaEncontrada.nombre,
        link: '',
        preguntasFrecuentes: [],
      });

      this.router.navigate(['/tabs/tab5', plantaId]); 
      return [image, categoria, categoriaIngles]
    }
    catch (error) {
      console.error('Error al tomar foto:', error);
    }
    return ""
  }

  eliminarPlanta(id: number) {
    const index = this.plantas.findIndex((planta) => planta.id === id);
    if (index !== -1) {
      this.plantas.splice(index, 1);
      console.log(`Planta con ID ${id} eliminada.`);
    } else {
      console.error('Error: No se pudo encontrar la planta para eliminar.');
    }
  }


  private isMobile(): boolean {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  private async tomarFotoWeb(): Promise<string> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          video.srcObject = stream;
          video.play();

          video.onloadedmetadata = () => {
            setTimeout(() => {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              context?.drawImage(video, 0, 0, canvas.width, canvas.height);
              const imageUrl = canvas.toDataURL('image/png');
              stream.getTracks().forEach(track => track.stop());
              resolve(imageUrl);
            }, 1000);
          };
        })
        .catch(error => reject('Error al acceder a la cámara web: ' + error));
    });
  }
}
