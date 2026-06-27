import { auth } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect('/login');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top nav */}
      <nav className="bg-blue-700 text-white px-4 py-3 flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="font-bold text-sm">AidFlow Admin</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/admin" className="hover:text-blue-200 transition-colors">Dashboard</Link>
          <Link href="/admin/entregas" className="hover:text-blue-200 transition-colors">Entregas</Link>
          <Link href="/escanear" className="hover:text-blue-200 transition-colors">Scanner</Link>
          <span className="text-blue-300 text-xs">{session.user.email}</span>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
