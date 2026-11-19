import { Component } from '@angular/core';

import { contact } from '../data/profile';
import { Reveal } from '../shared/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [Reveal],
  template: `
    <section class="page-head">
      <div class="container">
        <p class="kicker">Contact</p>
        <h1>Travaillons ensemble</h1>
        <p class="lead">Une question, une offre ou un projet ? Écris-moi, je réponds rapidement.</p>
      </div>
    </section>

    <section class="section section-tight">
      <div class="container contact-grid">
        <dl class="card contact-list" appReveal>
          <dt>Email</dt>
          <dd><a [href]="'mailto:' + c.email">{{ c.email }}</a></dd>
          <dt>Téléphone</dt>
          <dd><a [href]="c.phoneHref">{{ c.phone }}</a></dd>
          <dt>LinkedIn</dt>
          <dd><a [href]="c.linkedin" target="_blank" rel="noopener">linkedin.com/in/eya-sahnoun</a></dd>
          <dt>GitHub</dt>
          <dd><a [href]="c.github" target="_blank" rel="noopener">github.com/sahnouneya</a></dd>
          <dt>Adresse</dt>
          <dd>{{ c.address }}</dd>
        </dl>

        <form class="card form" (submit)="send($event)" appReveal>
          <label>
            Nom
            <input name="fullname" type="text" autocomplete="name" required />
          </label>
          <label>
            Email
            <input name="email" type="email" autocomplete="email" required />
          </label>
          <label>
            Message
            <textarea name="message" rows="7" required></textarea>
          </label>
          <button class="btn btn-primary" type="submit">Envoyer</button>
          <p class="muted small">Le bouton ouvre ta messagerie avec le message prérempli.</p>
        </form>
      </div>
    </section>
  `,
})
export class Contact {
  protected readonly c = contact;

  protected send(event: SubmitEvent): void {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    const name = String(data.get('fullname') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const subject = `Message de ${name} via le portfolio`;
    const body = `${message}\n\n${name} — ${email}`;
    location.href = `mailto:${this.c.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}
