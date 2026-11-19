import { DOCUMENT } from '@angular/common';
import { Component, afterNextRender, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import { contact } from './data/profile';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <a class="skip-link" href="#contenu">Aller au contenu</a>
    <header class="site-header">
      <div class="container header-row">
        <a class="brand" routerLink="/" aria-label="Accueil">
          <span class="brand-mark" aria-hidden="true">ES</span>
          <span>Eya Sahnoun</span>
        </a>

        <nav class="nav" [class.is-open]="menuOpen()" id="menu" aria-label="Navigation principale">
          @for (link of links; track link.path) {
            <a
              [routerLink]="link.path"
              routerLinkActive="is-active"
              [routerLinkActiveOptions]="{ exact: link.path === '/' }"
              ariaCurrentWhenActive="page"
              >{{ link.label }}</a
            >
          }
        </nav>

        <div class="header-actions">
          <button
            class="icon-btn"
            type="button"
            (click)="toggleTheme()"
            [attr.aria-label]="dark() ? 'Passer au thème clair' : 'Passer au thème sombre'"
          >
            @if (dark()) {
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" /></svg>
            } @else {
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" /></svg>
            }
          </button>
          <button
            class="icon-btn menu-btn"
            type="button"
            aria-controls="menu"
            [attr.aria-expanded]="menuOpen()"
            [attr.aria-label]="menuOpen() ? 'Fermer le menu' : 'Ouvrir le menu'"
            (click)="menuOpen.set(!menuOpen())"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              @if (menuOpen()) {
                <path d="M6 6l12 12M18 6 6 18" />
              } @else {
                <path d="M4 7h16M4 12h16M4 17h16" />
              }
            </svg>
          </button>
        </div>
      </div>
    </header>

    <main id="contenu">
      <router-outlet />
    </main>

    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <a class="brand" routerLink="/"><span class="brand-mark" aria-hidden="true">ES</span><span>Eya Sahnoun</span></a>
          <p class="muted">{{ c.title }}, {{ c.city }}.</p>
        </div>
        <div>
          <h2 class="footer-title">Contact</h2>
          <a [href]="'mailto:' + c.email">{{ c.email }}</a><br />
          <a [href]="c.phoneHref">{{ c.phone }}</a>
        </div>
        <div>
          <h2 class="footer-title">Réseaux</h2>
          <a [href]="c.linkedin" target="_blank" rel="noopener">LinkedIn</a><br />
          <a [href]="c.github" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
      <div class="container footer-bottom">
        <span>© {{ year }} Eya Sahnoun</span>
        <span class="muted">Construit avec Angular</span>
      </div>
    </footer>
  `,
})
export class App {
  private readonly doc = inject(DOCUMENT);
  protected readonly c = contact;
  protected readonly year = new Date().getFullYear();
  protected readonly menuOpen = signal(false);
  protected readonly dark = signal(false);

  protected readonly links = [
    { path: '/', label: 'Accueil' },
    { path: '/projets', label: 'Projets' },
    { path: '/experience', label: 'Expérience' },
    { path: '/competences', label: 'Compétences' },
    { path: '/parcours', label: 'Parcours' },
    { path: '/contact', label: 'Contact' },
  ];

  constructor() {
    inject(Router)
      .events.pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.menuOpen.set(false));

    // Après l'hydratation, pour que le rendu serveur et le rendu navigateur restent identiques.
    afterNextRender(() => {
      const set = this.doc.documentElement.dataset['theme'];
      this.dark.set(set ? set === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);
    });
  }

  protected toggleTheme(): void {
    const next = this.dark() ? 'light' : 'dark';
    this.dark.set(next === 'dark');
    this.doc.documentElement.dataset['theme'] = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* stockage indisponible : le choix vaut pour la visite en cours */
    }
  }
}
