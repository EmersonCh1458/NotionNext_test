import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'

/**
 * He 推荐文章
 * 卡片网格风格，轻模糊封面效果
 */
const RecommendPosts = ({ recommendPosts }) => {
  const { locale } = useGlobal()

  if (!siteConfig('HE_ARTICLE_RECOMMEND', true, CONFIG) || !recommendPosts || recommendPosts.length === 0) {
    return null
  }

  return (
    <div className='mt-10 pt-6 border-t border-[var(--he-border)]'>
      <div className='mb-4 text-sm font-medium text-[var(--he-text)]'>
        {locale.COMMON?.RELATE_POSTS || '推荐阅读'}
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4'>
        {recommendPosts.map(post => (
          <SmartLink
            key={post.id}
            title={post.title}
            href={post?.href}
            passHref
            className='group relative h-28 md:h-36 overflow-hidden rounded-lg he-card'>
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10' />
            {(post?.pageCoverThumbnail || post?.pageCover) && (
              <LazyImage
                src={post.pageCoverThumbnail || post.pageCover}
                alt=''
                className='absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
              />
            )}
            <div className='absolute bottom-0 left-0 right-0 z-20 p-3'>
              <span className='text-sm font-medium text-white leading-snug line-clamp-2 drop-shadow-md'>
                {post.title}
              </span>
            </div>
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

export default RecommendPosts
