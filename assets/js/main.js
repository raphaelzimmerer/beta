
(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

 // Dienst Service

 document.addEventListener("DOMContentLoaded", function () {
  const tabLinks = document.querySelectorAll('.services-list a[href^="#"]');
  const tabContents = document.querySelectorAll('.service-content');

  const isGerman = document.documentElement.lang === 'de' || window.location.pathname.includes('/de/');
  const isIndexPage = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');

  let activeServiceId = null;

  function isServiceTab(id) {
    return document.getElementById(id)?.classList.contains('service-content');
  }

  function switchTab(serviceId, updateHistory = true, doScroll = false) {
    if (!isServiceTab(serviceId)) return;

    // Alle Inhalte verstecken
    tabContents.forEach(content => {
      content.style.display = 'none';
      content.classList.remove('active');
    });

    // Alle Tabs deaktivieren
    tabLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Ziel anzeigen
    const targetContent = document.getElementById(serviceId);
    const targetLink = document.querySelector(`.services-list a[href="#${serviceId}"]`);

    if (targetContent) {
      targetContent.style.display = 'block';
      targetContent.classList.add('active');
      activeServiceId = serviceId;
    }

    if (targetLink) {
      targetLink.classList.add('active');
    }

    if (updateHistory) {
      history.replaceState(null, null, `#${serviceId}`);
    }

    if (doScroll && !isIndexPage) {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: isGerman ? 'auto' : 'smooth'
        });
      });
    }
  }

  // Klick auf Tab-Links in Services-Liste
  tabLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const serviceId = this.getAttribute('href').substring(1);
      switchTab(serviceId, true, true);
    });
  });

  // Initiales Aktivieren – auch bei Footer-Links direkt beim Seitenaufruf
  function handleInitialTab() {
    const hash = window.location.hash.substring(1);
    if (hash && isServiceTab(hash)) {
      switchTab(hash, false, true); // scroll = true → auch aus Footer sichtbar
    } else if (!hash && tabLinks.length > 0) {
      const firstTabId = tabLinks[0].getAttribute('href').substring(1);
      switchTab(firstTabId, false, false);
    }
  }

  handleInitialTab();

  // Hash-Änderung z. B. durch Footer-Link
  window.addEventListener('hashchange', function () {
    const newHash = window.location.hash.substring(1);
    if (isServiceTab(newHash)) {
      switchTab(newHash, false, true);
    } else if (activeServiceId) {
      // Kein Service-Inhalt → bisherigen Tab aktiv lassen
      switchTab(activeServiceId, false, false);
    }
  });
});


 
// ENDE Dienst Service


  /**
   * Table Navigation for Products
   */
  function setupTableNavigation() {
    document.querySelectorAll('.table-navigation .btn').forEach(button => {
      button.addEventListener('click', () => {
        // Entferne die aktive Klasse von allen Buttons
        document.querySelectorAll('.table-navigation .btn').forEach(btn => {
          btn.classList.remove('active');
        });

        // Füge die aktive Klasse zum geklickten Button hinzu
        button.classList.add('active');

        // Verstecke alle Tabellen (außer Downloads)
        document.querySelectorAll('.portfolio-info').forEach(table => {
          if (table.id !== 'downloads') {
            table.style.display = 'none';
          }
        });

        // Zeige die ausgewählte Tabelle an
        const target = button.getAttribute('data-target');
        if (target) {
          const targetTable = document.getElementById(target);
          if (targetTable) {
            targetTable.style.display = 'block';
          }
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', setupTableNavigation);

  //LIGHTBOX FÜR PRODUCT_DETAILS
  
  document.addEventListener('DOMContentLoaded', function() {
    // Lightbox-Element erstellen
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-container">
        <img src="" alt="" class="lightbox-img">
        <div class="lightbox-nav">
          <button class="lightbox-nav-btn prev" title="">
            <i class="bi bi-chevron-left"></i>
          </button>
          <button class="lightbox-nav-btn next" title="">
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>
        <button class="lightbox-close" title="">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    `;
    document.body.appendChild(lightbox);
  
    // Elemente selektieren
    const portfolioImages = document.querySelectorAll('.portfolio-details-slider img');
    const lightboxImg = document.querySelector('.lightbox-img');
    const prevBtn = document.querySelector('.lightbox-nav-btn.prev');
    const nextBtn = document.querySelector('.lightbox-nav-btn.next');
    const closeBtn = document.querySelector('.lightbox-close');
    let currentImageIndex = 0;
  
    // Lightbox-Stile im Seitenstil
    const lightboxStyles = `
      .lightbox {
        display: none;
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.9);
        justify-content: center;
        align-items: center;
      }
      
      .lightbox-container {
        position: relative;
        width: 90%;
        max-width: 1200px;
        height: 90vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .lightbox-img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 4px;
      }
      
      .lightbox-nav {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: space-between;
        pointer-events: none;
      }
      
      .lightbox-nav-btn {
        pointer-events: auto;
        width: 50px;
        height: 50px;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s;
        margin: 0 20px;
      }
      
      .lightbox-nav-btn:hover {
        background: var(--accent-color);
        transform: scale(1.1);
      }
      
      .lightbox-close {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s;
      }
      
      .lightbox-close:hover {
        background: var(--accent-color);
        transform: rotate(90deg);
      }
      
      /* Pfeile ausblenden wenn nur ein Bild */
      .lightbox-single-image .lightbox-nav {
        display: none !important;
      }
      
      @media (max-width: 768px) {
        .lightbox-nav-btn {
          width: 40px;
          height: 40px;
          margin: 0 10px;
        }
        
        .lightbox-close {
          top: 10px;
          right: 10px;
        }
      }
    `;
  
    // Styles hinzufügen
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      ${lightboxStyles}
      
      /* Einfache Pointer-Erweiterung */
      .portfolio-image {
        cursor: pointer;
        transition: transform 0.2s ease;
      }
      
      .portfolio-image:hover {
        transform: scale(1.01);
      }
    `;
    document.head.appendChild(styleElement);
  
    // Bilder durchklicken
    portfolioImages.forEach((img, index) => {
      img.classList.add('portfolio-image');
      
      img.addEventListener('click', (e) => {
        e.preventDefault();
        currentImageIndex = index;
        updateLightboxImage();
        updateLightboxUI();
        openLightbox();
      });
    });
    
    // Lightbox Funktionen
    function updateLightboxImage() {
      const imgSrc = portfolioImages[currentImageIndex].src;
      lightboxImg.src = imgSrc;
      lightboxImg.alt = portfolioImages[currentImageIndex].alt || '';
    }
    
    function updateLightboxUI() {
      if (portfolioImages.length <= 1) {
        lightbox.classList.add('lightbox-single-image');
      } else {
        lightbox.classList.remove('lightbox-single-image');
      }
    }
  
    function openLightbox() {
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      updateLightboxUI();
    }
  
    function closeLightbox() {
      lightbox.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  
    function showNextImage() {
      currentImageIndex = (currentImageIndex + 1) % portfolioImages.length;
      updateLightboxImage();
    }
  
    function showPrevImage() {
      currentImageIndex = (currentImageIndex - 1 + portfolioImages.length) % portfolioImages.length;
      updateLightboxImage();
    }
  
    // Initialen UI-Status setzen
    updateLightboxUI();
  
    // Event Listener
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showNextImage();
    });
  
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showPrevImage();
    });
  
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeLightbox();
    });
  
    // Für Desktop: Nur schließen wenn auf den Hintergrund geklickt wird
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  
    // Für Mobile: Schließen bei Klick auf Bild oder Hintergrund
    const lightboxContainer = document.querySelector('.lightbox-container');
    lightboxContainer.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        closeLightbox();
      }
    });
  
    // Verhindere, dass Klicks auf die Navigation das Schließen auslösen
    prevBtn.addEventListener('click', (e) => e.stopPropagation());
    nextBtn.addEventListener('click', (e) => e.stopPropagation());
    lightboxImg.addEventListener('click', (e) => e.stopPropagation());
  
    // Tastatur-Navigation
    document.addEventListener('keydown', (e) => {
      if (lightbox.style.display === 'flex') {
        switch (e.key) {
          case 'ArrowRight':
            showNextImage();
            break;
          case 'ArrowLeft':
            showPrevImage();
            break;
          case 'Escape':
            closeLightbox();
            break;
        }
      }
    });
  
    // Touch-Swipe für Mobile
    let touchStartX = 0;
    let touchEndX = 0;
  
    lightbox.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
  
    lightbox.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  
    function handleSwipe() {
      if (touchEndX < touchStartX - 50) showNextImage();
      if (touchEndX > touchStartX + 50) showPrevImage();
    }
});


