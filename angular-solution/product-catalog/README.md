# Product Catalog - README
Project Overview
The Product Catalog is a simple Angular application that fetches and displays a list of products from a mock API. Users can search, filter by category, and edit product details.

🚀 Steps to Run the Application
### 1. Prerequisites
```sh
Ensure you have the following installed on your system:

Node.js (>= 16.x)
Angular CLI (>= 15.x)
Install Angular CLI globally if you haven't:
```
---

### 2. Clone the Repository
```sh
git clone https://github.com/webexpert1/takehome-react-angular.git
cd angular-solution
cd product-catalog 
```
---

### 3. Install Dependencies
```sh
npm install
```

---

### 4. Start the Development Server
```sh
ng serve
```
The app will be available at http://localhost:4200/.

---

### 5. Start the Development Server
To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:
```sh
ng test
```

### Assumptions Made During Development
Mock API for Products

The app fetches products from DummyJSON API.
Example API response:
{
  "products": [
    {
      "id": 1,
      "title": "Product A",
      "category": "Electronics",
      "price": 100
    }
  ]
}
Assumed that API structure remains consistent.
- Simple State Management

- No global state management like NgRx or Akita was used, assuming the app remains lightweight. Editing is local.

- Editing a product updates the UI but does not persist changes to the backend since it's a mock API.
- Filtering & Searching.
The filtering logic assumes product properties (title, category, price) exist in the API response.

###  Areas for Improvement
Given more time, the following enhancements could be made:

- Persist Data Changes.

- Implement API calls to update products remotely instead of modifying local state.
- Better error handling

- display user-friendly messages when API calls fail.
- Pagination and performance optimization

- Support paginated API calls for improved performance.
- Global state management

- Introduce NgRx or another state management solution for better scalability.
- Unit and integration tests

- Add comprehensive unit tests using Jasmine/Karma.

