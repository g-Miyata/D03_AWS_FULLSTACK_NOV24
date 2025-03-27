import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`
    INSERT INTO "Type" ("id", "typeName") VALUES
      (1, 'cactus'),
      (2, 'succulent'),
      (3, 'air-purifying'),
      (4, 'tropical'),
      (5, 'flowering'),
      (6, 'tree'),
      (7, 'trailing'),
      (8, 'herb'),
      (9, 'fern'),
      (10, 'orchid'),
      (11, 'palm'),
      (12, 'grass-like'),
      (13, 'edible');
  `);
}

main()
  .then(() => console.log('Types inserted!'))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
