import { useRouter } from 'next/router'
import { useImperativeHandle, useRef, useState } from 'react'
import { useGlobal } from '@/lib/global'

let lock = false

/**
 * He 搜索输入框
 * 简洁、无图标库依赖
 */
const SearchInput = ({ currentSearch, cRef, className }) => {
  const [onLoading, setLoadingState] = useState(false)
  const router = useRouter()
  const searchInputRef = useRef()
  const { locale } = useGlobal()

  useImperativeHandle(cRef, () => ({
    focus: () => searchInputRef?.current?.focus()
  }))

  const handleSearch = () => {
    const key = searchInputRef.current?.value?.trim()
    if (key) {
      setLoadingState(true)
      router.push({ pathname: '/search/' + key }).then(() => setLoadingState(false))
    }
  }

  const handleKeyUp = e => {
    if (e.keyCode === 13) handleSearch()
    else if (e.keyCode === 27) cleanSearch()
  }

  const cleanSearch = () => {
    if (searchInputRef.current) searchInputRef.current.value = ''
  }

  const [showClean, setShowClean] = useState(false)
  const updateSearchKey = val => {
    if (lock) return
    if (searchInputRef.current) searchInputRef.current.value = val
    setShowClean(!!val)
  }

  const lockSearchInput = () => { lock = true }
  const unLockSearchInput = () => { lock = false }

  return (
    <div className={'flex w-full rounded-lg ' + (className || '')}>
      <input
        ref={searchInputRef}
        type='text'
        className='outline-none w-full text-sm pl-4 pr-10 py-2 rounded-lg border border-[var(--he-border)] bg-[var(--he-bg)] text-[var(--he-text)] placeholder-[var(--he-text-dim)] focus:border-[var(--he-theme)] transition-colors'
        onKeyUp={handleKeyUp}
        onCompositionStart={lockSearchInput}
        onCompositionUpdate={lockSearchInput}
        onCompositionEnd={unLockSearchInput}
        placeholder={locale.SEARCH?.ARTICLES || '搜索文章...'}
        onChange={e => updateSearchKey(e.target.value)}
        defaultValue={currentSearch || ''}
      />
      <button
        onClick={handleSearch}
        className='-ml-9 flex items-center justify-center text-[var(--he-text-dim)] hover:text-[var(--he-theme)] transition-colors'
        aria-label='搜索'>
        {onLoading ? (
          <span className='inline-block w-4 h-4 border-2 border-[var(--he-theme)] border-t-transparent rounded-full animate-spin' />
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6.5" cy="6.5" r="4.5" />
            <path d="M10.5 10.5 L14 14" />
          </svg>
        )}
      </button>
      {showClean && (
        <button
          onClick={cleanSearch}
          className='-ml-7 flex items-center justify-center text-[var(--he-text-dim)] hover:text-[var(--he-text)] transition-colors'
          aria-label='清除'>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M3 3 L11 11 M11 3 L3 11" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default SearchInput
