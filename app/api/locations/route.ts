import prisma from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';

// import { getServerSession } from '@/helpers/getServerSessionHelper';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const GET = async () => {
  // const session = await getServerSession();
  const session = await getServerSession(authOptions);
  console.log('API Session', session);

  try {
    const locations = await prisma.location.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        description: true,
        latitude: true,
        longitude: true,
        hobby: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            instagram: true,
            telegram: true,
          },
        },
        createdAt: true,
      },
    });
    return NextResponse.json(locations);
  } catch (err) {
    return NextResponse.json({ message: 'GET Error', err }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { title, description, latitude, longitude, hobby, userId } = body;

    const newLocation = await prisma.location.create({
      data: {
        title,
        description,
        latitude,
        longitude,
        hobby,
        userId,
      },
    });

    return NextResponse.json(newLocation);
  } catch (err) {
    return NextResponse.json({ message: 'POST Error', err }, { status: 500 });
  }
};
