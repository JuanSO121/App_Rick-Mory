import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Tab5Page } from './tab5.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: Tab5Page }]), // Rutas del tab5
  ],
  declarations: [Tab5Page], // ✅ Declarar el componente
})
export class Tab5PageModule {}
