import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Menu } from 'lucide-react';

import { getCurrentUser, logoutUser } from '../services/authService';
import WaveBackground from '../components/WaveBackground';
import { useLocalStorage } from '../components/useLocalStorage';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string; regNumber: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useLocalStorage('theme', 'light'); // Dark/Light mode persistence

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-r from-purple-600 via-blue-700 to-teal-500'}`}>
      <WaveBackground />

      {/* Sidebar */}
      <aside
        className={`w-64 bg-white/80 backdrop-blur-sm border-r border-border/50 p-6 shadow-lg fixed lg:relative transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        aria-label="Dashboard Sidebar"
      >
       <button
  onClick={toggleSidebar}
  className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white/80 text-black shadow-md"
  aria-label="Toggle Sidebar"
>
  <Menu size={28} />
</button>

        <h2 className="text-2xl font-semibold text-gradient mb-8">Dashboard</h2>
        <div className="space-y-6">
          {[
            { title: 'Results', icon: '📊', link: '/results' },
            { title: 'Timetable', icon: '📅', link: '/timetable' },
            { title: 'Hostel', icon: '🏠', link: '/hostel' },
            { title: 'Transfer', icon: '🔄', link: '/transfer' },
            { title: 'Applications', icon: '📝', link: '/applications' },
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.link)}
              className="flex items-center space-x-3 w-full p-3 rounded-md hover:bg-indigo-100 transition-colors"
              aria-label={`Navigate to ${item.title}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.title}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-hidden">
        <header className="bg-white/80 backdrop-blur-sm border-b border-border/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gradient">Student Dashboard</h1>

            <div className="flex items-center space-x-4">
              {/* Theme Switch */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white/70 dark:bg-gray-800 text-xl"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>

              {/* Log Out Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-secondary text-foreground rounded-md hover:bg-secondary/80 transition-colors"
                aria-label="Log out"
              >
                Log out
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* User Info Section */}
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

          {/* Quick Actions Section */}
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
                  aria-label={`Quick Action: ${action.title}`}
                >
                  <div className="text-2xl mb-2">{action.icon}</div>
                  <h3 className="font-medium">{action.title}</h3>
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
