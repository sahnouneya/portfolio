import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { certifications, contact, jobs, profile, projects } from '../data/profile';
import { Reveal } from '../shared/reveal.directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Reveal],
  template: `
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-text">
          <p class="eyebrow"><span class="dot" aria-hidden="true"></span>{{ c.city }}</p>
          <h1>
            Bonjour, je suis Eya.<br />
            <span class="accent-text">Développeuse full-stack</span> web &amp; mobile.
          </h1>
          <p class="lead">{{ profile }}</p>
          <div class="actions">
            <a class="btn btn-primary" routerLink="/projets">Voir mes projets</a>
            <a class="btn btn-ghost" routerLink="/contact">Me contacter</a>
          </div>
          <ul class="social">
            <li><a [href]="c.github" target="_blank" rel="noopener">GitHub</a></li>
            <li><a [href]="c.linkedin" target="_blank" rel="noopener">LinkedIn</a></li>
            <li><a [href]="'mailto:' + c.email">Email</a></li>
          </ul>
        </div>
        <div class="hero-photo">
          <img src="images/avatar.jpg" alt="Portrait d'Eya Sahnoun" width="720" height="1280" />
          <div class="hero-badge">
            <strong>2 ans</strong>
            <span>d'expérience en production</span>
          </div>
        </div>
      </div>
    </section>

    <section class="container">
      <ul class="stats" appReveal>
        <li><strong>{{ jobs.length }}</strong><span>expériences en entreprise</span></li>
        <li><strong>{{ projectCount }}</strong><span>projets web, mobile, DevOps et IA</span></li>
        <li><strong>{{ certCount }}</strong><span>certifications (AZ-900, AI-900, DELF B2)</span></li>
        <li><strong>IIT</strong><span>cycle ingénieur en génie logiciel</span></li>
      </ul>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head" appReveal>
          <div>
            <p class="kicker">Sélection</p>
            <h2>Projets phares</h2>
          </div>
          <a class="link-arrow" routerLink="/projets">Toutes les réalisations <span aria-hidden="true">→</span></a>
        </div>
        <div class="card-grid card-grid-2">
          @for (p of featured; track p.id) {
            <a class="card feature" [routerLink]="'/projets'" [fragment]="p.id" appReveal>
              <span class="card-meta">{{ p.kind }} · {{ p.year }}</span>
              <h3>{{ p.title }}</h3>
              <p>{{ p.summary }}</p>
              <ul class="tags">
                @for (t of p.stack.slice(0, 4); track t) {
                  <li>{{ t }}</li>
                }
              </ul>
              <span class="link-arrow">Voir le projet <span aria-hidden="true">→</span></span>
            </a>
          }
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container split" appReveal>
        <div>
          <p class="kicker">Parcours</p>
          <h2>À propos</h2>
        </div>
        <div class="prose">
          <p>
            Chez ICT, j'ai conçu et fait évoluer les modules métier d'un ERP/CRM B2B en production : facturation, avoirs,
            reçus de paiement, caisse, ainsi que la gestion des rôles et des permissions. Avant cela, chez Lunar TC, j'ai
            développé des APIs REST sécurisées en Spring Boot et une application de dashboarding connectée à plusieurs
            bases MongoDB.
          </p>
          <p>
            Je prépare aujourd'hui le diplôme d'ingénieur en génie logiciel à l'IIT de Sfax. En parallèle, je mène des
            projets DevOps (Docker, GitHub Actions, Azure, Prometheus / Grafana) et d'IA agentique (RAG, LangGraph), et
            j'utilise au quotidien des outils comme Claude Code et GitHub Copilot.
          </p>
          <a class="link-arrow" routerLink="/experience">Voir mon expérience <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="cta" appReveal>
          <h2>Un projet, une offre, une question ?</h2>
          <p>Je réponds rapidement par email ou par téléphone.</p>
          <a class="btn btn-primary" routerLink="/contact">Travaillons ensemble</a>
        </div>
      </div>
    </section>
  `,
})
export class Home {
  protected readonly c = contact;
  protected readonly profile = profile;
  protected readonly jobs = jobs;
  protected readonly featured = projects.filter((p) => p.featured);
  protected readonly projectCount = projects.length;
  protected readonly certCount = certifications.length;
}
