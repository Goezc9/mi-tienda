import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../back/firebase';

// ── Contexto ────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

/**
 * Provee el usuario actual de Firebase a toda la app.
 * - `user`    → objeto de Firebase o null
 * - `loading` → true mientras Firebase verifica la sesión al arrancar
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // evita flash de UI

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe; // limpia el listener al desmontar
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

/** Hook para consumir el contexto de autenticación */
export const useAuth = () => useContext(AuthContext);
