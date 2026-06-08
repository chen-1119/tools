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

export type DiskProvider = "夸克网盘" | "百度网盘" | "阿里云盘" | "123网盘" | "待配置";

export type ResourceType = "安装包" | "模板" | "教程附件" | "素材包" | "配置文件" | "清单";

export type DiskResource = {
  id: number;
  title: string;
  provider: DiskProvider;
  type: ResourceType;
  size: string;
  status: "可领取" | "待补链" | "审核中";
  url?: string;
  code?: string;
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
  { key: "all", label: "全部文章", description: "所有公众号同步内容" },
  { key: "ai", label: "AI 工具", description: "AI 软件、提示词和本地部署" },
  { key: "office", label: "办公效率", description: "效率软件、文档和协作" },
  { key: "android", label: "安卓工具", description: "手机工具、App 使用教程" },
  { key: "media", label: "剪辑设计", description: "图片、视频、封面和素材" },
  { key: "dev", label: "开发调试", description: "开发者软件和配置教程" },
  { key: "templates", label: "模板资料", description: "表格、文档、脚本和清单" },
];

export const syncedArticles: SyncedArticle[] = [
  {
    id: 1,
    slug: "ai-local-starter",
    title: "本地 AI 助手入门：电脑离线也能用的工作流",
    category: "ai",
    source: "公众号同步",
    publishDate: "2026-06-08",
    status: "已同步",
    summary: "从安装准备、模型选择、常见报错到使用场景，把公众号文章同步成可长期更新的站内教程。",
    tags: ["AI", "本地部署", "新手教程"],
    readTime: "6 分钟",
    wechatTitle: "电脑离线 AI 助手怎么搭？这套流程够新手用了",
    sections: ["准备环境", "配置步骤", "常见报错", "资料领取"],
    resources: [
      {
        id: 101,
        title: "本地 AI 部署检查清单",
        provider: "夸克网盘",
        type: "清单",
        size: "38 KB",
        status: "待补链",
        note: "上传你自己的清单文件后填写网盘链接。",
      },
      {
        id: 102,
        title: "常见报错排查表",
        provider: "百度网盘",
        type: "教程附件",
        size: "62 KB",
        status: "待补链",
        note: "仅适合放自制文档，不放模型文件或破解包。",
      },
    ],
    icon: Bot,
  },
  {
    id: 2,
    slug: "office-file-kit",
    title: "办公文件整理工具箱：命名、归档、同步一次讲清",
    category: "office",
    source: "公众号同步",
    publishDate: "2026-06-07",
    status: "已同步",
    summary: "把公众号里的办公效率文章拆成步骤、模板和网盘附件，适合读者收藏反复看。",
    tags: ["办公", "文件整理", "模板"],
    readTime: "5 分钟",
    wechatTitle: "文件越存越乱？这套命名和归档方法直接照做",
    sections: ["命名规则", "文件夹结构", "同步习惯", "模板下载"],
    resources: [
      {
        id: 201,
        title: "文件命名模板表",
        provider: "阿里云盘",
        type: "模板",
        size: "24 KB",
        status: "待补链",
        note: "建议放 Excel/飞书表格导出版。",
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
    summary: "适合软件工具号常见的安卓工具文章，站内按用途分类，并给每个资料位预留网盘链接。",
    tags: ["安卓", "手机效率", "备份"],
    readTime: "7 分钟",
    wechatTitle: "安卓手机这几个日用工具，能省下很多重复操作",
    sections: ["截图标注", "跨设备传输", "文件清理", "资料领取"],
    resources: [
      {
        id: 301,
        title: "安卓工具使用说明 PDF",
        provider: "夸克网盘",
        type: "教程附件",
        size: "待上传",
        status: "审核中",
        note: "只放使用说明，安装包需确认来源和授权。",
      },
    ],
    icon: Smartphone,
  },
  {
    id: 4,
    slug: "short-video-assets",
    title: "短视频封面和字幕工作流：从模板到发布检查",
    category: "media",
    source: "公众号同步",
    publishDate: "2026-06-05",
    status: "已同步",
    summary: "把封面尺寸、字幕规范、发布检查做成站内文章，并附带可领取的自制模板。",
    tags: ["短视频", "封面", "字幕"],
    readTime: "5 分钟",
    wechatTitle: "做工具号视频，这套封面和字幕流程可以直接复用",
    sections: ["封面尺寸", "字幕规范", "发布检查", "模板领取"],
    resources: [
      {
        id: 401,
        title: "短视频封面尺寸模板",
        provider: "123网盘",
        type: "素材包",
        size: "1.8 MB",
        status: "待补链",
        note: "只放自制模板，不放第三方素材包。",
      },
    ],
    icon: Brush,
  },
  {
    id: 5,
    slug: "developer-portable-workflow",
    title: "开发者随身工具包：接口、数据库和配置文件管理",
    category: "dev",
    source: "手动录入",
    publishDate: "2026-06-04",
    status: "草稿",
    summary: "给技术读者准备的文章模板，适合后续同步到公众号再回流到网站。",
    tags: ["开发者", "接口调试", "配置"],
    readTime: "8 分钟",
    wechatTitle: "开发者常用工具怎么整理？先把配置和文档管起来",
    sections: ["接口集合", "数据库备份", "配置管理", "附件资料"],
    resources: [
      {
        id: 501,
        title: "接口调试记录模板",
        provider: "待配置",
        type: "配置文件",
        size: "待上传",
        status: "待补链",
        note: "接入后台后由管理员填写网盘地址。",
      },
    ],
    icon: Code2,
  },
  {
    id: 6,
    slug: "wechat-template-library",
    title: "软件工具号文章模板库：标题、结构和资料卡片",
    category: "templates",
    source: "公众号同步",
    publishDate: "2026-06-03",
    status: "已同步",
    summary: "用于承接公众号文章的模板库，包含标题结构、正文模块、资料领取卡片和分类规范。",
    tags: ["公众号", "模板", "选题"],
    readTime: "4 分钟",
    wechatTitle: "软件工具号文章不会写？先套这 4 个结构",
    sections: ["标题模板", "正文结构", "资料卡片", "分类规则"],
    resources: [
      {
        id: 601,
        title: "工具号文章结构模板",
        provider: "夸克网盘",
        type: "模板",
        size: "46 KB",
        status: "待补链",
        note: "上传自制 Word/Markdown 模板后填写链接。",
      },
    ],
    icon: Newspaper,
  },
];

export const resourceTypes: Array<{ type: ResourceType | "全部"; label: string }> = [
  { type: "全部", label: "全部资料" },
  { type: "安装包", label: "安装包" },
  { type: "模板", label: "模板" },
  { type: "教程附件", label: "教程附件" },
  { type: "素材包", label: "素材包" },
  { type: "配置文件", label: "配置文件" },
  { type: "清单", label: "清单" },
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
    title: "绑定网盘资料",
    text: "给文章挂自有或授权资料链接，支持提取码、大小、状态和备注。",
    icon: FileArchive,
  },
  {
    title: "审核后发布",
    text: "检查版权、链接有效性和资料来源，再把文章展示给读者。",
    icon: BadgeCheck,
  },
];

export const complianceRules = [
  {
    title: "只挂自有或授权资料",
    text: "网盘位可以存在，但必须用于自制模板、教程附件、授权安装包或公开允许分发的资料。",
    icon: ShieldCheck,
  },
  {
    title: "文章与资料分开审核",
    text: "公众号正文可以先同步为草稿，网盘链接必须经过来源、版权和安全检查后再显示。",
    icon: BadgeCheck,
  },
  {
    title: "保留下架入口",
    text: "如果权利人反馈或链接异常，站内能快速隐藏资料按钮并保留文章主体。",
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
    label: "资料位",
    value: syncedArticles.reduce((total, article) => total + article.resources.length, 0).toString(),
  },
];
