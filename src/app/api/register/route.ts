import { PrismaClient } from '@/generated/prisma'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

// ✅ Kayıt ekleme
export async function POST(req: NextRequest) {
  const data = await req.json()
  const count = await prisma.user.count()

  let role = 'yedek'
  if (count < 20) role = 'asil'
  else if (count >= 25)
    return NextResponse.json({ message: 'Kontenjan dolu' }, { status: 400 })

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      role
    }
  })

  return NextResponse.json({ user })
}

// ✅ Tüm kayıtları çekme
export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'asc' }
  })
  return NextResponse.json({ users })
}
