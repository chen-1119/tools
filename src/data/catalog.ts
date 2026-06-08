import {
  BadgeCheck,
  Bot,
  Boxes,
  Brush,
  Code2,
  FileArchive,
  FileText,
  FolderKanban,
  LucideIcon,
  MonitorSmartphone,
  Newspaper,
  PenTool,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TableProperties,
} from "lucide-react";

export type ArticleCategoryKey =
  | "all"
  | "ai"
  | "office"
  | "android"
  | "media"
  | "dev"
  | "templates";

export type DiskProvider =
  | "官网入口"
  | "夸克网盘"
  | "百度网盘"
  | "阿里云盘"
  | "123网盘"
  | "备用链接"
  | "待配置";

export type ResourceType =
  | "软件官网"
  | "网盘下载"
  | "备用链接"
  | "教程附件"
  | "素材模板"
  | "配置文件";

export type DiskResource = {
  id: number;
  title: string;
  provider: DiskProvider;
  type: ResourceType;
  size: string;
  status: "可领取" | "待补链" | "审核中";
  url?: string;
  code?: string;
  cta?: string;
  note: string;
};

export type SyncedArticle = {
  id: number;
  slug: string;
  title: string;
  category: Exclude<ArticleCategoryKey, "all">;
  source: "公众号同步" | "手动录入" | "草稿";
  publishDate: string;
  status: "已同步" | "待补资料" | "草稿";
  summary: string;
  tags: string[];
  readTime: string;
  wechatTitle: string;
  sections: string[];
  resources: DiskResource[];
  icon: LucideIcon;
};

export const articleCategories: Array<{
  key: ArticleCategoryKey;
  label: string;
  description: string;
}> = [
  { key: "all", label: "全部文章", description: "所有文章和软件链接" },
  { key: "ai", label: "AI 工具", description: "AI 软件、提示词和本地部署" },
  { key: "office", label: "办公效率", description: "效率软件、文档和协作工具" },
  { key: "android", label: "安卓工具", description: "安卓 App、手机工具和使用教程" },
  { key: "media", label: "剪辑设计", description: "剪辑、修图、封面和素材工具" },
  { key: "dev", label: "开发调试", description: "开发者软件、配置和调试工具" },
  { key: "templates", label: "模板资料", description: "软件配套模板、脚本和清单" },
];

