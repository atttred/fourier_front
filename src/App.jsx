import Register from './Pages/Register';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import './styles/styles.scss';
import './App.css';
import { AuthProvider, AuthContext } from './Pages/AuthContext';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from 'react-router-dom';
import { useContext } from 'react';

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const BrowserRouter = createBrowserRouter([
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />
  }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={BrowserRouter} />
    </AuthProvider>
  );
}

export default App;
