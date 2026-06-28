'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitRegistration, type RegistrationInput } from '@/lib/actions/registration';
import { PersonRole, AidType, Priority, VehicleType } from '@prisma/client';
import { useFormDraft } from '@/hooks/useFormDraft';

// ── Constants ──────────────────────────────────────────────────────────────────

const ROLES = [
  {
    value: PersonRole.DONANTE,
    label: 'Donante',
    desc: 'Entrego insumos directamente',
    color: 'blue',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    value: PersonRole.TRANSPORTISTA,
    label: 'Transportista',
    desc: 'Llevo insumos en vehículo',
    color: 'orange',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2.607.87A2 2 0 007.52 18h7.96a2 2 0 001.913-1.13L19 13H13z" />
      </svg>
    ),
  },
  {
    value: PersonRole.VOLUNTARIO,
    label: 'Voluntario',
    desc: 'Apoyo labores humanitarias',
    color: 'green',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    value: PersonRole.FAMILIAR,
    label: 'Familiar',
    desc: 'Familiar de persona afectada',
    color: 'violet',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
];

const AID_TYPES = [
  {
    value: AidType.MEDICAMENTOS,
    label: 'Medicamentos',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    value: AidType.ALIMENTOS,
    label: 'Alimentos',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    value: AidType.AGUA,
    label: 'Agua',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 3.5C12 3.5 5 10 5 15a7 7 0 0014 0c0-5-7-11.5-7-11.5z" />
      </svg>
    ),
  },
  {
    value: AidType.OTRO,
    label: 'Otros',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8l1 12a2 2 0 002 2h8a2 2 0 002-2L19 8m-9 4h4" />
      </svg>
    ),
  },
];

const VEHICLE_TYPES = [
  { value: VehicleType.AUTO, label: 'Automóvil' },
  { value: VehicleType.MOTO, label: 'Motocicleta' },
  { value: VehicleType.CAMION, label: 'Camión' },
  { value: VehicleType.OTRO, label: 'Otro' },
];

