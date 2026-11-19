import { Routes } from '@angular/router';

const suffix = ' — Eya Sahnoun';

export const routes: Routes = [
  {
    path: '',
    title: 'Eya Sahnoun — Développeuse Full-Stack Web & Mobile',
    loadComponent: () => import('./pages/home').then((m) => m.Home),
  },
  {
    path: 'projets',
    title: 'Projets' + suffix,
    loadComponent: () => import('./pages/projects').then((m) => m.Projects),
  },
  {
    path: 'experience',
    title: 'Expérience' + suffix,
    loadComponent: () => import('./pages/experience').then((m) => m.Experience),
  },
  {
    path: 'competences',
    title: 'Compétences' + suffix,
    loadComponent: () => import('./pages/skills').then((m) => m.Skills),
  },
  {
    path: 'parcours',
    title: 'Parcours' + suffix,
    loadComponent: () => import('./pages/journey').then((m) => m.Journey),
  },
  {
    path: 'contact',
    title: 'Contact' + suffix,
    loadComponent: () => import('./pages/contact').then((m) => m.Contact),
  },
  { path: '**', redirectTo: '' },
];
