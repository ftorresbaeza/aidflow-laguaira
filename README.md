# AidFlow La Guaira

Sistema web de registro y control de entrega de insumos humanitarios para emergencias.

## Funcionalidades

- **Registro público** `/registrar` — Formulario mobile-first para donantes, transportistas, voluntarios y familiares. Genera credencial QR al instante.
- **Credencial QR** `/credencial/[id]` — URL compartible con QR firmado digitalmente, datos del vehículo, destino e insumos.
- **Scanner QR** `/escanear` — Puntos de control escanean el QR y ven toda la información de la entrega.
- **Panel admin** `/admin` — Dashboard con stats, lista filtrable, acciones aprobar/rechazar/completar, export CSV.

## Stack

Next.js 16 + TypeScript + Prisma + PostgreSQL (Neon) + Auth.js + TailwindCSS + shadcn/ui

## Setup local

```bash
cp .env.example .env
# Llenar DATABASE_URL, AUTH_SECRET y QR_SECRET_KEY

npm install
npx prisma db push
npx ts-node -T prisma/seed.ts
npm run dev
```

## Deploy (Vercel)

1. Conectar este repo en vercel.com
2. Agregar variables de entorno (ver `.env.example`)
3. Primer deploy → `prisma db push` desde local con la URL de producción
4. Crear admin: `npx ts-node -T prisma/seed.ts`

## Variables de entorno requeridas

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | Connection string de PostgreSQL (Neon) |
| `AUTH_SECRET` | `openssl rand -base64 32` |
| `QR_SECRET_KEY` | `openssl rand -base64 32` (diferente al anterior) |
| `NEXTAUTH_URL` | URL pública de la app |
