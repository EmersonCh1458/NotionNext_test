import Comment from '@/components/Comment'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import dynamic from 'next/dynamic'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect } from 'react'

import ArticleAround from './components/ArticleAround'
import { ArticleLock } from './components/ArticleLock'
import ArticleInfo from './components/ArticleInfo'
import ArticleRecommend from './components/RecommendPosts'
import BlogArchiveItem from './components/BlogArchiveItem'
import BlogListPage from './components/BlogListPage'
import BlogListScroll from './components/BlogListScroll'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import JumpToTopButton from './components/JumpToTopButton'
import SearchInput from './components/SearchInput'
import SideBar from './components/SideBar'
import CONFIG from './config'
import { Style } from './style'

// 主题全局状态
const ThemeGlobalHe = createContext()
export const useHeGlobal = () => useContext(ThemeGlobalHe)

/**
 * 基础布局 — 左侧主内容 + 右侧边栏
 */
const LayoutBase = props => {
  const { post, children, slotTop, className } = props
  const { onLoading } = useGlobal()
  const router = useRouter()

  // 头部插槽：首页显示 Hero，文章页不显示（简化）
  const headerSlot = router.route === '/' &&
    siteConfig('HE_HERO_SHOW_COVER', true, CONFIG) ? (
    <Hero {...props} />
  ) : null

  return (
    <ThemeGlobalHe.Provider value={{}}>
      <div id='theme-he' className='min-h-screen bg-[var(--he-bg)] text-[var(--he-text)] scroll-smooth'>
        <Style />

        {/* 顶部导航 */}
        <Header {...props} />

        {/* Hero */}
        {headerSlot}

        {/* 主区块 */}
        <main
          id='wrapper'
          className='w-full py-8 md:py-12 relative'>
          <div className='max-w-5xl mx-auto px-4 md:px-6 lg:flex lg:gap-8'>
            {/* 左侧主内容 */}
            <div className={`w-full min-w-0 ${className || ''}`}>
              {/* 顶部插槽 */}
              {slotTop}

              {/* 子内容 */}
              {children}
            </div>

            {/* 右侧栏 */}
            {siteConfig('HE_SIDEBAR_VISIBLE', true, CONFIG) && (
              <div className='hidden lg:block lg:w-72 lg:shrink-0 mt-8 lg:mt-0'>
                <div className='lg:sticky lg:top-20'>
                  <SideBar {...props} />
                </div>
              </div>
            )}
          </div>
        </main>

        {/* 回到顶部 */}
        <JumpToTopButton />

        {/* 页脚 */}
        <Footer siteInfo={props.siteInfo} />
      </div>
    </ThemeGlobalHe.Provider>
  )
}

/**
 * 首页 — 文章列表
 */
const LayoutIndex = props => {
  return <LayoutPostList {...props} />
}

/**
 * 文章列表
 */
const LayoutPostList = props => {
  const { NOTION_CONFIG } = useGlobal()
  const postListStyle = siteConfig('POST_LIST_STYLE', 'page', NOTION_CONFIG)

  return (
    <div>
      {postListStyle === 'page' ? (
        <BlogListPage {...props} />
      ) : (
        <BlogListScroll {...props} />
      )}
    </div>
  )
}

/**
 * 搜索页面
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()
  const currentSearch = keyword || router?.query?.s

  useEffect(() => {
    if (currentSearch) {
      replaceSearchResult({
        doms: document.getElementsByClassName('replace'),
        search: keyword,
        target: {
          element: 'span',
          className: 'text-red-500 border-b border-dashed'
        }
      })
    }
  })

  return (
    <div>
      {!currentSearch ? (
        <div className='space-y-6'>
          <SearchInput currentSearch={currentSearch} />
          <div className='text-sm text-[var(--he-text-dim)]'>
            输入关键词搜索文章
          </div>
        </div>
      ) : (
        <div id='posts-wrapper'>
          <div className='mb-6 text-sm text-[var(--he-text-sub)]'>
            搜索 &ldquo;{currentSearch}&rdquo; 的结果
          </div>
          <BlogListScroll {...props} currentSearch={currentSearch} />
        </div>
      )}
    </div>
  )
}

/**
 * 归档页面
 */
