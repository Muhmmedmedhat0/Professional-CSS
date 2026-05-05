// If JS loads, disable the CSS-only `.no-js` fallback
(function enableJavaScript() {
  document.documentElement.classList.remove('no-js');
})();

const cards = document.querySelectorAll(
  '.mashroom-guide .card, .mushroom-guide .card',
);
const seasonalFilter = document.querySelector('#season-select');
const typeFilter = document.querySelector('#type-select');
const noResultsEl = document.querySelector('#no-results');

const currentFilters = {
  season: 'all',
  type: 'all',
};

function updateFilter(e) {
  const filterType = e.target.name;
  const val = (e.target.value || '').trim().toLowerCase();
  if (filterType in currentFilters) {
    currentFilters[filterType] = val;
    if (document.startViewTransition) {
      document.startViewTransition(() => filterCards());
    } else {
      filterCards();
    }
  }
}

if (seasonalFilter) seasonalFilter.addEventListener('change', updateFilter);
if (typeFilter) typeFilter.addEventListener('change', updateFilter);

// Set a unique view transition name for each card to enable individual transitions when filtering
cards.forEach((card, index) => {
  card.style.setProperty('view-transition-name', `mushroom-${index + 1}`);
});

function filterCards() {
  cards.forEach((card, index) => {
    const season =
      card
        .querySelector('[data-season]')
        ?.dataset?.season?.trim()
        .toLowerCase() ?? null;
    const type =
      card
        .querySelector('[data-edible]')
        ?.dataset?.edible?.trim()
        .toLowerCase() ?? null;

    const matchesSeason =
      currentFilters.season === 'all' || season === currentFilters.season;
    const matchesType =
      currentFilters.type === 'all' || type === currentFilters.type;

    if (matchesSeason && matchesType) {
      card.hidden = false;
    } else {
      card.hidden = true;
    }
  });

  // show the "no results" message when nothing is visible
  const anyVisible = Array.from(cards).some((c) => !c.hidden);
  if (noResultsEl) {
    noResultsEl.hidden = anyVisible;
  }
}

if (document.startViewTransition) {
  document.startViewTransition(() => filterCards());
} else {
  filterCards();
}
