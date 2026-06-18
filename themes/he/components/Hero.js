import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { loadExternalResource } from '@/lib/utils'
import { useEffect, useState } from 'react'
import CONFIG from '../config'

let wrapperTop = 0

/**
 * Hero 封面 — 全屏大图 + 打字效果 + 柔和入场
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
    <header id='header' style={{ zIndex: 1 }}
      className='w-full h-screen relative bg-black overflow-hidden'>
      <div className='absolute inset-0 z-[1] he-cover-mask' />

      <div className='relative z-10 text-white flex flex-col h-full items-center justify-center w-full px-6'>
        <div className={`transition-all duration-700 ease-out ${scrolled ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
          style={{ transitionDelay: '100ms' }}>
          <div className='font-light text-xs tracking-[.25em] uppercase mb-4 opacity-50'>
            {siteConfig('TITLE') || '禾的资讯站'}
          </div>
          <div className='font-serif font-bold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-tight shadow-text'>
            {siteInfo?.title || siteConfig('TITLE')}
          </div>
        </div>

        <div className={`mt-5 h-8 items-center text-center font-light shadow-text text-base md:text-lg transition-all duration-700 ease-out ${scrolled ? 'opacity-0' : 'opacity-70'}`}
          style={{ transitionDelay: '200ms' }}>
          <span id='typed' />
        </div>

        <div onClick={scrollToWrapper}
          className={`z-10 cursor-pointer text-center absolute bottom-12 text-white transition-all duration-700 ease-out ${scrolled ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-60'}`}
          style={{ transitionDelay: '500ms' }}>
          <div className='text-xs tracking-widest mb-2 font-light' style={{ animation: 'heFloat 2.5s ease-in-out infinite' }}>
            {locale.COMMON.START_READING}
          </div>
          <div className='flex justify-center' style={{ animation: 'heFloat 2.5s ease-in-out infinite' }}>
            <svg width='18' height='18' viewBox='0 0 20 20' fill='none' stroke='currentColor' strokeWidth='1.5'>
              <path d='M3 7 L10 14 L17 7' strokeLinecap='round' strokeLinejoin='round'/>
            </svg>
          </div>
        </div>
      </div>

      <LazyImage
        id='header-cover'
        alt={siteInfo?.title}
        src={siteInfo?.pageCover}
        className='header-cover w-full h-screen object-cover object-center'
      />
    </header>
  )
}

export default Hero
