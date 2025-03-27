interface User {
  name: string;
  email: string;
  regNumber: string;
  password: string;
}

// Validate registration number format
export const isValidRegNumber = (regNumber: string): boolean => {
  return regNumber.startsWith('COM/B/01-') || regNumber.startsWith('SIT/B/01-');
};

// Save user to localStorage
export const registerUser = (user: User): boolean => {
  try {
    // Check if user already exists (by regNumber or email)
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = existingUsers.some(
      (u: User) => u.regNumber === user.regNumber || u.email === user.email
    );

    if (userExists) {
      return false;
    }

    // Add new user
    existingUsers.push(user);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    return true;
  } catch (error) {
    console.error('Registration error:', error);
    return false;
  }
};

// Authenticate user by regNumber and password
export const loginUser = (regNumber: string, password: string): User | null => {
  try {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => u.regNumber === regNumber && u.password === password);
    
    if (user) {
      // Save current user to localStorage for dashboard access
      localStorage.setItem('currentUser', JSON.stringify({
        name: user.name,
        regNumber: user.regNumber // Store regNumber instead of email
      }));
      return user;
    }
    
    return null;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

// Get current user from localStorage
export const getCurrentUser = (): { name: string; regNumber: string } | null => {
  try {
    const userString = localStorage.getItem('currentUser');
    if (!userString) return null;
    
    return JSON.parse(userString);
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem('currentUser');
}


//serditfgyuhi[joerctopybiun'oim'jj]