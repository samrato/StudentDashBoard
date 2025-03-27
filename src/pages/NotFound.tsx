
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import WaveBackground from "../components/WaveBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <WaveBackground />
      
      <div className="glass-panel p-8 max-w-md w-full text-center animate-fade-in">
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <p className="text-xl text-foreground mb-6">Oops! Page not found</p>
        <p className="text-muted-foreground mb-8">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Link 
          to="/login" 
          className="auth-button inline-block"
        >
          Return to Login
        </Link>
      </div>
    </div>
  );
};

export default NotFound;