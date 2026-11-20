import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { certifications, contact, domains, jobs, profile, projects, roles, techs } from '../data/profile';
import { Reveal } from '../shared/reveal.directive';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Reveal],
  template: `
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-text">
          <p class="eyebrow"><span class="dot" aria-hidden="true"></span>Disponible · {{ c.city }}</p>
          <h1>
            Bonjour, je suis Eya.
            <span class="roles" aria-hidden="true">{{ typed() }}<span class="caret"></span></span>
            <span class="sr-only">Développeuse web, mobile, IA, IA agentique et DevOps.</span>
          </h1>
          <p class="lead">{{ profile }}</p>
          <div class="actions">
            <a class="btn btn-primary" routerLink="/projets">Voir mes projets <span aria-hidden="true">→</span></a>
            <a class="btn btn-ghost" routerLink="/contact">Me contacter</a>
          </div>
          <ul class="social">
            <li><a [href]="c.github" target="_blank" rel="noopener">GitHub ↗</a></li>
            <li><a [href]="c.linkedin" target="_blank" rel="noopener">LinkedIn ↗</a></li>
            <li><a [href]="'mailto:' + c.email">Email ↗</a></li>
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

    <div class="marquee" aria-label="Technologies">
      <ul>
        @for (t of marquee; track $index) {
          <li [attr.aria-hidden]="$index >= techs.length ? 'true' : null">{{ t }}</li>
        }
      </ul>
    </div>

    <section class="section">
      <div class="container">
        <div class="section-head" appReveal>
          <div>
            <p class="kicker">Domaines d'expertise</p>
            <h2>Du web à l'IA agentique, jusqu'à la mise en production</h2>
          </div>
        </div>
        <div class="domain-grid" appReveal>
          @for (d of domains; track d.name; let i = $index) {
            <article class="domain">
              <span class="domain-num">{{ pad(i + 1) }}</span>
              <span class="domain-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  @switch (d.icon) {
                    @case ('web') {
                      <rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9.5 13.5 7.5 15.5l2 2M14.5 13.5l2 2-2 2" />
                    }
                    @case ('mobile') {
                      <rect x="7" y="2.5" width="10" height="19" rx="2.5" /><path d="M11 18.5h2" />
                    }
                    @case ('ia') {
                      <circle cx="12" cy="12" r="3" /><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
                    }
                    @case ('agent') {
                      <rect x="5" y="8" width="14" height="11" rx="3" /><path d="M12 4v4M9.5 13h.01M14.5 13h.01M9.5 16h5M2.5 12.5v3M21.5 12.5v3" />
                    }
                    @case ('devops') {
                      <path d="M7 8.5a4.5 4.5 0 1 0 0 7c2.5 0 4-3.5 5-3.5s2.5 3.5 5 3.5a4.5 4.5 0 1 0 0-7c-2.5 0-4 3.5-5 3.5S9.5 8.5 7 8.5Z" />
                    }
                  }
                </svg>
              </span>
              <h3>{{ d.name }}</h3>
              <p>{{ d.text }}</p>
              <ul class="tags">
                @for (t of d.tags; track t) {
                  <li>{{ t }}</li>
                }
              </ul>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="container">
      <ul class="stats" appReveal>
        <li><strong>{{ pad(jobs.length) }}</strong><span>expériences en entreprise</span></li>
        <li><strong>{{ pad(projectCount) }}</strong><span>projets web, mobile, DevOps et IA</span></li>
        <li><strong>{{ pad(certCount) }}</strong><span>certifications · AZ-900, AI-900, DELF B2</span></li>
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

    <section class="container">
      <div class="cta" appReveal>
        <div>
          <p class="kicker">Contact</p>
          <h2>Un projet, une offre, une question ?</h2>
          <p>Je réponds rapidement par email ou par téléphone.</p>
        </div>
        <a class="btn btn-primary" routerLink="/contact">Travaillons ensemble <span aria-hidden="true">→</span></a>
      </div>
    </section>
  `,
})
export class Home {
  protected readonly c = contact;
  protected readonly domains = domains;
  protected readonly techs = techs;
  protected readonly marquee = [...techs, ...techs];
  protected readonly typed = signal(roles[0]);
  protected readonly pad = (n: number) => String(n).padStart(2, '0');

  constructor() {
    const destroyRef = inject(DestroyRef);
    // Effet machine à écrire, lancé côté navigateur uniquement (le rendu serveur affiche le premier rôle).
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      let role = 0;
      let len = roles[0].length;
      let deleting = true;
      let timer: ReturnType<typeof setTimeout>;
      const tick = () => {
        let delay = deleting ? 45 : 85;
        if (deleting) {
          len--;
          if (len === 0) {
            deleting = false;
            role = (role + 1) % roles.length;
            delay = 300;
          }
        } else {
          len++;
          if (len === roles[role].length) {
            deleting = true;
            delay = 1800;
          }
        }
        this.typed.set(roles[role].slice(0, len));
        timer = setTimeout(tick, delay);
      };
      timer = setTimeout(tick, 1800);
      destroyRef.onDestroy(() => clearTimeout(timer));
    });
  }

  protected readonly profile = profile;
  protected readonly jobs = jobs;
  protected readonly featured = projects.filter((p) => p.featured);
  protected readonly projectCount = projects.length;
  protected readonly certCount = certifications.length;
}
