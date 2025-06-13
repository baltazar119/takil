// ✅ src/app/register/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [isFull, setIsFull] = useState(false)

  useEffect(() => {
    fetch('/api/register')
      .then((res) => res.json())
      .then((data) => {
        if (data.count >= 25) setIsFull(true)
      })
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })
    const data = await res.json()
    if (res.ok) {
      setSubmitted(true)
    } else {
      setError(data.message || 'Hata oluştu.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-sky-100 px-6 py-16">
      {/* Orta Kart */}
      <div className="w-full max-w-[1600px] flex flex-col md:flex-row bg-white shadow-2xl rounded-3xl overflow-hidden">
        <div className="relative w-full md:w-[60%] h-[700px]">
          <Image
            src="/mountain.png"
            alt="Konuşmacı"
            layout="fill"
            objectFit="cover"
            className="object-cover"
          />
        </div>

        <div className="w-full md:w-[40%] p-20 flex flex-col justify-center">
          <h2 className="text-5xl font-bold text-center mb-10 text-gray-800">Konuşmacı Etkinliği</h2>

          {submitted ? (
            <p className="text-green-600 text-center font-medium text-xl">
              ✅ Kayıt başarılı! Bilgilendirme maili gönderilecektir.
            </p>
          ) : isFull ? (
            <p className="text-red-600 text-center font-semibold text-xl">
              ❌ Kontenjan doldu. Lütfen bir sonraki etkinliği bekleyin.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                placeholder="Ad Soyad"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md p-5 text-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              <input
                type="email"
                placeholder="E-posta"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md p-5 text-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
              />
              {error && <p className="text-red-500 text-lg">{error}</p>}
              <button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white py-4 rounded-md text-xl font-semibold"
              >
                Kaydol
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-14 text-base text-gray-600 text-center w-full">
        © 2025 <span className="font-semibold">Abdulgazi Şimşek</span> tarafından yapılmıştır.
      </footer>
    </div>
  )
}
