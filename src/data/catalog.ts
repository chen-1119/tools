import {
  BadgeCheck,
  BookOpen,
  Bot,
  ClipboardCheck,
  Code2,
  DatabaseZap,
  FileText,
  Image,
  KeyRound,
  Layers3,
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

export type LicenseType = "站内原创" | "授权投稿" | "教程说明" | "清单模板";

export type ToolItem = {
  id: number;
  slug: string;
  name: string;
  category: Exclude<CategoryKey, "all">;
  platforms: Exclude<PlatformKey, "all">[];
  license: LicenseType;
  source: "自有内容" | "用户投稿" | "编辑整理" | "教程模板";
  status: "已上架" | "待复核" | "主推";
  summary: string;
  useCase: string;
  tags: string[];
  bundle: string[];
  checklist: string[];
  complianceNote: string;
  icon: LucideIcon;
};

export const categories: Array<{ key: CategoryKey; label: string; countLabel: string }> = [
  { key: "all", label: "全部", countLabel: "内容库" },
  { key: "ai", label: "AI 方案", countLabel: "教程+清单" },
  { key: "office", label: "办公效率", countLabel: "模板包" },
  { key: "media", label: "创作工具", countLabel: "流程包" },
  { key: "dev", label: "开发调试", countLabel: "工作流" },
  { key: "security", label: "安全隐私", countLabel: "避坑指南" },
  { key: "mobile", label: "移动效率", countLabel: "手机场景" },
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
    slug: "local-ai-assistant",
    name: "本地 AI 助手搭建包",
    category: "ai",
    platforms: ["windows", "macos", "linux"],
    license: "站内原创",
    source: "编辑整理",
    status: "主推",
    summary: "用站内教程、配置清单和排错表，教用户搭建离线 AI 办公助手。",
    useCase: "适合公众号文章承接：读者进站后看步骤、配置项、常见问题和安全提醒。",
    tags: ["AI", "离线", "教程包"],
    bundle: ["入门文章", "配置检查表", "常见报错处理", "风险提示卡"],
    checklist: ["不提供模型文件", "不承诺第三方服务可用", "只讲本地部署流程"],
    complianceNote: "站内只提供教程和配置说明，不托管模型、安装包或第三方文件。",
    icon: Bot,
  },
  {
    id: 2,
    slug: "office-template-kit",
    name: "办公模板效率包",
    category: "office",
    platforms: ["windows", "android", "web", "macos"],
    license: "清单模板",
    source: "自有内容",
    status: "已上架",
    summary: "把日报、周报、会议纪要、项目复盘整理成可复制的站内模板。",
    useCase: "适合做“上班族效率工具箱”文章，站内负责模板更新和使用说明。",
    tags: ["模板", "文档", "效率"],
    bundle: ["日报模板", "会议纪要模板", "项目复盘模板", "快捷键清单"],
    checklist: ["模板文案自有", "不使用第三方品牌素材", "保留更新日期"],
    complianceNote: "所有模板均为站内原创文本，可直接作为公众号内容延伸。",
    icon: FileText,
  },
  {
    id: 3,
    slug: "safe-password-guide",
    name: "密码安全避坑指南",
    category: "security",
    platforms: ["android", "web", "windows", "macos"],
    license: "教程说明",
    source: "编辑整理",
    status: "已上架",
    summary: "围绕账号安全、密码习惯、二步验证和备份策略做站内科普。",
    useCase: "适合安全类公众号文章，避免推荐单一外部产品，强调方法论。",
    tags: ["密码", "安全", "账号保护"],
    bundle: ["账号风险自查", "二步验证说明", "备份策略", "反钓鱼提醒"],
    checklist: ["不收集用户账号", "不保存密码", "不引导下载未知客户端"],
    complianceNote: "内容只做安全教育，不触碰用户隐私和敏感凭据。",
    icon: KeyRound,
  },
  {
    id: 4,
    slug: "short-video-workflow",
    name: "短视频发布流程包",
    category: "media",
    platforms: ["web", "windows", "android"],
    license: "站内原创",
    source: "自有内容",
    status: "主推",
    summary: "封面、标题、脚本、字幕、发布检查全部做成站内流程卡。",
    useCase: "适合视频号、抖音、小红书软件工具号，用流程承接用户收藏。",
    tags: ["剪辑", "封面", "发布"],
    bundle: ["脚本模板", "标题公式", "封面检查表", "发布前核对"],
    checklist: ["素材来源自查", "不提供搬运素材包", "不承诺平台流量"],
    complianceNote: "站内只提供流程和模板，素材需用户自行确认授权。",
    icon: Video,
  },
  {
    id: 5,
    slug: "image-cleanup-playbook",
    name: "图片处理工作流",
    category: "media",
    platforms: ["web", "windows", "macos"],
    license: "教程说明",
    source: "编辑整理",
    status: "已上架",
    summary: "整理压缩、裁剪、批量命名、封面尺寸等常用图片处理步骤。",
    useCase: "适合做“自媒体图片处理流程”专题，用户收藏站内步骤即可复用。",
    tags: ["图片", "批量处理", "封面"],
    bundle: ["尺寸表", "命名规则", "压缩流程", "发布检查"],
    checklist: ["不内置第三方素材", "不上传用户图片", "只做流程说明"],
    complianceNote: "图片处理说明全部站内维护，不依赖外部工具链接。",
    icon: Image,
  },
  {
    id: 6,
    slug: "device-transfer-guide",
    name: "手机电脑互传指南",
    category: "mobile",
    platforms: ["windows", "android", "macos", "linux"],
    license: "教程说明",
    source: "自有内容",
    status: "待复核",
    summary: "围绕局域网、数据线、蓝牙和云同步写成场景化教程。",
    useCase: "适合承接“手机电脑互传怎么做”文章，站内给出场景判断和风险提醒。",
    tags: ["传输", "跨设备", "手机"],
    bundle: ["场景判断表", "传输方式对比", "隐私提醒", "故障排查"],
    checklist: ["不代传文件", "不提供网盘资源", "提醒用户备份重要文件"],
    complianceNote: "只提供操作方法，不托管或中转任何用户文件。",
    icon: MonitorSmartphone,
  },
  {
    id: 7,
    slug: "api-debug-workflow",
    name: "接口调试工作流",
    category: "dev",
    platforms: ["windows", "macos", "linux", "web"],
    license: "清单模板",
    source: "教程模板",
    status: "已上架",
    summary: "把请求调试、环境变量、接口文档、错误记录整理成开发者工作流。",
    useCase: "适合技术号专题，帮助读者建立稳定的接口调试习惯。",
    tags: ["API", "调试", "开发者"],
    bundle: ["请求记录模板", "错误排查表", "环境变量规范", "接口文档结构"],
    checklist: ["不收集接口密钥", "示例数据脱敏", "不连接用户系统"],
    complianceNote: "所有示例均为虚拟数据，避免泄露真实接口和密钥。",
    icon: Code2,
  },
  {
    id: 8,
    slug: "database-maintenance-board",
    name: "数据库维护看板",
    category: "dev",
    platforms: ["windows", "macos", "linux"],
    license: "清单模板",
    source: "自有内容",
    status: "待复核",
    summary: "提供备份、慢查询、权限、容量和变更记录的站内维护清单。",
    useCase: "适合“个人项目数据库怎么维护”文章，站内用看板化内容承接。",
    tags: ["数据库", "维护", "清单"],
    bundle: ["备份检查表", "权限巡检", "容量记录", "变更日志模板"],
    checklist: ["不连接真实数据库", "不保存连接串", "只提供运维清单"],
    complianceNote: "站内不接入用户数据库，避免数据安全风险。",
    icon: DatabaseZap,
  },
  {
    id: 9,
    slug: "article-rewrite-board",
    name: "工具号文章改写板",
    category: "office",
    platforms: ["web"],
    license: "站内原创",
    source: "自有内容",
    status: "主推",
    summary: "把选题、标题、正文结构、风险词替换做成文章生产看板。",
    useCase: "适合你自己的软件工具号，把外部资源表达改成站内教程表达。",
    tags: ["公众号", "选题", "风控"],
    bundle: ["标题库", "风险词替换表", "正文结构", "发布检查"],
    checklist: ["弱化资源下载", "强调教程和模板", "避免破解会员等词"],
    complianceNote: "帮助内容从资源分发转向自有教程和工具方法论。",
    icon: ClipboardCheck,
  },
];