// Produkte Mobile

document.addEventListener('DOMContentLoaded', function() {
  // Nur auf Touch-Geräten ausführen
  if ('ontouchstart' in window || navigator.maxTouchPoints) {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    let activeItem = null;
    
    // Intersection Observer Optionen
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // 40% des Elements müssen sichtbar sein
    };
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        const portfolioInfo = entry.target.querySelector('.portfolio-info');
        
        // Finde das zentralste sichtbare Element
        if (entry.isIntersecting) {
          const itemRect = entry.target.getBoundingClientRect();
          const viewportCenter = window.innerHeight / 2;
          const itemCenter = itemRect.top + itemRect.height / 2;
          const distanceToCenter = Math.abs(viewportCenter - itemCenter);
          
          // Wenn kein aktives Item oder dieses Item näher am Zentrum ist
          if (!activeItem || distanceToCenter < activeItem.distance) {
            // Altes aktives Item zurücksetzen
            if (activeItem) {
              activeItem.element.querySelector('.portfolio-info').style.opacity = '0';
              activeItem.element.querySelector('.portfolio-info').style.bottom = '-100%';
            }
            
            // Neues aktives Item setzen
            activeItem = {
              element: entry.target,
              distance: distanceToCenter
            };
            
            portfolioInfo.style.opacity = '1';
            portfolioInfo.style.bottom = '0';
          } else {
            // Nicht das zentralste Element -> ausblenden
            portfolioInfo.style.opacity = '0';
            portfolioInfo.style.bottom = '-100%';
          }
        } else {
          // Nicht sichtbar -> ausblenden
          portfolioInfo.style.opacity = '0';
          portfolioInfo.style.bottom = '-100%';
        }
      });
    }, options);
    
    // Observer für jedes Portfolio-Item initialisieren
    portfolioItems.forEach(item => {
      observer.observe(item);
    });
    
    // Bei Scroll-Events das zentralste Element neu berechnen
    window.addEventListener('scroll', function() {
      if (!activeItem) return;
      
      const viewportCenter = window.innerHeight / 2;
      let closestItem = null;
      let minDistance = Infinity;
      
      portfolioItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) { // Wenn sichtbar
          const itemCenter = rect.top + rect.height / 2;
          const distance = Math.abs(viewportCenter - itemCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestItem = item;
          }
        }
      });
      
      if (closestItem && closestItem !== activeItem.element) {
        // Altes aktives Item zurücksetzen
        activeItem.element.querySelector('.portfolio-info').style.opacity = '0';
        activeItem.element.querySelector('.portfolio-info').style.bottom = '-100%';
        
        // Neues aktives Item setzen
        activeItem = {
          element: closestItem,
          distance: minDistance
        };
        
        closestItem.querySelector('.portfolio-info').style.opacity = '1';
        closestItem.querySelector('.portfolio-info').style.bottom = '0';
      }
    });
  }
});



  /**
 * Product Hotspots
 */
