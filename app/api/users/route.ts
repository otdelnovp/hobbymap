import prisma from '@/prisma';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// import { getServerSession } from '@/helpers/getServerSessionHelper';

export const GET = async (req: NextRequest, res: NextResponse) => {
  // const session = await getServerSession();
  const session = await getServerSession(authOptions);
  console.log(session);

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
