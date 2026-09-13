import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { getSession } from "./session";

type RequireAuthProps = {
  children: ReactNode;
};

export function RequireAuth({ children }: RequireAuthProps) {
  const location = useLocation();
  const session = getSession();

  if (!session) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
}