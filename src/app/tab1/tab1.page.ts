import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor(public navCtrl : NavController) {}
  catalogueRedirect(): void {
    this.navCtrl.navigateForward('tab2')
  }
  myPlantsRedirect(): void {
    this.navCtrl.navigateForward('tab4')
  }
  creditsRedirect(): void {
    this.navCtrl.navigateForward('tab3')
  }
}
