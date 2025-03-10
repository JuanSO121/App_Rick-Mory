import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { PersonajeModalComponent } from '../personaje-modal/personaje-modal.component';

import { Tab3PageRoutingModule } from './tab3-routing.module';
import { EpisodesComponent } from "../episodes/episodes.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab3PageRoutingModule,
    PersonajeModalComponent,
    EpisodesComponent
],
  exports: [PersonajeModalComponent],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
