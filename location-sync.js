// Location sync across pages via localStorage
// Each brand uses a unique key to avoid cross-brand conflicts

(function () {
  // Determine brand from pathname
  const path = window.location.pathname;
  let brandKey = 'loc-default';
  if (path.includes('/rise/')) brandKey = 'loc-rise';
  else if (path.includes('/edge-mens/')) brandKey = 'loc-edge-mens';
  else if (path.includes('/redrewvination/')) brandKey = 'loc-redrewvination';

  // Location name mapping (short nav label → full name for dropdown)
  const locationMaps = {
    'loc-rise': { SLC: 'Salt Lake City', Provo: 'Provo', Lehi: 'Lehi' },
    'loc-edge-mens': { SLC: 'Salt Lake City', Lehi: 'Lehi' },
    'loc-redrewvination': {
      Downtown: 'Downtown',
      Midtown: 'Midtown',
      Uptown: 'Uptown',
    },
  };

  const map = locationMaps[brandKey] || {};

  // On page load: restore saved location
  const saved = localStorage.getItem(brandKey);
  if (saved) {
    // Click the matching nav button to trigger the page's own switchLocation logic
    document.querySelectorAll('.nav-location-btn').forEach(btn => {
      if (btn.textContent.trim() === saved) {
        btn.click();
      }
    });

    // Update gift card location dropdown if present
    const gcDropdown = document.getElementById('gc-location');
    if (gcDropdown) {
      const fullName = map[saved] || saved;
      for (let i = 0; i < gcDropdown.options.length; i++) {
        if (gcDropdown.options[i].value === fullName) {
          gcDropdown.selectedIndex = i;
          gcDropdown.dispatchEvent(new Event('change'));
          break;
        }
      }
    }
  }

  // On nav button click: save to localStorage + update gift card dropdown
  document.querySelectorAll('.nav-location-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const label = btn.textContent.trim();
      localStorage.setItem(brandKey, label);

      // If gift card dropdown exists, update it
      const gcDropdown = document.getElementById('gc-location');
      if (gcDropdown) {
        const fullName = map[label] || label;
        for (let i = 0; i < gcDropdown.options.length; i++) {
          if (gcDropdown.options[i].value === fullName) {
            gcDropdown.selectedIndex = i;
            gcDropdown.dispatchEvent(new Event('change'));
            break;
          }
        }
      }
    });
  });
})();
