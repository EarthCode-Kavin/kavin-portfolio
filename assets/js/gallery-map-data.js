/* ============================================================================
   Gallery + Map data  —  SINGLE SOURCE OF TRUTH
   ----------------------------------------------------------------------------
   Both the photo grid AND the interactive map are generated from this list.
   To add a photo, copy one { ... } block and fill it in. That's it.

   Fields:
     title    : short name shown on the photo and in the map tooltip
     caption  : one-line description (shown in lightbox + map popup)
     place    : optional place name shown in the popup ("" to hide)
     date     : optional date shown in the popup ("" to hide)
     thumb    : small image used in the grid and marker  (…-thumb.jpg)
     full     : large image opened in the lightbox / map popup
     lat, lng : decimal degrees. Leave as null for photos with no location
                (they still appear in the grid, just not on the map).

   Prefer not to hand-edit? Fill in tools/photos.csv and run
     python tools/build_gallery_data.py tools/photos.csv
   to regenerate this file (and thumbnails) automatically.

   >>> The lat/lng below are PLACEHOLDERS scattered around Tamil Nadu so you
   >>> can see the map working. Replace them with your real coordinates
   >>> (send me your "filename, lat, lng, caption" list and I'll drop them in).
   ========================================================================== */

window.GALLERY_PHOTOS = [
  {
    title:   "In the Field",
    caption: "Mapping with a rock hammer above a river valley.",
    place:   "Nilgiris", date: "",
    thumb:   "assets/img/gallery/fieldwork-valley-thumb.jpg",
    full:    "assets/img/gallery/fieldwork-valley.jpg",
    lat: 11.4916, lng: 76.7337        // PLACEHOLDER (Nilgiris)
  },
  {
    title:   "Opencast Mine",
    caption: "Field visit to an open-cast coal mine.",
    place:   "Salem", date: "",
    thumb:   "assets/img/gallery/field-coalmine-thumb.jpg",
    full:    "assets/img/gallery/field-coalmine.jpg",
    lat: 11.7401, lng: 78.6800        // PLACEHOLDER (Salem)
  },
  {
    title:   "Earth from Above",
    caption: "Satellite scenes — glaciers, deltas, braided rivers and false-colour terrain.",
    place:   "", date: "",
    thumb:   "assets/img/gallery/satellite-montage-thumb.jpg",
    full:    "assets/img/gallery/satellite-montage.jpg",
    lat: null, lng: null              // no single location — grid only
  },
  {
    title:   "On the Ridge",
    caption: "Forested ranges from a clifftop viewpoint.",
    place:   "Wayanad", date: "",
    thumb:   "assets/img/gallery/ridge-viewpoint-thumb.jpg",
    full:    "assets/img/gallery/ridge-viewpoint.jpg",
    lat: 11.9416, lng: 76.7337        // PLACEHOLDER (Wayanad edge)
  },
  {
    title:   "Into the Mist",
    caption: "A foggy pine trail in the hills.",
    place:   "Kotagiri", date: "",
    thumb:   "assets/img/gallery/misty-forest-thumb.jpg",
    full:    "assets/img/gallery/misty-forest.jpg",
    lat: 11.4278, lng: 76.6950        // PLACEHOLDER (Kotagiri)
  },
  {
    title:   "Riverside",
    caption: "Resting under a tree beside a rocky river.",
    place:   "Bhavani", date: "",
    thumb:   "assets/img/gallery/riverside-tree-thumb.jpg",
    full:    "assets/img/gallery/riverside-tree.jpg",
    lat: 11.9139, lng: 77.7500        // PLACEHOLDER (Bhavani)
  },
  {
    title:   "Golden Hour",
    caption: "Sunset over a rocky river.",
    place:   "Mettur", date: "",
    thumb:   "assets/img/gallery/river-sunset-thumb.jpg",
    full:    "assets/img/gallery/river-sunset.jpg",
    lat: 11.6643, lng: 78.1460        // PLACEHOLDER (Mettur)
  },
  {
    title:   "Above the Town",
    caption: "A hazy townscape from a rocky summit.",
    place:   "Yercaud", date: "",
    thumb:   "assets/img/gallery/hilltop-town-thumb.jpg",
    full:    "assets/img/gallery/hilltop-town.jpg",
    lat: 11.7794, lng: 78.2097        // PLACEHOLDER (Yercaud)
  }
];
