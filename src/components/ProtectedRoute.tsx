import { Navigate, Outlet } from 'react-router'  
import { useAuth } from '../contexts/AuthContext';
import { Spinner } from './ui/Spinner'

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}