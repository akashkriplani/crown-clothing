import { createSelector } from 'reselect';
import { RootState } from './../store';
import { CategoriesState } from './category.reducer';
import { CategoryMap } from './category.types';

const selectCategoryReducer = (state: RootState): CategoriesState => state.categories;

// useSelector from react-redux always gets fired (in every component) whether or not an action is dispatched
// that was dispatched was related to it. That causes the components to re-render even if
// the values remain same for that slice of the store.

// The reselect library helps in stopping that re-render by memoizing the old values
// and preventing the re-renders of the components
export const selectCategories = createSelector([selectCategoryReducer], (categorySlice) => categorySlice.categories);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categorySlice) => categorySlice.isLoading
);
