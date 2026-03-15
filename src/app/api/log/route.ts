import { NextRequest, NextResponse } from 'next/server'

// 简单的IP地理位置映射（基于常见IP段）
// 注意：这只是演示，实际生产环境应该使用专业的IP地理位置服务
function getLocationFromIP(ip: string): string {
  // 处理IPv6映射的IPv4地址
  const cleanIP = ip.replace(/^::ffff:/, '')
  
  // 内网IP
  if (cleanIP.startsWith('192.168.') || cleanIP.startsWith('10.') || cleanIP.startsWith('172.')) {
    return '内网/代理'
  }
  
  // 本地回环
  if (cleanIP === '127.0.0.1' || cleanIP === '::1') {
    return '本地'
  }
  
  // 基于常见运营商IP段的简单判断（仅作演示）
  const parts = cleanIP.split('.')
  if (parts.length === 4) {
    const firstOctet = parseInt(parts[0])
    const secondOctet = parseInt(parts[1])
    
    // 中国电信
    if ((firstOctet === 116 && secondOctet >= 128) || 
        (firstOctet === 117) || 
        (firstOctet === 118) ||
        (firstOctet === 119) ||
        (firstOctet === 120) ||
        (firstOctet === 121) ||
        (firstOctet === 122) ||
        (firstOctet === 123) ||
        (firstOctet === 124) ||
        (firstOctet === 125) ||
        (firstOctet === 126)) {
      return '中国-电信'
    }
    
    // 中国联通
    if ((firstOctet === 112) || 
        (firstOctet === 113) ||
        (firstOctet === 114) ||
        (firstOctet === 115) ||
        (firstOctet === 116 && secondOctet < 128)) {
      return '中国-联通'
    }
    
    // 中国移动
    if ((firstOctet === 111) ||
        (firstOctet === 110) ||
        (firstOctet === 109) ||
        (firstOctet === 108) ||
        (firstOctet === 107) ||
        (firstOctet === 106) ||
        (firstOctet === 105) ||
        (firstOctet === 104) ||
        (firstOctet === 103) ||
        (firstOctet === 102) ||
        (firstOctet === 101)) {
      return '中国-移动'
    }
    
    // 教育网
    if (firstOctet === 202 && secondOctet >= 112 && secondOctet <= 127) {
      return '中国-教育网(CERNET)'
    }
    
    // 根据第二段判断大致地区（非常粗略）
    if (firstOctet === 1) return '中国-北京'
    if (firstOctet === 14) return '中国-广东'
    if (firstOctet === 27) return '中国-湖北'
    if (firstOctet === 36) return '中国-浙江'
    if (firstOctet === 39) return '中国-北京'
    if (firstOctet === 42) return '中国-浙江'
    if (firstOctet === 49) return '中国-江苏'
    if (firstOctet === 58) return '中国-上海'
    if (firstOctet === 59) return '中国-北京'
    if (firstOctet === 60) return '中国-浙江'
    if (firstOctet === 61) return '中国-山东'
    if (firstOctet === 101) return '中国-广东/浙江'
    if (firstOctet === 106) return '中国-广东'
    if (firstOctet === 110) return '中国-北京'
    if (firstOctet === 111) return '中国-北京'
    if (firstOctet === 112) return '中国-北京/浙江'
    if (firstOctet === 113) return '中国-北京'
    if (firstOctet === 114) return '中国-江苏/浙江'
    if (firstOctet === 115) return '中国-北京'
    if (firstOctet === 116) return '中国-广东/浙江'
    if (firstOctet === 117) return '中国-湖北/山东'
    if (firstOctet === 118) return '中国-浙江'
    if (firstOctet === 119) return '中国-江苏'
    if (firstOctet === 120) return '中国-上海/浙江'
    if (firstOctet === 121) return '中国-北京/江苏'
    if (firstOctet === 122) return '中国-上海/浙江'
    if (firstOctet === 123) return '中国-北京/广东'
    if (firstOctet === 124) return '中国-北京/浙江'
    if (firstOctet === 125) return '中国-北京/江苏'
    if (firstOctet === 126) return '中国-北京'
    if (firstOctet === 163) return '中国-广东'
    if (firstOctet === 171) return '中国-广东'
    if (firstOctet === 180) return '中国-广东'
    if (firstOctet === 182) return '中国-浙江'
    if (firstOctet === 183) return '中国-广东'
    if (firstOctet === 202) return '中国-北京/广东'
    if (firstOctet === 203) return '中国-北京/上海'
    if (firstOctet === 210) return '中国-上海/北京'
    if (firstOctet === 211) return '中国-北京/上海'
    if (firstOctet === 218) return '中国-北京/广东'
    if (firstOctet === 219) return '中国-北京'
    if (firstOctet === 220) return '中国-北京/广东'
    if (firstOctet === 221) return '中国-北京'
    if (firstOctet === 222) return '中国-北京/广东'
    if (firstOctet === 223) return '中国-浙江/广东'
  }
  
  // 无法识别
  return '未知地区'
}

export async function POST(request: NextRequest) {
  const data = await request.json().catch(() => ({}))
  const timestamp = new Date().toISOString()
  const pathname = data.pathname || 'unknown'
  const userAgent = data.userAgent || 'unknown'
  const referer = data.referer || '-'
  
  // 获取真实IP（考虑代理）
  // 优先级：X-Forwarded-For > X-Real-IP > request.ip
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const clientIP = forwardedFor?.split(',')[0]?.trim() || realIP || request.ip || 'unknown'
  
  // 获取地区信息
  const location = getLocationFromIP(clientIP)
  
  // 输出访问日志到 stdout，Zeabur 可以在 Run Logs 中查看
  console.log(`[ACCESS] ${timestamp} | ${pathname} | IP: ${clientIP} | 地区: ${location} | UA: ${userAgent.slice(0, 50)}... | Ref: ${referer.slice(0, 30)}`)
  
  return NextResponse.json({ success: true, ip: clientIP, location })
}

// 也支持GET请求，用于测试
export async function GET(request: NextRequest) {
  const timestamp = new Date().toISOString()
  
  // 获取真实IP
  const forwardedFor = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const clientIP = forwardedFor?.split(',')[0]?.trim() || realIP || request.ip || 'unknown'
  
  // 获取地区信息
  const location = getLocationFromIP(clientIP)
  
  // 获取User-Agent
  const userAgent = request.headers.get('user-agent') || 'unknown'
  
  console.log(`[ACCESS-TEST] ${timestamp} | IP: ${clientIP} | 地区: ${location} | UA: ${userAgent.slice(0, 50)}`)
  
  return NextResponse.json({ 
    success: true, 
    ip: clientIP, 
    location,
    userAgent: userAgent.slice(0, 100),
    headers: {
      'x-forwarded-for': forwardedFor,
      'x-real-ip': realIP
    }
  })
}
