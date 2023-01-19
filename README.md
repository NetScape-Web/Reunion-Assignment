# Back End Assignment - REUNION

## **How to run on local Machine**

### Step 1 : Clone Repository

```bash
git clone https://github.com/NetScape-Web/Reunion-Assignment.git
```

### Step 2 : install Dependencies

- For npm users

```bash
npm install
```

- For yarn users

```bash
yarn install
```

### Step 3 : setup envoirnment veriables

- Create a `.env` file in root directory and paste all these veriables. Take reference from .env.sample file available in root directory.

```js
PORT=4000
MONGODB_URL=<MONGODB_URL>
JWT_EXPIRE=2d
JWT_SECRET=w%k#]G!Xm_a}#(qO+dkSm|>3olfam52-
```

### Step 4 : Start server

```bash
npm start
```

or

```bash
yarn start
```

### Step 5 : Run All Testcases

```bash
npm run test
```

or

```bash
yarn test
```

## **Docker Image**

### Step 1 : Build Image

```bash
docker build . -t <your username>/backend
```

### Step 2 : Run Docker Image

```bash
docker run -p 4000:4000 -d <your username>/backend
```

Now you can use [http://localhost:4000](http://localhost:4000) as api base url.

## **Deployed on Render** : **[https://reunion-xx77.onrender.com/](https://reunion-xx77.onrender.com/)**

**To Test this api, i have provided REUNION.postman_collection.json file in root directory, import it in postman and you can test api.**

***Example***

```bash
┌──(exploit㉿exploit)-[~/Documents/Projects/Reunion-Assignment]
└─$ npm run test

> reunion-assignment@1.0.0 test
> mocha 'tests/**/*.js' --recursive  --timeout 60000 --exit

Developement Server is running on port 4000...


  Authorization Api
    Login User
Database connected.
::ffff:127.0.0.1 - - [19/Jan/2023:09:54:29 +0000] "POST /api/authenticate HTTP/1.1" 200 374
      ✔ It should return access token (1028ms)
::ffff:127.0.0.1 - - [19/Jan/2023:09:54:29 +0000] "POST /api/authenticate HTTP/1.1" 404 47
      ✔ It should not return access token (99ms)

  User Api
::ffff:127.0.0.1 - - [19/Jan/2023:09:54:29 +0000] "GET /api/user HTTP/1.1" 200 79
    ✔ Get Profile Details of current user (62ms)
::ffff:127.0.0.1 - - [19/Jan/2023:09:54:30 +0000] "GET /api/user HTTP/1.1" 401 13
    ✔ Get Profile Details for manupulated authorization token of user

  follow and unfollow Api
::ffff:127.0.0.1 - - [19/Jan/2023:09:54:30 +0000] "PUT /api/follow/63c73ae9e13f95272f0b26ec HTTP/1.1" 200 90
    ✔ Follow 63c73ae9e13f95272f0b26ec by currently logged in user. (223ms)
::ffff:127.0.0.1 - - [19/Jan/2023:09:54:30 +0000] "PUT /api/unfollow/63c73ae9e13f95272f0b26ec HTTP/1.1" 200 69
    ✔ Unollow 63c73ae9e13f95272f0b26ec by currently logged in user. (166ms)
::ffff:127.0.0.1 - - [19/Jan/2023:09:54:30 +0000] "PUT /api/follow/63c73ae9e13f95272f0b26ec1 HTTP/1.1" 400 80
    ✔ Try to Follow user does not exist 63c73ae9e13f95272f0b26ec1 by currently logged in user. (40ms)
::ffff:127.0.0.1 - - [19/Jan/2023:09:54:30 +0000] "PUT /api/unfollow/63c73ae9e13f95272f0b26ec1 HTTP/1.1" 400 82
    ✔ Try to Unollow user does not exist Unollow 63c73ae9e13f95272f0b26ec1 by currently logged in user. (45ms)


  8 passing (2s)

  ```


# Problem Statement

- Build APIs for a social media platform in either NodeJS or Python
- The API should support features like getting a user profile, follow a user, upload a post, delete a post, like a post, unlike a liked post, and comment on a post
- Design the database schema and implement in PostgreSQL or MongoDB

### **API Endpoints**

- POST /api/authenticate should perform user authentication and return a JWT token.

  - INPUT: Email, Password
  - RETURN: JWT token

    **NOTE:** Use dummy email & password for authentication. No need to create endpoint for registering new user.

- POST /api/follow/{id} authenticated user would follow user with {id}
- POST /api/unfollow/{id} authenticated user would unfollow a user with {id}
- GET /api/user should authenticate the request and return the respective user profile.
  - RETURN: User Name, number of followers & followings.
- POST api/posts/ would add a new post created by the authenticated user.
  - Input: Title, Description
  - RETURN: Post-ID, Title, Description, Created Time(UTC).
- DELETE api/posts/{id} would delete post with {id} created by the authenticated user.
- POST /api/like/{id} would like the post with {id} by the authenticated user.
- POST /api/unlike/{id} would unlike the post with {id} by the authenticated user.
- POST /api/comment/{id} add comment for post with {id} by the authenticated user.
  - Input: Comment
  - Return: Comment-ID
- GET api/posts/{id} would return a single post with {id} populated with its number of likes and comments
- GET /api/all_posts would return all posts created by authenticated user sorted by post time.
  - RETURN: For each post return the following values
    - id: ID of the post
    - title: Title of the post
    - desc: Description of the post
    - created_at: Date and time when the post was created
    - comments: Array of comments, for the particular post
    - likes: Number of likes for the particular post

### **Stacks**

- Backend: NodeJS (using ExpressJS or Koa) or Python (using Django). Use other helping libraries.
- Database: PostgreSQL or MongoDB

# Instructions

- Implement the mentioned functionalities by writing your code & hosting it on [Render](https://render.com/).
- Submit the Render hosted link for the deployed APIs and Github or Gitlab public repository link for the deployed code in the form below.
- **Provide the list of the functional testcases** specific to each API endpoint with description in an Excel sheet ([**sample sheet**](https://www.notion.so/Back-End-Assignment-REUNION-bd5e48b7aab54e91b6ee8829c3e30c4a)) & submit it via the form below.

  - Don’t write all the testcase but try to focus on the important testcases according to your understanding.

    💬**Sample excel file for tests**

    [Sample Test Case](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/04d601bc-47d5-45f9-bcd5-eba09e7b6acc/Untitled.xlsx)

- **Implement the testcases** using the language specific framework or library like Mocha or Chai.js for Node.
  - Commit the testcase code in the git repo & provide the commands to run the testcases.
- **Create a single docker file for running the** **full web app under a single docker image**. Commit the docker file under the same repo & provide the link.
  - Please note docker file should take care of the database, running testcases & other dependencies installation.

