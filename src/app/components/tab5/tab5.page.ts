import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
  standalone: false,
})
export class Tab5Page {
  photo: string | null = null;

  constructor() {}

  async checkPermissions() {
    const permission = await Camera.requestPermissions(); // 🔹 Pedir permisos antes
    return permission.camera === 'granted';
  }

  async takePhoto() {
    const hasPermission = await this.checkPermissions();
    if (!hasPermission) {
      alert('Se necesitan permisos para usar la cámara.');
      return;
    }

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera, // 📸 Tomar foto con la cámara
    });

    this.photo = `data:image/jpeg;base64,${image.base64String}`;
  }

  async pickFromGallery() {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos, // 🖼 Seleccionar foto desde la galería
    });

    this.photo = `data:image/jpeg;base64,${image.base64String}`;
  }
}
