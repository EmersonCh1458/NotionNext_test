import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { formatDateFmt } from '@/lib/utils/formatDate'
import PaginationNumber from './PaginationNumber'

/**
 * He 分页文章列表
 * 信息流时间轴样式：左日期右标题
 */
const BlogListPage = ({ page = 1, posts = [], postCount, siteInfo }) => {
  const { NOTION_CONFIG, locale } = useGlobal()
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const totalPage = Math.ceil(postCount / POSTS_PER_PAGE)

  if (!posts || posts.length === 0) {
    return (
      <div className='text-center py-16 text-[var(--he-text-dim)]'>
        {locale.COMMON?.NO_MORE || '暂无文章'}
      </div>
    )
  }

  return (
    <div id='container' className='w-full'>
      {/* 文章列表 — 时间轴 */}
      <div className='space-y-0 divide-y divide-[var(--he-border)]'>
        {posts?.map(post => (
          <article key={post.id} className='he-post-divider py-5 md:py-6 first:pt-0'>
            <div className='flex flex-col md:flex-row md:items-baseline gap-1 md:gap-5'>
              {/* 日期 */}
              {siteConfig('HE_SHOW_DATE', true) && (
                <time className='he-date shrink-0 md:w-24 text-left md:text-right'>
                  {post.date?.start_date
                    ? formatDateFmt(post.date.start_date, 'MM-dd')
                    : post.lastEditedDay || ''}
                </time>
              )}
              {/* 标题 */}
              <div className='flex-1 min-w-0'>
                <SmartLink
                  href={post?.href}
                  className='text-base md:text-lg font-serif font-medium text-[var(--he-text)] hover:text-[var(--he-theme)] transition-colors leading-snug'>
                  {post.title}
                </SmartLink>
                {/* 分类标签 */}
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

      {/* 分页 */}
      {totalPage > 1 && (
        <PaginationNumber page={page} totalPage={totalPage} />
      )}
    </div>
  )
}

export default BlogListPage
