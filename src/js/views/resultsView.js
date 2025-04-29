import View from './View';
import previewView from './previewView';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again';
  _message = '';

  /**
   * Generates the HTML markup for the list of search results.
   *
   * @returns {string} The HTML markup string for all search results.
   * @this {Object} ResultsView instance
   */
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
