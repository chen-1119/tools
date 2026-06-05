import {
  BadgeCheck,
  BookOpen,
  Bot,
  Code2,
  DatabaseZap,
  FileText,
  Image,
  KeyRound,
  LucideIcon,
  MailCheck,
  MonitorSmartphone,
  PenTool,
  Search,
  ShieldCheck,
  Sparkles,
  Video,
} from "lucide-react";

export type CategoryKey =
  | "all"
  | "ai"
  | "office"
  | "media"
  | "dev"
  | "security"
  | "mobile";

export type PlatformKey = "all" | "windows" | "android" | "web" | "macos" | "linux";

export type LicenseType = "官方免费" | "开源" | "试用" | "商业授权" | "教程资源";

export type ToolItem = {
  id: number;
  name: string;
  category: Exclude<CategoryKey, "all">;
  platforms: Exclude<PlatformKey, "all">[];
  license: LicenseType;
  source: "官网" | "GitHub" | "应用商店" | "作者投稿" | "教程";
  status: "已核验" | "待复核" | "精选";
  summary: string;
  useCase: string;
  tags: string[];
  href: string;
  complianceNote: string;
  icon: LucideIcon;
};

export const categories: Array<{ key: CategoryKey; label: string; countLabel: string }> = [
  { key: "all", label: "全部", countLabel: "全库" },
  { key: "ai", label: "AI 工具", countLabel: "智能生产" },
  { key: "office", label: "办公效率", countLabel: "日常刚需" },
  { key: "media", label: "影音创作", countLabel: "剪辑修图" },
  { key: "dev", label: "开发调试", countLabel: "技术栈" },
  { key: "security", label: "安全隐私", countLabel: "低风险" },
  { key: "mobile", label: "移动应用", countLabel: "安卓/iOS" },
];

export const platforms: Array<{ key: PlatformKey; label: string }> = [
  { key: "all", label: "全部平台" },
  { key: "windows", label: "Windows" },
  { key: "android", label: "Android" },
  { key: "web", label: "Web" },
  { key: "macos", label: "macOS" },
  { key: "linux", label: "Linux" },
];

export const tools: ToolItem[] = [
  {
    id: 1,
    name: "Anytype",
    category: "office",
    platforms: ["windows", "android", "macos", "linux"],
    license: "官方免费",
    source: "官网",
    status: "精选",
    summary: "本地优先的笔记、任务和知识库工具，适合做个人资料库。",
    useCase: "公众号文章可写成“离线笔记工具合集”的主推工具。",
    tags: ["笔记", "知识库", "离线优先"],
    href: "https://anytype.io/",
    complianceNote: "仅指向官网，不提供安装包镜像。",
    icon: BookOpen,
  },
  {
    id: 2,
    name: "Collabora Office",
    category: "office",
    platforms: ["android", "web", "linux"],
    license: "开源",
    source: "官网",
    status: "已核验",
    summary: "基于 LibreOffice 的移动办公套件，可处理文档、表格和演示。",
    useCase: "适合放在“手机办公套件”专题，强调官方渠道和开源背景。",
    tags: ["文档", "表格", "开源"],
    href: "https://www.collaboraoffice.com/",
    complianceNote: "展示官方产品页和授权说明。",
    icon: FileText,
  },
  {
    id: 3,
    name: "Keyguard",
    category: "security",
    platforms: ["android", "web"],
    license: "开源",
    source: "GitHub",
    status: "已核验",
    summary: "面向 Bitwarden 生态的密码管理客户端，强调安全和自托管。",
    useCase: "适合做“密码管理入门”文章承接页。",
    tags: ["密码", "安全", "自托管"],
    href: "https://github.com/AChep/keyguard-app",
    complianceNote: "只展示开源仓库，不收集用户密码。",
    icon: KeyRound,
  },
  {
    id: 4,
    name: "CapCut Web",
    category: "media",
    platforms: ["web", "windows"],
    license: "官方免费",
    source: "官网",
    status: "待复核",
    summary: "在线视频剪辑和模板制作工具，适合新手快速出片。",
    useCase: "可以作为“短视频工具箱”中的官方入口。",
    tags: ["剪辑", "模板", "短视频"],
    href: "https://www.capcut.com/",
    complianceNote: "跳转官方站点，模板版权按平台规则使用。",
    icon: Video,
  },
  {
    id: 5,
    name: "Photopea",
    category: "media",
    platforms: ["web"],
    license: "官方免费",
    source: "官网",
    status: "精选",
    summary: "浏览器内图片编辑工具，适合替代轻量修图需求。",
    useCase: "适合公众号“免安装设计工具”专题。",
    tags: ["修图", "设计", "Web"],
    href: "https://www.photopea.com/",
    complianceNote: "只做官网导航，不搬运素材包。",
    icon: Image,
  },
  {
    id: 6,
    name: "Ollama",
    category: "ai",
    platforms: ["windows", "macos", "linux"],
    license: "官方免费",
    source: "官网",
    status: "精选",
    summary: "本地运行大模型的工具，适合搭配教程和模型管理文章。",
    useCase: "适合做“离线 AI 助手搭建”系列承接页。",
    tags: ["AI", "本地模型", "教程"],
    href: "https://ollama.com/",
    complianceNote: "模型许可需单独说明，默认不打包分发模型文件。",
    icon: Bot,
  },
  {
    id: 7,
    name: "LocalSend",
    category: "mobile",
    platforms: ["windows", "android", "macos", "linux"],
    license: "开源",
    source: "GitHub",
    status: "已核验",
    summary: "局域网跨设备文件传输工具，不依赖云端账号。",
    useCase: "适合“手机电脑互传工具”专题。",
    tags: ["传输", "跨平台", "开源"],
    href: "https://localsend.org/",
    complianceNote: "推荐官网和应用商店入口，避免镜像包。",
    icon: MonitorSmartphone,
  },
  {
    id: 8,
    name: "Bruno",
    category: "dev",
    platforms: ["windows", "macos", "linux"],
    license: "开源",
    source: "GitHub",
    status: "已核验",
    summary: "离线优先 API 调试客户端，集合请求、集合管理和团队协作。",
    useCase: "适合技术号“Postman 替代工具”专题。",
    tags: ["API", "调试", "开发者"],
    href: "https://www.usebruno.com/",
    complianceNote: "展示官方站与开源仓库，不提供破解授权。",
    icon: Code2,
  },
  {
    id: 9,
    name: "TablePlus",
    category: "dev",
    platforms: ["windows", "macos"],
    license: "试用",
    source: "官网",
    status: "待复核",
    summary: "数据库管理客户端，适合多数据库连接和快速查询。",
    useCase: "适合“数据库客户端横评”文章。",
    tags: ["数据库", "客户端", "效率"],
    href: "https://tableplus.com/",
    complianceNote: "标注商业授权，拒绝注册码和破解包。",
    icon: DatabaseZap,
  },
];

