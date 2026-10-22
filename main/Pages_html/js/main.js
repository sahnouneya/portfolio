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
            location.href = 'mailto:eyas92931@gmail.com?subject=' +
                encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        });
    }
})();
