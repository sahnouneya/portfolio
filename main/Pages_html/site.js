/* =========================================================
   Interactions du portfolio :
   - navigation (logo, page courante, menu mobile)
   - barre de progression + apparition au défilement
   - avatar flottant d'Eya (écran d'accueil + guide)
   ========================================================= */
(function () {
    'use strict';

    const PAGES = [
        { file: 'acceuil.html', label: 'Accueil' },
        { file: 'parcours.html', href: 'Parcours.html', label: 'Parcours Académique' },
        { file: 'comp.html', label: 'Compétences' },
        { file: 'vieasso.html', label: 'Vie associative' },
        { file: 'passions.html', label: 'Passions' },
        { file: 'stages.html', label: 'Stages' },
        { file: 'quiz.html', label: 'Quiz' },
        { file: 'cantact.html', label: 'Contact' }
    ];

    const MESSAGES = {
        'acceuil.html': [
            'Bienvenue chez moi ! Clique sur moi quand tu veux, je te fais visiter ✨',
            'Je suis passionnée par l\'IA, l\'IoT et les systèmes embarqués 🤖',
            'Aujourd\'hui je suis développeuse backend chez Lunar 🌙'
        ],
        'parcours.html': [
            'Voici mon parcours : du Bac jusqu\'à l\'IIT 🎓',
            'Après ma licence à l\'ENET\'Com, j\'ai commencé mon cycle ingénieur à l\'IIT en 2024.'
        ],
        'comp.html': [
            'Mes outils : du web à l\'embarqué, en passant par l\'IA 💻',
            'Passe la souris sur une compétence pour la mettre en avant 👀'
        ],
        'vieasso.html': [
            'La vie associative m\'a appris le leadership et le travail d\'équipe 🤝',
            'J\'ai été membre de l\'IEEE ENET\'Com SB ⚡'
        ],
        'passions.html': [
            'Cyclisme, nature, sport… ce qui me fait vibrer 🚴‍♀️',
            'Le sport m\'aide à rester concentrée et motivée 💪'
        ],
        'stages.html': [
            'Mes expériences pro : AR, IoT et Deep Learning 🚀',
            'Mon PFE chez TDS : une appli de réalité augmentée connectée à l\'IoT !'
        ],
        'quiz.html': [
            'Teste tes connaissances en santé. Bonne chance ! 🧠',
            'Choisis une réponse puis clique sur le bouton 😉'
        ],
        'cantact.html': [
            'Un projet, une question ? Écris-moi ✉️',
            'Tu peux aussi m\'écrire directement : eyas92931@gmail.com'
        ]
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const current = (decodeURIComponent(location.pathname.split('/').pop()) || 'acceuil.html').toLowerCase();
    const pageIndex = Math.max(0, PAGES.findIndex(p => p.file === current));

    const storage = {
        get(key) { try { return sessionStorage.getItem(key); } catch (e) { return null; } },
        set(key, val) { try { sessionStorage.setItem(key, val); } catch (e) { /* stockage indisponible */ } }
    };

    const hrefOf = p => p.href || p.file;

    /* ---------- Navigation ---------- */
    function enhanceNav() {
        const firstLink = document.querySelector('.nav-link');
        const nav = firstLink && firstLink.closest('nav');
        if (!nav) return;

        const links = Array.from(nav.querySelectorAll('.nav-link'));
        const list = document.createElement('div');
        list.className = 'nav-links';
        list.id = 'nav-links';

        // ajoute "Stages" si la page l'a oublié
        if (!links.some(a => a.getAttribute('href').toLowerCase() === 'stages.html')) {
            const a = document.createElement('a');
            a.className = 'nav-link';
            a.href = 'stages.html';
            a.textContent = 'Stages';
            links.push(a);
        }

        links.forEach(a => {
            a.classList.remove('active');
            a.removeAttribute('aria-current');
            if (a.getAttribute('href').toLowerCase() === current) {
                a.classList.add('is-current');
                a.setAttribute('aria-current', 'page');
            }
            list.appendChild(a);
        });

        const brand = document.createElement('a');
        brand.className = 'brand';
        brand.href = 'acceuil.html';
        brand.innerHTML = '<span class="brand-mark">E</span>Eya Sahnoun<span class="brand-dot">.</span>';

        const toggle = document.createElement('button');
        toggle.className = 'nav-toggle';
        toggle.type = 'button';
        toggle.setAttribute('aria-label', 'Ouvrir le menu');
        toggle.setAttribute('aria-controls', 'nav-links');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = '☰';
        toggle.addEventListener('click', () => {
            const open = nav.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(open));
            toggle.textContent = open ? '✕' : '☰';
        });

        nav.innerHTML = '';
        nav.append(brand, list, toggle);
    }

    /* ---------- Progression & apparition ---------- */
    function scrollProgress() {
        const bar = document.createElement('div');
        bar.className = 'scroll-progress';
        document.body.appendChild(bar);
        const update = () => {
            const max = document.documentElement.scrollHeight - innerHeight;
            bar.style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0) + ')';
        };
        addEventListener('scroll', update, { passive: true });
        update();
    }

    function revealOnScroll() {
        if (reduceMotion || !('IntersectionObserver' in window)) return;
        const items = document.querySelectorAll(
            '.profil-container, .description, .photo-paragraphe, #comp, #comp > div > div, ' +
            '.passion-item, .experience, .bro article, .quiz-container, section.contact, .footer-item'
        );
        const io = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('is-visible');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        items.forEach(el => {
            const siblings = Array.from(el.parentElement.children);
            el.style.setProperty('--reveal-delay', (Math.min(siblings.indexOf(el), 6) * 0.08) + 's');
            el.classList.add('reveal');
            io.observe(el);
        });
    }

    /* ---------- Avatar (dessiné d'après Eya) ---------- */
    let uid = 0;
    function avatarSVG() {
        const id = 'av' + (++uid);
        return `
<svg viewBox="0 0 140 160" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="${id}-hair" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#4a2f20"/>
      <stop offset=".55" stop-color="#6e4630"/>
      <stop offset="1" stop-color="#9a6a48"/>
    </linearGradient>
    <linearGradient id="${id}-suit" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#263a66"/>
      <stop offset="1" stop-color="#16213f"/>
    </linearGradient>
  </defs>

  <!-- cheveux longs (arrière) -->
  <path d="M36 62 C33 30 52 17 70 17 C88 17 107 30 104 62 C106 92 112 122 108 152 L32 152 C28 122 34 92 36 62Z" fill="url(#${id}-hair)"/>

  <!-- cou -->
  <rect x="62" y="84" width="16" height="24" rx="7" fill="#efc3a8"/>

  <!-- blazer bleu marine + haut blanc -->
  <path d="M20 162 C22 128 42 111 70 109 C98 111 118 128 120 162Z" fill="url(#${id}-suit)"/>
  <path d="M56 109 Q70 114 84 109 L79 162 L61 162Z" fill="#f8fafc"/>
  <path d="M56 109 L65 131 L60 162 L49 162 L45 121Z" fill="#14203d"/>
  <path d="M84 109 L75 131 L80 162 L91 162 L95 121Z" fill="#14203d"/>

  <!-- mèches devant les épaules -->
  <path d="M39 66 C36 98 38 126 47 146 C52 128 51 98 50 74Z" fill="url(#${id}-hair)"/>
  <path d="M101 66 C104 98 102 126 93 146 C88 128 89 98 90 74Z" fill="url(#${id}-hair)"/>

  <!-- bras qui salue -->
  <g class="av-arm">
    <path d="M104 128 C114 120 119 110 120 98" stroke="url(#${id}-suit)" stroke-width="13" stroke-linecap="round" fill="none"/>
    <ellipse cx="121" cy="91" rx="7" ry="8" fill="#f3cdb5"/>
  </g>

  <!-- visage -->
  <ellipse cx="70" cy="60" rx="26.5" ry="30.5" fill="#f6d5c1"/>

  <!-- cheveux avant : raie au milieu -->
  <path d="M42 66 C38 34 54 22 70 22 C86 22 102 34 98 66 C95 50 87 38 72 33 L70 38 L68 33 C53 38 45 50 42 66Z" fill="url(#${id}-hair)"/>

  <!-- sourcils -->
  <path d="M52 52 Q58 48.5 64 51" stroke="#5a3a28" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M76 51 Q82 48.5 88 52" stroke="#5a3a28" stroke-width="2" fill="none" stroke-linecap="round"/>

  <!-- yeux marron -->
  <g class="av-eyes">
    <ellipse cx="58.5" cy="61" rx="5.2" ry="3.9" fill="#fff"/>
    <ellipse cx="81.5" cy="61" rx="5.2" ry="3.9" fill="#fff"/>
    <g class="av-pupils">
      <circle cx="58.5" cy="61.3" r="3" fill="#6b4226"/>
      <circle cx="81.5" cy="61.3" r="3" fill="#6b4226"/>
      <circle cx="58.5" cy="61.3" r="1.4" fill="#2a1a10"/>
      <circle cx="81.5" cy="61.3" r="1.4" fill="#2a1a10"/>
      <circle cx="59.6" cy="60.2" r=".9" fill="#fff"/>
      <circle cx="82.6" cy="60.2" r=".9" fill="#fff"/>
    </g>
    <path d="M53 59.5 Q58.5 55.8 64 59.5" stroke="#3b261a" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <path d="M76 59.5 Q81.5 55.8 87 59.5" stroke="#3b261a" stroke-width="1.6" fill="none" stroke-linecap="round"/>
  </g>

  <!-- nez, joues, sourire -->
  <path d="M70 64 Q68.5 70 70.5 71.5" stroke="#d9a58a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="52" cy="72" rx="5" ry="2.8" fill="#f2a1a1" opacity=".45"/>
  <ellipse cx="88" cy="72" rx="5" ry="2.8" fill="#f2a1a1" opacity=".45"/>
  <path class="av-mouth-smile" d="M61.5 77 Q70 83.5 78.5 77" stroke="#b5574f" stroke-width="2.4" fill="none" stroke-linecap="round"/>
  <ellipse class="av-mouth-open" cx="70" cy="79" rx="5" ry="3.4" fill="#a8463f"/>
</svg>`;
    }

    function makeAvatarButton(label) {
        const wrap = document.createElement('div');
        wrap.className = 'buddy-float';
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'buddy-body';
        btn.setAttribute('aria-label', label);
        btn.innerHTML = avatarSVG();
        wrap.appendChild(btn);
        return { wrap, btn };
    }

    // Les pupilles suivent la souris
    function followCursor() {
        let mx = 0, my = 0, ticking = false;
        addEventListener('pointermove', e => {
            mx = e.clientX; my = e.clientY;
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                ticking = false;
                document.querySelectorAll('.buddy-body').forEach(btn => {
                    const r = btn.getBoundingClientRect();
                    if (!r.width) return;
                    const dx = mx - (r.left + r.width / 2);
                    const dy = my - (r.top + r.height * 0.4);
                    const d = Math.hypot(dx, dy) || 1;
                    const k = Math.min(1, d / 300);
                    const p = btn.querySelector('.av-pupils');
                    if (p) p.style.transform = `translate(${(dx / d) * 2 * k}px, ${(dy / d) * 1.4 * k}px)`;
                });
            });
        }, { passive: true });
    }

    // Texte qui s'écrit lettre par lettre, avec la bouche qui parle
    function typeInto(el, text, speaker, done) {
        if (el._typing) clearInterval(el._typing);
        const chars = Array.from(text);
        if (reduceMotion) { el.textContent = text; if (done) done(); return; }
        let i = 0;
        el.textContent = '';
        const caret = document.createElement('span');
        caret.className = 'caret';
        el.appendChild(caret);
        if (speaker) speaker.classList.add('is-talking');
        el._typing = setInterval(() => {
            caret.before(chars[i++]);
            if (i >= chars.length) {
                clearInterval(el._typing);
                el._typing = null;
                caret.remove();
                if (speaker) speaker.classList.remove('is-talking');
                if (done) done();
            }
        }, 24);
    }

    /* ---------- Guide flottant (coin de l'écran) ---------- */
    function createBuddy() {
        const root = document.createElement('div');
        root.className = 'buddy';
        root.innerHTML = `
            <div class="buddy-bubble" role="status" aria-live="polite">
                <p class="buddy-text"></p>
                <div class="buddy-actions"></div>
                <button type="button" class="buddy-close" aria-label="Fermer la bulle">×</button>
            </div>`;
        const { wrap, btn } = makeAvatarButton('Parler avec Eya');
        root.appendChild(wrap);
        document.body.appendChild(root);

        const bubble = root.querySelector('.buddy-bubble');
        const textEl = root.querySelector('.buddy-text');
        const actions = root.querySelector('.buddy-actions');
        let hideTimer = null;
        let step = 0;

        const tips = MESSAGES[current] || MESSAGES['acceuil.html'];
        const next = PAGES[(pageIndex + 1) % PAGES.length];

        function wave() {
            btn.classList.remove('is-waving');
            void btn.offsetWidth;
            btn.classList.add('is-waving');
        }

        function say(text, buttons, keep) {
            clearTimeout(hideTimer);
            actions.innerHTML = '';
            bubble.classList.add('is-open');
            wave();
            typeInto(textEl, text, btn, () => {
                (buttons || []).forEach(b => {
                    let node;
                    if (b.href) {
                        node = document.createElement('a');
                        node.href = b.href;
                    } else {
                        node = document.createElement('button');
                        node.type = 'button';
                        node.addEventListener('click', b.onClick);
                    }
                    node.textContent = b.label;
                    actions.appendChild(node);
                });
                if (!keep) hideTimer = setTimeout(close, 7000);
            });
        }

        function close() {
            clearTimeout(hideTimer);
            bubble.classList.remove('is-open');
        }

        // garde la bulle ouverte tant que la souris est dessus
        bubble.addEventListener('mouseenter', () => clearTimeout(hideTimer));
        bubble.addEventListener('mouseleave', () => { if (bubble.classList.contains('is-open')) hideTimer = setTimeout(close, 3500); });
        root.querySelector('.buddy-close').addEventListener('click', close);

        btn.addEventListener('mouseenter', wave);
        btn.addEventListener('click', () => {
            if (step < tips.length) {
                say(tips[step++]);
            } else {
                step = 0;
                say('Prochaine étape de la visite : ' + next.label + ' !', [
                    { label: 'Y aller →', href: hrefOf(next) },
                    { label: 'Remonter ↑', onClick: () => scrollTo({ top: 0 }) }
                ], true);
            }
        });

        // message quand on arrive en bas de la page
        let saidBottom = false;
        addEventListener('scroll', () => {
            if (saidBottom) return;
            const max = document.documentElement.scrollHeight - innerHeight;
            if (max > 200 && scrollY >= max - 10) {
                saidBottom = true;
                say('Tu as tout vu ici 🎉 On continue ?', [
                    { label: next.label + ' →', href: hrefOf(next) },
                    { label: 'Remonter ↑', onClick: () => scrollTo({ top: 0 }) }
                ], true);
            }
        }, { passive: true });

        return {
            root,
            btn,
            show() {
                root.classList.add('is-ready');
                setTimeout(() => { step = 1; say(tips[0]); }, 700);
            }
        };
    }

    /* ---------- Écran d'accueil (1re visite de la session) ---------- */
    function showWelcome(buddy) {
        const overlay = document.createElement('div');
        overlay.className = 'welcome';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Bienvenue');
        overlay.innerHTML = `
            <div class="welcome-inner">
                <div class="welcome-avatar">
                    <div class="orbit"><span>💻</span><span>🤖</span><span>📡</span></div>
                </div>
                <h1>Salut, moi c'est <span>Eya</span> 👋</h1>
                <p class="welcome-text"></p>
                <button type="button" class="welcome-cta">Entrer sur le site →</button>
                <p class="welcome-skip">ou appuie sur Entrée</p>
            </div>`;
        const holder = overlay.querySelector('.welcome-avatar');
        const { wrap, btn } = makeAvatarButton('Eya');
        holder.appendChild(wrap);
        document.body.appendChild(overlay);
        document.documentElement.style.overflow = 'hidden';

        const cta = overlay.querySelector('.welcome-cta');
        setTimeout(() => {
            btn.classList.add('is-waving');
            typeInto(overlay.querySelector('.welcome-text'),
                'Bienvenue sur mon portfolio ! Je suis étudiante ingénieure en informatique et je serai ta guide pendant la visite.',
                btn);
        }, 900);
        setTimeout(() => cta.focus({ preventScroll: true }), 1000);

        let leaving = false;
        function enter() {
            if (leaving) return;
            leaving = true;
            storage.set('eya-welcome', '1');
            removeEventListener('keydown', onKey);

            // l'avatar s'envole vers le coin de l'écran
            buddy.root.style.transition = 'none';
            buddy.root.style.visibility = 'hidden';
            buddy.root.classList.add('is-ready');
            const from = holder.getBoundingClientRect();
            const to = buddy.btn.getBoundingClientRect();
            requestAnimationFrame(() => { buddy.root.style.transition = ''; });
            if (!reduceMotion && holder.animate) {
                const dx = (to.left + to.width / 2) - (from.left + from.width / 2);
                const dy = (to.top + to.height / 2) - (from.top + from.height / 2);
                const s = to.width / from.width;
                holder.style.animation = 'none';
                holder.animate([
                    { transform: 'none' },
                    { transform: `translate(${dx * .5}px, ${dy * .3}px) scale(${(1 + s) / 2}) rotate(-12deg)`, offset: .5 },
                    { transform: `translate(${dx}px, ${dy}px) scale(${s})` }
                ], { duration: 850, easing: 'cubic-bezier(.6,0,.3,1)', fill: 'forwards' });
                overlay.querySelectorAll('.welcome-inner > :not(.welcome-avatar)').forEach(el =>
                    el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' }));
                overlay.querySelector('.orbit').style.display = 'none';
            }
            overlay.classList.add('is-leaving');
            setTimeout(() => {
                overlay.remove();
                document.documentElement.style.overflow = '';
                buddy.root.style.visibility = '';
                buddy.show();
            }, reduceMotion ? 50 : 850);
        }

        function onKey(e) { if (e.key === 'Enter' || e.key === 'Escape') { e.preventDefault(); enter(); } }
        cta.addEventListener('click', enter);
        overlay.addEventListener('click', e => { if (e.target === overlay) enter(); });
        addEventListener('keydown', onKey);
    }

    /* ---------- Démarrage ---------- */
    function init() {
        enhanceNav();
        scrollProgress();
        revealOnScroll();
        followCursor();

        const buddy = createBuddy();
        if (!storage.get('eya-welcome') && !/nointro/.test(location.search)) {
            showWelcome(buddy);
        } else {
            setTimeout(() => buddy.show(), 500);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
