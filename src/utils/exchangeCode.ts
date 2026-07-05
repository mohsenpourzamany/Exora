/**
 * Auto-generate unique currency-exchange tracking code
 * Format: EX-[Jalali Year]-[Month]-[Day]-[Daily Sequence]
 * Example: EX-1403-02-24-0001
 *
 * Uses localStorage to persist daily counter until backend is ready.
 * After backend: this logic moves to server with DB sequence.
 */

function getTodayJalali(): { year: string; month: string; day: string; key: string } {
  const now = new Date()
  const jalali = now.toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const toLatin = (str: string) =>
    str.replace(/[۰-۹]/g, d => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))

  const latinDate = toLatin(jalali)
  const parts = latinDate.split('/')
  const year  = parts[0] || '1403'
  const month = (parts[1] || '01').padStart(2, '0')
  const day   = (parts[2] || '01').padStart(2, '0')
  const key   = `exchange_seq_${year}_${month}_${day}`

  return { year, month, day, key }
}

export function generateExchangeCode(): string {
  const { year, month, day, key } = getTodayJalali()
  const stored = localStorage.getItem(key)
  const current = stored ? parseInt(stored, 10) : 0
  const next = current + 1
  localStorage.setItem(key, String(next))
  const seq = String(next).padStart(4, '0')
  return `EX-${year}-${month}-${day}-${seq}`
}

export function peekNextExchangeCode(): string {
  const { year, month, day, key } = getTodayJalali()
  const stored = localStorage.getItem(key)
  const current = stored ? parseInt(stored, 10) : 0
  const next = current + 1
  const seq = String(next).padStart(4, '0')
  return `EX-${year}-${month}-${day}-${seq}`
}
