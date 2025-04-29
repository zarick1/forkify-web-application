import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { CalculationInterpolation } from 'sass';

//////////////////////////////////////
/**
 * Asynchronously loads and renders a recipe based on the URL hash ID.
 *
 * @returns {Promise<void>} A promise that resolves when the recipe is loaded and rendered.
 * @throws {Error} If the recipe cannot be loaded or rendered.
 */
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    // 0) Mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);

    bookmarkView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
  }
};

/**
 * Asynchronously loads and renders search results based on the user's query.
 *
 * @returns {Promise<void>} A promise that resolves when search results are loaded and rendered.
 * @throws {Error} If the search query is invalid or the results cannot be loaded.
 */
const controlSearchResults = async function () {
  try {
    // 1) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();

    // 2) Load search data
    await model.loadSearchResults(query);

    // 2) Render search data
    resultsView.render(model.getSearchResultsPage());

    // 3) Render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError(err.message);
  }
};

/**
 * Renders the search results and pagination for the specified page.
 *
 * @param {number} goToPage - The page number to display.
 */
const controlPagination = function (goToPage) {
  // Render next/prev page
  resultsView.render(model.getSearchResultsPage(goToPage));
  // Render pagination
  paginationView.render(model.state.search);
};

/**
 * Updates the recipe servings and refreshes the recipe view.
 *
 * @param {number} newServings - The new number of servings for the recipe.
 */
const controlServings = function (newServings) {
  // Update the recipe servings
  model.updateServings(newServings);
  // Update the recipe view
  recipeView.update(model.state.recipe);
};

/**
 * Toggles the bookmark status of the current recipe and updates the views.
 */
const controlAddBookmark = function () {
  if (model.state.recipe.bookmarked) model.deleteBookmark(model.state.recipe);
  //console.log(model.state.recipe);
  else model.addBookmark(model.state.recipe);
  //console.log(model.state.recipe);

  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookmarks);
};

/**
 * Renders the list of bookmarked recipes.
 */
const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

/**
 * Asynchronously uploads a new recipe and updates the application state and views.
 *
 * @param {Object} newRecipe - The new recipe data to be uploaded.
 * @returns {Promise<void>} A promise that resolves when the recipe is uploaded and views are updated.
 * @throws {Error} If the recipe upload fails or the data format is invalid.
 */
const controlAddRecipe = async function (newRecipe) {
  //console.log(newRecipe);
  try {
    // Render spiner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarkView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //Close form
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);

    setTimeout(function () {
      addRecipeView.renderUploadForm();
    }, MODAL_CLOSE_SEC * 1050);
  } catch (err) {
    console.log(err);
    addRecipeView.renderError(err.message);
  }
};

/**
 * Initializes the application by setting up event handlers for views.
 */
const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
