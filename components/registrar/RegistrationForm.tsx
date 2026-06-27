'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { submitRegistration, type RegistrationInput } from '@/lib/actions/registration';
import { PersonRole, AidType, Priority, VehicleType } from '@prisma/client';

const ROLES = [
  { value: PersonRole.DONANTE, label: 'Donante', desc: 'Entrega insumos' },
  { value: PersonRole.TRANSPORTISTA, label: 'Transportista', desc: 'Lleva insumos en vehículo' },
  { value: PersonRole.VOLUNTARIO, label: 'Voluntario', desc: 'Apoya labores humanitarias' },
  { value: PersonRole.FAMILIAR, label: 'Familiar', desc: 'Familiar de paciente' },
];

const AID_TYPES = [
  { value: AidType.MEDICAMENTOS, label: 'Medicamentos' },
  { value: AidType.ALIMENTOS, label: 'Alimentos' },
  { value: AidType.AGUA, label: 'Agua' },
  { value: AidType.OTRO, label: 'Otros' },
];

const VEHICLE_TYPES = [
  { value: VehicleType.AUTO, label: 'Automóvil' },
  { value: VehicleType.MOTO, label: 'Motocicleta' },
  { value: VehicleType.CAMION, label: 'Camión/Camioneta' },
  { value: VehicleType.OTRO, label: 'Otro' },
];

function formatCedula(value: string) {
  const digits = value.replace(/[^0-9]/g, '');
  if (!value.toUpperCase().startsWith('V-') && !value.toUpperCase().startsWith('E-')) {
    return digits ? `V-${digits}` : '';
  }
  return value.toUpperCase();
}

