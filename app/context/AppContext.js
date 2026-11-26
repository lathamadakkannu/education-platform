"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import LoginModal from "@/app/component/LoginModal/LoginModal";
import Toast from "@/app/component/Toast/Toast";

export const AUTH_KEY = "edu_auth_user";

const AppContext = createContext(null);

function readStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const pendingActionRef = useRef(null);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    setUser(readStoredUser());
    const handleStorage = () => setUser(readStoredUser());
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const dismissToast = useCallback(() => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    setToast(null);
  }, []);

  const showToast = useCallback((message, type = "success", duration = 3500) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ message, type });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, duration);
  }, []);

  const openLoginModal = useCallback((onSuccess) => {
    pendingActionRef.current = typeof onSuccess === "function" ? onSuccess : null;
    setIsLoginModalOpen(true);
  }, []);

  const closeLoginModal = useCallback(() => {
    pendingActionRef.current = null;
    setIsLoginModalOpen(false);
  }, []);

  const login = useCallback(
    (newUser, { silentToast = false } = {}) => {
      try {
        localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
      } catch {
        // Ignore storage write failure in restricted environments
      }
      setUser(newUser);
      setIsLoginModalOpen(false);
      if (!silentToast) {
        showToast("Signed in successfully.");
      }

      const pendingAction = pendingActionRef.current;
      pendingActionRef.current = null;
      if (typeof pendingAction === "function") {
        pendingAction(newUser);
      }
    },
    [showToast]
  );

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {
      // Ignore storage error
    }
    setUser(null);
    pendingActionRef.current = null;
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        openLoginModal,
        closeLoginModal,
        showToast,
        dismissToast,
      }}
    >
      {children}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onLoginSuccess={(newUser) => login(newUser)}
      />
      <Toast toast={toast} onDismiss={dismissToast} />
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return ctx;
}
