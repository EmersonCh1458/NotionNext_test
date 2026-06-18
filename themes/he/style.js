/* eslint-disable react/no-unknown-property */
import { siteConfig } from '@/lib/config'
import CONFIG from './config'

/**
 * 主题客制化 CSS
 * 保持功能兼容，只改视觉效果
 */
const Style = () => {
  const themeColor = siteConfig('HEXO_THEME_COLOR', '#6366f1', CONFIG)

  return (
    <style jsx global>{`
      :root {
        --theme-color: ${themeColor};
        --theme-color-light: color-mix(in srgb, ${themeColor} 12%, transparent);
        --theme-color-muted: color-mix(in srgb, ${themeColor} 60%, #888);
        --bg-body: #f6f5f1;
        --bg-card: #ffffff;
        --text-primary: #1a1a1a;
        --text-secondary: #5a5a5a;
        --text-muted: #aaaaaa;
        --border-light: #e8e6e1;
      }
      .dark {
        --bg-body: #0f0f0f;
        --bg-card: #181818;
        --text-primary: #e8e6e1;
        --text-secondary: #999;
        --text-muted: #666;
        --border-light: #282828;
      }

      /* === 基础 === */
      #theme-he body {
        background-color: var(--bg-body);
        color: var(--text-primary);
      }
      .dark #theme-he body {
        background-color: var(--bg-body);
      }

      /* === 菜单下划线动画（保留） === */
      #theme-he .menu-link {
        text-decoration: none;
        background-image: linear-gradient(var(--theme-color), var(--theme-color));
        background-repeat: no-repeat;
        background-position: bottom center;
        background-size: 0 1.5px;
        transition: background-size 200ms ease;
      }
      #theme-he .menu-link:hover {
        background-size: 100% 1.5px;
        color: var(--theme-color);
      }

      /* === Hero Cover 渐变（强化，多一层） === */
      #theme-he .header-cover::before {
        content: '';
        position: absolute;
        top: 0; left: 0; width: 100%; height: 100%;
        background: linear-gradient(
          to bottom,
          rgba(0,0,0,.55) 0%,
          rgba(0,0,0,.25) 15%,
          rgba(0,0,0,.05) 35%,
          rgba(0,0,0,.15) 70%,
          rgba(0,0,0,.45) 100%
        );
        pointer-events: none;
      }

      /* === 选中/高亮颜色 === */
      ::selection {
        background: color-mix(in srgb, var(--theme-color) 25%, transparent);
      }

      /* === 滚动条（保留功能） === */
      ::-webkit-scrollbar { width: 4px; height: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background-color: var(--theme-color-muted); border-radius: 2px; }
      * { scrollbar-width: thin; scrollbar-color: var(--theme-color-muted) transparent; }

      /* === 文章卡片 hover === */
      #theme-he .blog-post-card {
        transition: transform .3s ease, box-shadow .4s ease;
      }
      #theme-he .blog-post-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(0,0,0,.06);
      }
      .dark #theme-he .blog-post-card:hover {
        box-shadow: 0 8px 30px rgba(0,0,0,.25);
      }

      /* === 卡片通用微调 === */
      #theme-he .card-item {
        background: var(--bg-card);
        border: 1px solid var(--border-light);
        border-radius: 8px;
        transition: border-color .2s, box-shadow .2s;
      }
      #theme-he .card-item:hover {
        border-color: var(--theme-color-muted);
      }

      /* === 卡片内部微细节：标签 & 分类用柔和背景 === */
      #theme-he .tag-mini {
        display: inline-block;
        font-size: 11px;
        padding: 2px 10px;
        border-radius: 4px;
        background: var(--theme-color-light);
        color: var(--theme-color);
        font-weight: 500;
        letter-spacing: .02em;
        transition: background .2s;
      }
      #theme-he .tag-mini:hover {
        background: color-mix(in srgb, var(--theme-color) 20%, transparent);
      }

      /* === 日期文本用 tabular-nums 对齐 === */
      #theme-he .date-tnum {
        font-feature-settings: 'tnum' 1;
        font-size: 13px;
        color: var(--text-muted);
      }

      /* === 打字效果光标颜色 === */
      #theme-he .typed-cursor {
        color: var(--theme-color);
        font-weight: 300;
        animation: blink .8s step-end infinite;
      }
      @keyframes blink {
        50% { opacity: 0; }
      }

      /* === 文章列表项之间的分隔 === */
      #theme-he .post-list-item {
        border-bottom: 1px solid var(--border-light);
      }
      #theme-he .post-list-item:last-child {
        border-bottom: none;
      }

      /* === 侧边栏标题装饰线 === */
      #theme-he .sidebar-title {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: .1em;
        text-transform: uppercase;
        color: var(--text-muted);
        padding-bottom: 8px;
        border-bottom: 1px solid var(--border-light);
        margin-bottom: 12px;
      }

      /* TagGroups / CategoryGroup 用柔和色块 */
      #theme-he .category-item:hover,
      #theme-he .tag-item:hover {
        color: var(--theme-color) !important;
      }

      /* 分页数字 */
      #theme-he .pagination-number a:hover,
      #theme-he .pagination-number .active {
        background: var(--theme-color) !important;
        color: white !important;
        border-color: var(--theme-color) !important;
      }

      /* 深色模式覆盖 */
      .dark #theme-he .header-cover::before {
        background: linear-gradient(
          to bottom,
          rgba(0,0,0,.7) 0%,
          rgba(0,0,0,.35) 15%,
          rgba(0,0,0,.1) 35%,
          rgba(0,0,0,.2) 70%,
          rgba(0,0,0,.5) 100%
        );
      }

      /* 保留原有的主题色覆盖，让按钮/链接等保持统一 */
      ${['bg-indigo-400','bg-indigo-500','bg-indigo-600','border-indigo-400','border-indigo-500','border-indigo-800','text-indigo-400','text-indigo-500','text-indigo-600','text-indigo-800'].map(cls => `
        #theme-he .${cls},
        #theme-he a[class*='${cls}'],
        #theme-he div[class*='${cls}'] {
          background-color: ${cls.includes('bg-') ? 'var(--theme-color) !important' : ''};
          color: ${cls.includes('text-') ? 'var(--theme-color) !important' : ''};
          border-color: ${cls.includes('border-') ? 'var(--theme-color) !important' : ''};
        }
      `).join('\n')}
    `}</style>
  )
}

export { Style }
