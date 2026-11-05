// Interactions communes à toutes les pages.
(function () {
    'use strict';

    // Menu mobile
    var btn = document.querySelector('.menu-btn');
    var nav = document.querySelector('.nav');
    if (btn && nav) {
        btn.addEventListener('click', function () {
            var open = nav.classList.toggle('open');
            btn.setAttribute('aria-expanded', open);
            btn.textContent = open ? 'Fermer' : 'Menu';
        });
    }

    // Lien de la page courante
    var page = decodeURIComponent(location.pathname.split('/').pop() || 'acceuil.html').toLowerCase();
    if (page === 'index.html' || page === '') page = 'acceuil.html';
    document.querySelectorAll('.nav a').forEach(function (a) {
        if (a.getAttribute('href').toLowerCase() === page) a.setAttribute('aria-current', 'page');
    });

    // Année du pied de page
    document.querySelectorAll('[data-year]').forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });

    // Apparition douce au défilement
    var items = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('is-visible');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.12 });
        items.forEach(function (el) { io.observe(el); });
    } else {
        items.forEach(function (el) { el.classList.add('is-visible'); });
    }

    // L'avatar suit légèrement la souris
    var photo = document.querySelector('.hero-photo');
    var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (photo && !calm && window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', function (e) {
            var x = (e.clientX / window.innerWidth) * 2 - 1;
            var y = (e.clientY / window.innerHeight) * 2 - 1;
            photo.style.setProperty('--mx', x.toFixed(3));
            photo.style.setProperty('--my', y.toFixed(3));
        });
        document.addEventListener('mouseleave', function () {
            photo.style.setProperty('--mx', 0);
            photo.style.setProperty('--my', 0);
        });
    }

    // Formulaire de contact : ouvre la messagerie avec le message prérempli
    var form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var name = form.fullname.value.trim();
            var email = form.email.value.trim();
            var message = form.message.value.trim();
            var subject = 'Message de ' + name + ' via le portfolio';
            var body = message + '\n\n' + name + ' — ' + email;
            location.href = 'mailto:sahnouneya032@gmail.com?subject=' +
                encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        });
    }
    // Captures d'écran des projets : on masque les emplacements sans image
    // et on ouvre la capture en grand au clic.
    var galleries = document.querySelectorAll('.shots');
    if (galleries.length) {
        var box = document.createElement('dialog');
        box.className = 'lightbox';
        box.innerHTML = '<img alt=""><div class="lightbox-bar">' +
            '<button type="button" data-step="-1">Précédente</button>' +
            '<button type="button" data-close>Fermer</button>' +
            '<button type="button" data-step="1">Suivante</button></div>';
        document.body.appendChild(box);
        var bigImg = box.querySelector('img');
        var list = [], index = 0;

        function show(i) {
            index = (i + list.length) % list.length;
            bigImg.src = list[index].href;
            bigImg.alt = list[index].querySelector('img').alt;
        }

        box.addEventListener('click', function (e) {
            if (e.target === box || e.target.hasAttribute('data-close')) box.close();
            else if (e.target.hasAttribute('data-step')) show(index + Number(e.target.getAttribute('data-step')));
        });
        box.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowRight') show(index + 1);
            if (e.key === 'ArrowLeft') show(index - 1);
        });

        galleries.forEach(function (gallery) {
            function refresh() {
                var visible = gallery.querySelectorAll('li:not([hidden])').length;
                var note = gallery.nextElementSibling;
                var hasNote = note && note.classList.contains('shots-empty');
                if (!visible && !hasNote) {
                    note = document.createElement('p');
                    note.className = 'shots-empty';
                    note.textContent = "Captures d'écran bientôt disponibles";
                    gallery.after(note);
                } else if (visible && hasNote) {
                    note.remove();
                }
                gallery.hidden = !visible;
            }
            gallery.querySelectorAll('img').forEach(function (img) {
                function hide() { img.closest('li').hidden = true; refresh(); }
                img.addEventListener('error', hide);
                if (img.complete && !img.naturalWidth) hide();
            });
            gallery.addEventListener('click', function (e) {
                var link = e.target.closest('a');
                if (!link || typeof box.showModal !== 'function') return;
                e.preventDefault();
                list = Array.prototype.slice.call(gallery.querySelectorAll('li:not([hidden]) a'));
                box.showModal();
                show(list.indexOf(link));
            });
        });
    }
})();
