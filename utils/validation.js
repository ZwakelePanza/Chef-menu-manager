// Checks the form values and returns an object of error messages.
// An empty object means everything is valid.
export function validateMenuItem({ dishName, description, course, price }) {
  const errors = {};

  if (!dishName.trim()) {
    errors.dishName = 'Dish name is required.';
  } else if (dishName.trim().length < 2) {
    errors.dishName = 'Dish name must be at least 2 characters.';
  }

  if (!description.trim()) {
    errors.description = 'Description is required.';
  }

  if (!course) {
    errors.course = 'Please select a course.';
  }

  if (!price.trim()) {
    errors.price = 'Price is required.';
  } else if (isNaN(Number(price)) || Number(price) <= 0) {
    errors.price = 'Enter a valid price greater than 0.';
  }

  return errors;
}
