# Usage

- Run `docker compose up`
- Access the server at `localhost:3000`

# API Reference
## Unauthorized
### GET `/ping`
Just a healthcheck, responds with `pong`.

### POST `/login`
- Body:
    - "email"
    - "password"

- Response:
    - "accessToken"
    - "refreshToken"

### POST `/signup`
Body:
- "email"
- "password"
- "name"
- "phone"

## Authorized
All requests must contain the header `Authorization: Bearer <accessToken>`.

### GET `/`
Redirects to `/products`

### Products
#### GET `/`
Response: An array of products in the format:
- "name"
- "price"

#### POST `/new`
Body:
- "name"
- "price"

#### POST `/<productId>`
Response:
- "name"
- "price"

### Wallet
#### GET `/`
Response:
- "balance"

#### POST `/deposit`
Body:
- "amount"

#### POST `/withdraw`
Body:
- "amount"

### Inventory
#### GET `/`
Response: An array of inventory items in the format:
- "productId"
- "sellerId"
- "quantity"

#### POST `/add`
Body:
- "productId"
- "sellerId"
- "quantity"

#### GET `/<productId>`
Response:
- "productId"
- "sellerId"
- "quantity"

### Orders
#### GET `/`
Response: An array of orders in the format:
- "productId"
- "quantity"
- "price"

#### POST `/new`
Body:
- "productId"
- "quantity"
- "price"

#### GET `/<orderId>`
Response:
- "productId"
- "quantity"
- "price"
