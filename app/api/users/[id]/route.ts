// url: http://localhost:3000/api/posts/12345
import prisma from '@/prisma';
import { NextResponse } from 'next/server';

export const GET = async (request: any, { params }: any) => {
  try {
    const { id } = params;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ message: 'GET Error', err }, { status: 500 });
  }
};

export const PATCH = async (request: any, { params }: any) => {
  try {
    const body = await request.json();
    const { name, email, role, hobby } = body;

    const { id } = params;

    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        role,
        hobby,
      },
    });

    if (!updateUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updateUser);
  } catch (err) {
    return NextResponse.json({ message: 'Update Error', err }, { status: 500 });
  }
};

export const DELETE = async (request: any, { params }: any) => {
  try {
    const { id } = params;

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json('User has been deleted');
  } catch (err) {
    return NextResponse.json({ message: 'DELETE Error', err }, { status: 500 });
  }
};
