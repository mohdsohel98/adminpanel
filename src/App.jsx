import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import { Login } from './components/Login';
import { Unauthorized } from './components/Unauthorized';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* protect everything else */}
          <Route element={<ProtectedRoute />}> 
            <Route path="/*" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
