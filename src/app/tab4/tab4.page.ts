import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { PLANTAS } from '../elements/plants';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: false,
})
export class Tab4Page implements OnInit {
  plantas = PLANTAS;

  constructor(private router: Router) { }

  ngOnInit() { }

  verDetalle(id: number) {
    this.router.navigate(['/tab5', id]).catch(error => {
      console.error('Error al navegar:', error);
    });
  }

  async tomarFoto() {
    console.log('Función para tomar foto no implementada.');
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
      /*const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      });

      console.log('Foto tomada:', image.webPath);*/

      this.plantas.push({
        id: this.plantas.length + 1,
        nombre: 'Nueva Planta',
        nombreCientifico: 'Nombre científico',
        imagen: image || '',
        categoria: 'Desconocida',
        link: '',
        preguntasFrecuentes: [],
      });
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

          // Esperamos que el video cargue
          video.onloadedmetadata = () => {
            // Hacemos la captura de la imagen
            setTimeout(() => {
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              context?.drawImage(video, 0, 0, canvas.width, canvas.height);
              const imageUrl = canvas.toDataURL('image/png');  // URL de la imagen tomada
              stream.getTracks().forEach(track => track.stop()); // Detenemos el flujo de la cámara
              resolve(imageUrl);  // Devolvemos la imagen como base64
            }, 1000);
          };
        })
        .catch(error => reject('Error al acceder a la cámara web: ' + error));
    });
  }

}
