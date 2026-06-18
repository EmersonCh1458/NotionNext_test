import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'

/**
 * He 上下篇文章导航
 */
const ArticleAround = ({ prev, next }) => {
  if (!siteConfig('HE_ARTICLE_ADJACENT', true, CONFIG)) return null
  if (!prev && !next) return null

  return (
    <section className='mt-10 pt-6 border-t border-[var(--he-border)]'>
      <div className='flex justify-between gap-4'>
        <div className='flex-1 min-w-0'>
          {prev ? (
            <SmartLink
              href={`/${prev.slug}`}
              className='group block'>
              <span className='text-xs text-[var(--he-text-dim)]'>← 上一篇</span>
              <div className='mt-1 text-sm text-[var(--he-text-sub)] group-hover:text-[var(--he-theme)] transition-colors line-clamp-2'>
                {prev.title}
              </div>
            </SmartLink>
          ) : (
            <div />
          )}
        </div>
        <div className='flex-1 min-w-0 text-right'>
          {next ? (
            <SmartLink
              href={`/${next.slug}`}
              className='group block'>
              <span className='text-xs text-[var(--he-text-dim)]'>下一篇 →</span>
              <div className='mt-1 text-sm text-[var(--he-text-sub)] group-hover:text-[var(--he-theme)] transition-colors line-clamp-2'>
                {next.title}
              </div>
            </SmartLink>
          ) : (
            <div />
          )}
        </div>
      </div>
    </section>
  )
}

export default ArticleAround
