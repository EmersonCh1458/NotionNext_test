import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import { BlogPostCardInfo } from './BlogPostCardInfo'

/**
 * 文章卡片 — 左侧封面图 + 右侧文字
 * 动效：scroll reveal staggered + hover 视差
 */
const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
  const showPreview =
    siteConfig('HEXO_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
  if (
    post &&
    !post.pageCoverThumbnail &&
    siteConfig('HEXO_POST_LIST_COVER_DEFAULT', null, CONFIG)
  ) {
    post.pageCoverThumbnail = siteInfo?.pageCover
  }
  const showPageCover =
    siteConfig('HEXO_POST_LIST_COVER', null, CONFIG) &&
    post?.pageCoverThumbnail &&
    !showPreview

  // 交替延迟让 staggered 更自然
  const aosDelay = 50 + (index % 3) * 80

  return (
    <div>
      <div
        key={post.id}
        data-aos='fade-up'
        data-aos-delay={aosDelay}
        data-aos-duration='600'
        data-aos-once='true'
        data-aos-anchor-placement='top-bottom'
        data-aos-easing='ease-out-quart'
        id='blog-post-card'
        className={`blog-post-card group w-full flex justify-between md:flex-row flex-col-reverse ${
          siteConfig('HEXO_POST_LIST_IMG_CROSSOVER', null, CONFIG) && index % 2 === 1 ? 'md:flex-row-reverse' : ''
        } overflow-hidden border border-[var(--border-light)] rounded-xl bg-[var(--bg-card)]`}>
        {/* 文字内容 */}
        <BlogPostCardInfo
          index={index}
          post={post}
          showPageCover={showPageCover}
          showPreview={showPreview}
          showSummary={showSummary}
        />

        {/* 图片封面 */}
        {showPageCover && (
          <div className='md:w-5/12 overflow-hidden'>
            <SmartLink href={post?.href}>
              <>
                <LazyImage
                  priority={index === 1}
                  alt={post?.title}
                  src={post?.pageCoverThumbnail}
                  className='h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105'
                  style={{ minHeight: '200px' }}
                />
              </>
            </SmartLink>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPostCard
