# Installation

### Backend

Install composer `https://getcomposer.org/download/`

Install dependencies with composer
```
php composer.phar update
```

### Frontend

Install dependencies
```
cd frontend
npm install
```

# Run the application
It is possible to run the application it two modes: development and production.

### Run in development mode
Execute the command
```
make
```
It will start development environment in docker containers.

Backend will be available on `localhost`

Frontend will be available on `localhost:8080`

It is possible to run the application separately

To run backend execute
```
cd backend
./vendor/bin/sail up
```

To run frontend execute
```
cd frontend
npm run dev
```

### Run in production mode

To run in production mode it needs to run frontend only.
```
make run_frontend
```
or
```
cd frontend
npm run serve
```

Frontend will take data from `https://api.v2.emissions-api.org/ui/`

# Run tests
To run frontend test execute
```
make run_frontend_tests
```
or directly in frontend directory
```
cd frontend
npm run test
```

## Frontend

### Routing and layouts

There is layout system as top layer above vue router. New layouts could be added into `frontend/src/layouts` directory.
Each route could specify the used layout inside `meta.layout` property
For example:

```
[
    path: '/',
    name: 'Home',
    component: () => import('@/views/Index.vue'),
    meta: {
      layout: 'AppLayoutMain',
    },
]
```

The router will look for a layout with defined name or use default layout.

### Caching

All request from the server are caching in the indexedDB

To clear cache remove `plana-db` database in `devtools/Application/indexedDB`
