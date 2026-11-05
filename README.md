# weather-dashboard-api


# Weather Dashboard REST API

Assignment 6 - REST API Project

A RESTful API built with Node.js, Express, and SQLite.

The API manages saved cities for a Weather Dashboard.
Users can create, retrieve, update, and delete cities.

## Features

- Full CRUD operations
- RESTful API endpoints
- Persistent SQLite database
- Input validation
- JSON responses
- Appropriate HTTP status codes
- Error handling
- Environment variable configuration
- Postman collection with automated tests

## Technologies

- Node.js
- Express.js
- SQLite (better-sqlite3)
- dotenv
- Nodemon
- Postman

## Installation

Requirements:
- Node.js
- npm

1. Clone the GitHub repository.
2. Open the project folder in VS Code.
3. Install dependencies:

```bash
npm ci
```

4. Copy `.env.example` to `.env`.

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

5. Configure your `.env` file:

```env
PORT=3000
DB_FILE=./data/cities.db
```

6. Start the server:

```bash
node server.js
```

The API will run at:

http://localhost:3000

For the included Postman collection, use port 3001.
On Windows PowerShell:

```powershell
$env:PORT=3001
node server.js
```

The database and cities table are created automatically.

## Database

The project uses SQLite to persist saved cities.

Table: `cities`

| Column | Type | Description |
|---|---|---|
| id | INTEGER | Auto-generated primary key |
| name | TEXT | City name |
| country | TEXT | Country name |
| created_at | TEXT | Creation timestamp |

Data remains stored after restarting the server.

## API Endpoints

Base URL: http://localhost:3001

### 1. GET /cities

Retrieve all saved cities.

Example request:

```http
GET /cities
```

Example response (200 OK):

```json
[
  {
    "id": 1,
    "name": "Beirut",
    "country": "Lebanon",
    "created_at": "2026-11-05 15:00:00"
  }
]
```

If the database is empty, the response is `[]`.

### 2. GET /cities/:id

Retrieve a city by its ID.

Example request:

```http
GET /cities/1
```

Example response (200 OK):

```json
{
  "id": 1,
  "name": "Beirut",
  "country": "Lebanon",
  "created_at": "2026-11-05 15:00:00"
}
```

If the city does not exist (404):

```json
{
  "error": "City not found"
}
```

### 3. POST /cities

Create a new city.

Example request:

```http
POST /cities
Content-Type: application/json
```

Request body:

```json
{
  "name": "Beirut",
  "country": "Lebanon"
}
```

Example response (201 Created):

```json
{
  "id": 1,
  "name": "Beirut",
  "country": "Lebanon",
  "created_at": "2026-11-05 15:00:00"
}
```

The ID and timestamp are generated automatically.

### 4. PUT /cities/:id

Update an existing city.

Example request:

```http
PUT /cities/1
Content-Type: application/json
```

Request body:

```json
{
  "name": "Tripoli",
  "country": "Lebanon"
}
```

Example response (200 OK):

```json
{
  "id": 1,
  "name": "Tripoli",
  "country": "Lebanon",
  "created_at": "2026-11-05 15:00:00"
}
```

Both name and country must be provided.

### 5. DELETE /cities/:id

Delete an existing city.

Example request:

```http
DELETE /cities/1
```

Response (200 OK):

```json
{
  "message": "City deleted successfully"
}
```

Deleting a missing city returns 404.

## Validation

The POST and PUT endpoints require:

- A name and country
- Both values must be strings
- Both strings must be non-empty
- Maximum 100 characters per field

City IDs must be positive integers.

Invalid input returns HTTP 400.

Example:

```json
{
  "error": "Name and country must be non-empty strings of at most 100 characters"
}
```

## HTTP Status Codes

| Code | Meaning |
|---|---|
| 200 | Successful request |
| 201 | Resource created |
| 400 | Invalid input |
| 404 | City or route not found |
| 500 | Internal server error |

Malformed JSON produces:

```json
{
  "error": "Invalid JSON body"
}
```

Unknown routes produce:

```json
{
  "error": "Route not found"
}
```

Unexpected server errors return JSON rather than
exposing internal error details.

## Testing with Postman

The repository includes a Postman collection:

`postman/Weather_Dashboard_API_Assignment_6.postman_collection.json`

Instructions:

1. Start the server on port 3001.
2. Open Postman.
3. Import the JSON collection.
4. Open the collection runner.
5. Select all 10 requests.
6. Run one iteration.

The collection tests:

- GET all cities
- POST create city
- GET one city
- PUT update city
- DELETE city
- Missing city
- Invalid ID
- Missing fields
- Malformed JSON
- Unknown route

Verified local test run:

- Requests: 10
- Assertions passed: 20
- Failed assertions: 0
- Errors: 0

The collection saves the created city's ID automatically.

## Project Structure

```text
weather-dashboard-api/
├── postman/
│   └── Weather_Dashboard_API_Assignment_6.postman_collection.json
├── server.js
├── db.js
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
└── README.md
```

Locally generated or ignored files include:

- node_modules/
- data/cities.db
- .env

## Security and Configuration

Environment variables are loaded using dotenv.

The `.env` file is excluded from Git to avoid
committing local configuration or secrets.

The SQLite database is also excluded from Git.

SQL queries use parameter placeholders to keep
user input separate from SQL statements.

## Assignment Requirements

| Requirement | Implementation |
|---|---|
| Express server | server.js |
| Five CRUD routes | GET, POST, PUT, DELETE |
| RESTful conventions | /cities and /cities/:id |
| Real database | SQLite |
| Persistent data | data/cities.db |
| Input validation | POST and PUT handlers |
| HTTP status codes | 200, 201, 400, 404, 500 |
| Error handling | Route handlers and middleware |
| Environment variables | .env and .env.example |
| API testing | Postman collection |
| Documentation | README.md |

## Submission

Submit:
1. GitHub repository URL
2. ZIP archive containing project source
3. Postman collection inside the project

Exclude node_modules, the local SQLite database,
and the private .env file from the ZIP.

## Author

Elie

Web Programming - Assignment 6
