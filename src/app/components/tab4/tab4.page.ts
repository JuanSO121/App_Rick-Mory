import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: false,
})
export class Tab4Page implements OnInit, AfterViewInit, OnDestroy {
  private map!: L.Map;
  private marker!: L.Marker;

  constructor() {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
    this.loadMap();
  }

  async loadMap() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      const lat = coordinates.coords.latitude;
      const lng = coordinates.coords.longitude;

      // Eliminar el mapa anterior si existe
      if (this.map) {
        this.map.remove();
      }

      // Esperar un pequeño tiempo para asegurarse de que el contenedor existe
      setTimeout(() => {
        const mapElement = document.getElementById('map');
        if (!mapElement) {
          console.error('⚠ No se encontró el div con id "map".');
          return;
        }

        // Inicializar el mapa
        this.map = L.map(mapElement, {
          center: [lat, lng],
          zoom: 15,
          preferCanvas: true,
        });

        // Añadir capa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          detectRetina: true,
        }).addTo(this.map);

        // Agregar marcador en la ubicación actual
        this.marker = L.marker([lat, lng])
          .addTo(this.map)
          .bindPopup('📍 Ubicación actual')
          .openPopup();

        // Ajustar tamaño del mapa después de la carga
        setTimeout(() => {
          this.map.invalidateSize();
        }, 500);
      }, 300);
    } catch (error) {
      console.error('❌ Error obteniendo la ubicación', error);
      alert('⚠ No se pudo obtener la ubicación. Verifica los permisos.');
    }
  }

  getCurrentLocation() {
    this.loadMap();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove(); // 🔹 Limpia el mapa al salir del componente
    }
  }
}
