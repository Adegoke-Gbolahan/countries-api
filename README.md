# Countries API

## Overview

This project implements a REST API using TypeScript and Node.js, providing access to detailed country information through various endpoints. The API integrates data from the REST Countries API to deliver a range of functionalities, including retrieving lists of countries, specific country details, regions, languages, and statistics.

### Implementation Approach

1. **Tech Stack:**

   - **Node.js** with **TypeScript** for server-side logic.
   - **Express** for routing and middleware.
   - **swagger-jsdoc** and **swagger-ui-express** for API documentation.
   - **dotenv** for environment variable management.
   - **helmet** and **cors** for security and cross-origin resource sharing.

2. **Endpoints:**

   - `GET /api/countries`: Retrieve a list of countries with pagination and optional filtering.
   - `GET /api/countries/:name`: Get detailed information for a specific country.
   - `GET /api/regions`: List regions and countries within each region.
   - `GET /api/languages`: List languages and the countries where they are spoken.
   - `GET /api/statistics`: Provide aggregated statistics about countries.

3. **Data Handling:**

   - Utilizes `fetch` to retrieve data from the REST Countries API.
   - Implements data processing functions to handle filtering, searching, and sorting.

4. **Security and Performance:**

   - **Security:** Uses `helmet` to secure HTTP headers and `cors` for cross-origin requests.
   - **Performance:** Includes basic error handling and caching strategies to enhance performance.

5. **Documentation:**
   - Integrated Swagger for interactive API documentation and exploration.

## Highlights

- **Data Integration:** Efficiently integrates with the REST Countries API to provide comprehensive country data.
- **Documentation:** Provides a user-friendly Swagger UI for exploring API endpoints.
- **Security:** Implements best practices for securing HTTP headers and handling cross-origin requests.

## Aspects I am Particularly Proud Of

- **Comprehensive Endpoints:** The API supports a wide range of functionalities, from detailed country information to aggregated statistics.
- **Error Handling:** Consistent and clear error handling across all endpoints ensures better maintainability and user experience.
- **Swagger Integration:** Provides an interactive API documentation that simplifies testing and understanding of the API.

## Potential Improvements or Additional Features

- **Advanced Caching:** Implement advanced caching mechanisms (e.g., Redis) to improve response times and reduce the load on the REST Countries API.
- **Rate Limiting:** Introduce rate limiting to prevent abuse and ensure fair usage.
- **User Authentication:** Add user authentication and authorization features to secure certain endpoints.
- **Enhanced Error Logging:** Implement more detailed logging and monitoring to track issues and performance metrics.

## Setup Instructions

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/yourusername/countries-api.git
   cd countries-api
   ```

## Setup

1. Clone the repository:

   ```sh
   git clone <repo_url>
   cd countries-api
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Run the server:
   ```sh
   npm run dev
   ```

## API Documentation

- [Swagger Documentation](http://localhost:4000/api-docs)

## Testing

```sh
npm test
```
