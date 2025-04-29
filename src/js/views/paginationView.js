import icons from 'url:../../img/icons.svg';

import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  /**
   * Adds an event listener for pagination button clicks to navigate to a specific page.
   *
   * @param {Function} handler The callback function to execute with the target page number.
   * @this {Object} PaginationView instance
   */
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }

  /**
   * Generates the HTML markup for pagination buttons based on the current page and total results.
   *
   * @returns {string} The HTML markup string for pagination buttons, or an empty string if not needed.
   * @this {Object} PaginationView instance
   */
  _generateMarkup() {
    const numberOfPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (numberOfPages === 1) return '';
    if (numberOfPages > 1 && this._data.page === 1)
      return this._generateBtnNext();
    if (numberOfPages > 1 && this._data.page === numberOfPages)
      return this._generateBtnPrev();
    if (numberOfPages > 1 && this._data.page > 1)
      return this._generateBtnPrev() + this._generateBtnNext();
  }

  /**
   * Generates the HTML markup for the "Next" pagination button.
   *
   * @returns {string} The HTML markup string for the next page button.
   * @this {Object} PaginationView instance
   */
  _generateBtnNext() {
    return `
    <button data-goto="${
      this._data.page + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${this._data.page + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;
  }

  /**
   * Generates the HTML markup for the "Previous" pagination button.
   *
   * @returns {string} The HTML markup string for the previous page button.
   * @this {Object} PaginationView instance
   */
  _generateBtnPrev() {
    return `
    <button data-goto="${
      this._data.page - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${this._data.page - 1}</span>
    </button>
    `;
  }
}

export default new PaginationView();
