// url: http://localhost:3000/api/posts/12345
import prisma from '@/prisma';
import { NextResponse } from 'next/server';

export const GET = async (request: any, { params }: any) => {
  try {
    const { id } = params;

    const location = await prisma.location.findUnique({
      where: {
        id,
      },
    });

    if (!location) {
      return NextResponse.json({ message: 'Location not found' }, { status: 404 });
    }

    return NextResponse.json(location);
  } catch (err) {
    return NextResponse.json({ message: 'GET Error', err }, { status: 500 });
  }
};

export const PATCH = async (request: any, { params }: any) => {
  try {
    const body = await request.json();
    const { title, description, latitude, longitude, hobby } = body;

    const { id } = params;

    const updateLocation = await prisma.location.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        latitude,
        longitude,
        hobby,
      },
    });

    if (!updateLocation) {
      return NextResponse.json({ message: 'Location not found' }, { status: 404 });
    }

    return NextResponse.json(updateLocation);
  } catch (err) {
    return NextResponse.json({ message: 'Update Error', err }, { status: 500 });
  }
};

export const DELETE = async (request: any, { params }: any) => {
  try {
    const { id } = params;

    await prisma.location.delete({
      where: {
        id,
      },
    });

    return NextResponse.json('Location has been deleted');
  } catch (err) {
    return NextResponse.json({ message: 'DELETE Error', err }, { status: 500 });
  }
};
