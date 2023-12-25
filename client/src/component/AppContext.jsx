import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children, template, account }) => {
  const [isConnected, setConnected] = useState(false);
  const [isUserConnected, setUserConnected] = useState(false);
  const [isEventOrganizer, setEventOrganizer] = useState(false);
  const contextValue = {
    isConnected,
    setConnected,
    isUserConnected,
    setUserConnected,
    isEventOrganizer,
    setEventOrganizer,
    account,
    template,
  };

  useEffect(() => {
    async function fetchAccount() {
      try {
        if ((await account) !== "Not connected") {
          setConnected(true);
        } else {
          setConnected(false);
        }
      } catch (error) {
        console.error("Error fetching account:", error);
      }
    }
    fetchAccount();
  }, []);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export { AppProvider, useAppContext };
