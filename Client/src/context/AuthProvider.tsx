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

      // El login exitoso guarda la cookie, ahora obtenemos el usuario
      const userResponse = await fetch("http://localhost:3000/auth/me", {
        method: "GET",
        credentials: "include",
      });

      const userData = await userResponse.json();
      setUser(userData);
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
      setUser(data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const googleLogin = async (googleToken: string | undefined) => {
    try {
      if (!googleToken) {
        throw new Error("Google token is empty");
      }

      const response = await fetch("http://localhost:3000/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token: googleToken }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();
      setUser(data.user);
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
