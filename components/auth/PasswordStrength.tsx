'use client';

interface Props {
  password: string;
}

function getStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: 'Muy débil', color: 'bg-red-500' };
  if (score === 2) return { score, label: 'Débil', color: 'bg-orange-500' };
  if (score === 3) return { score, label: 'Aceptable', color: 'bg-yellow-500' };
  if (score === 4) return { score, label: 'Fuerte', color: 'bg-emerald-500' };
  return { score, label: 'Muy fuerte', color: 'bg-emerald-400' };
}

export function PasswordStrength({ password }: Props) {
  const { score, label, color } = getStrength(password);
  if (!password) return null;

  return (
    <div className="space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= score ? color : 'bg-white/10'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${score <= 2 ? 'text-red-400' : score === 3 ? 'text-yellow-400' : 'text-emerald-400'}`}>
        {label}
      </p>
    </div>
  );
}
