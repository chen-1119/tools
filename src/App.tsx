import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Copyright,
  Database,
  ExternalLink,
  FileArchive,
  Filter,
  Inbox,
  Link as LinkIcon,
  LogIn,
  LogOut,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  UserCircle,
} from "lucide-react";
import {
  ArticleCategoryKey,
  DiskResource,
  ResourceType,
  articleCategories,
  complianceRules,
  dashboardMetrics,
  resourceTypes,
  syncPipeline,
  syncedArticles,
} from "./data/catalog";

type AuthUser = {
  name: string;
  role: "管理员";
};

type SubmissionRecord = {
  id: string;
  title: string;
  sourceUrl: string;
  softwareName: string;
  category: string;
  resourceUrl: string;
  note: string;
  status: "待审核";
  submitter: string;
  submittedAt: string;
};

const AUTH_STORAGE_KEY = "tools-hub-auth-user";
const SUBMISSIONS_STORAGE_KEY = "tools-hub-submissions";
const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "tools123";

function readStoredJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function createRecordId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `record-${Date.now()}`;
}

function getLinkLabel(resource: DiskResource) {
  if (resource.cta) {
    return resource.cta;
  }

  if (resource.status !== "可领取") {
    return resource.status === "审核中" ? "审核中" : "待上线";
  }

  if (resource.type === "软件官网") {
    return "打开入口";
  }

  if (resource.type === "网盘下载") {
    return "领取网盘";
  }

  if (resource.type === "教程附件") {
    return "查看附件";
  }

  if (resource.type === "配置文件") {
    return "领取配置";
  }

  return "领取资料";
}

