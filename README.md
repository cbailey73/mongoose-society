# Back-End Social Network API using Mongoose

## Introduction
This project consists of the back-end code necessary for running a simple social media platform. It uses the mongoose package to connect to MongoDb and store the platform's user and contact information, and the express package to run a local server. With the use of an API testing tool such as Insomnia, the user can make GET, POST, PUT, and DELETE requests to input, modify, and destroy user information, as well as information about the posts (thoughts) reactions to thoughts made by users.

## Usage
To use this server, first clone this repository and open it up in a code editor. Next, navigate to the terminal of server.js and type in "npm i" to initialize the express, mongoose, and validator (used for email validation) packages. After this, type in "npm run start" to start the server, and open up your preferred api testing tool. There, you can perform the following CRUD operations:

### User

#### Create a User
To create a new user, make a POST request to `http://localhost:3001/api/users` using the following key-value structure:
```json
{
  "username": "yourusername",
  "email": "youremail@gmail.com"
}
```

#### Read All Users
To get a list of all users, make a GET request to `http://localhost:3001/api/users`.

#### Read a Single User
To get a single user by their `_id` and populate thought and friend data, make a GET request to `http://localhost:3001/api/users/:userId`.

#### Update a User
To update a user by their `_id`, make a PUT request to `http://localhost:3001/api/users/:userId` with the updated user data.

#### Delete a User
To remove a user by their `_id`, make a DELETE request to `http://localhost:3001/api/users/:userId`. Additionally, as a bonus, this operation should also remove the user's associated thoughts.

### User Friends

#### Add a Friend
To add a new friend to a user's friend list, make a POST request to `http://localhost:3001/api/users/:userId/friends/:friendId`.

#### Remove a Friend
To remove a friend from a user's friend list, make a DELETE request to `http://localhost:3001/api/users/:userId/friends/:friendId`.

### Thought

#### Create a Thought
To create a new thought, make a POST request to `http://localhost:3001/api/thoughts` using the following key-value structure:
```json
{
  "thoughtText": "Your text...",
  "username": "your_username",
  "userId": "123539483273"
}
```
Don't forget to push the created thought's `_id` to the associated user's thoughts array field.

#### Read All Thoughts
To get a list of all thoughts, make a GET request to `http://localhost:3001/api/thoughts`.

#### Read a Single Thought
To get a single thought by its `_id`, make a GET request to `http://localhost:3001/api/thoughts/:thoughtId`.

#### Update a Thought
To update a thought by its `_id`, make a PUT request to `http://localhost:3001/api/thoughts/:thoughtId`.

#### Delete a Thought
To remove a thought by its `_id`, make a DELETE request to `http://localhost:3001/api/thoughts/:thoughtId`.

### Thought Reactions

#### Create a Reaction
To create a reaction and store it in a single thought's reactions array field, make a POST request to `http://localhost:3001/api/thoughts/:thoughtId/reactions` using the following key-value structure:
```json
{
  "responseBody": "Your response...",
  "username": "your_username",
  "userId": "123539483273"
}
```

#### Remove a Reaction
To pull and remove a reaction by the reaction's `reactionId` value, make a DELETE request to `http://localhost:3001/api/thoughts/:thoughtId/reactions`.

## Licence
This project is protected under an MIT license. Additional information is found in the LICENSE section of this repository.

## Credits
The code for using the validator package to validate emails was obtained through these instructions: https://www.npmjs.com/package/validator

The code for filtering out friends from a list was obtained by following this tutorial: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

The code for linking an embedded model to the model containing it was found by following this tutorial: https://www.mongodb.com/community/forums/t/how-to-reference-the-objectid-from-one-collection-schema-to-another/203108

## Demonstration
A video showcasing the project can be found here: https://www.youtube.com/watch?v=KpgxsRjN1gY
