import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AProposComponent } from './pages/a-propos/a-propos.component';
import { TableauDeBordComponent } from './pages/tableau-de-bord/tableau-de-bord.component';


export const routes: Routes = [
  { path: '', component: HomeComponent }, // Route par défaut = page d'accueil
  { path: 'a-propos', component: AProposComponent},
  { path:'tableau-de-bord', component: TableauDeBordComponent},
  { path: '**', redirectTo: ''}// Redirige les URLs inconnues
    
];

