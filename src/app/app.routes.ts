import { Routes } from '@angular/router';

const prefix = 'Eya Sahnoun · ';

export const routes: Routes = [
  {
    path: '',
    title: prefix + 'Web, Mobile, IA & DevOps',
    loadComponent: () => import('./pages/home').then((m) => m.Home),
  },
  {
    path: 'projets',
    title: prefix + 'Projets',
    loadComponent: () => import('./pages/projects').then((m) => m.Projects),
  },
  {
    path: 'experience',
    title: prefix + 'Expérience',
    loadComponent: () => import('./pages/experience').then((m) => m.Experience),
  },
  {
    path: 'competences',
    title: prefix + 'Compétences',
    loadComponent: () => import('./pages/skills').then((m) => m.Skills),
  },
  {
    path: 'parcours',
    title: prefix + 'Parcours',
    loadComponent: () => import('./pages/journey').then((m) => m.Journey),
  },
  {
    path: 'contact',
    title: prefix + 'Contact',
    loadComponent: () => import('./pages/contact').then((m) => m.Contact),
  },
  { path: '**', redirectTo: '' },
];