const LayoutArchive = props => {
  const { archivePosts } = props
  return (
    <div>
      <div className='text-xl font-serif font-bold text-[var(--he-text)] mb-2'>
        归档
      </div>
      <div className='space-y-2'>
        {Object.keys(archivePosts).map(archiveTitle => (
          <BlogArchiveItem
            key={archiveTitle}
            posts={archivePosts[archiveTitle]}
            archiveTitle={archiveTitle}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * 文章详情
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const router = useRouter()

  useEffect(() => {
    if (!post) {
      const waiting404 = (siteConfig('POST_WAITING_TIME_FOR_404') || 3) * 1000
      setTimeout(() => {
        if (isBrowser) {
          const article = document.querySelector('#article-wrapper #notion-article')
          if (!article) {
            router.push('/404').then(() => {
              console.warn('找不到页面', router.asPath)
            })
          }
        }
      }, waiting404)
    }
  }, [post])

  return (
    <>
      <div className='he-card p-5 md:p-8'>
        {lock && <ArticleLock validPassword={validPassword} />}

        {!lock && post && (
          <>
            {/* 文章头部信息 */}
            <ArticleInfo post={post} siteInfo={props.siteInfo} />

            {/* Notion 文章内容 */}
            <article
              id='article-wrapper'
              itemScope
              itemType='https://schema.org/Article'
              className='he-article'>
              <section className='max-w-none'>
                <NotionPage post={post} />
              </section>

              {/* 分享 */}
              <ShareBar post={post} />

              {/* 文章页专属区域 */}
              {post?.type === 'Post' && (
                <>
                  {/* 推荐文章 */}
                  <ArticleRecommend recommendPosts={props.recommendPosts} />

                  {/* 上下篇文章 */}
                  <ArticleAround prev={props.prev} next={props.next} />
                </>
              )}
            </article>

            {/* 评论区 */}
            <div className='mt-8 pt-6 border-t border-[var(--he-border)]'>
              <Comment frontMatter={post} />
            </div>
          </>
        )}
      </div>
    </>
  )
}

/**
 * 404
 */
const Layout404 = props => {
  const { locale } = useGlobal()
  return (
    <div className='w-full text-center py-24'>
      <h2 className='text-6xl font-serif font-bold text-[var(--he-text)]'>404</h2>
      <p className='mt-4 text-[var(--he-text-sub)]'>
        {locale.COMMON?.NOT_FOUND || '页面未找到'}
      </p>
      <SmartLink
        href='/'
        className='inline-block mt-6 text-sm text-[var(--he-theme)] hover:underline'>
        返回首页
      </SmartLink>
    </div>
  )
}

/**
 * 分类列表
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  const { locale } = useGlobal()
  return (
    <div>
      <div className='text-xl font-serif font-bold text-[var(--he-text)] mb-6'>
        {locale.COMMON?.CATEGORY || '分类'}
      </div>
      <div className='flex flex-wrap gap-2'>
        {categoryOptions?.map(category => (
          <SmartLink
            key={category.name}
            href={`/category/${encodeURIComponent(category.name)}`}
            passHref
            className='he-card px-4 py-2 text-sm text-[var(--he-text-sub)] hover:text-[var(--he-theme)] hover:border-[var(--he-theme)] transition-colors'>
            {category.name} ({category.count})
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

/**
 * 标签列表
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  const { locale } = useGlobal()
  return (
    <div>
      <div className='text-xl font-serif font-bold text-[var(--he-text)] mb-6'>
        {locale.COMMON?.TAGS || '标签'}
      </div>
      <div className='flex flex-wrap gap-2'>
        {tagOptions?.map(tag => (
          <SmartLink
            key={tag.name}
            href={`/tag/${encodeURIComponent(tag.name)}`}
            passHref
            className='he-chip hover:!bg-[var(--he-theme)] hover:!text-white transition-colors'>
            {tag.name} ({tag.count})
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}