export const articleCampaigns = [
  {
    title: "9 个场景化效率工具方案",
    channel: "公众号承接页",
    target: "#catalog",
    description: "不再跳转到别人的网站，用站内卡片承接教程、清单、模板和风险说明。",
    tags: ["效率", "模板", "站内内容"],
  },
  {
    title: "短视频创作者流程库",
    channel: "视频号承接页",
    target: "#submit",
    description: "剪辑、字幕、封面、标题和发布检查都变成自己的流程内容。",
    tags: ["剪辑", "封面", "发布"],
  },
  {
    title: "软件工具号风控表达库",
    channel: "运营专题页",
    target: "#compliance",
    description: "把“资源下载”改写成“教程、清单、模板、方法”，降低平台风险。",
    tags: ["风控", "改写", "运营"],
  },
];

export const distributionChannels = [
  {
    name: "公众号文章",
    role: "主入口",
    value: "文章负责种草和引流，站内页面负责持续更新、搜索、收藏和下架。",
    risk: "标题和正文避免破解、会员、去广告、搬运资源等高风险表达。",
    icon: MailCheck,
  },
  {
    name: "站内专题页",
    role: "内容资产",
    value: "每个专题只沉淀自己的教程、模板、检查表和案例，不依赖外部站点。",
    risk: "需要定期更新日期、适用平台和风险提示，避免内容过期。",
    icon: Layers3,
  },
  {
    name: "用户投稿",
    role: "线索来源",
    value: "投稿只作为选题线索，编辑审核后改写成站内教程或清单。",
    risk: "不直接展示投稿者给出的下载地址、网盘地址或未知安装包。",
    icon: Search,
  },
  {
    name: "短视频评论区",
    role: "需求收集",
    value: "把用户提问沉淀成 FAQ 和教程更新点，而不是回复外部下载链接。",
    risk: "评论区不要发敏感链接，统一引导到站内专题页。",
    icon: Sparkles,
  },
];

export const complianceRules = [
  {
    title: "站内自有内容",
    text: "默认展示教程、模板、流程和检查表，不把页面做成第三方网站链接集合。",
    icon: ShieldCheck,
  },
  {
    title: "投稿先审核",
    text: "用户提交的是选题线索，编辑审核后再改写成站内内容，不直接上架外部链接。",
    icon: BadgeCheck,
  },
  {
    title: "版权与下架",
    text: "如内容涉及权利人权益，可通过站内版权入口提交证明，审核后调整或下架。",
    icon: PenTool,
  },
];
