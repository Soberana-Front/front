import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../ui/Button";
import { LogOut } from "lucide-react";
import { useNavigate } from 'react-router';

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Bem-vindo, {user?.name}</h1>
      <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
        <LogOut className="h-4 w-4" />
        Sair
      </Button>
    </header>
  );
};