export const syncedArticles: SyncedArticle[] = [
  {
    id: 1,
    slug: "ai-local-starter",
    title: "本地 AI 助手入门：电脑离线也能用的软件方案",
    category: "ai",
    source: "公众号同步",
    publishDate: "2026-06-08",
    status: "已同步",
    summary: "从安装准备、模型选择、常见报错到软件入口，把公众号文章同步成可检索的软件说明页。",
    tags: ["AI", "本地部署", "新手教程"],
    readTime: "6 分钟",
    wechatTitle: "电脑离线 AI 助手怎么搭？这套流程够新手用了",
    sections: ["软件介绍", "安装准备", "配置步骤", "软件链接"],
    resources: [
      {
        id: 101,
        title: "本地 AI 助手软件入口",
        provider: "官网入口",
        type: "软件官网",
        size: "在线入口",
        status: "可领取",
        url: "#sync",
        cta: "查看入口位",
        note: "示例入口：上线后替换为官方入口或你允许展示的软件介绍页。",
      },
      {
        id: 102,
        title: "本地 AI 助手网盘下载",
        provider: "夸克网盘",
        type: "网盘下载",
        size: "38 KB",
        status: "可领取",
        url: "#resources",
        code: "TH66",
        cta: "领取网盘",
        note: "示例链接位：可放自制检查清单、配置说明，不放未授权模型或破解包。",
      },
      {
        id: 103,
        title: "常见报错排查表",
        provider: "百度网盘",
        type: "教程附件",
        size: "62 KB",
        status: "可领取",
        url: "#resources",
        code: "AI08",
        cta: "查看附件",
        note: "示例附件位：作为文章附件领取，不替代软件授权。",
      },
    ],
    icon: Bot,
  },
  {
    id: 2,
    slug: "office-file-kit",
    title: "办公文件整理工具箱：文章说明 + 软件链接",
    category: "office",
    source: "公众号同步",
    publishDate: "2026-06-07",
    status: "已同步",
    summary: "把公众号里的办公效率文章拆成软件说明、使用场景、模板和链接位。",
    tags: ["办公", "文件整理", "模板"],
    readTime: "5 分钟",
    wechatTitle: "文件越存越乱？这套命名和归档方法直接照做",
    sections: ["软件用途", "文件夹结构", "同步习惯", "软件/模板链接"],
    resources: [
      {
        id: 201,
        title: "文件整理软件入口",
        provider: "官网入口",
        type: "软件官网",
        size: "在线入口",
        status: "可领取",
        url: "#sync",
        cta: "打开入口",
        note: "示例入口：可以填写官网、应用商店或你自己的介绍页。",
      },
      {
        id: 202,
        title: "文件命名模板表",
        provider: "阿里云盘",
        type: "素材模板",
        size: "24 KB",
        status: "可领取",
        url: "#resources",
        code: "OFFI",
        cta: "领取模板",
        note: "示例模板位：建议放 Excel/飞书表格导出版。",
      },
    ],
    icon: FolderKanban,
  },
  {
    id: 3,
    slug: "android-daily-tools",
    title: "安卓日用工具合集：截图、传输、清理和备份",
    category: "android",
    source: "公众号同步",
    publishDate: "2026-06-06",
    status: "待补资料",
    summary: "适合软件工具号常见的安卓工具文章，站内按用途分类，并给每个软件预留官网和网盘链接。",
    tags: ["安卓", "手机效率", "备份"],
    readTime: "7 分钟",
    wechatTitle: "安卓手机这几个日用工具，能省下很多重复操作",
    sections: ["工具列表", "使用场景", "注意事项", "软件链接"],
    resources: [
      {
        id: 301,
        title: "安卓工具合集网盘链接",
        provider: "夸克网盘",
        type: "网盘下载",
        size: "待复核",
        status: "审核中",
        note: "审核中：可放授权安装包或自制说明文档，安装包必须确认来源。",
      },
      {
        id: 302,
        title: "备用下载入口",
        provider: "备用链接",
        type: "备用链接",
        size: "待填写",
        status: "待补链",
        note: "主链接失效时使用，需同步审核。",
      },
    ],
    icon: Smartphone,
  },
  {
    id: 4,
    slug: "short-video-assets",
    title: "短视频封面和字幕工具：文章教程和软件下载位",
    category: "media",
    source: "公众号同步",
    publishDate: "2026-06-05",
    status: "已同步",
    summary: "文章讲清楚剪辑和封面流程，软件链接区放工具入口、网盘下载和模板包。",
    tags: ["短视频", "封面", "字幕"],
    readTime: "5 分钟",
    wechatTitle: "做工具号视频，这套封面和字幕流程可以直接复用",
    sections: ["工具介绍", "封面尺寸", "字幕规范", "软件和模板链接"],
    resources: [
      {
        id: 401,
        title: "封面模板网盘包",
        provider: "123网盘",
        type: "素材模板",
        size: "1.8 MB",
        status: "可领取",
        url: "#resources",
        code: "VIDE",
        cta: "领取模板",
        note: "示例模板位：只放自制模板，不放第三方素材包。",
      },
      {
        id: 402,
        title: "剪辑工具入口",
        provider: "官网入口",
        type: "软件官网",
        size: "在线入口",
        status: "可领取",
        url: "#sync",
        cta: "打开入口",
        note: "示例入口：可以放官方入口或站内软件介绍页。",
      },
    ],
    icon: Brush,
  },
  {
    id: 5,
    slug: "developer-portable-workflow",
    title: "开发者随身工具包：接口、数据库和软件链接管理",
    category: "dev",
    source: "手动录入",
    publishDate: "2026-06-04",
    status: "草稿",
    summary: "给技术读者准备的文章模板，适合后续同步到公众号再回流到网站。",
    tags: ["开发者", "接口调试", "配置"],
    readTime: "8 分钟",
    wechatTitle: "开发者常用工具怎么整理？先把配置和文档管起来",
    sections: ["工具列表", "接口集合", "数据库备份", "软件链接"],
    resources: [
      {
        id: 501,
        title: "开发调试软件入口",
        provider: "官网入口",
        type: "软件官网",
        size: "在线入口",
        status: "可领取",
        url: "#sync",
        cta: "打开入口",
        note: "示例入口：适合放官网、开源仓库或站内介绍页。",
      },
      {
        id: 502,
        title: "接口调试记录模板",
        provider: "夸克网盘",
        type: "配置文件",
        size: "32 KB",
        status: "可领取",
        url: "#resources",
        code: "DEV8",
        cta: "领取配置",
        note: "示例配置位：接入后台后由管理员替换为真实网盘地址。",
      },
    ],
    icon: Code2,
  },
  {
    id: 6,
    slug: "wechat-template-library",
    title: "软件工具号文章模板库：标题、结构和链接卡片",
    category: "templates",
    source: "公众号同步",
    publishDate: "2026-06-03",
    status: "已同步",
    summary: "用于承接公众号文章的模板库，包含标题结构、正文模块、软件链接卡片和分类规范。",
    tags: ["公众号", "模板", "选题"],
    readTime: "4 分钟",
    wechatTitle: "软件工具号文章不会写？先套这 4 个结构",
    sections: ["标题模板", "正文结构", "链接卡片", "分类规则"],
    resources: [
      {
        id: 601,
        title: "工具号文章结构模板网盘",
        provider: "夸克网盘",
        type: "素材模板",
        size: "46 KB",
        status: "可领取",
        url: "#resources",
        code: "WCTA",
        cta: "领取模板",
        note: "示例模板位：上传自制 Word/Markdown 模板后填写链接。",
      },
    ],
    icon: Newspaper,
  },
];