function setupProductHotspots() {
  // Vollständige Produktdaten mit Deutsch/Englisch Unterstützung
  const products = {
      de: {
          1: {
              title: "Modcon Transmitter",
              description: "Ermöglicht die zuverlässige Datenübertragung in industriellen Netzwerken",
              link: "/de/produkte/modbus-transmitter.html",
              position: { top: "58%", left: "72%" }
          },
          2: {
              title: " Pegelmesssystem",
              description: "Eine zuverlässige Lösung zur Messung des Wasserstands in Tiefbrunnen",
              link: "/de/produkte/pegelmesssystem.html",
              position: { top: "80%", left: "65%" }
          },
          3: {
              title: "Abstandmessung",
              description: "Präzise Messung von Pegelständen und Abständen mit Radar-Technologie",
              link: "/de/produkte/radar-pegelmessung.html",
              position: { top: "83%", left: "26%" }
          },
          4: {
              title: "Gasdrucksensor",
              description: "Ein hochpräziser Sensor zur Messung des Gasdrucks",
              link: "/de/produkte/gasdrucksensor.html",
              position: { top: "50%", left: "7%" }
          },
          5: {
              title: "Raumluftsensor",
              description: "Überwacht die Luftqualität in Innenräumen",
              link: "/de/produkte/raumluftsensor.html",
              position: { top: "31%", left: "40%" }
          }
      },
      en: {
          1: {
              title: "Modbus Transmitter",
              description: "Enables reliable data transmission in industrial networks",
              link: "/en/products/modbus-transmitter.html",
              position: { top: "57%", left: "72%" }
          },
          2: {
              title: "Level Measurement System",
              description: "A reliable solution for measuring water levels in deep wells",
              link: "/en/products/level-measurement-system.html",
              position: { top: "80%", left: "65%" }
          },
          3: {
              title: "Radar Level Sensor",
              description: "Precise measurement of levels and distances using radar technology",
              link: "/en/products/radar-level-sensor.html",
              position: { top: "80%", left: "30%" }
          },
          4: {
              title: "Gas Pressure Sensor",
              description: "A highly precise sensor for measuring gas pressure",
              link: "/en/products/gas-pressure-sensor.html",
              position: { top: "50%", left: "7%" }
          },
          5: {
              title: "Indoor Air Sensor",
              description: "Monitors indoor air quality",
              link: "/en/products/indoor-air-sensor.html",
              position: { top: "30%", left: "40%" }
          }
      }
  };

  // Aktuelle Sprache bestimmen (kann aus dem HTML oder Browser-Sprache gelesen werden)
  const currentLanguage = document.documentElement.lang === 'en' ? 'en' : 'de';
  const currentProducts = products[currentLanguage];

  let activeHotspot = null;
  const hotspotsContainer = document.getElementById('hotspots');

  if (hotspotsContainer) {
      // Alte Hotspots entfernen
      hotspotsContainer.innerHTML = '';

      Object.keys(currentProducts).forEach(productId => {
          const product = currentProducts[productId];
          const hotspot = document.createElement('div');
          
          hotspot.className = 'hotspot';
          hotspot.style.top = product.position.top;
          hotspot.style.left = product.position.left;
          hotspot.setAttribute('data-id', productId);
          
          hotspot.addEventListener('click', function(e) {
              e.stopPropagation();
              
              if (activeHotspot === this) return;
              
              if (activeHotspot) {
                  activeHotspot.classList.remove('active');
              }
              
              activeHotspot = this;
              this.classList.add('active');
              
              const tooltip = document.getElementById('tooltip');
              if (tooltip) {
                  tooltip.innerHTML = `
                      <h4>${product.title}</h4>
                      <p>${product.description}</p>
                      <a href="${product.link}" class="btn" target="_blank">${currentLanguage === 'de' ? 'Mehr erfahren' : 'Learn more'}</a>
                  `;
                  tooltip.style.display = 'block';
                  positionTooltip(this);
              }
          });
          
          hotspotsContainer.appendChild(hotspot);
      });

      function positionTooltip(hotspot) {
          const tooltip = document.getElementById('tooltip');
          if (!tooltip) return;
          
          const rect = hotspot.getBoundingClientRect();
          
          if (rect.right + tooltip.offsetWidth < window.innerWidth) {
              tooltip.style.left = rect.right + 'px';
          } else {
              tooltip.style.left = (rect.left - tooltip.offsetWidth) + 'px';
          }
          
          tooltip.style.top = rect.top + 'px';
      }

      document.addEventListener('click', function(e) {
          if (!e.target.closest('.hotspot') && !e.target.closest('.hotspot-tooltip')) {
              if (activeHotspot) {
                  activeHotspot.classList.remove('active');
                  activeHotspot = null;
              }
              const tooltip = document.getElementById('tooltip');
              if (tooltip) {
                  tooltip.style.display = 'none';
              }
          }
      });

      window.addEventListener('resize', function() {
          if (activeHotspot) {
              positionTooltip(activeHotspot);
          }
      });
  }

  // Sprache umschalten Funktion (kann von einem Button aufgerufen werden)
  window.changeLanguage = function(lang) {
      if (products[lang]) {
          document.documentElement.lang = lang;
          setupProductHotspots(); // Hotspots neu initialisieren
      }
  };
}

