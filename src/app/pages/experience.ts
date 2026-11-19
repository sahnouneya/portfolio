import { Component } from '@angular/core';

import { internships, jobs } from '../data/profile';
import { Reveal } from '../shared/reveal.directive';

@Component({
  selector: 'app-experience',
  imports: [Reveal],
  template: `
    <section class="page-head">
      <div class="container">
        <p class="kicker">Expérience</p>
        <h1>Deux ans en production</h1>
        <p class="lead">
          Du back-end Spring Boot à l'ERP/CRM B2B, précédés de stages en réalité augmentée, IoT et deep learning.
        </p>
      </div>
    </section>

    <section class="section section-tight">
      <div class="container">
        <h2 class="group-title">En entreprise</h2>
        <ol class="timeline">
          @for (j of jobs; track j.role) {
            <li appReveal>
              <div class="timeline-date">
                <span>{{ j.period }}</span>
                <strong>{{ j.company }}</strong>
              </div>
              <div class="card timeline-card">
                <h3>{{ j.role }}</h3>
                <ul class="points">
                  @for (p of j.points; track p) {
                    <li>{{ p }}</li>
                  }
                </ul>
                @if (j.stack) {
                  <ul class="tags">
                    @for (t of j.stack; track t) {
                      <li>{{ t }}</li>
                    }
                  </ul>
                }
              </div>
            </li>
          }
        </ol>

        <h2 class="group-title">Stages</h2>
        <ol class="timeline">
          @for (j of internships; track j.role) {
            <li appReveal>
              <div class="timeline-date">
                <span>{{ j.period }}</span>
                <strong>{{ j.company }}</strong>
              </div>
              <div class="card timeline-card">
                <h3>{{ j.role }}</h3>
                <ul class="points">
                  @for (p of j.points; track p) {
                    <li>{{ p }}</li>
                  }
                </ul>
                @if (j.stack) {
                  <ul class="tags">
                    @for (t of j.stack; track t) {
                      <li>{{ t }}</li>
                    }
                  </ul>
                }
              </div>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class Experience {
  protected readonly jobs = jobs;
  protected readonly internships = internships;
}
