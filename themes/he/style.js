/* eslint-disable react/no-unknown-property */
import { siteConfig } from '@/lib/config'
import CONFIG from './config'

/**
 * He 主题全局样式
 * 信息流基调，纸感暖白
 */
const Style = () => {
  const themeColor = siteConfig('HE_THEME_COLOR', '#6366f1', CONFIG)
  const bgBody = siteConfig('HE_BG_BODY', '#f6f5f1', CONFIG)

  return (
    <style jsx global>{`
      :root {
        --he-theme: ${themeColor};
        --he-theme-soft: color-mix(in srgb, ${themeColor} 12%, transparent);
        --he-theme-dim: color-mix(in srgb, ${themeColor} 60%, #888);
        --he-bg: ${bgBody};
        --he-card: #ffffff;
        --he-text: #1a1a1a;
        --he-text-sub: #5a5a5a;
        --he-text-dim: #aaaaaa;
        --he-border: #e8e6e1;
        --he-radius: 8px;
      }
      .dark {
        --he-bg: #0f0f0f;
        --he-card: #181818;
        --he-text: #e8e6e1;
        --he-text-sub: #999;
        --he-text-dim: #666;
        --he-border: #282828;
      }

      #theme-he body {
        background: var(--he-bg);
        color: var(--he-text);
        font-family: -apple-system, 'Noto Serif SC', 'Source Han Serif SC', 'Songti SC', serif;
        -webkit-font-smoothing: antialiased;
      }

      /* 选择高亮 */
      ::selection {
        background: color-mix(in srgb, var(--he-theme) 20%, transparent);
      }

      /* 滚动条 */
      ::-webkit-scrollbar { width: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: var(--he-theme-dim); border-radius: 2px; }
      * { scrollbar-width: thin; scrollbar-color: var(--he-theme-dim) transparent; }

      /* 链接下划线动画 */
      .he-link {
        text-decoration: none;
        background-image: linear-gradient(var(--he-theme), var(--he-theme));
        background-repeat: no-repeat;
        background-position: bottom center;
        background-size: 0 1px;
        transition: background-size .2s ease;
      }
      .he-link:hover {
        background-size: 100% 1px;
        color: var(--he-theme);
      }

      /* 卡片 */
      .he-card {
        background: var(--he-card);
        border-radius: var(--he-radius);
        border: 1px solid var(--he-border);
        transition: box-shadow .25s ease;
      }
      .he-card:hover {
        box-shadow: 0 2px 16px rgba(0,0,0,.04);
      }
      .dark .he-card:hover {
        box-shadow: 0 2px 16px rgba(0,0,0,.2);
      }

      /* 分类标签色块 */
      .he-chip {
        display: inline-block;
        font-size: 11px;
        padding: 2px 10px;
        border-radius: 4px;
        background: var(--he-theme-soft);
        color: var(--he-theme);
        font-weight: 500;
        letter-spacing: .02em;
        transition: background .2s;
      }
      .he-chip:hover {
        background: color-mix(in srgb, var(--he-theme) 20%, transparent);
      }

      /* 日期 tnum */
      .he-date {
        font-feature-settings: 'tnum' 1;
        font-size: 13px;
        color: var(--he-text-dim);
      }

      /* 文章正文排版 */
      .he-article h1 { font-size: 1.75rem; font-weight: 700; margin: 2rem 0 1rem; line-height: 1.3; }
      .he-article h2 { font-size: 1.5rem; font-weight: 600; margin: 1.75rem 0 .75rem; line-height: 1.35; }
      .he-article h3 { font-size: 1.25rem; font-weight: 600; margin: 1.5rem 0 .5rem; }
      .he-article p { line-height: 1.8; margin-bottom: 1rem; color: var(--he-text-sub); }
      .he-article blockquote {
        border-left: 3px solid var(--he-theme-soft);
        padding-left: 1rem;
        margin: 1.25rem 0;
        color: var(--he-text-sub);
        font-style: italic;
      }

      /* 文章封面渐变遮罩 */
      .he-cover-mask {
        background: linear-gradient(
          to bottom,
          rgba(0,0,0,.45) 0%,
          rgba(0,0,0,.15) 25%,
          rgba(0,0,0,.05) 50%,
          rgba(0,0,0,.25) 100%
        );
        pointer-events: none;
      }
      .dark .he-cover-mask {
        background: linear-gradient(
          to bottom,
          rgba(0,0,0,.6) 0%,
          rgba(0,0,0,.25) 25%,
          rgba(0,0,0,.08) 50%,
          rgba(0,0,0,.3) 100%
        );
      }

      /* 打字光标 */
      .he-typed-cursor {
        color: var(--he-theme);
        font-weight: 300;
        animation: heBlink .8s step-end infinite;
      }
      @keyframes heBlink {
        50% { opacity: 0; }
      }

      /* 脉冲箭头 */
      @keyframes heFloat {
        0%, 100% { opacity: .5; transform: translateY(0); }
        50% { opacity: 1; transform: translateY(4px); }
      }

      /* 文章列表项分割线 */
      .he-post-divider {
        border-bottom: 1px solid var(--he-border);
      }
      .he-post-divider:last-child {
        border-bottom: none;
      }

      /* 侧栏标题 */
      .he-sidebar-title {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: .1em;
        text-transform: uppercase;
        color: var(--he-text-dim);
        padding-bottom: 8px;
        border-bottom: 1px solid var(--he-border);
        margin-bottom: 14px;
      }

      /* 分页 */
      .he-page-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 6px;
        font-size: 14px;
        transition: all .2s;
        border: 1px solid var(--he-border);
        color: var(--he-text-sub);
        background: var(--he-card);
      }
      .he-page-btn:hover,
      .he-page-btn.active {
        border-color: var(--he-theme);
        background: var(--he-theme);
        color: white;
      }
    `}</style>
  )
}

export { Style }
