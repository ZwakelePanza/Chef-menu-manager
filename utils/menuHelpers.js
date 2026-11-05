import { COURSES } from '../constants';

// Applies the search text and course filter to the list.
// searchText matches part of the dish name (not case sensitive).
// courseFilter is 'All' or one of the COURSES.
export function filterMenuItems(items, searchText, courseFilter) {
  const query = searchText.trim().toLowerCase();

  return items.filter((item) => {
    const matchesName = item.dishName.toLowerCase().includes(query);
    const matchesCourse = courseFilter === 'All' || item.course === courseFilter;
    return matchesName && matchesCourse;
  });
}

// Works out the numbers shown on the Statistics screen.
export function calculateStats(items) {
  const total = items.length;
  const totalPrice = items.reduce((sum, item) => sum + Number(item.price), 0);
  const averagePrice = total === 0 ? 0 : totalPrice / total;

  const countByCourse = {};
  COURSES.forEach((course) => {
    countByCourse[course] = items.filter((item) => item.course === course).length;
  });

  return { total, averagePrice, countByCourse };
}

export function formatPrice(value) {
  return `R${Number(value).toFixed(2)}`;
}
