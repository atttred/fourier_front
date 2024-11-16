# Fourier Frontend Application

A modern React application for Fourier analysis visualization with authentication system.

## Project Structure

```
FOURIER_FRONT/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   │   └── logo.svg
│   ├── Pages/
│   │   ├── AuthContext.jsx    # Authentication context provider
│   │   ├── Dashboard.jsx      # Main dashboard component
│   │   ├── Login.jsx          # Login page
│   │   ├── Register.jsx       # Registration page
│   │   ├── SideBar.jsx        # Sidebar navigation component
│   │   └── TaskTab.jsx        # Task management component
│   ├── styles/
│   │   ├── _base.scss         # Base styles
│   │   ├── _dashboard.scss    # Dashboard-specific styles
│   │   ├── _login.scss        # Login page styles
│   │   ├── _register.scss     # Registration page styles
│   │   ├── _sidebar.scss      # Sidebar styles
│   │   ├── _tasktab.scss      # Task tab styles
│   │   ├── _variables.scss    # SCSS variables
│   │   └── styles.scss        # Main styles entry point
│   ├── App.css
│   ├── App.jsx                # Main application component
│   ├── index.css
│   └── main.jsx              # Application entry point
├── .gitignore
├── eslint.config.js
└── index.html
```

## Features

- User Authentication (Login/Register)
- Protected Routes
- Persistent Authentication State
- Responsive Dashboard Layout
- Task Management Interface
- Modern SCSS Styling Architecture

## Tech Stack

- React
- React Router v6
- Context API for State Management
- SCSS for Styling
- Local Storage for Auth Persistence

## Getting Started

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Authentication

The application uses token-based authentication with local storage persistence. Protected routes are wrapped with `ProtectedRoute` component that redirects unauthenticated users to the login page.

## Styling

The project uses SCSS with a modular architecture:

- Each component has its own SCSS file
- Global variables are stored in `_variables.scss`
- Base styles are in `_base.scss`
- All styles are imported through `styles.scss`

## Available Scripts

- `npm run dev` - Start development server

## Development

1. Components are located in the `Pages` directory
2. Styles for new components should be added to the `styles` directory
3. Authentication logic is handled through `AuthContext`
4. Protected routes should be wrapped with `ProtectedRoute` component
