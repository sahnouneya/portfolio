import { RenderMode, ServerRoute } from '@angular/ssr';

// Chaque page est prérendue en HTML au build : le site reste un site statique servi par Render.
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
