import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedNutriAndPatient() {
  console.log('Iniciando criação de Nutricionista e Paciente...');

  const passwordHash = "$2b$10$UnCSRQzLM85HzgZDkmZ98OXB7pgO3vikFT1a6jB72B2Tv40ks7t1K";

  // 1. Criar Nutricionista (User)
  const nutritionist = await prisma.user.upsert({
    where: { email: 'gabriel@exemplo.com' },
    update: {},
    create: {
      name: 'Gabriel Amorim Diniz',
      email: 'gabriel@exemplo.com',
      password: passwordHash,
    },
  });

  // 2. Criar Paciente
  // Nota: No seu schema, o Paciente pode estar vinculado a um User (login próprio) 
  // e/ou ter um UserCreator (quem o cadastrou).
  const patient = await prisma.patient.upsert({
    where: { email: 'miqueias@exemplo.com' },
    update: {},
    create: {
      name: 'Miqueias Belarmino',
      gender: 'male',
      birthDate: new Date('1998-09-03'),
      weight: 117.1, // Peso do plano de Setembro
      height: 171,
      email: 'miqueias@exemplo.com',
      phone: '11999999999',
      createdBy: nutritionist.id, // ID do nutricionista que criou
    },
  });

  console.log('✅ Nutricionista criado com ID:', nutritionist.id);
  console.log('✅ Paciente criado com ID:', patient.id);

  return {
    nutritionistId: nutritionist.id,
    patientId: patient.id,
  };
}

// Caso queira rodar diretamente para teste:
// seedNutriAndPatient()
//   .catch((e) => console.error(e))
//   .finally(async () => await prisma.$disconnect());