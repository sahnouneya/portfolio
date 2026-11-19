import { Component } from '@angular/core';

import { certifications, education, engagement } from '../data/profile';
import { Reveal } from '../shared/reveal.directive';

@Component({
  selector: 'app-journey',
  imports: [Reveal],
  template: `
    <section class="page-head">
      <div class="container">
        <p class="kicker">Parcours</p>
        <h1>Formation et engagement</h1>
        <p class="lead">Des sciences expérimentales au génie logiciel, avec un passage par l'IEEE.</p>
      </div>
    </section>

    <section class="section section-tight">
      <div class="container">
        <h2 class="group-title">Formation</h2>
        <ol class="timeline">
          @for (d of education; track d.title) {
            <li appReveal>
              <div class="timeline-date"><span>{{ d.period }}</span></div>
              <div class="card timeline-card degree">
                <div>
                  <h3>{{ d.title }}</h3>
                  <p class="muted">{{ d.school }}</p>
                </div>
                @if (d.logo) {
                  <img [src]="d.logo" [alt]="'Logo : ' + d.school" loading="lazy" />
                }
              </div>
            </li>
          }
        </ol>

        <h2 class="group-title">Certifications</h2>
        <ul class="stats stats-3" appReveal>
          @for (c of certifications; track c.code) {
            <li><strong>{{ c.code }}</strong><span>{{ c.name }}</span></li>
          }
        </ul>

        <h2 class="group-title" id="engagement">Vie associative</h2>
        <div class="two-cards">
          <div class="card" appReveal>
            <h3>Club</h3>
            <div class="club">
              <img [src]="e.clubLogo" alt="Logo de l'IEEE" loading="lazy" />
              <div>
                <strong>{{ e.club }}</strong>
                <span class="muted">{{ e.clubRole }}</span>
              </div>
            </div>
          </div>
          <div class="card" appReveal>
            <h3>Formations et événements</h3>
            <ul class="points">
              @for (a of e.activities; track a) {
                <li>{{ a }}</li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class Journey {
  protected readonly education = education;
  protected readonly certifications = certifications;
  protected readonly e = engagement;
}
