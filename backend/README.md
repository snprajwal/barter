# Usage

- Run `docker compose up`
- Access the server at `localhost:3000`

# API Reference

## GET `/ping`
Just a healthcheck, responds with `pong`.

## POST `/login`
- Body:

        {
            "email": <email>,
            "password": <password>
        }

- Response:

        {
            "accessToken": <token>,
            "refreshToken": <token>
        }

## POST `/signup`
- Body:

        {
            "email": <email>,
            "password": <password>,
            "name": <name>,
            "phone": <phone>
        }

- Response:

        {
            "msg": "New user created"
        }

## GET `/`
- Headers:
    - `Authorization: Bearer <accessToken>`
- Response:

        {
            "msg": "Welcome home!"
        }
