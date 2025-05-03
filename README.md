# FORKIFY

# OVERVIEW

Recipe Finder is a dynamic web application built with vanilla JavaScript, designed to help users browse, search, and manage recipes. The application integrates a third-party API to fetch recipe data and offers features such as real-time search, pagination, bookmarking, serving size adjustments, and user recipe uploads. It follows the Model-View-Controller (MVC) pattern for a modular and maintainable codebase.

# FEATURES

Search Recipes: Search for recipes with instant results and pagination.
Recipe Details: View detailed recipe information, including ingredients, cooking time, and servings.
Bookmarking: Save favorite recipes to a persistent bookmark list using local storage.
Serving Adjustments: Dynamically adjust ingredient quantities based on serving size.
Upload Recipes: Add custom recipes with validated ingredient inputs.
Responsive Design: Optimized for both desktop and mobile devices.

# TECHNOLOGIES

JavaScript (ES6+): Core language with async/await for API calls.
HTML5 & CSS3: Structured content and responsive styling.
Third-Party API: Fetches recipe data dynamically.
Local Storage: Persists bookmark data across sessions.
Parcel: Module bundler for development and production builds.
JSDoc: Comprehensive code documentation for maintainability.

# PROJECT STRUCTURE

src/js/model.js: Handles data logic, API calls, and state management.
src/js/controller.js: Connects model and views, managing user interactions.
src/js/views/\*.js: Modular view classes for rendering UI components.
src/js/helpers.js: Utility functions for API requests.
src/js/config.js: Configuration constants (e.g., API URL, timeouts).

# USAGE

Search for recipes using the search bar.
Click a recipe to view details or bookmark it.
Adjust servings to update ingredient quantities.
Use the "Add Recipe" feature to upload custom recipes with ingredients in the format Quantity,Unit,Description.
