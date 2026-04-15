import { Routes, Route } from 'react-router-dom'; // Removed BrowserRouter import

// Import your pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CompanyDetails from './pages/CompanyDetails';
import VerifyEmail from './pages/VerifyEmail';

// Admin Imports
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* --- User Routes --- */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/company/:id" element={<CompanyDetails />} />

        {/* --- Admin Routes --- */}
        <Route path="/secret-admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;