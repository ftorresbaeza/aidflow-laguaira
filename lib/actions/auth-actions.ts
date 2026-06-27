'use server';

import { signIn, signOut } from '@/lib/auth/auth';
import { AuthError } from 'next-auth';

export async function loginWithCredentials(email: string, password: string) {
  try {
    await signIn('credentials', { email, password, redirectTo: '/admin' });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': return { error: 'Email o contraseña incorrectos' };
        default: return { error: 'Error al iniciar sesión' };
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: '/login' });
}
