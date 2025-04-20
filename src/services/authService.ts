// services/authService.ts

export interface User {
  name: string;
  email: string;
  regNumber: string;
  password: string;
}

// Validate registration number format
export const isValidRegNumber = (regNumber: string): boolean => {
  return regNumber.startsWith('COM/B/01-') || regNumber.startsWith('SIT/B/01-');
};

// Register a new user and store them in localStorage
export const registerUser = (user: User): boolean => {
  try {
    const existingUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    const userExists = existingUsers.some(
      (u) => u.regNumber === user.regNumber || u.email === user.email
    );

    if (userExists) return false;

    existingUsers.push(user);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    return true;
  } catch (error) {
    console.error('Registration error:', error);
    return false;
  }
};

// Authenticate user using regNumber and password
export const loginUser = (regNumber: string, password: string): User | null => {
  try {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find(
      (u) => u.regNumber === regNumber && u.password === password
    );

    if (user) {
      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          name: user.name,
          email: user.email,
          regNumber: user.regNumber
        })
      );
      return user;
    }

    return null;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

// Get the currently logged-in user
export const getCurrentUser = (): { name: string; email: string; regNumber: string } | null => {
  try {
    const userString = localStorage.getItem('currentUser');
    if (!userString) return null;
    return JSON.parse(userString);
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

// Logout user by removing them from localStorage
export const logoutUser = (): void => {
  localStorage.removeItem('currentUser');
};