export const resourceTypes: Array<{ type: ResourceType | "全部"; label: string }> = [
  { type: "全部", label: "全部链接" },
  { type: "软件官网", label: "软件官网" },
  { type: "网盘下载", label: "网盘下载" },
  { type: "备用链接", label: "备用链接" },
  { type: "教程附件", label: "教程附件" },
  { type: "素材模板", label: "素材模板" },
  { type: "配置文件", label: "配置文件" },
];

export const syncPipeline = [
  {
    title: "抓取公众号文章",
    text: "录入公众号标题、原文链接、发布时间和摘要，生成站内文章草稿。",
    icon: FileText,
  },
  {
    title: "选择文章分类",
    text: "按 AI、办公、安卓、剪辑设计、开发调试、模板资料等栏目归档。",
    icon: TableProperties,
  },
  {
    title: "绑定软件链接",
    text: "给文章挂软件官网、网盘下载、备用链接和教程附件，支持提取码、状态和备注。",
    icon: FileArchive,
  },
  {
    title: "审核后发布",
    text: "检查版权、链接有效性和软件来源，再把文章展示给读者。",
    icon: BadgeCheck,
  },
];

export const complianceRules = [
  {
    title: "只挂合规软件链接",
    text: "软件链接可以包含官网、网盘和备用入口，但安装包必须来自自有、授权或允许分发的来源。",
    icon: ShieldCheck,
  },
  {
    title: "文章与链接分开审核",
    text: "公众号正文可以先同步为草稿，软件链接和网盘链接经过来源、版权和安全检查后再显示。",
    icon: BadgeCheck,
  },
  {
    title: "保留下架入口",
    text: "如果权利人反馈或链接异常，站内能快速隐藏软件链接按钮并保留文章主体。",
    icon: PenTool,
  },
];

export const dashboardMetrics = [
  { label: "同步文章", value: syncedArticles.length.toString() },
  {
    label: "文章分类",
    value: (articleCategories.length - 1).toString(),
  },
  {
    label: "软件链接",
    value: syncedArticles.reduce((total, article) => total + article.resources.length, 0).toString(),
  },
];
