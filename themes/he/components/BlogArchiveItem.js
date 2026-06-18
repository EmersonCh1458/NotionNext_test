import SmartLink from '@/components/SmartLink'
import { formatDateFmt } from '@/lib/utils/formatDate'

/**
 * He 归档项
 * 时间轴风格：年份 → 日期 + 标题
 */
const BlogArchiveItem = ({ posts = [], archiveTitle }) => {
  if (!posts || posts.length === 0) return null

  return (
    <div>
      <div
        className='pt-12 pb-4 text-xl md:text-2xl font-serif font-bold text-[var(--he-text)]'
        id={archiveTitle}>
        {archiveTitle}
      </div>
      <div className='space-y-2'>
        {posts.map(post => (
          <div key={post.id} className='flex items-baseline gap-3 py-1'>
            <time className='he-date shrink-0 w-20 text-right'>
              {post.date?.start_date
                ? formatDateFmt(post.date.start_date, 'MM-dd')
                : ''}
            </time>
            <SmartLink
              href={post?.href}
              className='text-sm md:text-base text-[var(--he-text-sub)] hover:text-[var(--he-theme)] transition-colors hover:underline underline-offset-2'>
              {post.title}
            </SmartLink>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BlogArchiveItem