document.addEventListener('DOMContentLoaded', setupProductHotspots);



})();

//Language Switcher

document.addEventListener('DOMContentLoaded', function() {
  // Elemente selektieren
  const toggleBtn = document.getElementById('languageToggle');
  const dropdown = document.getElementById('languageDropdown');
  const currentLangSpan = document.querySelector('.current-lang');
  
  // Komplettes Mapping aller Seiten
  const pageMappings = {
    // Hauptseiten
    'index': {
      de: 'index.html',
      en: 'index.html',
      anchors: {
        // Anker für Indexseite
        '#ueber-uns': '#about-us',
        '#loesungen': '#solutions',
        '#produkte': '#products',
        '#kontakt': '#contact',
        // Umgekehrte Zuordnung
        '#about-us': '#ueber-uns',
        '#solutions': '#loesungen',
        '#products': '#produkte',
        '#contact': '#kontakt',
      }
    },
    // Lösungsseite mit Ankerpunkten
    'loesungen': {
      de: 'loesungen.html',
      en: 'solutions.html',
      anchors: {
        '#energiemonitoring': '#energy-monitoring',
        '#heizungssteuerung': '#heating-control',
        '#hydrometrie': '#hydrometry',
        '#hochwasserschutz': '#flood-protection',
        '#fernwaermeueberwachung': '#district-heating-monitoring',
        '#gasdichtemonitoring': '#gas-density-monitoring',
        // Umgekehrte Zuordnung für EN->DE
        '#energy-monitoring': '#energiemonitoring',
        '#heating-control': '#heizungssteuerung',
        '#hydrometry': '#hydrometrie',
        '#flood-protection': '#hochwasserschutz',
        '#district-heating-monitoring': '#fernwaermeueberwachung',
        '#gas-density-monitoring': '#gasdichtemonitoring'
      }
    },
    // LoRaWAN Seite
    'lorawan': {
      de: 'lorawan.html',
      en: 'lorawan.html'
    },
    // Produktseiten (komplett)
    'gasdrucksensor': {
      de: 'produkte/gasdrucksensor.html',
      en: 'products/gas-pressure-sensor.html'
    },
    'kamera-zaehlerablesung': {
      de: 'produkte/kamera-zaehlerablesung.html',
      en: 'products/camera-meter-reading.html'
    },
    'lora-businterface': {
      de: 'produkte/lora-businterface.html',
      en: 'products/lora-businterface.html'
    },
    'pegelsonde': {
      de: 'produkte/pegelmesssystem.html',
      en: 'products/level-measurement-system.html'
    },
    'radar-flussgeschwindigkeit': {
      de: 'produkte/radar-flussgeschwindigkeit.html',
      en: 'products/radar-flow-velocity.html'
    },
    'radar-pegelmessung': {
      de: 'produkte/radar-fuellstandssensor.html',
      en: 'products/radar-level-sensor.html'
    },
    'raumluftsensor': {
      de: 'produkte/raumluftsensor.html',
      en: 'products/indoor-air-sensor.html'
    },
    'rs485-converter': {
      de: 'produkte/modbus-transmitter.html',
      en: 'products/modbus-transmitter.html'
    }
  };

  // Ermittelt den aktuellen Seitenkey
  const getCurrentPageKey = () => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    
    // Für Lösungsseiten
    if (path.includes('solutions.html') || path.includes('loesungen.html')) {
      return 'loesungen';
    }
    
    // Für LoRaWAN Seite
    if (path.includes('lorawan.html')) {
      return 'lorawan';
    }
    
    // Für Produktseiten
    if (path.includes('/produkte/') || path.includes('/products/')) {
      const productPath = path.includes('/produkte/') 
        ? path.split('/produkte/')[1] 
        : path.split('/products/')[1];
      const productKey = productPath.replace('.html', '');
      
      // Finde den passenden Schlüssel im Mapping
      for (const [key, value] of Object.entries(pageMappings)) {
        if (value.de && value.de.includes(productKey) || 
            value.en && value.en.includes(productKey)) {
          return key;
        }
      }
    }
    
    // Für Hauptseite
    if (path.endsWith('/') || path.endsWith('/index.html')) {
      return 'index';
    }
    
    // Fallback
    return 'index';
  };
  
  // Übersetzt Ankerpunkte
  const translateAnchor = (currentKey, currentHash, targetLang) => {
    if (!currentHash) return '';
    
    const mapping = pageMappings[currentKey];
    if (!mapping || !mapping.anchors) return currentHash;
    
    return mapping.anchors[currentHash] || currentHash;
  };
  
  const switchLanguage = (targetLang) => {
    const currentPageKey = getCurrentPageKey();
    const currentHash = window.location.hash;
    const mapping = pageMappings[currentPageKey] || pageMappings['index'];
    const currentLang = window.location.pathname.includes('/en/') ? 'en' : 'de';
    
    // Wenn wir bereits in der Zielsprache sind, nichts tun
    if (currentLang === targetLang) return;
    
    // Baue den neuen Pfad
    let newPath = targetLang === 'de' ? '/de/' : '/en/';
    
    if (mapping[targetLang]) {
      // Für die Indexseite keinen Dateinamen anhängen
      if (currentPageKey === 'index') {
        newPath = newPath.replace('index.html', '');
      } else {
        newPath += mapping[targetLang];
      }
    } else {
      // Fallback für nicht gemappte Seiten
      newPath += currentPageKey + '.html';
    }
    
    // Behandlung der Indexseite
    if (newPath.endsWith('index.html')) {
      newPath = newPath.replace('index.html', '');
    }
    
    // Füge übersetzten Ankerpunkt hinzu
    const translatedHash = translateAnchor(currentPageKey, currentHash, targetLang);
    newPath += translatedHash;

    // Führe die Navigation durch
    window.location.href = newPath;
  };

  // Initialisiere die aktuelle Sprache
  const updateLanguageDisplay = () => {
    const currentLang = window.location.pathname.includes('/en/') ? 'en' : 'de';
    currentLangSpan.textContent = currentLang === 'en' ? 'EN' : 'DE';
  };
  updateLanguageDisplay();

  // Event-Handler für Sprachumschaltung
  toggleBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown?.classList.toggle('visible');
  });

  document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLang = option.getAttribute('data-lang');
      switchLanguage(targetLang);
    });
  });

  // Schließe Dropdown beim Klick außerhalb
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.floating-language')) {
      dropdown?.classList.remove('visible');
    }
  });

  // Footer-Beobachtung für den Floating-Button
  const floatingLanguage = document.querySelector('.floating-language');
  const footer = document.querySelector('footer');

  if (footer && floatingLanguage) {
    new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        floatingLanguage.classList.toggle('visible', entry.isIntersecting);
      });
    }, { threshold: 0.9 }).observe(footer);
  }

  // Behandle Browser-Zurück-Button
  window.addEventListener('popstate', updateLanguageDisplay);
});



