import prisma from '@/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
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
        userId: true,
        createdAt: true,
      },
    });
    return NextResponse.json(locations);
  } catch (err) {
    return NextResponse.json({ message: 'GET Error', err }, { status: 500 });
  }
};

export const POST = async (request: any) => {
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
