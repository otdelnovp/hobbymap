import prisma from '@/prisma';
import { NextResponse } from 'next/server';
import type { NextApiRequest, NextApiResponse } from 'next';

// import { getServerSession } from 'next-auth/next';
// import { authConfig } from '@/configs/auth';
// import { isUserAdmin } from '@/helpers/authHelper';

export const POST = async (request: any) => {
  try {
    const body = await request.json();
    const { name, role } = body;

    const newPost = await prisma.user.create({
      data: {
        name,
        role,
      },
    });

    return NextResponse.json(newPost);
  } catch (err) {
    return NextResponse.json({ message: 'POST Error', err }, { status: 500 });
  }
};

export const GET = async () => {
  // const session = await getServerSession(authConfig);
  // if (!isUserAdmin(session?.user)) {
  //   return NextResponse.json({ message: 'Access denied' }, { status: 500 });
  // }

  try {
    const users = await prisma.user.findMany({
      where: { role: { not: 'root' } },
      select: { id: true, name: true, email: true, image: true, role: true, createdAt: true },
    });
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ message: 'GET Error', err }, { status: 500 });
  }
};
