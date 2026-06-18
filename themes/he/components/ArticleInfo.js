import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import { formatDateFmt } from '@/lib/utils/formatDate'
import CONFIG from '../config'

/**
 * He 文章详情信息
 * 标题、日期、标签、封面
 */
const ArticleInfo = ({ post, siteInfo }) => {
  if (!post) return null

  return (
    <div className='mb-10'>
      {/* 封面图 */}
      {post?.pageCover && (
        <div className='-mx-5 md:-mx-8 -mt-5 md:-mt-8 mb-8 overflow-hidden rounded-t-lg'>
          <img
            src={post.pageCover}
            alt={post.title}
            className='w-full h-48 md:h-64 object-cover'
          />
        </div>
      )}

      {/* 标题 */}
      <h1 className='text-2xl md:text-4xl font-serif font-bold text-[var(--he-text)] leading-tight'>
        {post.title}
      </h1>

      {/* 元信息 */}
      <div className='mt-4 flex flex-wrap items-center gap-4 text-sm text-[var(--he-text-dim)]'>
        {/* 日期 */}
        {siteConfig('HE_SHOW_DATE', true) && post?.date?.start_date && (
          <time className='he-date'>
            {formatDateFmt(post.date.start_date, 'yyyy-MM-dd')}
          </time>
        )}
        {/* 分类 */}
        {siteConfig('HE_SHOW_CATEGORY_CHIP', true) && post?.category && typeof post.category === 'string' && (
          <div className='flex flex-wrap gap-1.5'>
            {post.category.split(',').map(cat => (
              <SmartLink
                key={cat.trim()}
                href={`/category/${encodeURIComponent(cat.trim())}`}
                className='he-chip'>
                {cat.trim()}
              </SmartLink>
            ))}
          </div>
        )}
      </div>

      {/* 标签 */}
      {siteConfig('HE_SHOW_TAG_CHIP', true) && post?.tags && post.tags.length > 0 && (
        <div className='mt-3 flex flex-wrap gap-1.5'>
          {post.tags.map(tag => (
            <SmartLink
              key={tag}
              href={`/tag/${encodeURIComponent(tag)}`}
              className='he-chip'>
              #{tag}
            </SmartLink>
          ))}
        </div>
      )}
    </div>
  )
}

export default ArticleInfo
