# Home Flow

This is a project to help make the flow efficient to discharge patients from hospital.

## Setting up

A database needs to be prepared, and all required dependencies need to be installed, before the project can be successfully run.

### Inside pgAdmin

First, create a user with the following credentials and permissions:

- Username `homeflow`
- Password `homeflow`
- Able to login

Then, create a database called `homeflow`, owned by the user created previously (also called `homeflow`).

### Inside the root directory

```bash
dotnet tool restore
npm install
```

### Inside the `backend/` directory

```bash
dotnet restore
dotnet dotnet-ef database update
```

### Inside the `frontend/` directory

```bash
npm install
```

## Running the project

To run the project locally, the backend and frontend should be started separately.

### Inside the `backend/` directory

```bash
dotnet watch run
```

### Inside the `frontend/` directory

```bash
npm start
```

### Seeding Data

Data will be seeded in development.

You can find the seeding data files in the `/backend/SeedData` folder.

These files contain the sample data and methods that are called in Program.cs (inside the `if (app.Environment.IsDevelopment())` statement) to populate the database accordingly.

### Admin

After seeding the data, the user table is seeded with the following admin:
UserName = "Admin"
Email = "admin@email.com"
Password = "Pa$$word123"

## pre-commit hooks

When committing changes a pre-commit hook will run that includes runs a linter and the tests for both frontedn and backend.

If you need to commit without the pre-commit hook running you can used the `--no-verify` flag when making your commit

```bash
git commit --no-verify -m "your commit message here"
```

## Using protected endpoints

Authorization checks have been added which means all endpoints except /auth/login and /auth/register are protected. To protect other endpoints, add the [Authorize] attribute in the controller.

Protected endpoints will return a 401 Unauthorized response unless you pass the logged-in user's JWT token as a header.

### From the frontend

To add the JWT token as a header to fetch requests which access protected endpoints do the following:

In the .tsx file where the fetch request is being called:

1. import the login context to access the value of the JWT token
2. pass the token as a prop called 'header' in the method which calls the fetch request

In the backendClient.ts file:

1. add 'header: string' as a prop to the method
2. add "Authorization": `Bearer ${header}` to the list of headers

### Using Swagger

You should see unlocked padlock icons on the right of every endpoint.

1. Run the /auth/login endpoint
2. Copy the jwt token returned in the HTTP response
3. Click the green Authorize button on the top right of the Swagger page
4. In the pop-up, type 'Bearer' + space + paste the token and click Authorize
5. Now all the endpoints should show a locked padlock icon
6. The jwt header should be passed automatically to all protected endpoints
7. If you click the green Authorize button again and click Logout, the jwt token will be lost and you will need to log in again

### Using Postman

1. Run the /auth/login endpoint
2. Copy the jwt token returned in the HTTP response
3. When running a protected endpoint, click the Authorization tab
4. Select 'Bearer Token' from the Auth Type dropdown list
5. Paste the token into the box
6. Postman will add the correct header


## using email service

1. sign-up for emailjs service : https://dashboard.emailjs.com/sign-up
2. Create a service with the provider and get service id
3. Create a email template and get the template id
4. get the public key
5. in the .env (frontend root dir) add the following variables
   REACT_APP_EMAIL_SERVICE_ID=<service id (point 3)>
   REACT_APP_EMAIL_TEMPLATE_ID=<template id (point 4)>
   REACT_APP_EMAIL_PUBLIC_KEY=<public key (point 5)>
6. install package in homeflow root directory : npm install --save @emailjs/browser
7. The email will be sent to the user on success sign-up