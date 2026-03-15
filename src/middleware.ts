import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const timestamp = new Date().toISOString()
  const method = request.method
  const url = request.url
  const pathname = request.nextUrl.pathname
  const userAgent = request.headers.get('user-agent') || 'unknown'
  const referer = request.headers.get('referer') || '-'
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
  
  // 输出访问日志到 stdout，Zeabur 可以在 Run Logs 中查看
  console.log(`[${timestamp}] ${method} ${pathname} - IP: ${ip} - UA: ${userAgent.slice(0, 50)}... - Ref: ${referer.slice(0, 30)}`)
  
  return NextResponse.next()
}

// 配置匹配所有路径
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
