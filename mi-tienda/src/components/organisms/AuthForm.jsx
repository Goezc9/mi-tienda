import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { auth } from '../../back/firebase';
import FormField from '../molecules/FormField';
import Checkbox from '../molecules/Checkbox';
import Button from '../atoms/Button';
import SocialButton from '../molecules/SocialButton';
import Icon from '../atoms/Icon';

// Clave para guardar cuentas localmente (para el autocompletado)
const ACCOUNTS_KEY = 'mi_tienda_cuentas';

const AuthForm = () => {
  const [isRegistering, setIsRegistering]   = useState(false);
  const [email, setEmail]                   = useState('');
  const [password, setPassword]             = useState('');
  const [showPassword, setShowPassword]     = useState(false);
  const [rememberMe, setRememberMe]         = useState(true);
  const [error, setError]                   = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading]               = useState(false);
  const [savedAccounts, setSavedAccounts]   = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);
  const navigate = useNavigate();

  // Cargar cuentas guardadas al montar
  useEffect(() => {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (raw) setSavedAccounts(JSON.parse(raw));
  }, []);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handler = (e) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Filtrar cuentas según lo que se escribe
  const filteredAccounts = savedAccounts.filter(u =>
    u.email.toLowerCase().includes(email.toLowerCase())
  );

  // Al seleccionar una cuenta guardada: rellenar email y contraseña
  const selectAccount = (acc) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setShowSuggestions(false);
  };

  // Guardar cuenta localmente para el autocompletado
  const saveAccountLocally = (emailToSave, passwordToSave) => {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    const accounts = raw ? JSON.parse(raw) : [];
    // Actualizar si ya existe, o agregar nueva
    const exists = accounts.findIndex(a => a.email === emailToSave);
    if (exists >= 0) {
      accounts[exists].password = passwordToSave;
    } else {
      accounts.push({ email: emailToSave, password: passwordToSave });
    }
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    setSavedAccounts(accounts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      // Configurar persistencia según "Recordarme"
      await setPersistence(
        auth,
        rememberMe ? browserLocalPersistence : browserSessionPersistence
      );

      if (isRegistering) {
        // ── REGISTRO con Firebase ────────────────────────────────
        await createUserWithEmailAndPassword(auth, email, password);
        // Guardar cuenta localmente para autocompletado futuro
        saveAccountLocally(email, password);
        setSuccessMessage('¡Cuenta creada con éxito! Redirigiendo...');

      } else {
        // ── INICIO DE SESIÓN con Firebase ────────────────────────
        await signInWithEmailAndPassword(auth, email, password);
        // Actualizar/guardar credenciales para el autocompletado
        saveAccountLocally(email, password);
        setSuccessMessage('¡Acceso concedido! Redirigiendo...');
      }

      setTimeout(() => navigate('/inicio'), 1500);

    } catch (err) {
      console.error('Auth error:', err);
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('El correo electrónico ya está en uso.');
          break;
        case 'auth/invalid-email':
          setError('El correo electrónico no es válido.');
          break;
        case 'auth/weak-password':
          setError('La contraseña debe tener al menos 6 caracteres.');
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
          setError('Correo o contraseña incorrectos.');
          break;
        case 'auth/operation-not-allowed':
          setError('Habilita Correo/Contraseña en Firebase Console → Authentication → Sign-in method.');
          break;
        case 'auth/configuration-not-found':
          setError('Error de configuración de Firebase. Verifica las credenciales del proyecto.');
          break;
        default:
          setError(`Error (${err.code || 'Desconocido'}): ${err.message}`);
      }
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-4xl font-bold text-[#001a4d] mb-3 tracking-tight">
        {isRegistering ? 'Crear Cuenta' : 'Acceso'}
      </h2>
      <p className="text-slate-500 mb-6">
        {isRegistering
          ? 'Ingrese sus datos para registrarse en la plataforma.'
          : 'Ingrese sus credenciales para acceder a su panel de control.'}
      </p>

      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md mb-6 text-sm border border-red-200 flex items-start gap-2">
          <Icon name="error_outline" className="text-base flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 text-green-600 p-3 rounded-md mb-6 text-sm border border-green-200 flex items-start gap-2">
          <Icon name="check_circle" className="text-base flex-shrink-0 mt-0.5" />
          {successMessage}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>

        {/* ── Email con dropdown de cuentas guardadas ── */}
        <div className="relative" ref={suggestionsRef}>
          <FormField
            id="email"
            name="email"
            autoComplete="off"
            label="Correo Electrónico"
            icon="mail"
            type="email"
            placeholder="ejemplo@empresa.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            required
          />

          {showSuggestions && filteredAccounts.length > 0 && (
            <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-xl overflow-hidden">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2 border-b border-slate-100">
                Cuentas guardadas
              </p>
              {filteredAccounts.map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => selectAccount(account)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#002878] to-[#0057ff] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm">
                    {account.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="overflow-hidden text-left">
                    <p className="text-sm font-semibold text-slate-700 truncate">{account.email}</p>
                    <p className="text-xs text-slate-400">Cuenta guardada · contraseña guardada</p>
                  </div>
                  <Icon name="chevron_right" className="ml-auto text-slate-300 text-sm" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Contraseña con toggle ── */}
        <FormField
          id="password"
          name="password"
          autoComplete={isRegistering ? 'new-password' : 'current-password'}
          label="Contraseña"
          icon="lock"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-[#002878] transition-colors focus:outline-none"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
            >
              <Icon name={showPassword ? 'visibility_off' : 'visibility'} />
            </button>
          }
        />

        {!isRegistering && (
          <div className="flex items-center justify-between text-sm">
            <Checkbox
              id="remember"
              label="Recordarme"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <a href="#" className="font-bold text-[#002878] hover:underline">
              ¿Olvidó su contraseña?
            </a>
          </div>
        )}

        <Button type="submit" disabled={loading || !!successMessage}>
          {loading ? 'Cargando...' : (isRegistering ? 'Registrarse' : 'Acceder a la plataforma')}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <span className="text-slate-500">
          {isRegistering ? '¿Ya tiene una cuenta?' : '¿No tiene una cuenta?'}
        </span>{' '}
        <button
          type="button"
          onClick={() => { setIsRegistering(!isRegistering); setError(null); setShowSuggestions(false); }}
          className="font-bold text-[#002878] hover:underline"
        >
          {isRegistering ? 'Inicie sesión' : 'Regístrese'}
        </button>
      </div>

      {/* ── Divisor ── */}
      <div className="relative my-10 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-100" />
        </div>
        <span className="relative px-4 bg-white text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
          o continuar con
        </span>
      </div>

      <div className="space-y-3">
        <SocialButton imgSrc="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png">
          {isRegistering ? 'Registrarse con Google' : 'Acceder con Google'}
        </SocialButton>
        <SocialButton iconName="business_center">
          {isRegistering ? 'Registrarse con SSO Corporativo' : 'Acceder con SSO Corporativo'}
        </SocialButton>
      </div>
    </div>
  );
};

export default AuthForm;
