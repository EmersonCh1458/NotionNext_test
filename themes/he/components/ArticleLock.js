import { useGlobal } from '@/lib/global'
import { useEffect, useRef } from 'react'

/**
 * He 文章密码锁
 */
const ArticleLock = ({ validPassword }) => {
  const { locale } = useGlobal()
  const passwordInputRef = useRef(null)

  const submitPassword = () => {
    const p = document.getElementById('password')
    const val = p?.value
    if (!validPassword?.(val)) {
      const tips = document.getElementById('tips')
      if (tips) {
        tips.innerHTML = `<div class='text-red-500 text-sm mt-2'>${locale.COMMON?.PASSWORD_ERROR || '密码错误'}</div>`
      }
    }
  }

  useEffect(() => {
    passwordInputRef.current?.focus()
  }, [])

  return (
    <div className='w-full flex justify-center items-center min-h-[24rem]'>
      <div className='text-center space-y-4'>
        <div className='font-serif text-lg text-[var(--he-text)]'>
          {locale.COMMON?.ARTICLE_LOCK_TIPS || '此文章已加密，请输入密码'}
        </div>
        <div className='flex justify-center'>
          <input
            id='password'
            type='password'
            onKeyDown={e => { if (e.key === 'Enter') submitPassword() }}
            ref={passwordInputRef}
            className='outline-none w-56 text-sm px-4 py-2 rounded-l border border-[var(--he-border)] bg-[var(--he-bg)] text-[var(--he-text)] focus:border-[var(--he-theme)] transition-colors'
            placeholder='输入密码'
          />
          <button
            onClick={submitPassword}
            className='px-4 py-2 bg-[var(--he-theme)] text-white text-sm rounded-r hover:opacity-90 transition-opacity'>
            {locale.COMMON?.SUBMIT || '确认'}
          </button>
        </div>
        <div id='tips' />
      </div>
    </div>
  )
}

export default ArticleLock