// Cookie Banner

document.addEventListener('DOMContentLoaded', function() {
  // Elemente auswählen
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieContent = document.querySelector('.cookie-content');
  const cookieSettings = document.getElementById('cookie-settings-expanded');
  const acceptBtn = document.getElementById('accept-cookies');
  const declineBtn = document.getElementById('decline-cookies');
  const settingsBtn = document.getElementById('settings-cookies');
  const saveSettingsBtn = document.getElementById('save-settings');
  const analyticsCheckbox = document.getElementById('analytics-cookies');
  const marketingCheckbox = document.getElementById('marketing-cookies');

  // Aktuelle Einstellungen im Speicher halten
  let currentSettings = null;

  // Prüfen, ob bereits eine Cookie-Einstellung gespeichert wurde
  const savedSettings = localStorage.getItem('cookieSettings');
  
  // Wenn keine Einstellung gespeichert ist, Banner anzeigen
  if (!savedSettings) {
    cookieBanner.style.display = 'block';
    currentSettings = {
      necessary: true,
      analytics: false,
      marketing: false
    };
  } else {
    // Bereits getroffene Einstellungen anwenden
    currentSettings = JSON.parse(savedSettings);
    applyCookieSettings(currentSettings);
    cookieBanner.style.display = 'none';
  }

  // Alle Cookies akzeptieren
  acceptBtn.addEventListener('click', function() {
    currentSettings = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    saveSettings(currentSettings);
    cookieBanner.style.display = 'none';
    cookieContent.style.display = 'flex';
    cookieSettings.style.display = 'none';
  });

  // Nur notwendige Cookies akzeptieren
  declineBtn.addEventListener('click', function() {
    currentSettings = {
      necessary: true,
      analytics: false,
      marketing: false
    };
    saveSettings(currentSettings);
    cookieBanner.style.display = 'none';
    cookieContent.style.display = 'flex';
    cookieSettings.style.display = 'none';
  });

  // Einstellungen öffnen
  settingsBtn.addEventListener('click', function() {
    cookieContent.style.display = 'none';
    cookieSettings.style.display = 'block';
    
    // Aktuelle Einstellungen in Checkboxes laden
    analyticsCheckbox.checked = currentSettings.analytics;
    marketingCheckbox.checked = currentSettings.marketing;
  });

  // Einstellungen speichern
  saveSettingsBtn.addEventListener('click', function() {
    currentSettings = {
      necessary: true,
      analytics: analyticsCheckbox.checked,
      marketing: marketingCheckbox.checked
    };
    saveSettings(currentSettings);
    cookieBanner.style.display = 'none';
    cookieContent.style.display = 'flex';
  });

  // Einstellungen speichern und SOFORT anwenden
  function saveSettings(settings) {
    localStorage.setItem('cookieSettings', JSON.stringify(settings));
    applyCookieSettings(settings); // Wichtig: Sofort anwenden!
  }

  // Cookie-Einstellungen SOFORT anwenden
  function applyCookieSettings(settings) {
    console.log('Aktive Cookie-Einstellungen:', settings);
    
    // Hier je nach Einstellungen Cookies SOFORT laden/entfernen
    if (settings.analytics) {
      console.log('Analytics-Cookies SOFORT aktiviert');
      loadAnalyticsCookies();
    } else {
      console.log('Analytics-Cookies SOFORT deaktiviert');
      removeAnalyticsCookies();
    }
    
    if (settings.marketing) {
      console.log('Marketing-Cookies SOFORT aktiviert');
      loadMarketingCookies();
    } else {
      console.log('Marketing-Cookies SOFORT deaktiviert');
      removeMarketingCookies();
    }
  }

  // Beispiel-Funktionen für Cookie-Handling
  function loadAnalyticsCookies() {
    // Implementierung für Analytics-Cookies (z.B. Google Analytics)
    // Wird SOFORT beim Speichern ausgeführt
  }

  function removeAnalyticsCookies() {
    // Implementierung zum SOFORTIGEN Entfernen von Analytics-Cookies
  }

  function loadMarketingCookies() {
    // Implementierung für Marketing-Cookies
    // Wird SOFORT beim Speichern ausgeführt
  }

  function removeMarketingCookies() {
    // Implementierung zum SOFORTIGEN Entfernen von Marketing-Cookies
  }

  // Schließen beim Klick außerhalb des Modals
  window.addEventListener('click', function(event) {
    if (event.target.className === 'modal') {
      event.target.style.display = 'none';
    }
  });

  document.getElementById('open-settings').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Setze Banner zurück und zeige es an
    const banner = document.getElementById('cookie-banner');
    banner.style.display = 'block';
    document.querySelector('.cookie-content').style.display = 'flex';
    document.getElementById('cookie-settings-expanded').style.display = 'none';
  });
});


