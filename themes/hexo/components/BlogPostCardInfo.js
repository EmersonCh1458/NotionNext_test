import NotionIcon from '@/components/NotionIcon'
import NotionPage from '@/components/NotionPage'
import TwikooCommentCount from '@/components/TwikooCommentCount'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import SmartLink from '@/components/SmartLink'
import TagItemMini from './TagItemMini'

/**
 * 卡片文字内容
 * 排版：标题更大、日期更轻、分类用柔和标签、摘要更透气
 */
export const BlogPostCardInfo = ({
  post,
  showPreview,
  showPageCover,
  showSummary
}) => {
  return (
    <article
      className={`flex flex-col justify-between lg:p-6 p-5 ${
        showPageCover && !showPreview ? 'md:w-7/12 w-full' : 'w-full'
      }`}>
      <div>
        <header>
          {/* 分类标签 — 柔和色块 */}
          {post?.category && (
            <div className='mb-2'>
              <SmartLink
                href={`/category/${post.category}`}
                passHref
                className='inline-block text-xs font-medium tracking-wide px-2.5 py-1 rounded'
                style={{
                  background: 'var(--theme-color-light)',
                  color: 'var(--theme-color)'
                }}>
                {post.category}
              </SmartLink>
            </div>
          )}

          {/* 标题 */}
          <h2 className='leading-snug'>
            <SmartLink
              href={post?.href}
              passHref
              className={`replace cursor-pointer text-xl md:text-2xl font-semibold tracking-tight ${
                showPreview ? 'text-center' : ''
              } text-[var(--text-primary)] hover:text-[var(--theme-color)] dark:hover:text-[var(--theme-color)] transition-colors duration-200`}>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon icon={post.pageIcon} />
              )}
              <span className='menu-link'>{post.title}</span>
            </SmartLink>
          </h2>
        </header>

        {/* 摘要 */}
        {(!showPreview || showSummary) && !post.results && (
          <main className='line-clamp-2 replace mt-3 text-sm leading-relaxed text-[var(--text-secondary)]'>
            {post.summary}
          </main>
        )}

        {/* 搜索结果 */}
        {post.results && (
          <p className='line-clamp-2 mt-4 text-sm leading-relaxed text-[var(--text-secondary)]'>
            {post.results.map((r, index) => (
              <span key={index}>{r}</span>
            ))}
          </p>
        )}

        {/* 预览 */}
        {showPreview && (
          <div className='overflow-ellipsis truncate mt-3'>
            <NotionPage post={post} />
          </div>
        )}
      </div>

      <div className='mt-4'>
        <div className='flex items-center justify-between text-[var(--text-muted)]'>
          {/* 日期 — 用轻量文字替代 icon */}
          <SmartLink
            href={`/archive#${formatDateFmt(post?.publishDate, 'yyyy-MM')}`}
            passHref
            className='date-tnum menu-link cursor-pointer text-sm leading-none'>
            {post?.publishDay || post.lastEditedDay}
          </SmartLink>

          {/* 标签 */}
          <div className='flex gap-1.5 flex-wrap justify-end'>
            {post.tagItems?.slice(0, 3).map(tag => (
              <TagItemMini key={tag.name} tag={tag} />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
