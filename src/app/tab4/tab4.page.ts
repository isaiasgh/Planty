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
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera, // Usa la cámara directamente
      });

      console.log('Foto tomada:', image.webPath);

      this.plantas.push({
        id: this.plantas.length + 1,
        nombre: 'Nueva Planta',
        nombreCientifico: 'Nombre científico',
        imagen: image.webPath || '',
        temperaturaIdeal: 'Desconocida',
        frecuenciaRiego: 'Desconocida',
        tipo: 'Desconocido',
        categoria: 'Desconocida',
        espacioMinimo: 'Desconocido',
        descripcion: 'Nueva descripción de planta',
        link: '',
        fotos: [image.webPath || ''],
      });
    } catch (error) {
      console.error('Error al tomar foto:', error);
    }
  }

  eliminarPlanta(id: number) {
    const index = this.plantas.findIndex((planta) => planta.id === id);
    if (index !== -1) {
      this.plantas.splice(index, 1); // Elimina la planta del arreglo
      console.log(`Planta con ID ${id} eliminada.`);
    } else {
      console.error('Error: No se pudo encontrar la planta para eliminar.');
    }
  }

}
