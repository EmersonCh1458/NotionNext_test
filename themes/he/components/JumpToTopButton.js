import { useEffect, useState } from 'react'

/**
 * He 回到顶部按钮
 * 滚动后显示，悬浮在右下角
 */
const JumpToTopButton = ({ showPercent = false, percent }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className='fixed bottom-6 right-6 z-30 w-10 h-10 flex flex-col items-center justify-center rounded-full he-card shadow-sm hover:shadow-md transition-all'
      aria-label='回到顶部'>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10 L8 5 L13 10" />
      </svg>
      {showPercent && percent != null && (
        <span className='text-[10px] text-[var(--he-text-dim)]'>{percent}</span>
      )}
    </button>
  )
}

export default JumpToTopButton
