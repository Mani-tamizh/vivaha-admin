import { Menu, Moon, Sun, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';

export function Navbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  const { theme, setTheme } = useTheme();
  const { logout, user } = useAuth();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
        <Menu className="h-5 w-5" />
      </Button>
      
      <div className="flex w-full items-center justify-end gap-4 md:gap-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium hidden md:inline-block">{user?.name}</span>
          <Button variant="outline" size="icon" onClick={logout} title="Logout">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
