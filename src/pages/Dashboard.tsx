
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getCurrentUser, logoutUser } from '../services/authService';
import WaveBackground from '../components/WaveBackground';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string; regNumber: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const currentUser = getCurrentUser();
    if (!currentUser) {
      toast.error('Please login to access the dashboard');
      navigate('/login');
      return;
    }
    
    setUser(currentUser);
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <WaveBackground />
      
      <header className="bg-white/80 backdrop-blur-sm border-b border-border/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gradient">Student Dashboard</h1>
          
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm bg-secondary text-foreground rounded-md hover:bg-secondary/80 transition-colors"
          >
            Log out
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-panel p-8 mb-8 animate-fade-in">
          <h2 className="text-xl font-medium mb-4">Welcome, {user?.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-border/50">
              <h3 className="text-lg font-medium mb-4 text-foreground">User Information</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{user?.name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Email Address</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Registration Number</p>
                  <p className="font-medium">{user?.regNumber}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-border/50">
              <h3 className="text-lg font-medium mb-4 text-foreground">System Information</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Last Login</p>
                  <p className="font-medium">{new Date().toLocaleString()}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Account Type</p>
                  <p className="font-medium">
                    {user?.regNumber.startsWith('COM/B/01-') ? 'Computer Science' : 'Information Technology'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div className="flex items-center">
                    <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="font-medium">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass-panel p-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-xl font-medium mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'View Profile', icon: '👤' },
              { title: 'Messages', icon: '💬' },
              { title: 'Settings', icon: '⚙️' },
              { title: 'Help & Support', icon: '❓' },
            ].map((action, index) => (
              <button
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-border/50 hover:shadow-md hover:bg-white/90 transition-all duration-200 text-left"
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <h3 className="font-medium">{action.title}</h3>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;