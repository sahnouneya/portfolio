import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

import { galleryShots } from '../data/gallery.generated';
import { Project, projects } from '../data/profile';
import { Reveal } from '../shared/reveal.directive';

interface GalleryItem {
  project: Project;
  num: string;
  shots: string[];
}

@Component({
  selector: 'app-gallery',
  imports: [Reveal, RouterLink],
  template: `
    <section class="page-head">
      <div class="container">
        <div class="page-head-row">
          <div>
            <p class="kicker">Galerie · captures d'écran</p>
            <h1>Mes réalisations</h1>
            <p class="lead">
              Les applications et sites que j'ai conçus, en images : interfaces web, applications mobiles, tableaux de
              bord et outils d'IA.
            </p>
          </div>
          <div class="head-stat">
            <span class="label">Captures</span>
            <strong>{{ pad(totalShots) }} <small>/ images</small></strong>
            <p>{{ pad(items.length) }} projets</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-tight">
      <div class="container gallery-grid">
        @for (it of items; track it.project.id) {
          <article class="shot-card" appReveal>
            <button
              type="button"
              class="shot-cover"
              [disabled]="!it.shots.length"
              (click)="open(it, 0)"
              [attr.aria-label]="it.shots.length ? 'Ouvrir les captures : ' + it.project.title : null"
            >
              @if (it.shots.length) {
                <img [src]="it.shots[0]" [alt]="'Aperçu : ' + it.project.title" loading="lazy" />
                <span class="shot-count">{{ it.shots.length }} {{ it.shots.length > 1 ? 'captures' : 'capture' }}</span>
              } @else {
                <span class="shot-empty" aria-hidden="true">
                  <span class="shot-empty-num">{{ it.num }}</span>
                  <span class="label">Captures à venir</span>
                </span>
              }
            </button>
            <div class="shot-body">
              <span class="card-meta">{{ it.num }} · {{ it.project.kind }} · {{ it.project.year }}</span>
              <h2>{{ it.project.title }}</h2>
              <p>{{ it.project.summary }}</p>
              <ul class="tags">
                @for (t of it.project.stack.slice(0, 5); track t) {
                  <li>{{ t }}</li>
                }
              </ul>
              <div class="shot-actions">
                <button type="button" class="btn btn-primary" [disabled]="!it.shots.length" (click)="open(it, 0)">
                  Voir les captures <span aria-hidden="true">→</span>
                </button>
                <a class="link-arrow" routerLink="/projets" [fragment]="it.project.id">Détails <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </article>
        }
      </div>
    </section>

    <dialog
      #box
      class="lightbox"
      aria-label="Galerie de captures d'écran"
      (close)="current.set(null)"
      (click)="onBackdrop($event)"
      (keydown)="onKey($event)"
      (touchstart)="touchStart($event)"
      (touchend)="touchEnd($event)"
    >
      @if (current(); as cur) {
        <div class="lightbox-head">
          <div>
            <span class="label">{{ cur.item.num }} · {{ cur.index + 1 }} / {{ cur.item.shots.length }}</span>
            <h2>{{ cur.item.project.title }}</h2>
          </div>
          <button type="button" class="icon-btn" aria-label="Fermer la galerie" (click)="box.close()">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>

        <div class="lightbox-stage">
          @if (cur.item.shots.length > 1) {
            <button type="button" class="lightbox-arrow prev" aria-label="Capture précédente" (click)="step(-1)">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
            </button>
          }
          @for (s of [cur.item.shots[cur.index]]; track s) {
            <img
              class="lightbox-img"
              [src]="s"
              [alt]="'Capture ' + (cur.index + 1) + ' sur ' + cur.item.shots.length + ' : ' + cur.item.project.title"
            />
          }
          @if (cur.item.shots.length > 1) {
            <button type="button" class="lightbox-arrow next" aria-label="Capture suivante" (click)="step(1)">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
            </button>
          }
        </div>

        @if (cur.item.shots.length > 1) {
          <div class="lightbox-dots" role="group" aria-label="Choisir une capture">
            @for (s of cur.item.shots; track s; let j = $index) {
              <button
                type="button"
                [class.is-active]="j === cur.index"
                [attr.aria-current]="j === cur.index ? 'true' : null"
                [attr.aria-label]="'Capture ' + (j + 1)"
                (click)="go(j)"
              ></button>
            }
          </div>
        }
      }
    </dialog>
  `,
})
export class Gallery {
  protected readonly items: GalleryItem[] = projects.map((project, i) => ({
    project,
    num: String(i + 1).padStart(2, '0'),
    shots: galleryShots[project.id] ?? project.shots,
  }));
  protected readonly totalShots = this.items.reduce((n, it) => n + it.shots.length, 0);
  protected readonly pad = (n: number) => String(n).padStart(2, '0');

  protected readonly current = signal<{ item: GalleryItem; index: number } | null>(null);
  private readonly box = viewChild.required<ElementRef<HTMLDialogElement>>('box');
  private touchX: number | null = null;

  protected open(item: GalleryItem, index: number): void {
    if (!item.shots.length) return;
    this.current.set({ item, index });
    this.box().nativeElement.showModal();
    this.preload(item, index);
  }

  protected go(index: number): void {
    const cur = this.current();
    if (!cur) return;
    this.current.set({ ...cur, index });
    this.preload(cur.item, index);
  }

  protected step(delta: number): void {
    const cur = this.current();
    if (!cur) return;
    const n = cur.item.shots.length;
    this.go((cur.index + delta + n) % n);
  }

  protected onKey(e: KeyboardEvent): void {
    if (e.key === 'ArrowRight') this.step(1);
    else if (e.key === 'ArrowLeft') this.step(-1);
  }

  protected onBackdrop(e: MouseEvent): void {
    // Un clic hors de l'image, sur le fond de la fenêtre, ferme la galerie.
    const t = e.target as HTMLElement;
    if (t === this.box().nativeElement || t.classList.contains('lightbox-stage')) this.box().nativeElement.close();
  }

  protected touchStart(e: TouchEvent): void {
    this.touchX = e.changedTouches[0]?.clientX ?? null;
  }

  protected touchEnd(e: TouchEvent): void {
    if (this.touchX === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? this.touchX) - this.touchX;
    this.touchX = null;
    if (Math.abs(dx) > 50) this.step(dx < 0 ? 1 : -1);
  }

  /** Précharge les captures voisines pour une navigation sans attente. */
  private preload(item: GalleryItem, index: number): void {
    const n = item.shots.length;
    for (const j of [index + 1, index - 1]) new Image().src = item.shots[(j + n) % n];
  }
}
