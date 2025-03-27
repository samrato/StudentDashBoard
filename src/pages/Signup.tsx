import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AuthCard from '../components/AuthCard';
import InputField from '../components/InputField';
import WaveBackground from '../components/WaveBackground';
import { registerUser, isValidRegNumber, getCurrentUser } from '../services/authService';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    regNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (getCurrentUser()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    
    // Validate registration number as the user types
    if (name === 'regNumber' && value && !isValidRegNumber(value)) {
      setErrors(prev => ({
        ...prev,
        regNumber: 'Registration number must start with COM/B/01- or SIT/B/01-'
      }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.regNumber.trim()) {
      newErrors.regNumber = 'Registration number is required';
    } else if (!isValidRegNumber(formData.regNumber)) {
      newErrors.regNumber = 'Registration number must start with COM/B/01- or SIT/B/01-';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      const success = registerUser({
        name: formData.name,
        email: formData.email,
        regNumber: formData.regNumber,
        password: formData.password
      });
      
      if (success) {
        toast.success('Account created successfully!');
        navigate('/login');
      } else {
        toast.error('Email or registration number already exists');
        setErrors({
          ...errors,
          email: 'Email or registration number already exists',
          regNumber: 'Email or registration number already exists'
        });
      }
      
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <WaveBackground />
      
      <div className="w-full max-w-md">
        <AuthCard 
          title="Create an account" 
          subtitle="Sign up to get started"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Full Name"
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              disabled={isLoading}
              required
            />
            
            <InputField
              label="Email"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              disabled={isLoading}
              required
            />
            
            <InputField
              label="Registration Number"
              id="regNumber"
              name="regNumber"
              type="text"
              placeholder="COM/B/01-XXXX or SIT/B/01-XXXX"
              value={formData.regNumber}
              onChange={handleChange}
              error={errors.regNumber}
              disabled={isLoading}
              required
            />
            
            <InputField
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              disabled={isLoading}
              required
            />
            
            <InputField
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              disabled={isLoading}
              required
            />
            
            <button
              type="submit"
              className="auth-button mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Sign up'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-medium hover:underline transition-all">
                Sign in
              </Link>
            </p>
          </div>
        </AuthCard>
      </div>
    </div>
  );
};

export default Signup;