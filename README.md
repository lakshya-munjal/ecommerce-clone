# Ecommerce Clone

This application is a clone with very minimal functionality. It mostly focuses on setting-up the project and using
different packages for smooth working of the application.

# Pages

There is just 1 working page - _Shop_, rest of the pages are dummy.

Shop page shows a list of categories and the complete list of products.
Products and categories are fetched from https://fakestoreapi.com/.

Categories is a list of radio buttons and whichever you choose filters the products list.
Search input is just a placeholder which does nothing

# Performance

The components are memoized wherever required using React.memo.

# Packages used

- react-router-dom to setup routing
- react-redux to create a global state management solution
- rtk-query for API calls and caching API responses
- shadcn/ui for UI components
- react-icons for Icons
- tailwindcss for styling