function getLinkTarget(url: string) {
  return url.startsWith("#") ? {} : { target: "_blank", rel: "noreferrer" };
}

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ArticleCategoryKey>("all");
  const [resourceType, setResourceType] = useState<ResourceType | "全部">("全部");
  const [selectedArticleId, setSelectedArticleId] = useState(syncedArticles[0].id);
  const [submitted, setSubmitted] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(() =>
    readStoredJson<AuthUser | null>(AUTH_STORAGE_KEY, null),
  );
  const [loginError, setLoginError] = useState("");
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>(() =>
    readStoredJson<SubmissionRecord[]>(SUBMISSIONS_STORAGE_KEY, []),
  );

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return syncedArticles.filter((article) => {
      const matchesCategory = category === "all" || article.category === category;
      const matchesResource =
        resourceType === "全部" || article.resources.some((item) => item.type === resourceType);
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          article.title,
          article.wechatTitle,
          article.summary,
          article.status,
          article.source,
          ...article.tags,
          ...article.sections,
          ...article.resources.map((resource) => `${resource.title} ${resource.provider}`),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesResource && matchesQuery;
    });
  }, [category, query, resourceType]);

  const selectedArticle =
    filteredArticles.find((article) => article.id === selectedArticleId) ??
    filteredArticles[0] ??
    syncedArticles[0];

  const categoryCounts = articleCategories.map((item) => ({
    ...item,
    count:
      item.key === "all"
        ? syncedArticles.length
        : syncedArticles.filter((article) => article.category === item.key).length,
  }));

  const softwareLinks = syncedArticles.flatMap((article) =>
    article.resources.map((resource) => ({
      ...resource,
      articleTitle: article.title,
      articleCategory: article.category,
    })),
  );

  function saveSubmissions(nextSubmissions: SubmissionRecord[]) {
    setSubmissions(nextSubmissions);
    window.localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(nextSubmissions));
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (username !== DEMO_USERNAME || password !== DEMO_PASSWORD) {
      setLoginError("账号或密码不正确。演示账号：admin，密码：tools123");
      return;
    }

    const nextUser: AuthUser = { name: "内容管理员", role: "管理员" };
    setAuthUser(nextUser);
    setLoginError("");
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextUser));
  }

  function handleLogout() {
    setAuthUser(null);
    setSubmitted(false);
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!authUser) {
      setLoginError("请先登录后再提交内容。");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const categoryKey = String(formData.get("category") ?? "ai") as ArticleCategoryKey;
    const categoryLabel =
      articleCategories.find((item) => item.key === categoryKey)?.label ?? "未分类";
    const nextRecord: SubmissionRecord = {
      id: createRecordId(),
      title: String(formData.get("title") ?? "").trim(),
      sourceUrl: String(formData.get("sourceUrl") ?? "").trim(),
      softwareName: String(formData.get("softwareName") ?? "").trim(),
      category: categoryLabel,
      resourceUrl: String(formData.get("resourceUrl") ?? "").trim(),
      note: String(formData.get("note") ?? "").trim(),
      status: "待审核",
      submitter: authUser.name,
      submittedAt: new Date().toLocaleString("zh-CN", { hour12: false }),
    };

    saveSubmissions([nextRecord, ...submissions]);
    form.reset();
    setSubmitted(true);
  }

  return (
    <div className="app">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="工具雷达首页">
          <span className="brand-mark">TH</span>
          <span>
            <strong>工具雷达</strong>
            <small>Tools Library</small>
          </span>
        </a>
        <nav className="main-nav" aria-label="主导航">
          <a href="#articles">内容库</a>
          <a href="#categories">分类</a>
          <a href="#resources">网盘链接</a>
          <a href="#sync">提交内容</a>
        </nav>
        {authUser ? (
          <button className="header-action user-action" onClick={handleLogout} type="button">
            <UserCircle size={16} />
            {authUser.name}
            <LogOut size={15} />
          </button>
        ) : (
          <a className="header-action" href="#sync">
            <LogIn size={16} />
            登录提交
          </a>
        )}
      </header>

      <main id="top">
        <section className="hero sync-hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <ClipboardList size={16} />
              软件文章 + 百度云 / 夸克网盘
            </p>
            <h1>把软件教程、文章和网盘链接，整理成一个可检索的工具站。</h1>
            <p className="hero-lede">
              网站负责沉淀软件介绍、教程、模板附件、百度云和夸克网盘链接；各平台只是内容来源，不再让某个平台卡住入口。
            </p>
            <div className="hero-search" role="search">
              <Search size={20} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索软件文章、工具名、栏目、百度云/夸克链接..."
                aria-label="搜索软件文章"
              />
              <a href="#articles">查看文章</a>
            </div>
            <div className="hero-stats" aria-label="站点数据">
              {dashboardMetrics.map((metric) => (
                <span key={metric.label}>
                  <strong>{metric.value}</strong>
                  {metric.label}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-visual sync-console" aria-label="内容管理工作台">
            <div className="visual-topbar">
              <span />
              <span />
              <span />
              <strong>内容工作台</strong>
            </div>
            <div className="sync-console-body">
              <div className="sync-card dark">
                <span className="panel-label">今日更新</span>
                <b>软件文章</b>
                <strong>6 篇</strong>
              </div>
              <div className="sync-card">
                <span className="panel-label">链接状态</span>
                <div className="meter"><i style={{ width: "63%" }} /></div>
                <small>软件官网、百度云、夸克网盘和备用入口可分开维护</small>
              </div>
              <div className="sync-card wide">
                <span className="panel-label">发布流程</span>
                <div className="mini-list">
                  <span>文章</span>
                  <span>分类</span>
                  <span>链接</span>
                  <span>审核</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section band" id="articles">
          <div className="section-heading">
            <p className="eyebrow">
              <Filter size={16} />
              文章库
            </p>
            <h2>按软件文章来管理教程、附件和网盘链接</h2>
            <p>文章和教程是内容主线，软件链接是行动入口。用户先看说明，再选择官网、百度云、夸克网盘或备用链接。</p>
          </div>

          <div className="filters" aria-label="文章筛选">
            <div className="segmented article-segments">
              {categoryCounts.map((item) => (
                <button
                  className={category === item.key ? "is-active" : ""}
                  key={item.key}
                  onClick={() => setCategory(item.key)}
                  type="button"
                >
                  <span>{item.label}</span>
                  <small>{item.count} 篇</small>
                </button>
              ))}
            </div>
            <label className="select-control">
              <SlidersHorizontal size={16} />
              <select
                value={resourceType}
                onChange={(event) => setResourceType(event.target.value as ResourceType | "全部")}
                aria-label="按链接类型筛选"
              >
                {resourceTypes.map((item) => (
                  <option value={item.type} key={item.type}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="article-layout">
            <div className="article-list">
              {filteredArticles.map((article) => {
                const Icon = article.icon;
                return (
                  <article
                    className={`article-card ${selectedArticle.id === article.id ? "is-selected" : ""}`}
                    key={article.id}
                  >
                    <div className="article-meta">
                      <span>{article.source}</span>
                      <span>{article.publishDate}</span>
                      <strong>{article.status}</strong>
                    </div>
                    <div className="article-title-row">
                      <span className="tool-icon">
                        <Icon size={22} />
                      </span>
                      <h3>{article.title}</h3>
                    </div>
                    <small className="wechat-line">来源标题：{article.wechatTitle}</small>
                    <p>{article.summary}</p>
                    <div className="article-quick-info" aria-label="文章信息">
                      <span>{article.readTime}</span>
                      <span>{article.resources.length} 个软件链接</span>
                    </div>
                    <div className="tag-row">
                      {article.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <button type="button" onClick={() => setSelectedArticleId(article.id)}>
                      查看文章和链接
                      <ArrowRight size={16} />
                    </button>
                  </article>
                );
              })}
            </div>

            <aside className="detail-panel article-detail" aria-label="文章详情">
              <div className="detail-kicker">
                <Star size={17} />
                当前文章
              </div>
              <h3>{selectedArticle.title}</h3>
              <p>{selectedArticle.summary}</p>
              <dl>
                <div>
                  <dt>来源标题</dt>
                  <dd>{selectedArticle.wechatTitle}</dd>
                </div>
                <div>
                  <dt>阅读时间</dt>
                  <dd>{selectedArticle.readTime}</dd>
                </div>
                <div>
                  <dt>链接数量</dt>
                  <dd>{selectedArticle.resources.length} 个</dd>
                </div>
              </dl>

              <div className="bundle-block">
                <strong>
                  <FileArchive size={17} />
                  文章结构
                </strong>
                <ul>
                  {selectedArticle.sections.map((section) => (
                    <li key={section}>{section}</li>
                  ))}
                </ul>
              </div>

              <div className="resource-stack" id="resources">
                <strong>
                  <LinkIcon size={17} />
                  软件链接
                </strong>
                {selectedArticle.resources.map((resource) => (
                  <article
                    className={`resource-item ${resource.status === "可领取" ? "is-ready" : "is-pending"}`}
                    key={resource.id}
                  >
                    <div>
                      <span>{resource.provider}</span>
                      <h4>{resource.title}</h4>
                      <p>
                        {resource.type} · {resource.size} · {resource.status}
                      </p>
                      {resource.code && <small>提取码：{resource.code}</small>}
                      <small>{resource.note}</small>
                    </div>
                    {resource.url ? (
                      <a href={resource.url} {...getLinkTarget(resource.url)}>
                        {getLinkLabel(resource)}
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <button type="button" disabled>
                        {getLinkLabel(resource)}
                      </button>
                    )}
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="section" id="categories">
          <div className="section-heading">
            <p className="eyebrow">
              <Inbox size={16} />
              分类运营
            </p>
            <h2>先把栏目分清楚，文章和网盘链接才不会乱。</h2>
            <p>这些分类就是网站导航，也可以对应搜索入口、站内专题、自动回复关键词和软件链接领取入口。</p>
          </div>

          <div className="category-grid">
            {categoryCounts.slice(1).map((item) => (
              <article key={item.key}>
                <span>{item.count} 篇</span>
                <h3>{item.label}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section software-section">
          <div className="section-heading">
            <p className="eyebrow">
              <LinkIcon size={16} />
              软件链接库
            </p>
            <h2>把分散在文章里的软件链接集中管理。</h2>
            <p>读者可以从文章进入，也可以直接按软件入口、百度云、夸克网盘、备用链接等类型查找。</p>
          </div>

          <div className="software-grid">
            {softwareLinks.map((link) => (
              <article
                className={`software-card ${link.status === "可领取" ? "is-ready" : "is-pending"}`}
                key={`${link.articleTitle}-${link.id}`}
              >
                <div className="article-meta">
                  <span>{link.provider}</span>
                  <span>{link.type}</span>
                  <strong>{link.status}</strong>
                </div>
                <h3>{link.title}</h3>
                <p>{link.articleTitle}</p>
                {link.code && <span className="link-code">提取码：{link.code}</span>}
                <small>{link.note}</small>
                {link.url ? (
                  <a href={link.url} {...getLinkTarget(link.url)}>
                    {getLinkLabel(link)}
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <button type="button" disabled>
                    {getLinkLabel(link)}
                  </button>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="section rewrite-section" id="sync">
          <div className="section-heading">
            <p className="eyebrow">
              <Send size={16} />
              内容录入
            </p>
            <h2>软件文章和网盘链接一起录。</h2>
            <p>先录文章或教程，再挂软件链接。官网、百度云、夸克网盘、备用链接可以后补，避免内容发布被链接审核卡住。</p>
          </div>

          <div className="sync-layout">
            {authUser ? (
              <form className="submit-form" onSubmit={handleSubmit}>
                <div className="form-user-row">
                  <span>
                    <UserCircle size={17} />
                    {authUser.name}
                  </span>
                  <button className="text-button" onClick={handleLogout} type="button">
                    退出登录
                  </button>
                </div>
                <label>
                  文章标题
                  <input name="title" required placeholder="例如：安卓手机这几个日用工具..." />
                </label>
                <label>
                  来源链接
                  <input name="sourceUrl" placeholder="可选，填论坛、博客、官网、社群文章等来源链接" />
                </label>
                <label>
                  软件名称
                  <input name="softwareName" required placeholder="例如：本地 AI 助手 / 安卓截图工具 / 剪辑工具" />
                </label>
                <label>
                  文章分类
                  <select defaultValue="ai" name="category">
                    {articleCategories.slice(1).map((item) => (
                      <option value={item.key} key={item.key}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  软件链接或网盘链接
                  <input name="resourceUrl" required placeholder="官网、夸克网盘、百度云、备用链接都可填" />
                </label>
                <label>
                  提取码或备注
                  <textarea
                    name="note"
                    placeholder="说明链接类型、软件版本、授权来源、提取码或备用说明。"
                    rows={4}
                  />
                </label>
                <label className="checkline">
                  <input required type="checkbox" />
                  <span>我确认软件链接来源清楚，不包含破解、侵权、绕过会员或未知来源安装包。</span>
                </label>
                <button type="submit">
                  <Send size={16} />
                  保存并记录
                </button>
                {submitted && (
                  <p className="form-success">
                    <CheckCircle2 size={16} />
                    已保存到本地提交记录，状态为待审核。
                  </p>
                )}
              </form>
            ) : (
              <form className="submit-form login-form" onSubmit={handleLogin}>
                <div className="login-lock">
                  <LogIn size={24} />
                  <div>
                    <h3>登录后提交内容</h3>
                    <p>当前是静态站点演示登录，记录会保存到本机浏览器。</p>
                  </div>
                </div>
                <label>
                  账号
                  <input autoComplete="username" name="username" placeholder="admin" required />
                </label>
                <label>
                  密码
                  <input autoComplete="current-password" name="password" placeholder="tools123" required type="password" />
                </label>
                <button type="submit">
                  <LogIn size={16} />
                  登录
                </button>
                <p className="demo-account">演示账号：admin / tools123</p>
                {loginError && <p className="form-error">{loginError}</p>}
              </form>
            )}

            <div className="submission-panel">
              <div className="submission-heading">
                <span>
                  <Database size={18} />
                  提交记录
                </span>
                <strong>{submissions.length} 条</strong>
              </div>
              {submissions.length > 0 ? (
                <div className="submission-list">
                  {submissions.map((record) => (
                    <article key={record.id}>
                      <div className="article-meta">
                        <span>{record.category}</span>
                        <span>{record.submittedAt}</span>
                        <strong>{record.status}</strong>
                      </div>
                      <h3>{record.title}</h3>
                      <p>{record.softwareName}</p>
                      <small>{record.resourceUrl}</small>
                      {record.note && <small>{record.note}</small>}
                      <span className="submitter">提交人：{record.submitter}</span>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-records">
                  <Database size={22} />
                  <p>暂无提交记录。登录后提交一条软件文章，会显示在这里。</p>
                </div>
              )}

              <div className="workflow-strip sync-steps compact" aria-label="发布流程">
                {syncPipeline.map((stage) => {
                  const Icon = stage.icon;
                  return (
                    <article key={stage.title}>
                      <Icon size={20} />
                      <h3>{stage.title}</h3>
                      <p>{stage.text}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="section compliance" id="compliance">
          <div className="section-heading">
            <p className="eyebrow">
              <Copyright size={16} />
              软件链接边界
            </p>
            <h2>可以放软件链接和网盘链接，但要跟文章和审核流程绑定。</h2>
            <p>这样网站不是单纯发资源，而是文章说明、软件入口、网盘下载和分类检索的完整系统。</p>
          </div>
          <div className="compliance-grid">
            {complianceRules.map((rule) => {
              const Icon = rule.icon;
              return (
                <article key={rule.title}>
                  <Icon size={22} />
                  <h3>{rule.title}</h3>
                  <p>{rule.text}</p>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>Tools Hub</span>
        <span>软件文章、分类检索、百度云/夸克网盘链接和下载入口。</span>
        <a href="#sync">
          <Send size={16} />
          提交内容
        </a>
        <a href="#compliance">
          <ShieldCheck size={16} />
          资料审核
        </a>
      </footer>
    </div>
  );
}

export default App;
