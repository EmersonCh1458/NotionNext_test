import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import SideBar from './SideBar'
import SearchInput from './SearchInput'

/**
 * 顶部导航 — 极简：左标题 + 右搜索 + 汉堡菜单（移动端）
 */
const Header = props => {
  const searchDrawer = useRef()
  const { locale } = useGlobal()
  const router = useRouter()
  const [isOpen, changeShow] = useState(false)
  const searchDrawerSlot = useRef()
  const toggleMenuOpen = () => changeShow(!isOpen)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <div id='sticky-nav'
        className={`sticky top-0 z-30 w-full transition-all duration-300 ${
          scrolled ? 'bg-[var(--he-card)]/95 backdrop-blur-md shadow-sm border-b border-[var(--he-border)]' : 'bg-transparent'
        }`}>
        <div className='max-w-5xl mx-auto px-4 md:px-6'>
          <div className='flex items-center justify-between h-14 md:h-16'>

            {/* 左：站点名称 */}
            <div className='flex items-center gap-2'>
              <SmartLink
                href='/'
                className='font-serif font-bold text-lg tracking-tight text-[var(--he-text)] hover:text-[var(--he-theme)] transition-colors'>
                {siteConfig('TITLE') || '禾的资讯站'}
              </SmartLink>
            </div>

            {/* 右：分类/标签/搜索 */}
            <div className='flex items-center gap-2'>
              {/* 分类 & 标签 — 桌面端显示 */}
              <div className='hidden md:flex items-center gap-4 text-sm'>
                <SmartLink
                  href='/category'
                  className='text-[var(--he-text-dim)] hover:text-[var(--he-theme)] transition-colors'>
                  {locale.COMMON?.CATEGORY || '分类'}
                </SmartLink>
                <SmartLink
                  href='/tag'
                  className='text-[var(--he-text-dim)] hover:text-[var(--he-theme)] transition-colors'>
                  {locale.COMMON?.TAGS || '标签'}
                </SmartLink>
                <SmartLink
                  href='/archive'
                  className='text-[var(--he-text-dim)] hover:text-[var(--he-theme)] transition-colors'>
                  {locale.COMMON?.ARCHIVE || '归档'}
                </SmartLink>
              </div>

              {/* 搜索按钮 */}
              <button
                onClick={() => searchDrawer?.current?.toggleSearch?.() || router.push('/search')}
                className='p-2 text-[var(--he-text-dim)] hover:text-[var(--he-theme)] transition-colors'
                aria-label='搜索'>
                <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <circle cx='11' cy='11' r='8'/>
                  <path d='M21 21l-4.35-4.35'/>
                </svg>
              </button>

              {/* 汉堡菜单 — 移动端 */}
              <button
                onClick={toggleMenuOpen}
                className='md:hidden p-2 text-[var(--he-text-dim)] hover:text-[var(--he-theme)] transition-colors'
                aria-label='菜单'>
                <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  {isOpen ? (
                    <path d='M18 6L6 18M6 6l12 12'/>
                  ) : (
                    <path d='M3 12h18M3 6h18M3 18h18'/>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 移动端抽屉菜单 */}
      {isOpen && (
        <div
          className='fixed inset-0 z-40 md:hidden'
          onClick={() => changeShow(false)}>
          <div className='absolute inset-0 bg-black/30 backdrop-blur-sm' />
          <div
            className='absolute right-0 top-0 h-full w-72 bg-[var(--he-card)] shadow-xl overflow-y-auto'
            onClick={e => e.stopPropagation()}>
            <div className='p-5'>
              <div className='flex items-center justify-between mb-6'>
                <span className='font-serif font-bold text-lg'>{siteConfig('TITLE') || '禾的资讯站'}</span>
                <button onClick={() => changeShow(false)} className='p-1' aria-label='关闭'>
                  <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                    <path d='M18 6L6 18M6 6l12 12'/>
                  </svg>
                </button>
              </div>
              <SideBar {...props} />
            </div>
          </div>
        </div>
      )}

      {/* 搜索抽屉 */}
      <div ref={searchDrawerSlot} id='search-drawer' className='hidden'>
        <SearchInput {...props} cRef={searchDrawer} />
      </div>
    </>
  )
}

export default Header
