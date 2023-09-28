# SNS-Codeail

A Node.js application with Google OAuth, JWT authentication, WebSockets, and deployment on Amazon EC2.
public IPv4 : 13.211.211.38

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Deployment](#deployment)

## Description

This Node.js application is designed to demonstrate several key features for modern web development:

- **Google OAuth Authentication:** Users can sign in using their Google accounts, ensuring a secure and streamlined login process.

- **JWT Authentication:** JSON Web Tokens are used to authenticate users and protect API endpoints, enhancing security.

- **WebSockets:** Real-time communication is achieved through WebSockets, enabling instant updates and collaboration within the application.

- **Amazon EC2 Deployment:** The application can be easily deployed to Amazon Elastic Compute Cloud (EC2) for scalability and reliability.

## Features

- User authentication with Google OAuth.
- JWT-based authentication for API endpoints.
- Real-time updates and messaging using WebSockets.
- Scalable deployment on Amazon EC2.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your local machine.
- A MongoDB database to store application data.
- A Google Developer Console project with OAuth credentials.

## Installation

To install and run this application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   ```

2. Install dependencies:

   ```bash
   cd your-repo
   npm install
   ```

3. Set up your configuration (see Configuration section below).

4. Start the application:

   ```bash
   npm start
   ```

## Configuration

Before running the application, you need to configure it:

1. Create a `.env` file in the project root with the following environment variables:

   ```
   MONGODB_URI=<Your MongoDB URI>
   GOOGLE_CLIENT_ID=<Your Google OAuth Client ID>
   GOOGLE_CLIENT_SECRET=<Your Google OAuth Client Secret>
   JWT_SECRET=<Your JWT Secret>
   ```

2. Configure WebSocket settings in `config/websocket.js` if needed.

## Usage

- Access the application by navigating to `http://localhost:3000` in your web browser.

- Sign in with your Google account to access the application's features.

- Use the real-time messaging and collaboration features provided by WebSockets.

## Deployment

To deploy this application on Amazon EC2, follow these general steps:

1. Provision an EC2 instance and ensure it has Node.js, MongoDB, and other required dependencies installed.

2. Clone your repository onto the EC2 instance.

3. Configure your production environment variables on the EC2 instance.

4. Run the application on the EC2 instance.

For detailed deployment instructions, refer to Amazon EC2 documentation or specific deployment guides.

