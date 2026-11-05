// Interactions communes à toutes les pages.
(function () {
    'use strict';

    // Menu mobile (collapse Bootstrap) : on change seulement le texte du bouton
    var btn = document.querySelector('.menu-btn');
    var nav = document.getElementById('nav');
    if (btn && nav) {
        nav.addEventListener('show.bs.collapse', function () { btn.textContent = 'Fermer'; });
        nav.addEventListener('hide.bs.collapse', function () { btn.textContent = 'Menu'; });
    }

    // Lien de la page courante
    var page = decodeURIComponent(location.pathname.split('/').pop() || 'acceuil.html').toLowerCase();
    if (page === 'index.html' || page === '') page = 'acceuil.html';
    document.querySelectorAll('.navbar-nav a').forEach(function (a) {
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
    // Captures d'écran des projets : on masque les emplacements sans image,
    // puis un clic ouvre les captures dans un modal Bootstrap avec carrousel.
    var galleries = document.querySelectorAll('.shots');
    var modalEl = null;

    function buildModal() {
        var holder = document.createElement('div');
        holder.innerHTML =
            '<div class="modal fade shot-modal" id="shot-modal" tabindex="-1" aria-labelledby="shot-modal-title" aria-hidden="true">' +
            '<div class="modal-dialog modal-xl modal-dialog-centered"><div class="modal-content">' +
            '<div class="modal-header"><h2 class="modal-title" id="shot-modal-title"></h2>' +
            '<button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fermer"></button></div>' +
            '<div id="shot-carousel" class="carousel slide"><div class="carousel-inner"></div>' +
            '<button class="carousel-control-prev" type="button" data-bs-target="#shot-carousel" data-bs-slide="prev">' +
            '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Précédente</span></button>' +
            '<button class="carousel-control-next" type="button" data-bs-target="#shot-carousel" data-bs-slide="next">' +
            '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Suivante</span></button>' +
            '</div></div></div></div>';
        modalEl = holder.firstChild;
        document.body.appendChild(modalEl);
    }

    function openShots(gallery, link) {
        if (!modalEl) buildModal();
        var links = Array.prototype.slice.call(gallery.querySelectorAll('li:not([hidden]) a'));
        var start = Math.max(0, links.indexOf(link));
        var carouselEl = modalEl.querySelector('.carousel');
        var inner = carouselEl.querySelector('.carousel-inner');
        inner.innerHTML = '';
        links.forEach(function (l, i) {
            var item = document.createElement('div');
            item.className = 'carousel-item' + (i === start ? ' active' : '');
            var img = document.createElement('img');
            img.src = l.href;
            img.alt = l.querySelector('img').alt;
            item.appendChild(img);
            inner.appendChild(item);
        });
        carouselEl.querySelectorAll('.carousel-control-prev, .carousel-control-next').forEach(function (c) {
            c.hidden = links.length < 2;
        });
        modalEl.querySelector('.modal-title').textContent = gallery.getAttribute('aria-label') || '';
        var old = bootstrap.Carousel.getInstance(carouselEl);
        if (old) old.dispose();
        bootstrap.Carousel.getOrCreateInstance(carouselEl, { interval: false, ride: false, keyboard: true });
        bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }

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
            // Sans Bootstrap, le lien ouvre simplement l'image.
            if (!link || !window.bootstrap) return;
            e.preventDefault();
            openShots(gallery, link);
        });
    });
})();
