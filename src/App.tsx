import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Copyright,
  ExternalLink,
  Filter,
  Github,
  Globe2,
  Inbox,
  Link as LinkIcon,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import {
  CategoryKey,
  PlatformKey,
  articleCampaigns,
  categories,
  complianceRules,
  distributionChannels,
  platforms,
  tools,
} from "./data/catalog";

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryKey>("all");
  const [platform, setPlatform] = useState<PlatformKey>("all");
  const [selectedToolId, setSelectedToolId] = useState(tools[0].id);
  const [submitted, setSubmitted] = useState(false);

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesCategory = category === "all" || tool.category === category;
      const matchesPlatform = platform === "all" || tool.platforms.includes(platform);
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [tool.name, tool.summary, tool.useCase, ...tool.tags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesPlatform && matchesQuery;
    });
  }, [category, platform, query]);

  const selectedTool =
    filteredTools.find((tool) => tool.id === selectedToolId) ?? filteredTools[0] ?? tools[0];

  const stats = [
    { label: "工具样例", value: tools.length.toString() },
    { label: "合规来源", value: "4 类" },
    { label: "承接专题", value: articleCampaigns.length.toString() },
  ];

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
            <small>Tools Hub</small>
          </span>
        </a>
        <nav className="main-nav" aria-label="主导航">
          <a href="#catalog">工具库</a>
          <a href="#articles">文章承接</a>
          <a href="#submit">投稿审核</a>
          <a href="#compliance">合规</a>
        </nav>
        <a className="header-action" href="#submit">
          <Send size={16} />
          投稿
        </a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <ShieldCheck size={16} />
              软件工具号的合规承接站
            </p>
            <h1>把公众号里的工具清单，变成可搜索、可审核、可持续更新的网站。</h1>
            <p className="hero-lede">
              参考资源搜索站和论坛的分类、热词、投稿能力，但保留官方来源、授权说明、版权处理和外链审核。
            </p>
            <div className="hero-search" role="search">
              <Search size={20} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索 AI、剪辑、办公、开源工具..."
                aria-label="搜索工具"
              />
              <a href="#catalog">查看结果</a>
            </div>
            <div className="hero-stats" aria-label="站点数据">
              {stats.map((stat) => (
                <span key={stat.label}>
                  <strong>{stat.value}</strong>
                  {stat.label}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-visual" aria-label="工具站仪表盘预览">
            <div className="visual-topbar">
              <span />
              <span />
              <span />
              <strong>审核工作台</strong>
            </div>
            <div className="visual-grid">
              <div className="visual-panel visual-panel-dark">
                <span className="panel-label">今日热词</span>
                <b>AI 助手</b>
                <b>手机办公</b>
                <b>图片编辑</b>
              </div>
              <div className="visual-panel">
                <span className="panel-label">外链状态</span>
                <div className="meter"><i style={{ width: "78%" }} /></div>
                <small>7 个官方入口待复核</small>
              </div>
              <div className="visual-panel visual-panel-wide">
                <span className="panel-label">文章承接</span>
                <div className="mini-list">
                  <span>公众号合集</span>
                  <span>专题页</span>
                  <span>版权入口</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section band" id="catalog">
          <div className="section-heading">
            <p className="eyebrow">
              <Filter size={16} />
              资源目录
            </p>
            <h2>工具库 MVP</h2>
            <p>工具内容先以配置文件维护，后续可接后台、审核流和 SEO 独立页。</p>
          </div>

          <div className="filters" aria-label="工具筛选">
            <div className="segmented">
              {categories.map((item) => (
                <button
                  className={category === item.key ? "is-active" : ""}
                  key={item.key}
                  onClick={() => setCategory(item.key)}
                  type="button"
                >
                  <span>{item.label}</span>
                  <small>{item.countLabel}</small>
                </button>
              ))}
            </div>
            <label className="select-control">
              <SlidersHorizontal size={16} />
              <select
                value={platform}
                onChange={(event) => setPlatform(event.target.value as PlatformKey)}
                aria-label="按平台筛选"
              >
                {platforms.map((item) => (
                  <option value={item.key} key={item.key}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="catalog-layout">
            <div className="tool-grid">
              {filteredTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <article
                    className={`tool-card ${selectedTool.id === tool.id ? "is-selected" : ""}`}
                    key={tool.id}
                  >
                    <div className="tool-card-header">
                      <span className="tool-icon">
                        <Icon size={22} />
                      </span>
                      <span className="status">{tool.status}</span>
                    </div>
                    <h3>{tool.name}</h3>
                    <p>{tool.summary}</p>
                    <div className="tag-row">
                      {tool.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <button type="button" onClick={() => setSelectedToolId(tool.id)}>
                      查看审核信息
                      <ChevronRight size={16} />
                    </button>
                  </article>
                );
              })}
            </div>

            <aside className="detail-panel" aria-label="工具详情">
              <div className="detail-kicker">
                <Star size={17} />
                当前选中
              </div>
              <h3>{selectedTool.name}</h3>
              <p>{selectedTool.useCase}</p>
              <dl>
                <div>
                  <dt>授权</dt>
                  <dd>{selectedTool.license}</dd>
                </div>
                <div>
                  <dt>来源</dt>
                  <dd>{selectedTool.source}</dd>
                </div>
                <div>
                  <dt>平台</dt>
                  <dd>{selectedTool.platforms.join(" / ")}</dd>
                </div>
              </dl>
              <div className="compliance-note">
                <ShieldCheck size={18} />
                <span>{selectedTool.complianceNote}</span>
              </div>
              <a href={selectedTool.href} target="_blank" rel="noreferrer">
                打开官方来源
                <ExternalLink size={16} />
              </a>
            </aside>
          </div>
        </section>

        <section className="section" id="articles">
          <div className="section-heading">
            <p className="eyebrow">
              <LinkIcon size={16} />
              文章承接
            </p>
            <h2>公众号文章进站后的承接结构</h2>
            <p>每篇文章都可以对应一个专题页，站内负责更新、筛选、下架和跳转。</p>
          </div>
          <div className="campaign-grid">
            {articleCampaigns.map((campaign) => (
              <article className="campaign-card" key={campaign.title}>
                <span>{campaign.channel}</span>
                <h3>{campaign.title}</h3>
                <p>{campaign.description}</p>
                <div className="tag-row">
                  {campaign.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a href={campaign.sourceUrl}>
                  查看入口
                  <ArrowRight size={16} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="section two-column" id="submit">
          <div>
            <p className="eyebrow">
              <Inbox size={16} />
              投稿审核
            </p>
            <h2>把“发资源”改成“提交工具线索”。</h2>
            <p>
              表单只收集官网、作者页、开源仓库或应用商店链接。运营人员审核授权、描述、风险词和跳转地址后再上架。
            </p>
            <div className="channel-list">
              {distributionChannels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <article key={channel.name}>
                    <Icon size={20} />
                    <div>
                      <strong>{channel.name}</strong>
                      <span>{channel.role}</span>
                      <p>{channel.value}</p>
                      <small>{channel.risk}</small>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <form className="submit-form" onSubmit={handleSubmit}>
            <label>
              工具名称
              <input required placeholder="例如 LocalSend" />
            </label>
            <label>
              官方来源链接
              <input required type="url" placeholder="https://example.com" />
            </label>
            <label>
              来源类型
              <select defaultValue="官网">
                <option>官网</option>
                <option>GitHub</option>
                <option>应用商店</option>
                <option>作者投稿</option>
              </select>
            </label>
            <label>
              授权与风险说明
              <textarea placeholder="说明是否免费、开源、试用或商业授权。" rows={4} />
            </label>
            <label className="checkline">
              <input required type="checkbox" />
              <span>我确认该链接不包含破解、绕过会员、侵权文件或恶意软件。</span>
            </label>
            <button type="submit">
              <Send size={16} />
              提交审核
            </button>
            {submitted && (
              <p className="form-success">
                <CheckCircle2 size={16} />
                已记录前端提交状态；接入后端后可写入审核队列。
              </p>
            )}
          </form>
        </section>

        <section className="section compliance" id="compliance">
          <div className="section-heading">
            <p className="eyebrow">
              <Copyright size={16} />
              合规边界
            </p>
            <h2>让平台更容易放行的站点规则</h2>
            <p>默认展示正版权益、官方来源和下架流程，弱化“网盘资源”表达。</p>
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
        <span>仅做工具导航和教程索引，不托管第三方文件。</span>
        <a href="mailto:copyright@example.com">
          <Globe2 size={16} />
          版权与合作
        </a>
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          <Github size={16} />
          Git 仓库
        </a>
      </footer>
    </div>
  );
}

export default App;
