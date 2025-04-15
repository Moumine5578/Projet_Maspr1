import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

Chart.register(...registerables);

@Component({
  selector: 'app-tableau-de-bord',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './tableau-de-bord.component.html',
  styleUrls: ['./tableau-de-bord.component.css']
})
export class TableauDeBordComponent implements OnInit {

  // --- Données filtrables ---
  selectedPandemie: string = 'all';
  pandemiesDisponibles: string[] = ['Covid-19', 'Ebola', 'Mpox'];

  // --- Données simulées (à remplacer avec l’API après) ---
  stats = [
    { nom: 'Covid-19', annee: 2020, cas: 1000000, morts: 50000, taux: '5%' },
    { nom: 'Mpox', annee: 2022, cas: 50000, morts: 500, taux: '1%' },
    { nom: 'Ebola', annee: 2014, cas: 28000, morts: 11000, taux: '39%' }
  ];

  // --- Charts ---
  chartCourbe!: Chart;
  chartBarres!: Chart;

  // --- Leaflet map ---
  map!: L.Map;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initGraphCourbe();
    this.initGraphBarres();
    this.initMap();
  }

  // --- Filtres ---
  filtrerPandemie(type: string) {
    this.selectedPandemie = type;
    this.updateCharts();
    this.updateMap();
  }

  // --- Graphique en courbe ---
  initGraphCourbe() {
    const ctx = document.getElementById('chartCourbe') as HTMLCanvasElement;
    this.chartCourbe = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
        datasets: [
          {
            label: 'Covid-19',
            data: [800, 950, 600, 1200, 900, 700],
            borderColor: 'purple',
            fill: false
          },
          {
            label: 'Mpox',
            data: [200, 300, 250, 400, 370, 320],
            borderColor: 'green',
            fill: false
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }

  // --- Graphique en barres ---
  initGraphBarres() {
    const ctx = document.getElementById('chartBarres') as HTMLCanvasElement;
    this.chartBarres = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
        datasets: [
          {
            label: 'Covid-19',
            data: [800, 950, 600, 1200, 900, 700],
            backgroundColor: 'rgba(128, 0, 128, 0.6)'
          },
          {
            label: 'Mpox',
            data: [200, 300, 250, 400, 370, 320],
            backgroundColor: 'rgba(0, 128, 0, 0.6)'
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }

  updateCharts() {
    // (plus tard) ici tu vas filtrer les data selon la pandémie choisie
    // pour l'instant on garde les data fixes
    // tu pourras faire .filter(...) sur les stats
  }

  // --- Carte interactive ---
  initMap() {
    this.map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.updateMap();
  }

  updateMap() {
    // Exemple : ajouter cercles rouges selon la pandémie
    const zones = [
      { lat: 48.8566, lng: 2.3522, nombre: 5000 }, // Paris
      { lat: -1.2921, lng: 36.8219, nombre: 1500 }, // Nairobi
      { lat: 6.5244, lng: 3.3792, nombre: 8000 } // Lagos
    ];

    zones.forEach(zone => {
      const couleur = zone.nombre > 5000 ? 'red' : 'orange';
      const cercle = L.circle([zone.lat, zone.lng], {
        color: couleur,
        fillColor: couleur,
        fillOpacity: 0.5,
        radius: 50000
      });
      cercle.addTo(this.map);
    });
  }
}
