/**
 * Template Name: Folio
 * Updated: Nov 17 2023 with Bootstrap v5.3.2
 * Template URL: https://bootstrapmade.com/folio-bootstrap-portfolio-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  'use strict';

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header');
    let offset = header.offsetHeight;

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth',
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header');
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled');
      } else {
        selectHeader.classList.remove('header-scrolled');
      }
    };
    window.addEventListener('load', headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    'click',
    '.navbar .dropdown > a',
    function (e) {
      if (select('#navbar').classList.contains('navbar-mobile')) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle('dropdown-active');
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    'click',
    '.scrollto',
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select('#navbar');
        if (navbar.classList.contains('navbar-mobile')) {
          navbar.classList.remove('navbar-mobile');
          let navbarToggle = select('.mobile-nav-toggle');
          navbarToggle.classList.toggle('bi-list');
          navbarToggle.classList.toggle('bi-x');
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed');
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  //audio song
  jQuery(function ($) {
    var supportsAudio = !!document.createElement('audio').canPlayType;
    if (supportsAudio) {
      var index = 0,
        playing = false,
        tracks = [
          {
            track: 1,
            name: 'Shreksophone Full With Dj',
            length: '01:43',
            file: 'https://soundeffectpro.com/store/ka38d.mp3',
          },
          {
            track: 2,
            name: 'Shreksophone Full With Dj',
            length: '01:43',
            file: 'https://soundeffectpro.com/store/ka38d.mp3',
          },
          {
            track: 3,
            name: 'Shreksophone Full With Dj',
            length: '01:43',
            file: 'https://soundeffectpro.com/store/ka38d.mp3',
          },
          {
            track: 4,
            name: 'never gonna give you up',
            length: '01:43',
            file: ' https://pub-e4b361e7ef3c4f778ebc24411b9ef1eb.r2.dev/2022/02/Rick-Roll-Sound-Effect.mp3',
          },
        ],
        trackCount = tracks.length,
        npAction = $('#npAction'),
        npTitle = $('#npTitle'),
        audio = $('#audio1')
          .bind('play', function () {
            playing = true;
            npAction.text('Now Playing:');
          })
          .bind('pause', function () {
            playing = false;
            npAction.text('Paused:');
          })
          .bind('ended', function () {
            npAction.text('Paused:');
            if (index + 1 < trackCount) {
              index++;
              loadTrack(index);
              audio.play();
            } else {
              audio.pause();
              index = 0;
              loadTrack(index);
            }
          })
          .get(0),
        btnPrev = $('#btnPrev').click(function () {
          if (index - 1 > -1) {
            index--;
            loadTrack(index);
            if (playing) {
              audio.play();
            }
          } else {
            audio.pause();
            index = 0;
            loadTrack(index);
          }
        }),
        btnNext = $('#btnNext').click(function () {
          if (index + 1 < trackCount) {
            index++;
            loadTrack(index);
            if (playing) {
              audio.play();
            }
          } else {
            audio.pause();
            index = 0;
            loadTrack(index);
          }
        }),
        loadTrack = function (id) {
          $('.plSel').removeClass('plSel');
          $('#plTrack>div:eq(' + id + ')').addClass('plSel');
          npTitle.text(tracks[id].name);
          index = id;
          audio.src = tracks[id].file;
        },
        displayTrack = function () {
          var parent = $('#plTrack');
          $.each(tracks, function (i, track) {
            $('<div></div>')
              .addClass('row')
              .append($('<div></div>').addClass('col-sm').text(track.track))
              .append($('<div></div>').addClass('col-sm').text(track.name))
              .append($('<div></div>').addClass('col-sm').text(track.length))
              .appendTo(parent);
          });
        },
        playTrack = function (id) {
          loadTrack(id);
          audio.play();
        };

      displayTrack();
      loadTrack(index);
    }
  });
})();
