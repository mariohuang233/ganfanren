// Next.js Instrumentation - 在服务器启动时注册
export async function register() {
  // 只在服务器端执行
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('[Server] 干饭雷达服务器已启动')
    console.log('[Server] 时间:', new Date().toISOString())
    console.log('[Server] 环境:', process.env.NODE_ENV)
  }
}
