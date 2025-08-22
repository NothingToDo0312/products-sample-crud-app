"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./Navigation.css";

export default function Navigation() {
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication status on component mount
    const role = localStorage.getItem("userRole");
    const email = localStorage.getItem("userEmail");
    setUserRole(role);
    setUserEmail(email);
  }, []);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    setUserRole(null);
    setUserEmail(null);
    router.push("/login");
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          {/* Empty brand section */}
        </div>
        
        <div className="nav-actions">
          {userRole ? (
            <div className="user-menu">
              <div className="user-info">
                <span className="user-role">
                  {userRole === "admin" ? " Admin" : " Customer"}
                </span>
                <span className="user-email">{userEmail}</span>
              </div>
              
              <button 
                onClick={handleLogout}
                className="nav-button logout-button"
              >
                Logout
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="nav-button login-button"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
