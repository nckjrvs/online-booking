// Date selection
document.querySelectorAll('.date-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document
      .querySelectorAll('.date-btn')
      .forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const day = btn.querySelector('.day').textContent;
    const num = btn.querySelector('.num').textContent;
    const month = btn.querySelector('.month').textContent;
    const rows = document.querySelectorAll('.sidebar-row .value');
    rows.forEach(el => {
      if (/Mon|Tue|Wed|Thu|Fri|Sat/.test(el.textContent)) {
        el.textContent = day + ', ' + month + ' ' + num;
      }
    });
  });
});

// Time selection
document.querySelectorAll('.time-slot:not(.unavailable)').forEach(slot => {
  slot.addEventListener('click', () => {
    document
      .querySelectorAll('.time-slot')
      .forEach(s => s.classList.remove('active'));
    slot.classList.add('active');
    const rows = document.querySelectorAll('.sidebar-row .value');
    rows.forEach(el => {
      if (/^\d{1,2}:\d{2}\s*(AM|PM)$/.test(el.textContent.trim())) {
        el.textContent = slot.textContent.trim();
      }
    });
  });
});

// Provider selection
document.querySelectorAll('.provider-select-card').forEach(card => {
  card.addEventListener('click', () => {
    document
      .querySelectorAll('.provider-select-card')
      .forEach(c => c.classList.remove('active'));
    card.classList.add('active');
    const name = card.querySelector('h4').textContent;
    const shortName = name.includes('No Preference')
      ? 'No Preference'
      : name.split(',')[0];
    const rows = document.querySelectorAll('.sidebar-row');
    rows.forEach(row => {
      const label = row.querySelector('.label');
      const value = row.querySelector('.value');
      if (label && value && label.textContent.trim() === 'Provider') {
        value.textContent = shortName;
      }
    });
  });
});

// Add-on toggle + sidebar update
function updateBookingSidebar() {
  const basePrice = 288;
  const baseDuration = 30;
  let addonTotal = 0;
  let addonDuration = 0;

  // Remove old addon rows
  document.querySelectorAll('.sidebar-addon-row').forEach(r => r.remove());

  // Find the total row and insert addon rows just before it
  const totalRow = document.querySelector('.sidebar-total');

  // Add rows for active addons
  const activeAddons = document.querySelectorAll('.addon-item.active');
  activeAddons.forEach(addon => {
    const name = addon.querySelector('h4').textContent;
    const priceText = addon.querySelector('.addon-price .price').textContent;
    const durText = addon.querySelector('.addon-price .duration').textContent;
    const price = parseInt(priceText.replace(/[^0-9]/g, ''));
    const dur = parseInt(durText.replace(/[^0-9]/g, ''));
    addonTotal += price;
    addonDuration += dur;

    const row = document.createElement('div');
    row.className = 'sidebar-row sidebar-addon-row';
    row.innerHTML =
      '<span class="label">+ ' +
      name +
      '</span><span class="value">$' +
      price +
      '</span>';
    if (totalRow) {
      totalRow.parentNode.insertBefore(row, totalRow);
    }
  });

  // Update total
  const total = basePrice + addonTotal;
  const totalEl = document.querySelector('.sidebar-total span:last-child');
  if (totalEl) totalEl.textContent = '$' + total;

  // Update duration
  const duration = baseDuration + addonDuration;
  const rows = document.querySelectorAll('.sidebar-row');
  rows.forEach(row => {
    const label = row.querySelector('.label');
    const value = row.querySelector('.value');
    if (label && value && label.textContent.trim() === 'Duration') {
      value.textContent = duration + ' min';
    }
  });
}

document.querySelectorAll('.addon-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
    updateBookingSidebar();
  });
});

// Initialize on load
updateBookingSidebar();
