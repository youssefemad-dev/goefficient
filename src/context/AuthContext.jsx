import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing user in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("goefficient_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("goefficient_user");
      }
    }
    setLoading(false);
  }, []);

  const register = (name, email, password) => {
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem("goefficient_users") || "[]");
    const userExists = existingUsers.find((u) => u.email === email);

    if (userExists) {
      return { success: false, error: "User with this email already exists" };
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In production, this should be hashed
      createdAt: new Date().toISOString(),
    };

    // Save to users list
    existingUsers.push(newUser);
    localStorage.setItem("goefficient_users", JSON.stringify(existingUsers));

    // Set as current user (auto-login after registration)
    const userToStore = { id: newUser.id, name: newUser.name, email: newUser.email };
    setUser(userToStore);
    localStorage.setItem("goefficient_user", JSON.stringify(userToStore));

    return { success: true };
  };

  const login = (email, password) => {
    const existingUsers = JSON.parse(localStorage.getItem("goefficient_users") || "[]");
    const foundUser = existingUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      return { success: false, error: "Invalid email or password" };
    }

    // Set current user
    const userToStore = { id: foundUser.id, name: foundUser.name, email: foundUser.email };
    setUser(userToStore);
    localStorage.setItem("goefficient_user", JSON.stringify(userToStore));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("goefficient_user");
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
