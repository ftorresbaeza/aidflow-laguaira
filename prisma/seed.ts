import { PrismaClient, AdminRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@aidflow.ve';
  const password = process.env.ADMIN_PASSWORD || 'aidflow2024!';

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin ya existe: ${email}`);
    return;
  }

  const hash = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: {
      name: 'Administrador',
      email,
      password: hash,
      role: AdminRole.SUPER_ADMIN,
      isActive: true,
    },
  });

  console.log(`✓ Admin creado: ${email}`);
  console.log(`  Contraseña: ${password}`);
  console.log(`  ⚠️  Cambia la contraseña inmediatamente después del primer login`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
