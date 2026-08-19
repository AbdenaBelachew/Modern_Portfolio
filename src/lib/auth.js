const SESSION_KEY = 'portfolio_admin_session';

// Change these in code — no backend required.
export const ADMIN = {
  email: 'abdiolbelachew@gmail.com',
  password: 'Abdena@2026',
};

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function getSession() {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function notify() {
  window.dispatchEvent(new Event('portfolio-auth'));
}

export function login(email, password) {
  const normalized = String(email || '').trim().toLowerCase();
  if (normalized !== ADMIN.email.toLowerCase() || password !== ADMIN.password) {
    return { error: { message: 'Invalid email or password' } };
  }

  const session = { email: ADMIN.email, loggedInAt: Date.now() };
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  notify();
  return { error: null, session };
}

export function logout() {
  if (canUseStorage()) {
    window.localStorage.removeItem(SESSION_KEY);
  }
  notify();
}

export function onAuthChange(callback) {
  const handler = () => callback(getSession());
  window.addEventListener('portfolio-auth', handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener('portfolio-auth', handler);
    window.removeEventListener('storage', handler);
  };
}
