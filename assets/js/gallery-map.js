/* ============================================================================
   Interactive map gallery  (Leaflet)  —  inspired by GPS Visualizer
   ----------------------------------------------------------------------------
   Builds the photo grid AND the map from window.GALLERY_PHOTOS (see
   gallery-map-data.js). Markers are photo thumbnails; hover shows a tooltip,
   click opens a popup with the full photo. Map and grid are linked both ways.
   Runs before main.js so GLightbox (initialised there) picks up the grid.
   ========================================================================== */
(function () {
  "use strict";

  var photos = window.GALLERY_PHOTOS || [];
  var grid = document.querySelector("#gallery .gallery-grid");
  var mapEl = document.getElementById("gallery-map");
  if (!grid || !photos.length) return;

  // --- 1. Build the grid (single source of truth = the data file) ----------
  photos.forEach(function (p, i) {
    var a = document.createElement("a");
    a.href = p.full;
    a.className = "gallery-item portfolio-lightbox";
    a.setAttribute("data-gallery", "field-gallery");
    a.setAttribute("data-glightbox", "title: " + p.title + "; description: " + p.caption);
    a.setAttribute("data-index", i);

    var img = document.createElement("img");
    img.src = p.thumb;
    img.alt = p.title + " — " + p.caption;
    img.loading = "lazy";

    var cap = document.createElement("span");
    cap.className = "gallery-cap";
    cap.textContent = p.title;

    a.appendChild(img);
    a.appendChild(cap);
    grid.appendChild(a);
  });

  var gridItems = grid.querySelectorAll(".gallery-item");

  // --- 2. Build the map ----------------------------------------------------
  if (!mapEl || typeof L === "undefined") return;

  var located = photos
    .map(function (p, i) { return { p: p, i: i }; })
    .filter(function (o) { return typeof o.p.lat === "number" && typeof o.p.lng === "number"; });

  var map = L.map(mapEl, {
    scrollWheelZoom: false,      // don't hijack page scroll; ctrl+wheel still zooms
    zoomControl: true,
    attributionControl: true
  });

  // Dark basemap to match the theme — Esri Dark Gray Canvas (no API key required).
  // Base terrain layer, then a reference layer for place labels.
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}", {
    attribution:
      'Tiles &copy; Esri &mdash; Esri, DeLorme, HERE, &copy; ' +
      '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxNativeZoom: 16,
    maxZoom: 19
  }).addTo(map);

  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}", {
    maxNativeZoom: 16,
    maxZoom: 19,
    pane: "overlayPane"
  }).addTo(map);

  var markers = {};   // photo index -> marker

  located.forEach(function (o) {
    var p = o.p, i = o.i;

    var icon = L.divIcon({
      className: "photo-marker",
      html: '<span class="photo-marker__img" style="background-image:url(\'' +
              p.thumb + '\')"></span>',
      iconSize: [46, 46],
      iconAnchor: [23, 23],
      popupAnchor: [0, -22]
    });

    var marker = L.marker([p.lat, p.lng], { icon: icon, title: p.title, riseOnHover: true });

    // Hover tooltip: little thumbnail + title (GPS Visualizer style)
    marker.bindTooltip(
      '<span class="map-tip"><img src="' + p.thumb + '" alt="">' +
      '<b>' + p.title + '</b></span>',
      { direction: "top", offset: [0, -18], opacity: 1, className: "map-tip-wrap" }
    );

    // Optional meta line: "place · date" (only shown if provided)
    var meta = [p.place, p.date].filter(Boolean).join("  ·  ");

    // Click popup: full photo + caption, and a button that opens the lightbox
    marker.bindPopup(
      '<div class="map-pop">' +
        '<img src="' + p.full + '" alt="' + p.title + '">' +
        '<h4>' + p.title + '</h4>' +
        (meta ? '<span class="map-pop__meta">' + meta + '</span>' : '') +
        '<p>' + p.caption + '</p>' +
        '<button type="button" class="map-pop__open" data-open="' + i + '">View full</button>' +
      '</div>',
      { maxWidth: 260, className: "map-pop-wrap" }
    );

    marker.on("mouseover", function () { highlightGrid(i, true); });
    marker.on("mouseout",  function () { highlightGrid(i, false); });
    marker.on("popupopen", function () { scrollGridIntoView(i); });

    marker.addTo(map);
    markers[i] = marker;
  });

  // Frame all located photos
  if (located.length) {
    var bounds = L.latLngBounds(located.map(function (o) { return [o.p.lat, o.p.lng]; }));
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 11 });
  } else {
    map.setView([11.6, 78.0], 7);   // fallback: Tamil Nadu
  }

  // Recompute size once laid out (flex/sticky can mis-measure on first paint)
  setTimeout(function () { map.invalidateSize(); }, 200);

  // The map height is viewport-relative, so re-measure (and re-frame) on resize
  // and on orientation change, otherwise Leaflet leaves grey gaps where tiles
  // were never requested for the new size.
  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      map.invalidateSize();
      if (located.length) {
        map.fitBounds(
          L.latLngBounds(located.map(function (o) { return [o.p.lat, o.p.lng]; })),
          { padding: [40, 40], maxZoom: 11, animate: false }
        );
      }
    }, 150);
  });

  // --- 3. Link grid <-> map ------------------------------------------------
  function highlightGrid(i, on) {
    var el = grid.querySelector('.gallery-item[data-index="' + i + '"]');
    if (el) el.classList.toggle("is-active", on);
  }
  function scrollGridIntoView(i) {
    var el = grid.querySelector('.gallery-item[data-index="' + i + '"]');
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  gridItems.forEach(function (el) {
    var i = parseInt(el.getAttribute("data-index"), 10);
    var m = markers[i];
    if (!m) return;
    // Hovering a grid photo pulses its marker
    el.addEventListener("mouseenter", function () {
      var node = m.getElement();
      if (node) node.classList.add("is-active");
    });
    el.addEventListener("mouseleave", function () {
      var node = m.getElement();
      if (node) node.classList.remove("is-active");
    });
    // A small "locate on map" affordance: shift-click a photo to fly to it
    // instead of opening the lightbox.
    el.addEventListener("click", function (ev) {
      if (ev.shiftKey) {
        ev.preventDefault();
        map.flyTo(m.getLatLng(), 12, { duration: 0.8 });
        m.openPopup();
      }
    });
  });

  // "View full" button inside a popup -> open GLightbox for that photo
  map.on("popupopen", function (e) {
    var btn = e.popup.getElement() &&
              e.popup.getElement().querySelector(".map-pop__open");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var idx = parseInt(btn.getAttribute("data-open"), 10);
      var link = grid.querySelector('.gallery-item[data-index="' + idx + '"]');
      if (link) link.click();     // triggers the GLightbox bound in main.js
    });
  });
})();
