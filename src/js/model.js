import { deprecations } from 'sass';
import { API_URL, RES_PER_PAGE, FIRST_PAGE, KEY } from './config.js';
import { getJSON, sendJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

/**
 * Transforms raw API data into a standardized recipe object.
 *
 * @param {Object} data - The raw data from the API containing recipe details.
 * @returns {Object} A formatted recipe object with standardized properties.
 */
const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key }),
  };
};

/**
 * Asynchronously loads a recipe from the API by its ID and updates the application state
 *
 * @param {string} id - The unique identifier of the recipe to be loaded
 * @returns {Promise<void>} A promise that resolves when the recipe is successfully loaded and state is updated
 * @throws {Error} If the API request or the response cannot be processed.
 */
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}?key=${KEY}`);

    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(recipe => recipe.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    //console.error(`${err} ********`);
    throw err;
  }
};

/**
 * Asynchronously fetches search results for a given query and updates the application state.
 *
 * @param {string} query - The search term used to query the API.
 * @returns {Promise<void>} A promise that resolves when search results are loaded and state is updated.
 * @throws {Error} If the API request fails or the response cannot be processed.
 */
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search={${query}}&key=${KEY}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        image: recipe.image_url,
        publisher: recipe.publisher,
        title: recipe.title,
        ...(recipe.key && { key: recipe.key }),
      };
    });
  } catch (err) {
    throw err;
  }
};

/**
 * Retrieves a subset of search results for the specified page.
 *
 * @param {number} [pageNumber=1] - The page number to retrieve (defaults to the first page).
 * @returns {Array<Object>} An array of recipe objects for the specified page.
 */
export const getSearchResultsPage = function (pageNumber = FIRST_PAGE) {
  state.search.page = pageNumber;
  const start = (pageNumber - 1) * state.search.resultsPerPage;

  return state.search.results.slice(start, start + state.search.resultsPerPage);
};

/**
 * Updates the ingredient quantities of the current recipe based on the new number of servings.
 *
 * @param {number} servingsNumber - The new number of servings for the recipe.
 */
export const updateServings = function (servingsNumber) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity / state.recipe.servings) * servingsNumber;
  });

  state.recipe.servings = servingsNumber;
};

/**
 * Saves the current bookmarks to local storage.
 */
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

/**
 * Adds a recipe to the bookmarks and updates the application state.
 *
 * @param {Object} recipe - The recipe object to be bookmarked.
 */
export const addBookmark = function (recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmarked
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  //console.log(state.bookmarks);
  persistBookmarks();
};

/**
 * Removes a recipe from the bookmarks and updates the application state.
 *
 * @param {Object} recipe - The recipe object to be removed from bookmarks.
 */
export const deleteBookmark = function (recipe) {
  // Remove bookmark from list
  const index = state.bookmarks.findIndex(
    bookmark => bookmark.id === state.recipe.id
  );
  //console.log(index);
  state.bookmarks.splice(index, 1);

  // Change bookmarked state to false
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = false;
  //console.log(state.bookmarks);
  persistBookmarks();
};

/**
 * Initializes the application by loading bookmarks from local storage.
 */
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

/**
 * Asynchronously uploads a new recipe to the API and updates the application state.
 *
 * @param {Object} newRecipe - The new recipe data to be uploaded.
 * @returns {Promise<void>} A promise that resolves when the recipe is uploaded and state is updated.
 * @throws {Error} If the ingredient format is incorrect or the API request fails.
 */
export const uploadRecipe = async function (newRecipe) {
  //console.log(Object.entries(newRecipe));
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');

        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Plese use the correct format!'
          );
        const [quantity, unit, description] = ingArr;

        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      });
    const recipe = {
      cooking_time: +newRecipe.cookingTime,
      image_url: newRecipe.image,
      ingredients,
      publisher: newRecipe.publisher,
      servings: +newRecipe.servings,
      source_url: newRecipe.sourceUrl,
      title: newRecipe.title,
    };
    //console.log(recipe);
    const data = await sendJSON(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};

/**
 * Clears all bookmarks from local storage (for debugging purposes).
 * debug function
 */
const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};

//clearBookmarks();
