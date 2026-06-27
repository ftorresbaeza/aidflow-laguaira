import * as XLSX from 'xlsx';

export interface ExportColumn {
  key: string;
  label: string;
}

export function exportToExcel<T extends Record<string, any>>(
  data: T[],
  columns: ExportColumn[],
  fileName: string
) {
  const worksheetData = data.map((row) => {
    const newRow: Record<string, any> = {};
    columns.forEach((col) => {
      newRow[col.label] = row[col.key];
    });
    return newRow;
  });

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  
  worksheet['!cols'] = columns.map(() => ({ wch: 20 }));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');

  XLSX.writeFile(workbook, `${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`);
}

export function exportUsersToExcel(users: Array<{
  name: string | null;
  email: string;
  role: string;
  institution: string | null;
  isActive: boolean;
  createdAt: Date;
}>) {
  const roleLabels: Record<string, string> = {
    SUPER_ADMIN: 'Super Admin',
    DIRECTOR: 'Director',
    ADMIN: 'Administrador',
    GESTION: 'Gestión',
    GUARD: 'Guardia',
    PENDING: 'Pendiente',
  };

  exportToExcel(
    users.map((u) => ({
      name: u.name || '-',
      email: u.email,
      role: roleLabels[u.role] || u.role,
      institution: u.institution || 'Sin asignar',
      isActive: u.isActive ? 'Activo' : 'Inactivo',
      createdAt: new Date(u.createdAt).toLocaleDateString('es-CL'),
    })),
    [
      { key: 'name', label: 'Nombre' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Rol' },
      { key: 'institution', label: 'Institución' },
      { key: 'isActive', label: 'Estado' },
      { key: 'createdAt', label: 'Fecha creación' },
    ],
    'usuarios'
  );
}

export function exportCheckInsToExcel(checkIns: Array<{
  personFullName: string;
  personRut: string;
  status: string;
  timestamp: Date;
  qrDescription: string | null;
  guardName: string | null;
  institutionName: string | null;
}>) {
  const statusLabels: Record<string, string> = {
    PENDING: 'Pendiente',
    CHECKED_IN: 'Ingresado',
    REJECTED: 'Rechazado',
  };

  exportToExcel(
    checkIns.map((c) => ({
      personFullName: c.personFullName,
      personRut: c.personRut,
      status: statusLabels[c.status] || c.status,
      timestamp: new Date(c.timestamp).toLocaleString('es-CL'),
      qrDescription: c.qrDescription || '-',
      guardName: c.guardName || '-',
      institutionName: c.institutionName || '-',
    })),
    [
      { key: 'personFullName', label: 'Nombre' },
      { key: 'personRut', label: 'RUT' },
      { key: 'status', label: 'Estado' },
      { key: 'timestamp', label: 'Fecha/Hora' },
      { key: 'qrDescription', label: 'Tipo QR' },
      { key: 'guardName', label: 'Guardia' },
      { key: 'institutionName', label: 'Institución' },
    ],
    'historial_accesos'
  );
}

export function exportQRsToExcel(qrs: Array<{
  id: string;
  description: string | null;
  validDate: Date;
  status: string;
  personFullName: string;
  personRut: string;
  createdByName: string | null;
  createdAt: Date;
  institutionName: string | null;
}>) {
  const statusLabels: Record<string, string> = {
    ACTIVE: 'Activo',
    EXPIRED: 'Expirado',
    USED: 'Usado',
    CANCELLED: 'Cancelado',
  };

  exportToExcel(
    qrs.map((q) => ({
      id: q.id,
      description: q.description || '-',
      validDate: new Date(q.validDate).toLocaleDateString('es-CL'),
      status: statusLabels[q.status] || q.status,
      personFullName: q.personFullName,
      personRut: q.personRut,
      createdByName: q.createdByName || '-',
      createdAt: new Date(q.createdAt).toLocaleDateString('es-CL'),
      institutionName: q.institutionName || '-',
    })),
    [
      { key: 'id', label: 'ID' },
      { key: 'description', label: 'Descripción' },
      { key: 'validDate', label: 'Válido hasta' },
      { key: 'status', label: 'Estado' },
      { key: 'personFullName', label: 'Nombre visitante' },
      { key: 'personRut', label: 'RUT visitante' },
      { key: 'createdByName', label: 'Creado por' },
      { key: 'createdAt', label: 'Fecha creación' },
      { key: 'institutionName', label: 'Institución' },
    ],
    'codigos_qr'
  );
}