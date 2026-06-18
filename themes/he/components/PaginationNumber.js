import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'

/**
 * He 分页数字
 * 暖白纸感分页器，简洁数字
 */
const PaginationNumber = ({ page, totalPage }) => {
  const router = useRouter()
  const currentPage = +page
  const showNext = currentPage < totalPage

  const pagePrefix = router.asPath
    .split('?')[0]
    .replace(/\/page\/[1-9]\d*/, '')
    .replace(/\/$/, '')
    .replace('.html', '')

  const pages = generatePages(pagePrefix, currentPage, totalPage)

  return (
    <div className='mt-10 mb-5 flex justify-center items-center gap-2'>
      {/* 上一页 */}
      {currentPage > 1 && (
        <SmartLink
          href={{
            pathname: currentPage === 2 ? `${pagePrefix}/` : `${pagePrefix}/page/${currentPage - 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          rel='prev'
          className='he-page-btn'>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3 L4 7 L8 11" />
          </svg>
        </SmartLink>
      )}

      {pages}

      {/* 下一页 */}
      {showNext && (
        <SmartLink
          href={{
            pathname: `${pagePrefix}/page/${currentPage + 1}`,
            query: router.query.s ? { s: router.query.s } : {}
          }}
          rel='next'
          className='he-page-btn'>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3 L10 7 L6 11" />
          </svg>
        </SmartLink>
      )}
    </div>
  )
}

function getPageElement(page, currentPage, pagePrefix) {
  const selected = page === currentPage
  return (
    <SmartLink
      href={page === 1 ? `${pagePrefix}/` : `${pagePrefix}/page/${page}`}
      key={page}
      passHref
      className={`he-page-btn ${selected ? 'active' : ''}`}>
      {page}
    </SmartLink>
  )
}

function generatePages(pagePrefix, currentPage, totalPage) {
  const pages = []
  const groupCount = 7

  if (totalPage <= groupCount) {
    for (let i = 1; i <= totalPage; i++) {
      pages.push(getPageElement(i, currentPage, pagePrefix))
    }
  } else {
    pages.push(getPageElement(1, currentPage, pagePrefix))
    const dynamicGroupCount = groupCount - 2
    let startPage = currentPage - 2
    if (startPage <= 1) startPage = 2
    if (startPage + dynamicGroupCount > totalPage) startPage = totalPage - dynamicGroupCount

    if (startPage > 2) {
      pages.push(<span key={-1} className='text-[var(--he-text-dim)] px-1'>...</span>)
    }

    for (let i = 0; i < dynamicGroupCount; i++) {
      if (startPage + i < totalPage) {
        pages.push(getPageElement(startPage + i, currentPage, pagePrefix))
      }
    }

    if (startPage + dynamicGroupCount < totalPage) {
      pages.push(<span key={-2} className='text-[var(--he-text-dim)] px-1'>...</span>)
    }

    pages.push(getPageElement(totalPage, currentPage, pagePrefix))
  }
  return pages
}

export default PaginationNumber
