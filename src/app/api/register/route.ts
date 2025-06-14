import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Veritabanı sorgusunda hata:', error)
    return NextResponse.json({ users: [], error: 'Veri alınamadı' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Ad ve e-posta zorunludur.' }, { status: 400 })
    }

    const count = await prisma.user.count()

    const role = count < 20 ? 'asil' : count < 25 ? 'yedek' : 'beklemede'

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role,
      },
    })

    return NextResponse.json({ user: newUser })
  } catch (error) {
    console.error('Kayıt sırasında hata oluştu:', error)
    return NextResponse.json({ error: 'Kayıt işlemi başarısız.' }, { status: 500 })
  }
}
