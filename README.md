# Employee-Onboarding-Application

## To Setup The Application

**Frontend .env file**
```sh
VITE_BACKEND_URL=
```

**Backend .env file**
```sh
mongodb_uri=

nodemailer_account=
nodemailer_password=

type=
project_id=
private_key_id=
private_key=
client_email=
client_id=
auth_uri=
token_uri=
auth_provider_x509_cert_url=
client_x509_cert_url=
universe_domain=
```

## To Run The Frontend
The frontend runs by default on port 5173. To change the port, modify settings in the Docker/docker-compose.yml and vite.config.js files.

**Commands for Build and Run (Requires rebuilding for each change):**
```sh
docker build -t empowerin-frontend .
docker run -p 5173:5173 empowerin-frontend 
```

**Commands for Hot Reloading (Uses Docker Compose):**
```sh
docker-compose up
```

## To Run The Backend
The backend runs by default on port 8081. To change the port, modify settings in the Docker/docker-compose.yml and server.js files.

**Commands for Build and Run (Requires rebuilding for each change):**
```sh
docker build -t empowerin-backend .
docker run -p 8081:8081 -e PORT=8081 empowerin-backend
```

**Commands for Hot Reloading (Uses Docker Compose):**
```sh
docker-compose up
```

## Changing Backend URL
To change the backend URL used in your frontend, modify the /baseURL.jsx file located in the frontend directory.

**Command For Starting Both Services Concurrently (Uses Docker Compose)**
```sh
docker-compose up --build
```