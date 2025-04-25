import icons from 'url:../../img/icons.svg';
import View from './View';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = 'Recipe was successfully uploaded';
  _btnAddRecipe = document.querySelector('.nav__btn--add-recipe');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      // Array of fields and values
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  _generateMarkup() {}

  renderUploadForm() {
    const markup = `

    <form class="upload">

        <div class="upload__column">

          <h3 class="upload__heading">Recipe data</h3>

          <label>Title</label>

          <input value="Test recipe" required name="title" type="text" />

          <label>URL</label>

          <input value="Test URL" required name="sourceUrl" type="text" />

          <label>Image URL</label>

          <input

            value="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"

            required

            name="image"

            type="text"

          />

          <label>Publisher</label>

          <input value="Test Publisher" required name="publisher" type="text" />

          <label>Prep time</label>

          <input value="60" required name="cookingTime" type="number" />

          <label>Servings</label>

          <input value="6" required name="servings" type="number" />

        </div>



        <div class="upload__column">

          <h3 class="upload__heading">Ingredients</h3>

          <label>Ingredient 1</label>

          <input

            value="0.5,kg,Rice"

            type="text"

            required

            name="ingredient-1"

            placeholder="Format: 'Quantity,Unit,Description'"

          />

          <label>Ingredient 2</label>

          <input

            value="1,,Avocado"

            type="text"

            name="ingredient-2"

            placeholder="Format: 'Quantity,Unit,Description'"

          />

          <label>Ingredient 3</label>

          <input

            value=",,salt"

            type="text"

            name="ingredient-3"

            placeholder="Format: 'Quantity,Unit,Description'"

          />

          <label>Ingredient 4</label>

          <input

            value=",,pepper"

            type="text"

            name="ingredient-4"

            placeholder="Format: 'Quantity,Unit,Description'"

          />

          <label>Ingredient 5</label>

          <input

            type="text"

            name="ingredient-5"

            placeholder="Format: 'Quantity,Unit,Description'"

          />

          <label>Ingredient 6</label>

          <input

            type="text"

            name="ingredient-6"

            placeholder="Format: 'Quantity,Unit,Description'"

          />

        </div>



        <button class="btn upload__btn">

          <svg>

            <use href="src/img/icons.svg#icon-upload-cloud"></use>

          </svg>

          <span>Upload</span>

        </button>

      </form>

    `;

    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new addRecipeView();
