import prisma from '@/prisma';

export const connectToBD = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    console.log(error);
    throw new Error('Unable to connect to DB');
  }
};
