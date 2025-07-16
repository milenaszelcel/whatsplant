import { jwtDecode, type JwtPayload } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

type AuthContextType = {
  user: JwtPayload | null;
};

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
});

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [cookies] = useCookies();
  const { accessToken, refreshToken } = cookies;

  useEffect(() => {
    if (accessToken === undefined || refreshToken === undefined) {
      setUser(null);
      return;
    }

    try {
      const decodedToken = jwtDecode(accessToken);
      if (!decodedToken.exp || decodedToken.exp * 1000 < Date.now()) {
        setUser(null);
      } else {
        setUser(decodedToken);
      }
    } catch (error) {
      console.error("Invalid token", error);
      setUser(null);
    }
  }, [accessToken, refreshToken]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
