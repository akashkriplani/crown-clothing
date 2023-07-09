import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories;

// useSelector from react-redux always gets fired (in every component) whether or not an action is dispatched
// that was dispatched was related to it. That causes the components to re-render even if
// the values remain same for that slice of the store.

// The reselect library helps in stopping that re-render by memoizing the old values
// and preventing the re-renders of the components
export const selectCategories = createSelector([selectCategoryReducer], (categorySlice) => categorySlice.categories);

export const selectCategoriesMap = createSelector([selectCategories], (categories) =>
  categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categorySlice) => categorySlice.isLoading
);
