import { Component, ElementRef, computed, signal, viewChild } from '@angular/core';

import { Category, Project, projects } from '../data/profile';
import { Reveal } from '../shared/reveal.directive';

@Component({
  selector: 'app-projects',
  imports: [Reveal],
  template: `
    <section class="page-head">
      <div class="container">
        <p class="kicker">Projets</p>
        <h1>Réalisations</h1>
        <p class="lead">
          Des applications web et mobiles aux chaînes CI/CD et aux projets d'IA : une sélection de ce que j'ai conçu et
          développé.
        </p>
        <div class="filters" role="group" aria-label="Filtrer les projets">
          @for (f of filters; track f) {
            <button type="button" class="chip" [class.is-active]="active() === f" [attr.aria-pressed]="active() === f" (click)="active.set(f)">
              {{ f }}
            </button>
          }
        </div>
      </div>
    </section>

    <section class="section section-tight">
      <div class="container">
        @for (p of visible(); track p.id; let i = $index) {
          <article class="project" [id]="p.id" appReveal>
            <div class="project-side">
              <span class="project-num">{{ number(p) }}</span>
              <span class="card-meta">{{ p.year }}</span>
              <span class="muted">{{ p.kind }}</span>
            </div>
            <div class="project-body">
              <h2>{{ p.title }}</h2>
              <ul class="points">
                @for (pt of p.points; track pt) {
                  <li>{{ pt }}</li>
                }
              </ul>
              <ul class="tags">
                @for (t of p.stack; track t) {
                  <li>{{ t }}</li>
                }
              </ul>
              @if (p.shots.length) {
                <ul class="shots" [attr.aria-label]="'Captures d’écran : ' + p.title">
                  @for (s of p.shots; track s; let j = $index) {
                    <li>
                      <button type="button" (click)="open(p, j)">
                        <img [src]="s" [alt]="'Capture ' + (j + 1) + ' : ' + p.title" loading="lazy" />
                      </button>
                    </li>
                  }
                </ul>
              }
            </div>
          </article>
        } @empty {
          <p class="muted">Aucun projet dans cette catégorie.</p>
        }
      </div>
    </section>

    <dialog #viewer class="viewer" (close)="current.set(null)" (click)="onBackdrop($event)">
      @if (current(); as cur) {
        <div class="viewer-head">
          <h2>{{ cur.project.title }}</h2>
          <button type="button" class="icon-btn" aria-label="Fermer" (click)="viewer.close()">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>
        <img [src]="cur.project.shots[cur.index]" [alt]="'Capture ' + (cur.index + 1) + ' : ' + cur.project.title" />
        @if (cur.project.shots.length > 1) {
          <div class="viewer-nav">
            <button type="button" class="btn btn-ghost" (click)="step(-1)">← Précédente</button>
            <span class="muted">{{ cur.index + 1 }} / {{ cur.project.shots.length }}</span>
            <button type="button" class="btn btn-ghost" (click)="step(1)">Suivante →</button>
          </div>
        }
      }
    </dialog>
  `,
})
export class Projects {
  protected readonly filters: ('Tous' | Category)[] = ['Tous', 'Web', 'Mobile', 'DevOps', 'IA', 'Data'];
  protected readonly active = signal<'Tous' | Category>('Tous');
  protected readonly visible = computed(() => {
    const f = this.active();
    return f === 'Tous' ? projects : projects.filter((p) => p.categories.includes(f));
  });

  protected readonly current = signal<{ project: Project; index: number } | null>(null);
  private readonly viewer = viewChild.required<ElementRef<HTMLDialogElement>>('viewer');

  protected number(p: Project): string {
    return String(projects.indexOf(p) + 1).padStart(2, '0');
  }

  protected open(project: Project, index: number): void {
    this.current.set({ project, index });
    this.viewer().nativeElement.showModal();
  }

  protected step(delta: number): void {
    const cur = this.current();
    if (!cur) return;
    const n = cur.project.shots.length;
    this.current.set({ ...cur, index: (cur.index + delta + n) % n });
  }

  protected onBackdrop(e: MouseEvent): void {
    if (e.target === this.viewer().nativeElement) this.viewer().nativeElement.close();
  }
}
