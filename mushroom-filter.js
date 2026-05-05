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
    filterCards();
  }
}

if (seasonalFilter) seasonalFilter.addEventListener('change', updateFilter);
if (typeFilter) typeFilter.addEventListener('change', updateFilter);

// Apply initial filter state on load
filterCards();

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
