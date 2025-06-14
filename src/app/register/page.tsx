// src/app/api/register/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, school, phone } = body;

    // Mevcut kayıtları say
    const existingUsers = await prisma.user.findMany({
      orderBy: { createdAt: 'asc' },
    });

    // Roller: ilk 20 kayıt asil, sonraki 5 kayıt yedek
    let role: 'asil' | 'yedek' = 'asil';
    if (existingUsers.length >= 20 && existingUsers.length < 25) {
      role = 'yedek';
    } else if (existingUsers.length >= 25) {
      return NextResponse.json({ success: false, message: 'Kontenjan doldu' }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        school,
        phone,
        role,
      },
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error('POST /api/register error:', error);
    return NextResponse.json({ success: false, message: 'Sunucu hatası' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error('GET /api/register error:', error);
    return NextResponse.json({ success: false, message: 'Sunucu hatası' }, { status: 500 });
  }
}
