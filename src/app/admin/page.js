"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductsGrid from "@/components/products/ProductsGrid";
import "./admin.css";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check authentication on component mount
        const userRole = localStorage.getItem("userRole");
        const userEmail = localStorage.getItem("userEmail");

        if (userRole === "admin" && userEmail) {
            setIsAuthenticated(true);
        } else {
            // Redirect to login if not authenticated as admin
            router.push("/login");
            return;
        }

        setIsLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("userRole");
        localStorage.removeItem("userEmail");
        router.push("/login");
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="text-center">
                    <div className="spinner"></div>
                    <p className="loading-text">Checking authentication...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect to login
    }

    return (
        <div className="admin-container">
            <div className="admin-content">
                <div className="admin-header">
                    <div className="admin-header-content">
                        <div>
                            <h1 className="admin-title">Admin Panel</h1>
                            <p className="admin-subtitle">Manage your computer parts inventory</p>
                        </div>
                    </div>
                </div>
                <ProductsGrid />
            </div>
        </div>
    );
}
