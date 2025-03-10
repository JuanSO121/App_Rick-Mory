import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import { PersonajeModalComponent } from "../personaje-modal/personaje-modal.component";
import { EpisodesComponent } from "../episodes/episodes.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    PersonajeModalComponent,
    EpisodesComponent
],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
