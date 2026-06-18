import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useState, useRef } from 'react'
import CONFIG from '../config'
import NavButtonGroup from './NavButtonGroup'

let wrapperTop = 0

/**
 * 顶部 Hero 封面
 * 保留全屏大图+打字效果，去掉'开始阅读'按钮的跳动，改为淡入柔和入场
 */
const Hero = props => {
  const [typed, changeType] = useState()
  const [scrolled, setScrolled] = useState(false)
  const { siteInfo } = props
  const { locale } = useGlobal()
  const scrollToWrapper = () => {
    window.scrollTo({ top: wrapperTop, behavior: 'smooth' })
  }

  const GREETING_WORDS = siteConfig('GREETING_WORDS').split(',')

  useEffect(() => {
    updateHeaderHeight()

    if (!typed && window && document.getElementById('typed')) {
      loadExternalResource('/js/typed.min.js', 'js').then(() => {
        if (window.Typed) {
          changeType(
            new window.Typed('#typed', {
              strings: GREETING_WORDS,
              typeSpeed: 100,
              backSpeed: 50,
              backDelay: 2000,
              showCursor: true,
              smartBackspace: true,
              loop: true
            })
          )
        }
      })
    }

    const onScroll = () => setScrolled(window.scrollY > 100)
    const onResize = () => updateHeaderHeight()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  function updateHeaderHeight() {
    requestAnimationFrame(() => {
      const wrapperElement = document.getElementById('wrapper')
      wrapperTop = wrapperElement?.offsetTop
    })
  }

  return (
    <header
      id='header'
      style={{ zIndex: 1 }}
      className='w-full h-screen relative bg-black overflow-hidden'>
      {/* 遮罩层 — 让文字可读 */}
      <div className='absolute inset-0 z-[1] pointer-events-none'
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,.5) 0%, rgba(0,0,0,.2) 20%, rgba(0,0,0,.08) 40%, rgba(0,0,0,.2) 70%, rgba(0,0,0,.5) 100%)'
        }}
      />

      {/* 内容区 */}
      <div className='relative z-10 text-white flex flex-col h-full items-center justify-center w-full px-6'>

        {/* 站点标题 — 柔和入场 */}
        <div
          className={`transition-all duration-700 ease-out ${scrolled ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
          style={{ transitionDelay: '100ms' }}>
          <div className='font-light text-sm tracking-[.2em] uppercase mb-4 opacity-60'>
            {siteConfig('TITLE') || '禾的资讯站'}
          </div>
          <div className='font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-tight shadow-text'>
            {siteInfo?.title || siteConfig('TITLE')}
          </div>
        </div>

        {/* 打字效果 */}
        <div
          className={`mt-4 h-8 items-center text-center font-light shadow-text text-lg md:text-xl transition-all duration-700 ease-out ${scrolled ? 'opacity-0' : 'opacity-80'}`}
          style={{ transitionDelay: '200ms' }}>
          <span id='typed' />
        </div>

        {/* 分类按钮 */}
        {siteConfig('HEXO_HOME_NAV_BUTTONS', null, CONFIG) && (
          <div
            className={`mt-8 transition-all duration-700 ease-out ${scrolled ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
            style={{ transitionDelay: '300ms' }}>
            <NavButtonGroup {...props} />
          </div>
        )}

        {/* 滚动提示 — 柔和的脉冲而不是 bounce */}
        <div
          onClick={scrollToWrapper}
          className={`z-10 cursor-pointer text-center absolute bottom-12 text-white transition-all duration-700 ease-out ${scrolled ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-70'}`}
          style={{ transitionDelay: '500ms' }}>
          {siteConfig('HEXO_SHOW_START_READING', null, CONFIG) && (
            <div className='text-xs tracking-widest mb-2 font-light' style={{ animation: 'heroPulse 2.5s ease-in-out infinite' }}>
              {locale.COMMON.START_READING}
            </div>
          )}
          <div className='flex justify-center' style={{ animation: 'heroPulse 2.5s ease-in-out infinite' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 7 L10 14 L17 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* 封面图 */}
      <LazyImage
        id='header-cover'
        alt={siteInfo?.title}
        src={siteInfo?.pageCover}
        className={`header-cover w-full h-screen object-cover object-center ${siteConfig('HEXO_HOME_NAV_BACKGROUND_IMG_FIXED', null, CONFIG) ? 'fixed' : ''}`}
      />

      <style jsx>{`
        @keyframes heroPulse {
          0%, 100% { opacity: .5; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(4px); }
        }
      `}</style>
    </header>
  )
}

export default Hero
