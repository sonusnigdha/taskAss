# Task Manager Backend

## Overview

This repository contains the backend API for the Task Manager application. The API provides full CRUD operations for managing tasks along with secure user authentication using JWT. It is built with Node.js, Express, and MongoDB. This backend is deployed on Render and is live at:

**Live URL:** [https://taskass-uba5.onrender.com/](https://taskass-uba5.onrender.com/)

## Features

- **User Authentication:** Secure signup and login using JWT.
- **CRUD Operations:** Create, read, update, and delete tasks.
- **Task Categorization & Tagging:** Organize tasks with categories and tags.
- **Secure Endpoints:** Protected routes that require a valid token.

## Technologies Used

- **Node.js & Express:** For server and API endpoint creation.
- **MongoDB & Mongoose:** For data persistence.
- **JWT:** For secure user authentication.
- **CORS:** To enable cross-origin resource sharing.
- **dotenv:** For managing environment variables.

## Getting Started

### Prerequisites

- Node.js and npm installed.
- A MongoDB connection string (local or remote).

### Installation

1. Clone the repository:
   ```bash
   git clone <your-backend-repo-url>
   cd task-manager-backend
