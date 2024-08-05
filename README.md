# Expro - Automated Finance Management Application

Expro is a comprehensive finance management application developed using Next.js and JavaScript. It provides a robust platform for tracking budgets, expenses, and incomes with automation and AI-driven insights. The application integrates Gmail API for automated expense tracking and offers personalized financial advice using AI.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Acknowledgements](#acknowledgments)

## Features

- **User Authentication**: Secure login and registration using both email/password and Google OAuth.
- **Automated Expense Tracking**: Fetches transaction emails from Gmail, identifies bank transactions using AI (Gemini), and stores them with details like Transaction ID, Debit/Credit, Amount, and Paid/Received By.
- **Budget and Income Tracking**: Allows users to set and monitor their budgets and income sources.
- **AI-Driven Financial Advice**: Provides personalized financial advice based on the user's transaction data.
- **CRUD Operations**: Full support for Create, Read, Update, and Delete operations through API integrations.
- **Frontend**: Utilizes ShadcnUI for a modern and responsive user interface.
- **Backend**: Uses Prisma ORM and MySQL for efficient database management.

## Technologies Used

- **Framework**: Next.js
- **Programming Language**: JavaScript
- **Database**: MySQL with Prisma ORM
- **Authentication**: Google OAuth
- **APIs**: Gmail API, OpenAI, Gemini
- **UI Library**: ShadcnUI

## Getting Started

To run the project locally, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- MySQL Server
- Gmail API credentials
- OpenAI API credentials (Gemini)

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/21Sandesh/Expro.git
   cd expro
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set up the Database**:
   Make sure MySQL is installed and running. Then, create a new database and configure the connection settings in the .env file (see [Configuration](#configuration) section).

4. **Run Database Migrations**:

   ```bash
   npx prisma migrate dev
   ```

5. **Start the Developement Server**:
   ```bash
   npm run dev
   ```

Open http://localhost:3000 in your browser to view the application.

## Configuration

Create a .env file in the root directory and add the following environment variables:

    DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/DATABASE_NAME"
    GOOGLE_CLIENT_ID="your-google-client-id"
    GOOGLE_CLIENT_SECRET="your-google-client-secret"
    GMAIL_API_KEY="your-gmail-api-key"
    OPENAI_API_KEY="your-openai-api-key"
    GEMINI_API_KEY="your-gemini-api-key"

Replace the placeholders with your actual configuration details.

## Usage

- **Sign Up/Log In**: Use Email/Password or Google account to access your dashboard.
- **Dashboard**: View your financial overview, including budgets, expenses, and incomes.
- **Automated Expense Tracking**: The application will automatically fetch transaction emails from your Gmail, categorize them, and update your financial records.
- **Manage Budgets and Incomes**: Add, edit, or delete budgets and incomes as needed.

## API Endpoints

- **GET** /api/expenses: Retrieve a list of expenses.
- **POST** /api/expenses: Add a new expense.
- **PUT** /api/expenses/: Update an existing expense.
- **DELETE** /api/expenses/: Delete an expense.

## Acknowledgments

- [**Next.js**](https://nextjs.org/) - React framework used for building the application.
- [**Prisma ORM**](https://www.prisma.io/nextjs) - ORM for managing the database.
- [**Gmail API**](https://developers.google.com/gmail/api/guides) - API used for fetching transaction emails.
- [**OpenAI (Gemini)**](https://openai.com/) - AI model used for identifying bank transactions.
