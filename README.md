<h1 align="center">Bug Tracker</h1>
<br />
<br />

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/cristianmenguer/cbwa-ca1?color=red">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/cristianmenguer/cbwa-ca1?color=blue">

  <a href="https://github.com/cristianmenguer/cbwa-ca1/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/cristianmenguer/cbwa-ca1?color=orange">
  </a>

  <a href="https://github.com/cristianmenguer/cbwa-ca1/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/cristianmenguer/cbwa-ca1?color=green">
  </a>
</p>

<h2 align="center">A Typescript API developed for study purposes in CCT - Cloud-based Web Applications course</h2>

<hr />

## Table of contents
* [General info](#general-info)
* [Getting started](#getting-started)
* [Technologies](#technologies)
* [Features](#features)
* [Changelog](#changelog)
* [Roadmap](#roadmap)
* [Author](#author)

## General info

A Nodejs Typescript app built to study API's!

## Requirements

- [Node.js](https://nodejs.org/): Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Yarn](https://yarnpkg.com/): Yarn is a package manager that doubles down as project manager.
- Local or remote instance of [MongoDB](https://www.mongodb.com/)

## Getting started

1. Clone this repo using `git clone https://github.com/cristianmenguer/cbwa-ca1.git`.
2. Move to the appropriate directory: `cd cbwa-ca1`.<br />
3. Run `yarn` to install dependencies.<br />
4. Run `yarn dev:cluster`, it will start the API using the Atlas cluster.

## Features

### Session

#### Creating a session (JWT):
```
{POST}/session
```

Body: 
```
{
    "username": "username",
    "password": "password"
}
```


### Project

#### Getting all projects
```
{GET} /projects
```
it returns all the projects with their issues.

#### Get individual projects
{GET} /projects/{:projectSlug} =>  it returns a specific project with its issues.

#### Add new Projects individually
{POST}/projects => it adds a new project and returns the object created. The following body is necessary.
{
    "slug": "BUGS",
    "name": "Bug Tracker",
    "description": "This is a Bug Tracker Project"
}


### User

#### Get all users
{GET} /users => it returns all the users.

#### Get individual users
{GET} /users/{:EMAIL} 
{GET} /users/{:USERNAME} 
It is possible to search a user by its email or username.

#### Add new users individually
{POST} /users =>  it adds a new user and returns the object created. The following body is necessary.
{
    "name": "Dave Albert",
    "username": "davealbert",
    "email": "dalbert@cct.ie",
    "password": "d@lbert123456",
    "usertype": "admin"
}

The password is not saved, only the hashed password.

There are two options for UserType:
UserType {
    ADMIN = 'admin',
    USER = 'user'
}


### Issue

#### Get all issues (bring comments with it)
{GET} /issues => it returns all the issues with their comments.

#### Get individual issues
{GET} /issues/{:projectSlug-:issueNumber} =>  it returns a specific issue with its comments.

#### Get all issues for a project
{GET} /projects/{:projectSlug}/issues =>  it returns all issues from a specific project. 

#### Updated the status of an issue
{PUT} /issues/{:projectSlug-:issueNumber}/{:STATUS}  =>  it updates the specific issue status to the new one and returns the new object. 

#### Add new issues to a project individually
{POST}/issues/{:projectSlug} =>  it adds a new issue to a specific project and returns the object created. The following body is necessary.
{
    "title": "Cannot Track a Bug",
    "description": "Error when trying to track a bug",
    "status": "open"
}


### Comments

#### Get all comments (optional)
{GET}/comments => it returns all the comments with their specific issue.

#### Get all comments for an author (optional)
{GET} /comments/{EMAIL} 
{GET} /comments/{USERNAME}   
It returns all the comments that were created by a specific user. It is possible to search by email or username.

#### Get all comments for an issue
{GET} /issues/{:projectSlug-:issueNumber}/comments => it returns all the comments from a specific issue.

#### Get individual comments for an issue
{GET} /issues/{:projectSlug-:issueNumber}/comments/{:commentNumber}  => it returns a specific comment from a specific issue.   

#### Add new comments to an issue
{POST} /comments/{:projectSlug-:issueNumber} =>  it adds a new comment to a specific issue and returns the object created. The following body is necessary. 
{
    "title": "Comment 2",
    "text": "This is the second comment"
}
In this case, the author is the user logged in, the same that was used to get the token. In order to test it, it is necessary to get another token with another username/password.

## Technologies

- **Node.js** — Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Typescript** — Typed JavaScript at Any Scale.

## Changelog

#### Nov 25, 2020
- Comments: Comments and Issues included in the Get Project method

#### Nov 14, 2020
- .env: .env file created

#### Nov 11, 2020
- Docker: Dockerfile created

#### Nov 5, 2020
- Readme: Readme file created

#### Oct 29, 2020
- Interfaces: Interfaces moved to specific files

#### Oct 28, 2020
- Comments and Issues: Insertion and new input validation of Comments and Issues

#### Oct 24, 2020
- Status Issue and Get Projects: Possibility to change the status of an Issue and where clause to get Projects

#### Oct 23, 2020
- Get Users and Deployment: Get users by email and first deploy to Heroku

#### Oct 22, 2020
- Aggregate: Aggregate methods implemented and Input Validations

#### Oct 18, 2020
- Users, Projects and Issues: Entities, models and services created

#### Oct 17, 2020
- Project Created: DB, Routes and JWT created

## Roadmap

#### November, 2020
- Frontend: development of a ReactJS


## Author

Created by [@CristianMenguer](https://github.com/CristianMenguer/) - feel free to contact me!