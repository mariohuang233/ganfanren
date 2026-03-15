import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 简单的IP地理位置映射
function getLocationFromIP(ip: string): string {
  const cleanIP = ip.replace(/^::ffff:/, '')
  
  if (cleanIP.startsWith('192.168.') || cleanIP.startsWith('10.') || cleanIP.startsWith('172.')) {
    return '内网/代理'
  }
  if (cleanIP === '127.0.0.1' || cleanIP === '::1') {
    return '本地'
  }
  
  const parts = cleanIP.split('.')
  if (parts.length === 4) {
    const firstOctet = parseInt(parts[0])
    
    // 根据IP段判断地区（简化版）
    if (firstOctet === 58 || firstOctet === 120 || firstOctet === 122 || firstOctet === 203 || firstOctet === 210 || firstOctet === 211) {
      return '中国-上海'
    }
    if (firstOctet === 39 || firstOctet === 59 || firstOctet === 110 || firstOctet === 111 || firstOctet === 113 || firstOctet === 115 || firstOctet === 121 || firstOctet === 123 || firstOctet === 125 || firstOctet === 126) {
      return '中国-北京'
    }
    if (firstOctet === 14 || firstOctet === 106 || firstOctet === 116 || firstOctet === 163 || firstOctet === 171 || firstOctet === 180 || firstOctet === 183) {
      return '中国-广东'
    }
    if (firstOctet === 36 || firstOctet === 42 || firstOctet === 60 || firstOctet === 118 || firstOctet === 182) {
      return '中国-浙江'
    }
    if (firstOctet === 49 || firstOctet === 114 || firstOctet === 119) {
      return '中国-江苏'
    }
  }
  
  return '未知地区'
}

export function middleware(request: NextRequest) {
  const timestamp = new Date().toISOString()
  const method = request.method
  const pathname = request.nextUrl.pathname
  const userAgent = request.headers.get('user-agent') || 'unknown'
  const referer = request.headers.get('referer') || '-'
  
  // 获取真实IP（考虑代理）
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const ip = forwardedFor?.split(',')[0]?.trim() || realIP || request.ip || 'unknown'
  
  // 获取地区
  const location = getLocationFromIP(ip)
  
  // 输出访问日志到 stdout，Zeabur 可以在 Run Logs 中查看
  console.log(`[${timestamp}] ${method} ${pathname} | IP: ${ip} | 地区: ${location} | UA: ${userAgent.slice(0, 40)}...`)
  
  return NextResponse.next()
}

// 配置匹配所有路径
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
