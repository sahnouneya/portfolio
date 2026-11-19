import { Directive, ElementRef, OnDestroy, afterNextRender, inject } from '@angular/core';

/**
 * Apparition douce au défilement. Le contenu reste visible sans JavaScript (pages prérendues) :
 * seuls les éléments situés sous la ligne de flottaison sont masqués puis révélés.
 */
@Directive({ selector: '[appReveal]' })
export class Reveal implements OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  constructor() {
    afterNextRender(() => {
      const node = this.el.nativeElement;
      const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (calm || !('IntersectionObserver' in window)) return;
      if (node.getBoundingClientRect().top < window.innerHeight) return;

      node.classList.add('reveal');
      this.observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            node.classList.add('is-visible');
            this.observer?.disconnect();
          }
        },
        { threshold: 0.12 },
      );
      this.observer.observe(node);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
