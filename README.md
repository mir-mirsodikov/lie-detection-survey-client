<h1>lie-detection-survey-client</h1>

This is the client for the lie detection survey. It is a web application that allows users to take the survey and report the results to the survey conductor.



- [Functionality](#functionality)
  - [Administrator](#administrator)
  - [Survey Taker](#survey-taker)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
    - [Checkout code locally](#checkout-code-locally)
    - [Install dependencies](#install-dependencies)
  - [Environmental Variables](#environmental-variables)
- [Build and Run](#build-and-run)
  - [NPM Commands](#npm-commands)
- [Technologies](#technologies)

# Functionality

This applications consists of two different user flows:

1. Administrator
2. Survey Taker

## Administrator

URL: `/admin`

The login credentials can be created from the backend database. There is no UI for creating an administrator account.

The administrator is responsible for creating and managing surveys. They can create, edit, and delete surveys. They can also view the results of a survey by downloading it as a CSV file.


## Survey Taker

URL: `/`

The user taking the survey will see a series of prompts that flash one word at a time at a speed specified by the administrator. The user is then to indicate how truthful the prompt is.


# Getting Started

## Prerequisites

You will need the following things properly installed on your computer:
1. Node.js
2. Sever for this client
   1. Server [GitHub Repo](https://github.com/mir-mirsodikov/lie-detection-survey-server)

## Install

### Checkout code locally

``` bash
git clone https://github.com/mir-mirsodikov/lie-detection-survey-client
```

### Install dependencies

``` bash
npm i
```

## Environmental Variables

The following environmental variables are required for the application to run:

| Variable Name  | Description                                            |
| -------------- | ------------------------------------------------------ |
| `VITE_API_URL` | The URL of the server that the client will connect to. |

# Build and Run

## NPM Commands

| Command         | Description                               |
| --------------- | ----------------------------------------- |
| `npm run dev`   | Runs the application in development mode. |
| `npm run build` | Builds the application for production.    |
| `npm start`     | Runs the application in production mode.  |

# Technologies

This project was built using the following technologies:

- [Vue.js](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.esm.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [UIKit](https://getuikit.com/)