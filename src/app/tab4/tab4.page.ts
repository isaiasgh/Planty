import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PLANTAS } from '../elements/plants';
import { PlantClassifierService } from '../services/plant-classifier.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: false,
})
export class Tab4Page implements OnInit {
  plantas = PLANTAS;
  plantasData: any[] = [];

  constructor(private router: Router, private plantClassifier: PlantClassifierService) { }

  async ngOnInit() {
    try {
      const response = await fetch('../../assets/data/plants.json');
      this.plantasData = await response.json();
    } catch (error) {
      console.error('Error al cargar el archivo JSON:', error);
    }
  }

  verDetalle(id: number) {
    this.router.navigate(['/tab5', id]).catch(error => {
      console.error('Error al navegar:', error);
    });
  }

  async tomarFoto() {
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

      const plantaEncontrada = await this.plantasData.find(
        (planta) => planta.nombre.toLowerCase() === categoria.toLowerCase()
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
          categoria: categoria,  // Mantiene la categoría detectada
          link: '',
          preguntasFrecuentes: [],
        });
        /*this.plantas.push({
          id: this.plantas.length + 1,
          nombre: categoria,
          nombreCientifico: 'Nombre científico no disponible',
          imagen: image || '',
          categoria: categoria,
          link: '',
          preguntasFrecuentes: [],
        });*/
      }
    } catch (error) {
      console.error('Error al tomar foto:', error);
    }
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
