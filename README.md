# Shopsale project

## Basic Features:
1. Shop CURD.
2. Create orders.
3. Authentication with social.

## Tech:
```commandline
Django, Docker, Nextjs
```

## Requirement:
````
Docker, Docker-compose
````

## Install
1. Clone git source
2. Cd to project
3. Rename `./backend/.env-example` and `./frontend/.env-example` to `.env` and set variable enviroment.  
4. Run `docker-compose build`
5. Run `docker-compose up -d`

## Usage
- Frontend: `http://localhost:3000/`
- Admin: `http://localhost:8001/admin` 
  - `INIT_DATA_SAMPLE=1`
    - Login with `admin@admin.com/admin`
  - `INIT_DATA_SAMPLE=0`
    - Access to container backend: 
    ````
    docker exec -it <container_backend_name> bash
    ````
    - Create superadmin:
    ```
     python manage.py createsuperadmin
    ```

## Note: Don't use this project for production
UI base on https://ecommerce-v1.vercel.app/
