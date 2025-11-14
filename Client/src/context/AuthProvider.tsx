import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type User } from "./authContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/auth/me", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setUser(null);
      });
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const data = await response.json();
      console.log("Login response:", data);
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      console.log("Register response:", data);
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  const googleLogin = async (googleToken: string | undefined) => {
    try {
      console.log("Sending Google token to backend...");

      if (!googleToken) {
        console.error("Token is empty or undefined");
        throw new Error("Google token is empty");
      }

      console.log("Token length:", googleToken.length);

      const response = await fetch("http://localhost:3000/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token: googleToken }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error("Invalid credentials");
      }

      console.log("Response received from backend");
      const data = await response.json();
      console.log("Google login data:", data);
      setUser(data);
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const logout = () => {
    fetch("http://localhost:3000/auth/logout", {
      method: "GET",
      credentials: "include",
    }).then(() => {
      console.log("Logged out from backend");
    });

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, googleLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
