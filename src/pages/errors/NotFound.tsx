import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';

export function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <h1 className="text-9xl font-extrabold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">Page not found</h2>
      <p className="mt-2 text-muted-foreground text-center max-w-sm">
        Sorry, we couldn't find the page you're looking for. Perhaps you've mistyped the URL?
      </p>
      <Button asChild className="mt-8">
        <Link to="/">Back to Dashboard</Link>
      </Button>
    </div>
  );
}
