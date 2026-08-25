import { Routes, Route } from 'react-router';
import { AuthProvider } from '../contexts/AuthContext';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Layout } from '../components/layout/Layout';
import Login from '../pages/Login'; 

// Placeholders para Register e Dashboard (enquanto não são criados)
const Register = () => <div className="p-4">Register Page</div>;
const Dashboard = () => <div className="p-4">Dashboard</div>;

export const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Adicione outras rotas protegidas aqui */}
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
};