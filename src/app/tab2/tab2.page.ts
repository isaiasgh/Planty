import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { PLANTAS } from '../elements/plants';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {
  plantas = PLANTAS;

  ngOnInit() { }

  constructor(private router: Router) { }

  redirectDetail(id: number) {
    this.router.navigate(['tabs/tab5', id]).catch(error => {
      console.error('Error al navegar:', error);
    });

  }

}
