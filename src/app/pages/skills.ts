import { Component } from '@angular/core';

import { skills } from '../data/profile';
import { Reveal } from '../shared/reveal.directive';

@Component({
  selector: 'app-skills',
  imports: [Reveal],
  template: `
    <section class="page-head">
      <div class="container">
        <p class="kicker">Compétences</p>
        <h1>Ma boîte à outils</h1>
        <p class="lead">Les langages, frameworks et outils avec lesquels je travaille, du front au déploiement.</p>
      </div>
    </section>

    <section class="section section-tight">
      <div class="container skill-grid">
        @for (g of skills; track g.name) {
          <div class="card skill-card" appReveal>
            <h2>{{ g.name }}</h2>
            @if (g.note) {
              <p class="muted">{{ g.note }}</p>
            }
            <ul class="tags">
              @for (s of g.items; track s) {
                <li>{{ s }}</li>
              }
            </ul>
          </div>
        }
      </div>
    </section>
  `,
})
export class Skills {
  protected readonly skills = skills;
}
