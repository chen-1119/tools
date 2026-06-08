import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Copyright,
  ExternalLink,
  FileArchive,
  Filter,
  Inbox,
  Link as LinkIcon,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import {
  ArticleCategoryKey,
  ResourceType,
  articleCategories,
  complianceRules,
  dashboardMetrics,
  resourceTypes,
  syncPipeline,
  syncedArticles,
} from "./data/catalog";

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ArticleCategoryKey>("all");
  const [resourceType, setResourceType] = useState<ResourceType | "全部">("全部");
  const [selectedArticleId, setSelectedArticleId] = useState(syncedArticles[0].id);
  const [submitted, setSubmitted] = useState(false);

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="app">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="工具雷达首页">
          <span className="brand-mark">TH</span>
          <span>
            <strong>工具雷达</strong>
            <small>Wechat Sync</small>
          </span>
        </a>
        <nav className="main-nav" aria-label="主导航">
          <a href="#articles">文章库</a>
          <a href="#categories">分类</a>
          <a href="#resources">网盘资料</a>
          <a href="#sync">同步录入</a>
        </nav>
        <a className="header-action" href="#sync">
          <Send size={16} />
          同步文章
        </a>
      </header>

      <main id="top">
        <section className="hero sync-hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <ClipboardList size={16} />
              公众号文章同步到网站
            </p>
            <h1>把公众号文章沉淀成网站文章库，资料链接跟着文章走。</h1>
            <p className="hero-lede">
              每篇公众号文章同步到站内后，可以按栏目分类、展示摘要、挂载网盘资料、标记审核状态，读者不用翻历史消息。
            </p>
            <div className="hero-search" role="search">
              <Search size={20} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索公众号文章、栏目、标签、网盘资料..."
                aria-label="搜索公众号文章"
              />
              <a href="#articles">查看文章</a>
            </div>
            <div className="hero-stats" aria-label="同步数据">
              {dashboardMetrics.map((metric) => (
                <span key={metric.label}>
                  <strong>{metric.value}</strong>
                  {metric.label}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-visual sync-console" aria-label="公众号同步工作台">
            <div className="visual-topbar">
              <span />
              <span />
              <span />
              <strong>同步工作台</strong>
            </div>
            <div className="sync-console-body">
              <div className="sync-card dark">
                <span className="panel-label">今日同步</span>
                <b>公众号文章</b>
                <strong>6 篇</strong>
              </div>
              <div className="sync-card">
                <span className="panel-label">资料状态</span>
                <div className="meter"><i style={{ width: "63%" }} /></div>
                <small>4 个资料位待补网盘链接</small>
              </div>
              <div className="sync-card wide">
                <span className="panel-label">同步流程</span>
                <div className="mini-list">
                  <span>文章</span>
                  <span>分类</span>
                  <span>网盘</span>
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
            <h2>按公众号文章来管理内容和网盘资料</h2>
            <p>文章是主线，网盘资料是附属内容。用户先看文章，再按需领取资料。</p>
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
                aria-label="按资料类型筛选"
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
                    <p>{article.summary}</p>
                    <div className="tag-row">
                      {article.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <button type="button" onClick={() => setSelectedArticleId(article.id)}>
                      查看文章和资料
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
                  <dt>公众号标题</dt>
                  <dd>{selectedArticle.wechatTitle}</dd>
                </div>
                <div>
                  <dt>阅读时间</dt>
                  <dd>{selectedArticle.readTime}</dd>
                </div>
                <div>
                  <dt>资料数量</dt>
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
                  网盘资料
                </strong>
                {selectedArticle.resources.map((resource) => (
                  <article key={resource.id}>
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
                      <a href={resource.url} target="_blank" rel="noreferrer">
                        打开
                        <ExternalLink size={14} />
                      </a>
                    ) : (
                      <button type="button" disabled>
                        待补链
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
            <h2>先把栏目分清楚，文章同步才不会乱。</h2>
            <p>这些分类就是网站导航，也可以对应公众号菜单、自动回复关键词和资料领取入口。</p>
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

        <section className="section rewrite-section" id="sync">
          <div className="section-heading">
            <p className="eyebrow">
              <Send size={16} />
              同步录入
            </p>
            <h2>公众号文章和网盘资料一起录。</h2>
            <p>先录文章，再挂资料。链接可以后补，避免文章发布被资料审核卡住。</p>
          </div>

          <div className="sync-layout">
            <form className="submit-form" onSubmit={handleSubmit}>
              <label>
                公众号文章标题
                <input required placeholder="例如：安卓手机这几个日用工具..." />
              </label>
              <label>
                公众号原文链接
                <input placeholder="可选，填 mp.weixin.qq.com 原文链接" />
              </label>
              <label>
                文章分类
                <select defaultValue="ai">
                  {articleCategories.slice(1).map((item) => (
                    <option value={item.key} key={item.key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                网盘资料链接
                <input placeholder="可后补：夸克/百度/阿里云盘/123网盘链接" />
              </label>
              <label>
                提取码或备注
                <textarea placeholder="说明资料类型、授权来源、是否自制。" rows={4} />
              </label>
              <label className="checkline">
                <input required type="checkbox" />
                <span>我确认资料为自有、授权或允许分发内容，不包含破解、侵权或未知来源安装包。</span>
              </label>
              <button type="submit">
                <Send size={16} />
                保存同步草稿
              </button>
              {submitted && (
                <p className="form-success">
                  <CheckCircle2 size={16} />
                  已记录前端草稿状态；接入后台后可写入文章同步队列。
                </p>
              )}
            </form>

            <div className="workflow-strip sync-steps" aria-label="同步流程">
              {syncPipeline.map((stage) => {
                const Icon = stage.icon;
                return (
                  <article key={stage.title}>
                    <Icon size={22} />
                    <h3>{stage.title}</h3>
                    <p>{stage.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section compliance" id="compliance">
          <div className="section-heading">
            <p className="eyebrow">
              <Copyright size={16} />
              网盘链接边界
            </p>
            <h2>可以挂网盘，但要让资料跟文章和审核流程绑定。</h2>
            <p>这样网站不是单纯发资源，而是文章承接、资料领取和分类检索的完整系统。</p>
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
        <span>公众号文章同步、分类检索、网盘资料领取。</span>
        <a href="#sync">
          <Send size={16} />
          同步文章
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
