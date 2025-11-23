# Timetable-management-app

Timetable Management System

A full-stack web application built with ReactJS and Node.js for generating and managing timetables. This project aims to provide an efficient and user-friendly solution for creating, editing, and organizing timetables.

Features:

- Generate timetables based on user input parameters
- Manage timetables (create, edit, delete)
- Conflict detection for overlapping classes and room clashes
- User-friendly interface with ReactJS frontend
- RESTful API with Node.js backend

Tech Stack:

- Frontend: ReactJS
- Backend: Node.js
- Database: MongoDB

Installations

Node.js
MongoDB
npm package manager
Git
1. Clone Repository
   git clone https://github.com/Davibyte/Timetable-management-app.git
2. Backend Setup
   # Navigate to server directory
   cd server

   # Install dependencies
   npm install

   # Create .env file
   touch .env

   # Add environment variables (contact team)
   # Start MongoDB
   mongosh

   # Seed default categories
   node scripts/createDefaultCategories.js

   # Start server
   npm run dev
Server will run on http://localhost:5000

3. Frontend Setup
   # Open new terminal
   # Navigate to client directory
   cd client

   # Install dependencies
   npm install

   # Create .env file
   touch .env

   # Add environment variables (contact team)

   # Start development server
   npm start
Client will run on http://localhost:3000

Team
Samantha Ngong @SamanthaNK
Davida Assene @Davibyte
Pearly Kusona @Pearly-Kusona25
Bless Nsango @NsangoBless
Status:
Project currently under development.


