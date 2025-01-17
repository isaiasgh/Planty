import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Injectable, OnInit } from '@angular/core';
import { PlantClassifierService } from './plant-classifier.service';
import { PLANTAS } from '../elements/plants';

@Injectable({
  providedIn: 'root'
})
export class PhotoService  {
  plantas = PLANTAS;
  plantasData: any[] = [];

  constructor(private plantClassifier: PlantClassifierService) { }
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

      if (categoria.toLowerCase() === 'girasol') {
        categoriaIngles = 'sunflower';
      } else if (categoria.toLowerCase() === 'rosa') {
        categoriaIngles = 'rose';
      } else if (categoria.toLowerCase() === 'tulipan') {
        categoriaIngles = 'tulip';
      } else if (categoria.toLowerCase() === 'cactus') {
        categoriaIngles = 'cactus';
      } else if (categoria.toLowerCase() === 'manzanilla') {
        categoriaIngles = 'chamomile';
      } else if (categoria.toLowerCase() === 'orquideas') {
        categoriaIngles = 'orchid';
      } else {
        categoriaIngles = categoria.toLowerCase();
      }
      console.log("THIS IS PLANTAS DATA", this.plantasData)
      const plantaEncontrada = await this.plantasData.find(
        (planta) => planta.nombre.toLowerCase() === categoriaIngles.toLowerCase()
      );

      if (plantaEncontrada) {
        this.plantas.push({
          id: plantaEncontrada.id,
          nombre: plantaEncontrada.nombre,
          nombreCientifico: plantaEncontrada.nombreCientifico,
          imagen: image || '',
          categoria: plantaEncontrada.nombre,
          link: '',
          preguntasFrecuentes: [],
        });
      } else {
        
        const plantaAleatoria = this.plantasData[Math.floor(Math.random() * this.plantasData.length)];

        this.plantas.push({
          id: plantaAleatoria.id,
          nombre: plantaAleatoria.nombre,
          nombreCientifico: plantaAleatoria.nombreCientifico,
          imagen: image || '',
          categoria: categoria,
          link: '',
          preguntasFrecuentes: [],
        });

      }

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
