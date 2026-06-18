/**
 * He 主题 — 禾的资讯站
 * 信息流风格，暖白纸质感，衬线字体，自然呼吸感
 */

const CONFIG = {
  // --- 布局 ---
  HE_TITLE_SIZE: 'text-3xl md:text-5xl',
  HE_HERO_HEIGHT: 'h-[60vh] md:h-[70vh]',
  HE_SIDEBAR_VISIBLE: true,
  HE_SIDEBAR_WIDTH: 'w-72 lg:w-80',

  // --- 显示控制 ---
  HE_SHOW_CATEGORY_CHIP: true,
  HE_SHOW_TAG_CHIP: true,
  HE_SHOW_DATE: true,
  HE_SHOW_READING_TIME: false,

  HE_HERO_SHOW_COVER: true,
  HE_HERO_SHOW_GREETING: true,
  HE_HERO_SHOW_SCROLL_HINT: true,

  HE_FOOTER_SHOW_SINCE: true,
  HE_FOOTER_SHOW_POWERED: false,

  // --- 组件开关 ---
  HE_WIDGET_INFO_CARD: true,
  HE_WIDGET_CATEGORIES: true,
  HE_WIDGET_TAGS: true,
  HE_WIDGET_LATEST_POSTS: true,

  // --- 样式 ---
  HE_THEME_COLOR: '#6366f1',
  HE_ACCENT_COLOR: '#8b5cf6',
  HE_BG_BODY: '#f6f5f1',
  HE_BG_CARD: '#ffffff',
  HE_TEXT_PRIMARY: '#1a1a1a',
  HE_TEXT_SECONDARY: '#5a5a5a',
  HE_TEXT_MUTED: '#aaaaaa',
  HE_BORDER_LIGHT: '#e8e6e1',

  // --- 文章 ---
  HE_ARTICLE_ADJACENT: true,
  HE_ARTICLE_RECOMMEND: true,
  HE_ARTICLE_ROUTE_LOADING: false
}

export default CONFIG
