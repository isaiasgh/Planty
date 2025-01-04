import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  tomarFoto() {
    console.log('Función para tomar foto no implementada.');
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