export const articleCampaigns = [
  {
    title: "公众号承接页：9 个官方免费效率工具",
    channel: "公众号文章",
    sourceUrl: "https://mp.weixin.qq.com/s/LcGCnB56930fLQr6vI3-Rw",
    description: "将文章内的工具清单拆成可搜索卡片，给读者一个更稳定的收藏入口。",
    tags: ["效率", "免费", "官方入口"],
  },
  {
    title: "短视频创作者工具箱",
    channel: "视频号/抖音",
    sourceUrl: "#submit",
    description: "剪辑、字幕、封面、素材授权和发布检查，一页完成跳转。",
    tags: ["剪辑", "封面", "发布"],
  },
  {
    title: "开发者离线工具专题",
    channel: "SEO 专题页",
    sourceUrl: "#catalog",
    description: "API 调试、本地模型、数据库和文档工具，聚焦官网与开源仓库。",
    tags: ["开发", "离线", "开源"],
  },
];

export const distributionChannels = [
  {
    name: "yunpan1.wang",
    role: "论坛观察",
    value: "板块、热帖和标签结构适合借鉴，不建议抓取或搬运用户资源。",
    risk: "资源版权、失效链接和账号风控风险高。",
    icon: Search,
  },
  {
    name: "kuake5.com",
    role: "论坛观察",
    value: "排行榜和分区对选题有参考价值，可转化成合规工具专题。",
    risk: "不要承诺网盘资源可用性，不托管或代传文件。",
    icon: Sparkles,
  },
  {
    name: "公众号文章",
    role: "主入口",
    value: "用文章种草，用站内页面承接搜索、收藏和后续更新。",
    risk: "文章标题避免破解、会员、去广告等高风险表达。",
    icon: MailCheck,
  },
  {
    name: "官网/开源仓库",
    role: "下载来源",
    value: "作为默认跳转来源，降低下载安全和版权风险。",
    risk: "需定期检查链接和授权说明。",
    icon: ShieldCheck,
  },
];

export const complianceRules = [
  {
    title: "不托管文件",
    text: "站内只做工具介绍、官网导航和教程索引，不保存安装包、影视、课程或破解资源。",
    icon: ShieldCheck,
  },
  {
    title: "外链审核",
    text: "投稿链接必须来自官网、应用商店、GitHub 或作者明确授权页面。",
    icon: BadgeCheck,
  },
  {
    title: "版权处理",
    text: "权利人可通过版权入口提交证明，审核后下架对应工具卡片或文章。",
    icon: PenTool,
  },
];
