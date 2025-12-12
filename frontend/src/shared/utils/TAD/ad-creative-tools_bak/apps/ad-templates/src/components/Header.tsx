import { useState } from 'react';
import UserAvatar from './UserAvatar';
import LoginButtons from './login/LoginButtons';
import { useAuth } from '../contexts/AuthContext';
import Login from './login/Login';
import Register from './login/Register';

interface HeaderProps {
  title: string;
  description: string;
}

export default function Header({ title, description }: HeaderProps) {
  const { user, loading, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState<boolean>(false);
  return (
    <>
      <header className="px-4 py-10 text-center relative flex items-center justify-center overflow-hidden h-48">
        <div className="absolute top-4 right-4">
          {loading ? (
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
          ) : user ? (
            <UserAvatar user={user} onLogout={handleLogout} />
          ) : (
            <LoginButtons
              onLoginClick={() => setShowLoginDialog(true)}
              onRegisterClick={() => setShowRegisterDialog(true)}
            />
          )}
        </div>

        <div className="relative max-w-4xl mx-auto flex flex-col gap-2">
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="text-lg opacity-90">{description}</p>
        </div>
      </header>
      <Login
        show={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onCancel={() => setShowLoginDialog(false)}
        onLogined={() => setShowLoginDialog(false)}
      />
      <Register
        show={showRegisterDialog}
        onClose={() => setShowRegisterDialog(false)}
        onCancel={() => setShowRegisterDialog(false)}
      />
    </>
  );
}