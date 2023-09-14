import prisma from '@/prisma';
import { NextResponse } from 'next/server';

// import { getServerSession } from 'next-auth/next';
// import { authConfig } from '@/configs/auth';
// import { isUserAdmin } from '@/helpers/authHelper';

export const GET = async () => {
  // const session = await getServerSession(authConfig);
  // if (!isUserAdmin(session?.user)) {
  //   return NextResponse.json({ message: 'Access denied' }, { status: 500 });
  // }

  try {
    const users = await prisma.user.findMany({
      where: { role: { not: 'root' } },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        hobby: true,
        instagram: true,
        telegram: true,
        createdAt: true,
        isDeleted: true,
      },
    });
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ message: 'GET Error', err }, { status: 500 });
  }
};
