class SearchView {
  _parentElement = document.querySelector('.search');

  /**
   * Retrieves the search query from the input field and clears the input.
   *
   * @returns {string} The search query entered by the user.
   * @this {Object} SearchView instance
   */
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  /**
   * Adds an event listener to handle form submission and trigger the search.
   *
   * @param {Function} handler The callback function to execute on form submission.
   * @this {Object} SearchView instance
   */
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  /**
   * Clears the search input field.
   *
   * @this {Object} SearchView instance
   */
  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
