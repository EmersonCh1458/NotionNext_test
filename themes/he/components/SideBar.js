import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'

/**
 * 侧边栏 — 个人信息 + 分类 + 标签 + 最新文章
 */
const SideBar = props => {
  const { siteInfo, categories, currentCategory, tags, currentTag, latestPosts } = props
  const { locale } = useGlobal()
  const router = useRouter()

  if (!siteInfo) return null

  return (
    <div className='space-y-6'>

      {/* 个人信息卡片 */}
      <div className='he-card p-5'>
        <div className='text-center'>
          {siteInfo?.icon && (
            <LazyImage
              src={siteInfo.icon}
              alt='avatar'
              className='w-16 h-16 rounded-full mx-auto object-cover'
            />
          )}
          <div className='mt-3 font-serif font-bold text-base text-[var(--he-text)]'>
            {siteInfo?.title || siteConfig('AUTHOR')}
          </div>
          {siteInfo?.description && (
            <div className='mt-1 text-xs text-[var(--he-text-dim)] leading-relaxed'>
              {siteInfo.description}
            </div>
          )}
        </div>
      </div>

      {/* 分类 */}
      {categories && categories.length > 0 && (
        <div className='he-card p-5'>
          <div className='he-sidebar-title'>{locale.COMMON?.CATEGORY || '分类'}</div>
          <div className='flex flex-wrap gap-1.5'>
            {categories.slice(0, 10).map(cat => (
              <SmartLink
                key={cat.name}
                href={`/category/${encodeURIComponent(cat.name)}`}
                passHref
                className={`text-xs px-2.5 py-1 rounded transition-colors ${
                  currentCategory === cat.name
                    ? 'bg-[var(--he-theme)] text-white'
                    : 'bg-[var(--he-theme-soft)] text-[var(--he-theme)] hover:bg-[var(--he-theme)] hover:text-white'
                }`}>
                {cat.name}
              </SmartLink>
            ))}
          </div>
        </div>
      )}

      {/* 标签 */}
      {tags && tags.length > 0 && (
        <div className='he-card p-5'>
          <div className='he-sidebar-title'>{locale.COMMON?.TAGS || '标签'}</div>
          <div className='flex flex-wrap gap-1.5'>
            {tags.slice(0, 15).map(tag => (
              <SmartLink
                key={tag.name}
                href={`/tag/${encodeURIComponent(tag.name)}`}
                passHref
                className={`text-xs px-2 py-0.5 rounded transition-colors ${
                  currentTag === tag.name
                    ? 'bg-[var(--he-theme)] text-white'
                    : 'text-[var(--he-text-dim)] hover:text-[var(--he-theme)] border border-[var(--he-border)] hover:border-[var(--he-theme)]'
                }`}>
                {tag.name}
              </SmartLink>
            ))}
          </div>
        </div>
      )}

      {/* 最新文章 */}
      {latestPosts && latestPosts.length > 0 && (
        <div className='he-card p-5'>
          <div className='he-sidebar-title'>{locale.COMMON?.LATEST_POSTS || '最新'}</div>
          <div className='space-y-2'>
            {latestPosts.slice(0, 5).map(post => (
              <SmartLink
                key={post.id}
                href={post?.href}
                passHref
                className='block text-sm text-[var(--he-text-sub)] hover:text-[var(--he-theme)] transition-colors leading-relaxed line-clamp-2'>
                {post.title}
              </SmartLink>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SideBar