const PRIORITIES = [
  {
    value: Priority.URGENTE,
    label: 'Urgente',
    desc: 'Requiere atención inmediata',
    activeClass: 'border-red-500 bg-red-50 text-red-700',
    dotClass: 'bg-red-500',
  },
  {
    value: Priority.ALTA,
    label: 'Alta',
    desc: 'Lo antes posible',
    activeClass: 'border-amber-500 bg-amber-50 text-amber-700',
    dotClass: 'bg-amber-500',
  },
  {
    value: Priority.NORMAL,
    label: 'Normal',
    desc: 'Sin urgencia especial',
    activeClass: 'border-green-500 bg-green-50 text-green-700',
    dotClass: 'bg-green-500',
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function formatCedula(value: string) {
  const digits = value.replace(/[^0-9]/g, '');
  if (!value.toUpperCase().startsWith('V-') && !value.toUpperCase().startsWith('E-')) {
    return digits ? `V-${digits}` : '';
  }
  return value.toUpperCase();
}

function roleColor(role?: PersonRole) {
  const found = ROLES.find((r) => r.value === role);
  return found?.color ?? 'blue';
}

function roleLabel(role?: PersonRole) {
  return ROLES.find((r) => r.value === role)?.label ?? '';
}

function aidLabel(type?: AidType) {
  return AID_TYPES.find((a) => a.value === type)?.label ?? '';
}

function priorityLabel(p?: Priority) {
  return PRIORITIES.find((x) => x.value === p)?.label ?? '';
}

function vehicleLabel(v?: VehicleType) {
  return VEHICLE_TYPES.find((x) => x.value === v)?.label ?? '';
}

// ── Step indicator ────────────────────────────────────────────────────────────

const STEP_LABELS = ['¿Quién eres?', '¿Qué llevas?', 'Confirmar'];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {STEP_LABELS.map((label, i) => {
          const step = i + 1;
          const done = current > step;
          const active = current === step;
          return (
            <div key={step} className="flex flex-col items-center flex-1">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                done
                  ? 'bg-green-500 text-white'
                  : active
                  ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {done ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span className={`text-xs mt-1 font-medium hidden sm:block ${
                active ? 'text-blue-600' : done ? 'text-green-600' : 'text-gray-400'
              }`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
      {/* Progress bar */}
      <div className="relative h-1.5 bg-gray-200 rounded-full mt-1 -mx-0">
        <div
          className="absolute inset-y-0 left-0 bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${((current - 1) / (STEP_LABELS.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}

// ── Field wrapper ─────────────────────────────────────────────────────────────

function Field({ label, required, error, children }: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-red-600 text-xs mt-1.5 font-medium">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function TextInput({
  value, onChange, placeholder, type = 'text', inputMode, className = ''
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  className?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      inputMode={inputMode}
      className={`w-full border border-gray-300 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${className}`}
    />
  );
}

// ── Step 1: ¿Quién eres? ──────────────────────────────────────────────────────

function Step1({
  form,
  set,
  errors,
}: {
  form: Partial<RegistrationInput>;
  set: <K extends keyof RegistrationInput>(k: K, v: RegistrationInput[K]) => void;
  errors: Record<string, string>;
}) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3">
          ¿Cuál es tu rol en esta misión? <span className="text-red-500">*</span>
        </p>
        <div className="grid grid-cols-2 gap-3">
          {ROLES.map((r) => {
            const active = form.personRole === r.value;
            const borderColor = active
              ? r.color === 'blue' ? 'border-blue-500 bg-blue-50'
              : r.color === 'orange' ? 'border-orange-500 bg-orange-50'
              : r.color === 'green' ? 'border-green-500 bg-green-50'
              : 'border-violet-500 bg-violet-50'
              : 'border-gray-200 bg-white hover:border-gray-300';
            const iconColor = active
              ? r.color === 'blue' ? 'text-blue-600'
              : r.color === 'orange' ? 'text-orange-600'
              : r.color === 'green' ? 'text-green-600'
              : 'text-violet-600'
              : 'text-gray-400';
            return (
              <button
                key={r.value}
                type="button"
                onClick={() => set('personRole', r.value)}
                className={`relative text-left p-4 rounded-2xl border-2 transition-all duration-200 ${borderColor}`}
              >
                {active && (
                  <span className="absolute top-2 right-2">
                    <svg className="w-4 h-4 text-current" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
                <span className={`block mb-2 ${iconColor}`}>{r.icon}</span>
                <span className="block font-bold text-sm text-gray-900">{r.label}</span>
                <span className="block text-xs text-gray-500 mt-0.5 leading-snug">{r.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      <Field label="Nombre completo" required error={errors.fullName}>
        <TextInput
          value={form.fullName || ''}
          onChange={(v) => set('fullName', v)}
          placeholder="Ej. Juan Carlos Valido"
        />
      </Field>

      <Field label="Cédula de identidad" required error={errors.cedula}>
        <TextInput
          value={form.cedula || ''}
          onChange={(v) => set('cedula', formatCedula(v))}
          placeholder="V-12345678"
          inputMode="numeric"
        />
        <p className="text-xs text-gray-400 mt-1">Se formatea automáticamente</p>
      </Field>

      <Field label="Teléfono de contacto">
        <TextInput
          value={form.phone || ''}
          onChange={(v) => set('phone', v)}
          placeholder="0424-0000000"
          type="tel"
        />
      </Field>
    </div>
  );
}

// ── Step 2: ¿Qué llevas? ──────────────────────────────────────────────────────

function Step2({
  form,
  set,
  errors,
}: {
  form: Partial<RegistrationInput>;
  set: <K extends keyof RegistrationInput>(k: K, v: RegistrationInput[K]) => void;
  errors: Record<string, string>;
}) {
  const isTransportista = form.personRole === PersonRole.TRANSPORTISTA;

  return (
    <div className="space-y-6">
      {/* Vehicle section — only for transportistas */}
      {isTransportista && (
        <div className="rounded-2xl border border-orange-200 bg-orange-50/40 p-4 space-y-4">
          <p className="text-sm font-bold text-orange-700 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2.607.87A2 2 0 007.52 18h7.96a2 2 0 001.913-1.13L19 13H13z" />
            </svg>
            Datos del vehículo
          </p>

          <Field label="Tipo de vehículo" required error={errors.vehicleType}>
            <div className="grid grid-cols-4 gap-2">
              {VEHICLE_TYPES.map((v) => (
                <button
                  key={v.value}
                  type="button"
                  onClick={() => set('vehicleType', v.value)}
                  className={`py-2.5 rounded-xl border-2 text-xs font-semibold transition-all ${
                    form.vehicleType === v.value
                      ? 'border-orange-500 bg-orange-100 text-orange-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Placa del vehículo" required error={errors.plate}>
            <TextInput
              value={form.plate || ''}
              onChange={(v) => set('plate', v.toUpperCase())}
              placeholder="ABC-123"
              className="font-mono tracking-widest"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Marca">
              <TextInput
                value={form.brand || ''}
                onChange={(v) => set('brand', v)}
                placeholder="Toyota, Ford…"
              />
            </Field>
            <Field label="Color">
              <TextInput
                value={form.color || ''}
                onChange={(v) => set('color', v)}
                placeholder="Blanco, rojo…"
              />
            </Field>
          </div>
        </div>
      )}

      {/* Aid info */}
      <Field label="Tipo de insumo que llevas" required>
        <div className="grid grid-cols-2 gap-2">
          {AID_TYPES.map((a) => (
            <button
              key={a.value}
              type="button"
              onClick={() => set('aidType', a.value)}
              className={`flex items-center gap-2.5 p-3.5 rounded-xl border-2 transition-all text-sm font-semibold ${
                form.aidType === a.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              <span className={form.aidType === a.value ? 'text-blue-600' : 'text-gray-400'}>
                {a.icon}
              </span>
              {a.label}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Cantidad / Descripción" required error={errors.quantity}>
        <TextInput
          value={form.quantity || ''}
          onChange={(v) => set('quantity', v)}
          placeholder="Ej. 50 cajas de medicamentos, 200 litros de agua…"
        />
      </Field>

      <Field label="Sector de destino" required error={errors.destSector}>
        <TextInput
          value={form.destSector || ''}
          onChange={(v) => set('destSector', v)}
          placeholder="Ej. Maiquetía, La Guaira Centro…"
        />
      </Field>

      <Field label="Destinatario (persona o institución)" required error={errors.recipient}>
        <TextInput
          value={form.recipient || ''}
          onChange={(v) => set('recipient', v)}
          placeholder="Nombre de quien recibe"
        />
      </Field>

      <Field label="Prioridad">
        <div className="space-y-2">
          {PRIORITIES.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => set('priority', p.value)}
              className={`flex items-center gap-3 w-full p-3 rounded-xl border-2 text-left transition-all ${
                form.priority === p.value
                  ? p.activeClass
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              <span className={`w-3 h-3 rounded-full flex-shrink-0 ${
                form.priority === p.value ? p.dotClass : 'bg-gray-300'
              }`} />
              <span>
                <span className="font-semibold text-sm">{p.label}</span>
                <span className="text-xs text-gray-400 ml-2">{p.desc}</span>
              </span>
            </button>
          ))}
        </div>
      </Field>

      <Field label="Notas adicionales">
        <textarea
          value={form.notes || ''}
          onChange={(e) => set('notes', e.target.value)}
          placeholder="Cualquier información adicional relevante…"
          rows={3}
          maxLength={500}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
        />
        <p className="text-xs text-gray-400 mt-1 text-right">
          {(form.notes || '').length}/500
        </p>
      </Field>
    </div>
  );
}

// ── Step 3: Confirmar ─────────────────────────────────────────────────────────

function Step3({ form }: { form: Partial<RegistrationInput> }) {
  const color = roleColor(form.personRole);

  const rowClass = 'flex justify-between items-start py-2.5 border-b border-gray-100 last:border-0';
  const labelClass = 'text-sm text-gray-500 flex-shrink-0 mr-3';
  const valueClass = 'text-sm font-semibold text-gray-900 text-right';

  const priorityItem = PRIORITIES.find((p) => p.value === form.priority);

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 text-center">
        Revisa tus datos antes de registrarte
      </p>

      {/* Identity card */}
      <div className={`rounded-2xl p-4 border-2 ${
        color === 'blue' ? 'border-blue-200 bg-blue-50'
        : color === 'orange' ? 'border-orange-200 bg-orange-50'
        : color === 'green' ? 'border-green-200 bg-green-50'
        : 'border-violet-200 bg-violet-50'
      }`}>
        <p className={`text-xs font-bold uppercase tracking-wider mb-3 ${
          color === 'blue' ? 'text-blue-600'
          : color === 'orange' ? 'text-orange-600'
          : color === 'green' ? 'text-green-600'
          : 'text-violet-600'
        }`}>
          Persona
        </p>
        <div>
          <div className={rowClass}>
            <span className={labelClass}>Nombre</span>
            <span className={valueClass}>{form.fullName}</span>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Cédula</span>
            <span className={valueClass}>{form.cedula}</span>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Rol</span>
            <span className={valueClass}>{roleLabel(form.personRole)}</span>
          </div>
          {form.phone && (
            <div className={rowClass}>
              <span className={labelClass}>Teléfono</span>
              <span className={valueClass}>{form.phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Vehicle card */}
      {form.personRole === PersonRole.TRANSPORTISTA && (
        <div className="rounded-2xl p-4 border border-orange-200 bg-white">
          <p className="text-xs font-bold uppercase tracking-wider text-orange-600 mb-3">Vehículo</p>
          <div>
            <div className={rowClass}>
              <span className={labelClass}>Tipo</span>
              <span className={valueClass}>{vehicleLabel(form.vehicleType)}</span>
            </div>
            <div className={rowClass}>
              <span className={labelClass}>Placa</span>
              <span className={`${valueClass} font-mono`}>{form.plate}</span>
            </div>
            {form.brand && (
              <div className={rowClass}>
                <span className={labelClass}>Marca</span>
                <span className={valueClass}>{form.brand}</span>
              </div>
            )}
            {form.color && (
              <div className={rowClass}>
                <span className={labelClass}>Color</span>
                <span className={valueClass}>{form.color}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Aid card */}
      <div className="rounded-2xl p-4 border border-green-200 bg-white">
        <p className="text-xs font-bold uppercase tracking-wider text-green-600 mb-3">Insumos</p>
        <div>
          <div className={rowClass}>
            <span className={labelClass}>Tipo</span>
            <span className={valueClass}>{aidLabel(form.aidType)}</span>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Cantidad</span>
            <span className={`${valueClass} max-w-[180px]`}>{form.quantity}</span>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Destino</span>
            <span className={valueClass}>{form.destSector}</span>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Destinatario</span>
            <span className={`${valueClass} max-w-[180px]`}>{form.recipient}</span>
          </div>
          <div className={rowClass}>
            <span className={labelClass}>Prioridad</span>
            <span className={`text-sm font-bold ${
              form.priority === Priority.URGENTE ? 'text-red-600'
              : form.priority === Priority.ALTA ? 'text-amber-600'
              : 'text-green-600'
            }`}>
              {priorityLabel(form.priority)}
            </span>
          </div>
          {form.notes && (
            <div className="pt-2.5">
              <p className={labelClass}>Notas</p>
              <p className="text-sm text-gray-700 mt-1 leading-relaxed">{form.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main form ─────────────────────────────────────────────────────────────────

const FORM_DEFAULTS: Partial<RegistrationInput> = {
  personRole: PersonRole.DONANTE,
  priority: Priority.NORMAL,
  aidType: AidType.MEDICAMENTOS,
};

export default function RegistrationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [stepError, setStepError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showDraftBanner, setShowDraftBanner] = useState(false);

  const [form, setForm] = useState<Partial<RegistrationInput>>(FORM_DEFAULTS);

  const { pending: draft, ready: draftReady, scheduleSave, clearDraft } = useFormDraft();

  // Show draft banner once the DB check resolves
  useEffect(() => {
    if (draftReady && draft) setShowDraftBanner(true);
  }, [draftReady, draft]);

  // Save to IndexedDB on every form/step change
  useEffect(() => {
    if (!draftReady) return;
    scheduleSave(form, step);
  }, [form, step, draftReady]); // eslint-disable-line react-hooks/exhaustive-deps

  function set<K extends keyof RegistrationInput>(key: K, value: RegistrationInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: '' }));
    setStepError(null);
  }

  function restoreDraft() {
    if (!draft) return;
    setForm(draft.data);
    setStep(draft.step);
    setShowDraftBanner(false);
  }

  function discardDraft() {
    clearDraft();
    setShowDraftBanner(false);
    setForm(FORM_DEFAULTS);
    setStep(1);
  }

  function validateCurrentStep(): boolean {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!form.fullName || form.fullName.trim().length < 2)
        errs.fullName = 'Ingrese su nombre completo (mínimo 2 caracteres)';
      if (!form.cedula || form.cedula.length < 5)
        errs.cedula = 'Ingrese su cédula en formato V-XXXXXXXX';
    }

    if (step === 2) {
      if (form.personRole === PersonRole.TRANSPORTISTA) {
        if (!form.vehicleType) errs.vehicleType = 'Seleccione el tipo de vehículo';
        if (!form.plate || form.plate.trim().length < 4)
          errs.plate = 'Ingrese la placa del vehículo';
      }
      if (!form.aidType) errs.aidType = 'Seleccione el tipo de insumo';
      if (!form.quantity || form.quantity.trim().length < 1)
        errs.quantity = 'Describa la cantidad de insumos';
      if (!form.destSector || form.destSector.trim().length < 1)
        errs.destSector = 'Ingrese el sector de destino';
      if (!form.recipient || form.recipient.trim().length < 2)
        errs.recipient = 'Ingrese el nombre del destinatario';
    }

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setStepError('Por favor completa los campos obligatorios');
      return false;
    }

    setFieldErrors({});
    setStepError(null);
    return true;
  }

  function handleNext() {
    if (!validateCurrentStep()) return;
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleBack() {
    setStep((s) => s - 1);
    setStepError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setServerError(null);

    const result = await submitRegistration(form as RegistrationInput);
    if (result.success) {
      await clearDraft();
      router.push(`/credencial/${result.deliveryId}`);
    } else {
      setServerError(result.error);
      setLoading(false);
    }
  }

  const STEP_TITLES: Record<number, string> = {
    1: '¿Quién eres?',
    2: '¿Qué llevas?',
    3: 'Confirmar registro',
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Draft restoration banner */}
      {showDraftBanner && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-800">Tienes un registro sin terminar</p>
              <p className="text-xs text-amber-600 mt-0.5">¿Quieres continuar donde lo dejaste?</p>
              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  onClick={restoreDraft}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold py-2 rounded-xl transition-colors"
                >
                  Continuar
                </button>
                <button
                  type="button"
                  onClick={discardDraft}
                  className="flex-1 bg-white border border-amber-200 text-amber-700 text-sm font-semibold py-2 rounded-xl hover:bg-amber-50 transition-colors"
                >
                  Empezar de nuevo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <StepIndicator current={step} />

      {/* Step title */}
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-gray-900">{STEP_TITLES[step]}</h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Paso {step} de 3
        </p>
      </div>

      {/* Step error banner */}
      {stepError && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-medium">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {stepError}
        </div>
      )}

      {/* Step content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        {step === 1 && <Step1 form={form} set={set} errors={fieldErrors} />}
        {step === 2 && <Step2 form={form} set={set} errors={fieldErrors} />}
        {step === 3 && <Step3 form={form} />}
      </div>

      {/* Server error */}
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          {serverError}
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex gap-3 pb-8">
        {step > 1 && (
          <button
            type="button"
            onClick={handleBack}
            className="flex-shrink-0 flex items-center gap-1.5 px-5 py-4 rounded-2xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Atrás
          </button>
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-4 rounded-2xl text-base transition-all shadow-md shadow-blue-200"
          >
            Siguiente
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 active:scale-[0.98] text-white font-bold py-4 rounded-2xl text-base transition-all shadow-md shadow-green-200"
          >
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Registrando…
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Registrar y obtener QR
              </>
            )}
          </button>
        )}
      </div>

      <p className="text-center text-xs text-gray-400 -mt-4 pb-4">
        Sus datos se usan exclusivamente para coordinar la ayuda humanitaria.
      </p>
    </form>
  );
}
