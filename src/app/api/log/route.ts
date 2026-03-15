import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const data = await request.json().catch(() => ({}))
  const timestamp = new Date().toISOString()
  const pathname = data.pathname || 'unknown'
  const userAgent = data.userAgent || 'unknown'
  const referer = data.referer || '-'
  
  // 输出访问日志到 stdout，Zeabur 可以在 Run Logs 中查看
  console.log(`[ACCESS] ${timestamp} | ${pathname} | UA: ${userAgent.slice(0, 60)} | Ref: ${referer.slice(0, 40)}`)
  
  return NextResponse.json({ success: true })
}
