# Employee-Onboarding-Application

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
(By Default The Backend Works On Port 8081. To Change The Port Make Changes In The Docker/docker-compose, server.js file and the terminal commands as well.)

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
(Put The Backend URL in the /baseURL.jsx file in the frontend directory.)