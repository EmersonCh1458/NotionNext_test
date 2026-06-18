import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { getListByPage } from '@/lib/utils'
import { useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import SmartLink from '@/components/SmartLink'
import { formatDateFmt } from '@/lib/utils/formatDate'

/**
 * He 滚动加载文章列表
 */
const BlogListScroll = ({ posts = [], currentSearch }) => {
  const { NOTION_CONFIG, locale } = useGlobal()
  const [page, updatePage] = useState(1)
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const postsToShow = getListByPage(posts, page, POSTS_PER_PAGE)
  const targetRef = useRef(null)

  const hasMore = posts ? page * POSTS_PER_PAGE < posts.length : false

  const handleGetMore = () => {
    if (!hasMore) return
    updatePage(page + 1)
  }

  const scrollTrigger = () => {
    requestAnimationFrame(() => {
      const scrollS = window.scrollY + window.innerHeight
      const clientHeight = targetRef.current?.clientHeight || 0
      if (scrollS > clientHeight + 100) {
        handleGetMore()
      }
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollTrigger, { passive: true })
    return () => window.removeEventListener('scroll', scrollTrigger)
  })

  if (!postsToShow || postsToShow.length === 0) {
    return (
      <div className='text-center py-16 text-[var(--he-text-dim)]'>
        {locale.COMMON?.NO_MORE || '暂无文章'}
      </div>
    )
  }

  return (
    <div id='container' ref={targetRef} className='w-full'>
      <div className='space-y-0 divide-y divide-[var(--he-border)]'>
        {postsToShow.map(post => (
          <article key={post.id} className='he-post-divider py-5 md:py-6 first:pt-0'>
            <div className='flex flex-col md:flex-row md:items-baseline gap-1 md:gap-5'>
              {siteConfig('HE_SHOW_DATE', true) && (
                <time className='he-date shrink-0 md:w-24 text-left md:text-right'>
                  {post.date?.start_date
                    ? formatDateFmt(post.date.start_date, 'MM-dd')
                    : post.lastEditedDay || ''}
                </time>
              )}
              <div className='flex-1 min-w-0'>
                <SmartLink
                  href={post?.href}
                  className='text-base md:text-lg font-serif font-medium text-[var(--he-text)] hover:text-[var(--he-theme)] transition-colors leading-snug'>
                  {post.title}
                </SmartLink>
                {siteConfig('HE_SHOW_CATEGORY_CHIP', true) && post?.category && (
                  <div className='mt-1.5 flex flex-wrap gap-1.5'>
                    {post.category?.split(',').map(cat => (
                      <span key={cat.trim()} className='he-chip'>{cat.trim()}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* 加载更多 */}
      <div className='py-8 text-center'>
        {hasMore ? (
          <button
            onClick={handleGetMore}
            className='text-sm text-[var(--he-text-sub)] hover:text-[var(--he-theme)] transition-colors cursor-pointer'>
            {locale.COMMON?.MORE || '加载更多'} ↓
          </button>
        ) : (
          <span className='text-sm text-[var(--he-text-dim)]'>
            {locale.COMMON?.NO_MORE || '已全部加载'}
          </span>
        )}
      </div>
    </div>
  )
}

export default BlogListScroll
