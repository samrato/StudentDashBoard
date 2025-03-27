import React from 'react';

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthCard: React.FC<AuthCardProps> = ({ children, title, subtitle }) => {
  return (
    <div className="auth-card w-full max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-1 text-foreground">{title}</h1>
      {subtitle && <p className="text-muted-foreground mb-6">{subtitle}</p>}
      {children}
    </div>
  );
};

export default AuthCard;