export default function RegistrationForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const [form, setForm] = useState<Partial<RegistrationInput>>({
    personRole: PersonRole.DONANTE,
    priority: Priority.NORMAL,
    aidType: AidType.MEDICAMENTOS,
  });

  function set<K extends keyof RegistrationInput>(key: K, value: RegistrationInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: [] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    const result = await submitRegistration(form as RegistrationInput);
    if (result.success) {
      router.push(`/credencial/${result.deliveryId}`);
    } else {
      setError(result.error);
      if (result.fieldErrors) setFieldErrors(result.fieldErrors);
      setLoading(false);
    }
  }

  const isTransportista = form.personRole === PersonRole.TRANSPORTISTA;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Datos personales */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 space-y-4">
        <h2 className="font-semibold text-gray-800 text-lg">Datos personales</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
          <input
            type="text"
            required
            value={form.fullName || ''}
            onChange={(e) => set('fullName', e.target.value)}
            placeholder="Ej. Juan Carlos Valido"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {fieldErrors.fullName && <p className="text-red-500 text-sm mt-1">{fieldErrors.fullName[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cédula de identidad *</label>
          <input
            type="text"
            required
            value={form.cedula || ''}
            onChange={(e) => set('cedula', formatCedula(e.target.value))}
            placeholder="V-12345678"
            inputMode="numeric"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {fieldErrors.cedula && <p className="text-red-500 text-sm mt-1">{fieldErrors.cedula[0]}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input
              type="tel"
              value={form.phone || ''}
              onChange={(e) => set('phone', e.target.value)}
              placeholder="0424-0000000"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
            <input
              type="text"
              value={form.address || ''}
              onChange={(e) => set('address', e.target.value)}
              placeholder="Sector / calle"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rol *</label>
          <div className="grid grid-cols-2 gap-2">
            {ROLES.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => set('personRole', r.value)}
                className={`text-left p-3 rounded-xl border-2 transition-all ${
                  form.personRole === r.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="font-medium text-sm">{r.label}</div>
                <div className="text-xs text-gray-500">{r.desc}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Vehículo (solo transportistas) */}
      {isTransportista && (
        <section className="bg-white rounded-2xl shadow-sm border border-orange-100 p-5 space-y-4">
          <h2 className="font-semibold text-gray-800 text-lg">Datos del vehículo</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de vehículo *</label>
            <div className="grid grid-cols-2 gap-2">
              {VEHICLE_TYPES.map((v) => (
                <button
                  key={v.value}
                  type="button"
                  onClick={() => set('vehicleType', v.value)}
                  className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                    form.vehicleType === v.value
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
            {fieldErrors.vehicleType && <p className="text-red-500 text-sm mt-1">{fieldErrors.vehicleType[0]}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Placa / Número *</label>
            <input
              type="text"
              value={form.plate || ''}
              onChange={(e) => set('plate', e.target.value.toUpperCase())}
              placeholder="ABC-123"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {fieldErrors.plate && <p className="text-red-500 text-sm mt-1">{fieldErrors.plate[0]}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
              <input
                type="text"
                value={form.brand || ''}
                onChange={(e) => set('brand', e.target.value)}
                placeholder="Toyota, Ford..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <input
                type="text"
                value={form.color || ''}
                onChange={(e) => set('color', e.target.value)}
                placeholder="Rojo, Blanco..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del conductor</label>
            <input
              type="text"
              value={form.driverName || ''}
              onChange={(e) => set('driverName', e.target.value)}
              placeholder="Si es diferente al registrante"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </section>
      )}

      {/* Insumos */}
      <section className="bg-white rounded-2xl shadow-sm border border-green-100 p-5 space-y-4">
        <h2 className="font-semibold text-gray-800 text-lg">Insumos / Ayuda</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sector de destino *</label>
          <input
            type="text"
            required
            value={form.destSector || ''}
            onChange={(e) => set('destSector', e.target.value)}
            placeholder="Ej. Maiquetía, La Guaira Centro..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {fieldErrors.destSector && <p className="text-red-500 text-sm mt-1">{fieldErrors.destSector[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del destinatario *</label>
          <input
            type="text"
            required
            value={form.recipient || ''}
            onChange={(e) => set('recipient', e.target.value)}
            placeholder="Persona o institución que recibe"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {fieldErrors.recipient && <p className="text-red-500 text-sm mt-1">{fieldErrors.recipient[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de insumo *</label>
          <div className="grid grid-cols-2 gap-2">
            {AID_TYPES.map((a) => (
              <button
                key={a.value}
                type="button"
                onClick={() => set('aidType', a.value)}
                className={`p-3 rounded-xl border-2 transition-all text-sm font-medium ${
                  form.aidType === a.value
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad / Descripción *</label>
          <input
            type="text"
            required
            value={form.quantity || ''}
            onChange={(e) => set('quantity', e.target.value)}
            placeholder="Ej. 50 cajas medicamentos, 200 litros agua..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {fieldErrors.quantity && <p className="text-red-500 text-sm mt-1">{fieldErrors.quantity[0]}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Prioridad</label>
          <div className="flex gap-2">
            {[
              { value: Priority.URGENTE, label: 'Urgente', color: 'red' },
              { value: Priority.ALTA, label: 'Alta', color: 'amber' },
              { value: Priority.NORMAL, label: 'Normal', color: 'green' },
            ].map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => set('priority', p.value)}
                className={`flex-1 py-2 rounded-xl border-2 text-sm font-medium transition-all ${
                  form.priority === p.value
                    ? p.color === 'red'
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : p.color === 'amber'
                      ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 bg-white text-gray-600'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Notas adicionales</label>
          <textarea
            value={form.notes || ''}
            onChange={(e) => set('notes', e.target.value)}
            placeholder="Cualquier información adicional relevante..."
            rows={3}
            maxLength={500}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
        </div>
      </section>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
          {error}
        </div>
      )}

      <div className="pb-6">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 rounded-2xl text-lg transition-colors shadow-lg"
        >
          {loading ? 'Registrando...' : 'Registrar y obtener QR'}
        </button>
        <p className="text-center text-xs text-gray-400 mt-3">
          Al registrarse, sus datos serán usados exclusivamente para coordinar la ayuda humanitaria.
        </p>
      </div>
    </form>
  );
}
