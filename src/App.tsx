import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Copyright,
  FileCheck2,
  Filter,
  Globe2,
  Inbox,
  Layers3,
  ListChecks,
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
  riskRules,
  tools,
  workflowStages,
} from "./data/catalog";

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryKey>("all");
  const [platform, setPlatform] = useState<PlatformKey>("all");
  const [selectedToolId, setSelectedToolId] = useState(tools[0].id);
  const [submitted, setSubmitted] = useState(false);
  const [draftCopy, setDraftCopy] = useState(
    "分享一个办公软件永久版下载地址，网盘里有绿色版，适合想去广告的朋友。",
  );

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesCategory = category === "all" || tool.category === category;
      const matchesPlatform = platform === "all" || tool.platforms.includes(platform);
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [tool.name, tool.summary, tool.useCase, ...tool.tags, ...tool.bundle]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesPlatform && matchesQuery;
    });
  }, [category, platform, query]);

  const selectedTool =
    filteredTools.find((tool) => tool.id === selectedToolId) ?? filteredTools[0] ?? tools[0];

  const stats = [
    { label: "站内方案", value: tools.length.toString() },
    { label: "跳转依赖", value: "0" },
    { label: "承接专题", value: articleCampaigns.length.toString() },
  ];

  const matchedRiskRules = riskRules.filter((rule) => draftCopy.includes(rule.keyword));
  const rewrittenCopy = riskRules.reduce(
    (text, rule) => text.split(rule.keyword).join(rule.replacement),
    draftCopy,
  );

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
          <a href="#catalog">方案库</a>
          <a href="#rewrite">改写器</a>
          <a href="#articles">承接页</a>
          <a href="#submit">线索审核</a>
        </nav>
        <a className="header-action" href="#submit">
          <Send size={16} />
          提线索
        </a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <ShieldCheck size={16} />
              自有内容库，不做链接集合
            </p>
            <h1>把软件工具号从“发链接”，升级成“发教程、模板和方案”。</h1>
            <p className="hero-lede">
              页面不再依赖别人的网站链接。所有卡片都沉淀为站内方案：教程、检查表、模板、FAQ 和风控说明。
            </p>
            <div className="hero-search" role="search">
              <Search size={20} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索 AI、办公、剪辑、手机、风控方案..."
                aria-label="搜索站内方案"
              />
              <a href="#catalog">查看方案</a>
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

          <div className="hero-visual" aria-label="站内内容工作台预览">
            <div className="visual-topbar">
              <span />
              <span />
              <span />
              <strong>内容工作台</strong>
            </div>
            <div className="visual-grid">
              <div className="visual-panel visual-panel-dark">
                <span className="panel-label">今日选题</span>
                <b>AI 教程包</b>
                <b>办公模板</b>
                <b>发布检查表</b>
              </div>
              <div className="visual-panel">
                <span className="panel-label">站内资产</span>
                <div className="meter"><i style={{ width: "84%" }} /></div>
                <small>12 个模板和清单可复用</small>
              </div>
              <div className="visual-panel visual-panel-wide">
                <span className="panel-label">承接结构</span>
                <div className="mini-list">
                  <span>公众号入口</span>
                  <span>专题方案</span>
                  <span>风控改写</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section band" id="catalog">
          <div className="section-heading">
            <p className="eyebrow">
              <Filter size={16} />
              站内方案目录
            </p>
            <h2>用自己的内容承接用户</h2>
            <p>每张卡片都是可持续更新的站内内容包，不把用户直接导向第三方网站。</p>
          </div>

          <div className="filters" aria-label="方案筛选">
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
                    id={tool.slug}
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
                      查看站内方案
                      <ChevronRight size={16} />
                    </button>
                  </article>
                );
              })}
            </div>

            <aside className="detail-panel" aria-label="方案详情">
              <div className="detail-kicker">
                <Star size={17} />
                当前方案
              </div>
              <h3>{selectedTool.name}</h3>
              <p>{selectedTool.useCase}</p>
              <dl>
                <div>
                  <dt>内容属性</dt>
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
              <div className="bundle-block">
                <strong>
                  <Layers3 size={17} />
                  内容包
                </strong>
                <ul>
                  {selectedTool.bundle.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bundle-block checklist-block">
                <strong>
                  <ListChecks size={17} />
                  上线检查
                </strong>
                <ul>
                  {selectedTool.checklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="compliance-note">
                <ShieldCheck size={18} />
                <span>{selectedTool.complianceNote}</span>
              </div>
              <a href="#submit">
                加入选题单
                <ArrowRight size={16} />
              </a>
            </aside>
          </div>
        </section>

        <section className="section rewrite-section" id="rewrite">
          <div className="section-heading">
            <p className="eyebrow">
              <FileCheck2 size={16} />
              平台风控改写器
            </p>
            <h2>把高风险资源话术，改成可发布的内容话术。</h2>
            <p>这里不生成下载地址，只帮你把表达转成教程、清单、模板和方法论，更适合公众号、视频号和小红书承接。</p>
          </div>

          <div className="rewrite-layout">
            <div className="rewrite-input">
              <label htmlFor="copy-draft">待发布文案</label>
              <textarea
                id="copy-draft"
                value={draftCopy}
                onChange={(event) => setDraftCopy(event.target.value)}
                rows={7}
              />
              <div className="risk-summary">
                <strong>{matchedRiskRules.length}</strong>
                <span>个风险表达命中</span>
              </div>
            </div>

            <div className="rewrite-output">
              <span className="panel-label">建议改写结果</span>
              <p>{rewrittenCopy || "输入文案后，这里会生成更稳妥的站内内容表达。"}</p>
              <div className="rewrite-rules">
                {matchedRiskRules.length === 0 ? (
                  <article>
                    <CheckCircle2 size={18} />
                    <div>
                      <strong>未命中高风险词</strong>
                      <span>当前表达更适合沉淀为站内内容。</span>
                    </div>
                  </article>
                ) : (
                  matchedRiskRules.map((rule) => (
                    <article key={rule.keyword}>
                      <ShieldCheck size={18} />
                      <div>
                        <strong>
                          {rule.keyword} → {rule.replacement}
                        </strong>
                        <span>{rule.reason}</span>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="workflow-strip" aria-label="内容生产流程">
            {workflowStages.map((stage) => (
              <article key={stage.title}>
                <span>{stage.metric}</span>
                <h3>{stage.title}</h3>
                <p>{stage.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="articles">
          <div className="section-heading">
            <p className="eyebrow">
              <ClipboardList size={16} />
              承接页优化
            </p>
            <h2>公众号文章进站后，只走自己的内容资产。</h2>
            <p>文章、短视频和评论区都引导到站内专题，用户看到的是教程、模板和流程，不是第三方链接列表。</p>
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
                <a href={campaign.target}>
                  查看站内入口
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
              线索审核
            </p>
            <h2>把“给链接”改成“给选题线索”。</h2>
            <p>
              用户可以提交需求、场景和问题。编辑审核后，把它改写成站内教程、模板、检查表或 FAQ，不直接展示外部下载地址。
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
              需求标题
              <input required placeholder="例如：手机电脑怎么快速互传文件" />
            </label>
            <label>
              使用场景
              <select defaultValue="办公效率">
                <option>办公效率</option>
                <option>AI 方案</option>
                <option>短视频创作</option>
                <option>开发调试</option>
                <option>安全隐私</option>
              </select>
            </label>
            <label>
              希望得到什么内容
              <select defaultValue="教程步骤">
                <option>教程步骤</option>
                <option>模板清单</option>
                <option>避坑指南</option>
                <option>FAQ 问答</option>
              </select>
            </label>
            <label>
              需求描述
              <textarea placeholder="写清楚你想解决的问题、使用平台和遇到的限制。" rows={4} />
            </label>
            <label className="checkline">
              <input required type="checkbox" />
              <span>我确认不提交网盘、破解、会员绕过、未知安装包或侵权素材地址。</span>
            </label>
            <button type="submit">
              <Send size={16} />
              提交线索
            </button>
            {submitted && (
              <p className="form-success">
                <CheckCircle2 size={16} />
                已记录线索状态；接入后端后可进入编辑审核队列。
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
            <h2>平台更容易接受的是内容资产，不是资源跳转。</h2>
            <p>站点默认展示原创教程、模板、流程和检查表，弱化“网盘资源”和“下载地址”表达。</p>
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
        <span>只沉淀站内教程、模板和清单，不托管第三方文件。</span>
        <a href="#compliance">
          <Globe2 size={16} />
          版权与合规
        </a>
        <a href="#articles">
          <FileCheck2 size={16} />
          内容资产
        </a>
      </footer>
    </div>
  );
}

export default App;
