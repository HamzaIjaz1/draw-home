'use client';

import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { type StrapiUser } from '../services/common';
import { CheckUser, fetchHelper } from '../services';

type AuthContextValue = {
  verified: boolean;
  loggedIn: boolean;
  user: null | StrapiUser;
  setVerified: (v: boolean) => void;
  setUser: (u: StrapiUser) => void;
};

const defaultValue: AuthContextValue = {
  verified: false,
  loggedIn: false,
  user: null,
  setVerified: () => {},
  setUser: () => {},
};

export const AuthContext = createContext(defaultValue);

export type AuthContextProps = {
  defaultUser: StrapiUser | null;
  defaultLoggedIn: boolean;
  defaultVerified: boolean;
};

export const AuthContextWrapper: React.FCWithChildren<AuthContextProps> = ({
  children,
  defaultUser,
  defaultLoggedIn,
  defaultVerified,
}) => {
  const [verified, setVerified] = useState(defaultVerified);
  const [loggedIn, setLoggedIn] = useState(defaultLoggedIn);
  const [user, setUser] = useState<StrapiUser | null>(defaultUser);

  const handleSetUser = useCallback((user: StrapiUser | null) => {
    if(user?.id) {
      setLoggedIn(true);
    }
    setUser(user);
  }, []);

  const checkUser = useCallback(async () => {
    const res = await fetchHelper<CheckUser.Resp>(CheckUser.url);
    setVerified(true);

    if(!res || 'error' in res) {
      return;
    }

    setLoggedIn(true);
    setUser(res);
  }, []);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  const contextValue = useMemo(() => ({
    verified,
    loggedIn,
    user,
    setUser: handleSetUser,
    setVerified,
  }), [
    verified,
    loggedIn,
    user,
    handleSetUser,
    setVerified,
  ]);


  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
