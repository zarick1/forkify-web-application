import View from './View.js';
import previewView from './previewView.js';

class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it';

  /**
   * Adds an event listener to render bookmarks on page load.
   *
   * @param {Function} handler The callback function to execute on page load.
   * @this {Object} BookmarkView instance
   */
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  /**
   * Generates the HTML markup for the list of bookmarked recipes.
   *
   * @returns {string} The HTML markup string for all bookmarked recipes.
   * @this {Object} BookmarkView instance
   */
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarkView();
