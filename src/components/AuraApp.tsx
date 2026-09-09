import { FormEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  Check,
  ChevronRight,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  FileText,
  Home,
  Instagram,
  LockKeyhole,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  User,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";

export type View =
  | "login"
  | "dashboard"
  | "earnings"
  | "chat"
  | "analytics"
  | "connections"
  | "persona"
  | "accounts"
  | "mailings"
  | "collections"
  | "statistics"
  | "settings"
  | "admin"
  | "apply";

const nav: { href: string; view: View; label: string; icon: typeof Home }[] = [
  {
    href: "/dashboard",
    view: "dashboard",
    label: "Command Center",
    icon: Home,
  },
  { href: "/omni", view: "dashboard", label: "All-in-one workspace", icon: Zap },
  {
    href: "/workspace",
    view: "dashboard",
    label: "Creators & Campaigns",
    icon: Users,
  },
  {
    href: "/earnings",
    view: "earnings",
    label: "Earnings Overview",
    icon: CircleDollarSign,
  },
  {
    href: "/chat-history",
    view: "chat",
    label: "Inbox Command",
    icon: MessageSquare,
  },
  {
    href: "/conversational-analytics",
    view: "analytics",
    label: "Message insights",
    icon: BarChart3,
  },
  {
    href: "/data-connections",
    view: "connections",
    label: "Connect your data",
    icon: LockKeyhole,
  },
  { href: "/persona", view: "persona", label: "Your AI settings", icon: Bot },
  {
    href: "/accounts",
    view: "accounts",
    label: "Creator Accounts",
    icon: Users,
  },
  { href: "/mass-mailings", view: "mailings", label: "Campaigns", icon: Send },
  {
    href: "/collections",
    view: "collections",
    label: "Collections",
    icon: BookOpen,
  },
  {
    href: "/statistics",
    view: "statistics",
    label: "Statistics",
    icon: TrendingUp,
  },
  { href: "/settings", view: "settings", label: "Settings", icon: Settings },
  { href: "/admin", view: "admin", label: "Admin", icon: ShieldCheck },
];

function Brand() {
  return (
    <Link href="/" className="brand">
      <span className="brand-mark">A</span>
      <span>AURA</span>
    </Link>
  );
}

function LoginView() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setNotice(
      email
        ? "Secure access link sent. Check your inbox."
        : "Enter your email to continue.",
    );
  };
  return (
    <div className="login-page">
      <Head>
        <title>Aura — Premium Agency Login</title>
      </Head>
      <header className="login-header">
        <Brand />
        <Link className="gold-button small" href="/apply">
          Apply Now
        </Link>
      </header>
      <main className="login-main">
        <form className="login-card" onSubmit={submit}>
          <div className="eyebrow">
            <ShieldCheck size={14} /> PRIVATE ACCESS
          </div>
          <h1>
            Premium Agency
            <br />
            <em>Login</em>
          </h1>
          <p className="muted">
            Enter your email to access the Aura command center.
          </p>
          <label>
            Email Address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>
          <button className="burgundy-button" type="submit">
            Sign In <ArrowRight size={16} />
          </button>
          {notice && <p className="form-notice">{notice}</p>}
          <div className="or">
            <span>or continue with</span>
          </div>
          <div className="social-row">
            <button
              type="button"
              onClick={() =>
                setNotice("Google sign-in is ready for integration.")
              }
            >
              <span className="social-icon google">G</span> Google
            </button>
            <button
              type="button"
              onClick={() =>
                setNotice("Apple sign-in is ready for integration.")
              }
            >
              <span className="social-icon apple">●</span> Apple
            </button>
          </div>
          <p className="login-foot">
            New to Aura?{" "}
            <button type="button" onClick={() => router.push("/apply")}>
              Apply for an invitation
            </button>
          </p>
        </form>
      </main>
      <footer className="login-footer">
        <span>Terms</span>
        <span>Privacy Policy</span>
        <span>Contact Support</span>
      </footer>
    </div>
  );
}

function Sidebar({ active }: { active: View }) {
  const [open, setOpen] = useState(false);
  return (
    <aside className={`sidebar ${open ? "is-open" : ""}`}>
      <div className="sidebar-top">
        <Brand />
        <button
          className="icon-button mobile-only"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>
      <div className="profile-chip">
        <div className="avatar">AM</div>
        <div>
          <strong>Alex Morgan</strong>
          <span>Elite Creator</span>
        </div>
        <ChevronDown size={14} />
      </div>
      <p className="nav-label">Command Center</p>
      <nav>
        {nav.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              className={active === item.view ? "active" : ""}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              <Icon size={17} />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <p className="nav-label">Workspace</p>
      <nav>
        <Link href="/apply">
          <Plus size={17} />
          Join a creator
        </Link>
        <Link href="/persona">
          <Settings size={17} />
          Settings
        </Link>
      </nav>
      <div className="sidebar-bottom">
        <div className="secure-note">
          <LockKeyhole size={16} />
          <div>
            <strong>Preview workspace</strong>
            <span>Demo data · local preview</span>
          </div>
        </div>
        <Link href="/login" className="sign-out">
          Sign out
        </Link>
      </div>
      <button
        className="sidebar-toggle mobile-only"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>
    </aside>
  );
}

export function AppShell({
  active,
  children,
  title,
  subtitle,
}: {
  active: View;
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="app-page">
      <Sidebar active={active} />
      <div className="workspace">
        <header className="topbar">
          <button className="icon-button mobile-only" aria-label="Open menu">
            <Menu size={20} />
          </button>
          <div className="crumb">
            AURA <span>/</span> {title}
          </div>
          <div className="top-actions">
            <button className="icon-button">
              <Search size={17} />
            </button>
            <button className="icon-button notification">
              <Bell size={17} />
              <i />
            </button>
            <div className="mini-avatar">AM</div>
          </div>
        </header>
        <main className="workspace-main">
          <div className="page-heading">
            <div>
              <p className="kicker">AURA MANAGEMENT</p>
              <h1>{title}</h1>
              <p className="muted">{subtitle}</p>
            </div>
            <div className="date-pill">
              <Clock3 size={15} /> Demo data · not connected
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

function DashboardView() {
  return (
    <AppShell
      active="dashboard"
      title="Command Center"
      subtitle="Good morning, Alex. Here is your business at a glance."
    >
      <div className="stat-grid">
        <Stat
          icon={Wallet}
          label="Net earnings"
          value="$42,680"
          delta="+18.4%"
        />
        <Stat icon={Users} label="Active fans" value="18,492" delta="+12.8%" />
        <Stat
          icon={Zap}
          label="Suggested replies"
          value="1,284"
          delta="+24.5%"
        />
        <Stat
          icon={ShieldCheck}
          label="Vault protection"
          value="99.8%"
          delta="All clear"
        />
      </div>
      <div className="dashboard-grid">
        <section className="panel chart-panel">
          <PanelTitle title="Revenue performance" action="View analytics" />
          <div className="chart-head">
            <strong>$42,680</strong>
            <span className="positive">+18.4% this month</span>
          </div>
          <div className="chart">
            <div className="chart-grid" />
            <svg viewBox="0 0 800 220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="goldFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#e9c176" stopOpacity=".28" />
                  <stop offset="1" stopColor="#e9c176" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 180 C70 170 92 128 150 142 S226 94 288 112 S360 158 418 104 S510 125 565 64 S640 97 700 46 S750 72 800 20 V220 H0Z"
                fill="url(#goldFill)"
              />
              <path
                d="M0 180 C70 170 92 128 150 142 S226 94 288 112 S360 158 418 104 S510 125 565 64 S640 97 700 46 S750 72 800 20"
                fill="none"
                stroke="#e9c176"
                strokeWidth="3"
              />
            </svg>
            <div className="chart-labels">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </section>
        <section className="panel">
          <PanelTitle title="Recent activity" action="View all" />
          <div className="activity-list">
            <ActivityItem
              icon={MessageSquare}
              title="AI reply approved"
              meta="Conversation with @sophie_w"
              time="2m ago"
            />
            <ActivityItem
              icon={CircleDollarSign}
              title="New VIP purchase"
              meta="$840.00 · @luxe_james"
              time="18m ago"
            />
            <ActivityItem
              icon={ShieldCheck}
              title="Vault scan complete"
              meta="No threats detected"
              time="1h ago"
            />
            <ActivityItem
              icon={User}
              title="New fan milestone"
              meta="You reached 18,000 fans"
              time="3h ago"
            />
          </div>
        </section>
      </div>
      <section className="panel aura-onboarding-panel">
        <div className="panel-title"><div><p className="kicker gold">GET STARTED</p><h2>Your first 10 minutes</h2><p className="muted">Complete these quick steps to see how Aura helps.</p></div><strong className="gold">2/4 done</strong></div>
        <div className="aura-steps">{['Add your creator profile','Connect a platform','Add your first photo or video','Review a copied-content match'].map((step, i) => <button key={step} className={i < 2 ? 'done' : ''}><span>{i < 2 ? <Check size={14} /> : i + 1}</span>{step}<small>{i < 2 ? 'Done' : 'Start'}</small></button>)}</div>
      </section>
      <div className="dashboard-grid">
        <section className="panel"><PanelTitle title="Fans to check" action="Open messages" /><div className="activity-list"><ActivityItem icon={MessageSquare} title="3 fans are waiting for a reply" meta="Including @luxe_james, who spent $840" time="Now" /><ActivityItem icon={TrendingUp} title="2 fans may buy again" meta="They purchased in the last 30 days" time="Today" /><ActivityItem icon={User} title="5 fans have gone quiet" meta="Send a friendly check-in" time="This week" /></div></section>
        <section className="panel"><PanelTitle title="Use one set in five ways" action="Plan a post" /><p className="muted">Turn one upload into more chances to earn.</p><div className="aura-reuse-grid">{['Teaser post','Paid post','Message offer','Short clip','Follow-up reminder'].map((item, i) => <button key={item}><span>{i + 1}</span>{item}<ChevronRight size={14} /></button>)}</div></section>
      </div>
      <div className="section-row">
        <section className="panel">
          <PanelTitle title="Quick actions" />
          <div className="quick-actions">
            <Link href="/chat-history">
              <MessageSquare size={18} />
              Review AI chats
            </Link>
            <Link href="/persona">
              <Bot size={18} />
              Tune your AI persona
            </Link>
            <Link href="/earnings">
              <BarChart3 size={18} />
              Export earnings
            </Link>
          </div>
        </section>
        <section className="panel premium-panel">
          <div>
            <p className="kicker gold">WHAT WE NOTICED</p>
            <h2>Your biggest spenders are 14% more active this week.</h2>
            <p className="muted">
              Your AI assistant has identified 23 conversations worth
              prioritising today.
            </p>
          </div>
          <button className="gold-button">
            View insight <ArrowRight size={15} />
          </button>
        </section>
      </div>
    </AppShell>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  delta,
}: {
  icon: typeof Wallet;
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <Icon size={18} />
      </div>
      <span>{label}</span>
      <strong>{value}</strong>
      <small className="positive">{delta}</small>
    </div>
  );
}
function PanelTitle({ title, action }: { title: string; action?: string }) {
  return (
    <div className="panel-title">
      <h2>{title}</h2>
      {action && (
        <button className="text-button">
          {action} <ArrowRight size={13} />
        </button>
      )}
    </div>
  );
}
function ActivityItem({
  icon: Icon,
  title,
  meta,
  time,
}: {
  icon: typeof Activity;
  title: string;
  meta: string;
  time: string;
}) {
  return (
    <div className="activity-item">
      <div className="activity-icon">
        <Icon size={16} />
      </div>
      <div>
        <strong>{title}</strong>
        <span>{meta}</span>
      </div>
      <time>{time}</time>
    </div>
  );
}

function EarningsView() {
  return (
    <AppShell
      active="earnings"
      title="Earnings Overview"
      subtitle="Track your numbers clearly. Aura never holds or moves your money."
    >
      <div className="stat-grid">
        <Stat
          icon={CircleDollarSign}
          label="Total shown by platforms"
          value="$58,920"
          delta="+21.1%"
        />
        <Stat
          icon={Wallet}
          label="Estimated earnings"
          value="$42,680"
          delta="+18.4%"
        />
        <Stat
          icon={TrendingUp}
          label="Average fan spend"
          value="$182.40"
          delta="+9.6%"
        />
        <Stat
          icon={Users}
          label="Payout rate"
          value="72.4%"
          delta="This month"
        />
      </div>
      <div className="aura-notice"><ShieldCheck size={17} /> Read-only tracking: creator platforms handle all payments. Aura does not receive, hold or send your money.</div>
      <div className="dashboard-grid">
        <section className="panel chart-panel">
          <PanelTitle title="Revenue trend" action="Export CSV" />
          <div className="chart-head">
            <strong>
              $58,920 <small>gross</small>
            </strong>
            <span className="gold">June 2026</span>
          </div>
          <div className="chart tall">
            <div className="bar-chart">
              {[52, 68, 42, 78, 62, 88, 72, 96, 80, 110, 90, 128].map(
                (height, i) => (
                  <div className="bar-wrap" key={i}>
                    <div className="bar" style={{ height }} />
                    <span>
                      {
                        [
                          "J",
                          "F",
                          "M",
                          "A",
                          "M",
                          "J",
                          "J",
                          "A",
                          "S",
                          "O",
                          "N",
                          "D",
                        ][i]
                      }
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
        <section className="panel">
          <PanelTitle title="Revenue sources" />
          <div className="source-list">
            <Source label="Subscriptions" value="$31,840" percent="54%" />
            <Source label="Messages & tips" value="$18,240" percent="31%" />
            <Source label="PPV content" value="$6,820" percent="12%" />
            <Source label="Other" value="$2,020" percent="3%" />
          </div>
        </section>
      </div>
      <section className="panel table-panel">
        <PanelTitle
          title="Recent transactions"
          action="View all transactions"
        />
        <div className="data-table">
          <div className="table-row table-head">
            <span>Transaction</span>
            <span>Fan</span>
            <span>Date</span>
            <span>Amount</span>
          </div>
          {[
            [
              "VIP content purchase",
              "@luxe_james",
              "Today, 10:42am",
              "$840.00",
            ],
            ["Monthly subscription", "@sophie_w", "Today, 09:18am", "$49.99"],
            ["Custom request", "@jordan_d_22", "Yesterday", "$620.00"],
            ["Message tip", "@alex_music99", "Yesterday", "$120.00"],
          ].map((row) => (
            <div className="table-row" key={row.join("")}>
              <span>
                <CircleDollarSign size={15} className="gold" />
                {row[0]}
              </span>
              <span>{row[1]}</span>
              <span>{row[2]}</span>
              <strong>{row[3]}</strong>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
function Source({
  label,
  value,
  percent,
}: {
  label: string;
  value: string;
  percent: string;
}) {
  return (
    <div className="source">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="source-bar">
        <i style={{ width: percent }} />
      </div>
      <small>{percent}</small>
    </div>
  );
}

function ChatView() {
  const [selected, setSelected] = useState(0);
  return (
    <AppShell
      active="chat"
      title="AI Chat History"
      subtitle="Review, learn from, and approve every AI-assisted conversation."
    >
      <div className="chat-layout">
        <section className="panel conversation-list">
          <div className="panel-title">
            <h2>Conversation log</h2>
            <span className="count">24 today</span>
          </div>
          <div className="search-box">
            <Search size={15} />
            <input placeholder="Search conversations" />
          </div>
          {[
            "@alex_music99",
            "@jordan_d_22",
            "@sarah_creates",
            "@luxe_james",
            "@matthew_nz",
          ].map((name, i) => (
            <button
              key={name}
              className={`conversation ${selected === i ? "selected" : ""}`}
              onClick={() => setSelected(i)}
            >
              <div className="avatar small">
                {name.slice(1, 3).toUpperCase()}
              </div>
              <div>
                <strong>{name}</strong>
                <span>
                  {i === 0
                    ? "That sounds perfect ✨"
                    : "Conversation with AI assistant"}
                </span>
              </div>
              <time>{i + 2}m</time>
            </button>
          ))}
        </section>
        <section className="panel transcript">
          <div className="transcript-head">
            <div>
              <p className="kicker gold">TRANSCRIPT</p>
              <h2>
                @
                {
                  [
                    "alex_music99",
                    "jordan_d_22",
                    "sarah_creates",
                    "luxe_james",
                    "matthew_nz",
                  ][selected]
                }
              </h2>
            </div>
            <span className="status-dot">AI approved</span>
          </div>
          <div className="message-stack">
            <div className="message fan">
              Hey, are you free later? I have a surprise for you 😉
              <small>10:41am</small>
            </div>
            <div className="message ai">
              I might be… depends how good this surprise is. Tell me more ✨
              <small>AI assistant · 10:42am</small>
            </div>
            <div className="message fan">
              You know I never disappoint. Missed you today.
              <small>10:42am</small>
            </div>
            <div className="message ai">
              I missed you too. Come keep me company for a little while 💛
              <small>AI assistant · 10:42am</small>
            </div>
          </div>
          <div className="composer">
            <input placeholder="Add an internal note…" />
            <button className="gold-button">
              <Send size={15} />
            </button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function ConversationIntelligenceView() {
  return (
    <AppShell
      active="analytics"
      title="Conversation Intelligence"
      subtitle="Private, account-scoped signals from your connected creator workspace."
    >
      <div className="privacy-panel" style={{ marginBottom: 22 }}>
        <ShieldCheck size={22} className="gold" />
        <div>
          <p className="kicker gold">LOCAL-FIRST ANALYTICS</p>
          <h2>See patterns, not raw private data.</h2>
          <p className="muted">
            Aura uses creator-approved metadata and derived analytics.
            Conversation content stays in the creator's local bridge unless they
            explicitly choose otherwise.
          </p>
        </div>
        <span className="status-dot">Bridge connected</span>
      </div>
      <div className="stat-grid">
        <Stat
          icon={MessageSquare}
          label="Conversations analysed"
          value="1,284"
          delta="Last 30 days"
        />
        <Stat
          icon={Clock3}
          label="Median reply time"
          value="4m 18s"
          delta="▲ 38s faster"
        />
        <Stat
          icon={TrendingUp}
          label="Response coverage"
          value="92.4%"
          delta="▲ 6.2%"
        />
        <Stat
          icon={Sparkles}
          label="Positive sentiment"
          value="81%"
          delta="Stable this week"
        />
      </div>
      <div className="dashboard-grid">
        <section className="panel chart-panel">
          <PanelTitle title="Conversation health" action="Last 30 days" />
          <div className="chart-head">
            <strong>
              92.4% <small>coverage</small>
            </strong>
            <span className="positive">+6.2% vs prior period</span>
          </div>
          <div className="chart">
            <div className="chart-grid" />
            <svg viewBox="0 0 800 220" preserveAspectRatio="none">
              <defs>
                <linearGradient
                  id="auraInsightFill"
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >
                  <stop offset="0" stopColor="#e9c176" stopOpacity=".28" />
                  <stop offset="1" stopColor="#e9c176" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 164 C72 172 112 130 166 142 S252 118 310 125 S395 78 453 102 S544 92 602 54 S704 80 800 30 V220 H0Z"
                fill="url(#auraInsightFill)"
              />
              <path
                d="M0 164 C72 172 112 130 166 142 S252 118 310 125 S395 78 453 102 S544 92 602 54 S704 80 800 30"
                fill="none"
                stroke="#e9c176"
                strokeWidth="3"
              />
            </svg>
            <div className="chart-labels">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </div>
        </section>
        <section className="panel">
          <PanelTitle title="Topics gaining momentum" />
          <div className="source-list">
            <Source
              label="Custom requests"
              value="318 mentions"
              percent="76%"
            />
            <Source
              label="New content drops"
              value="244 mentions"
              percent="61%"
            />
            <Source label="VIP upsells" value="189 mentions" percent="47%" />
            <Source label="Meet & greet" value="72 mentions" percent="18%" />
          </div>
        </section>
      </div>
      <section className="panel table-panel">
        <PanelTitle
          title="Priority conversations"
          action="Open Inbox Command"
        />
        <div className="data-table">
          <div className="table-row table-head">
            <span>Conversation</span>
            <span>Signal</span>
            <span>Reply window</span>
            <span>Priority</span>
          </div>
          {[
            ["@luxe_james", "High engagement · VIP pattern", "18 min", "98"],
            ["@sophie_w", "Positive sentiment · new offer", "42 min", "87"],
            ["@jordan_d_22", "Unread · returning subscriber", "1 hr", "74"],
            ["@matthew_nz", "Custom request topic detected", "2 hr", "68"],
          ].map((row) => (
            <div className="table-row" key={row[0]}>
              <span>
                <MessageSquare size={15} className="gold" />
                {row[0]}
              </span>
              <span>{row[1]}</span>
              <span>{row[2]}</span>
              <strong className="gold">{row[3]}</strong>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function DataConnectionsView() {
  const [enabled, setEnabled] = useState(false);
  return (
    <AppShell
      active="connections"
      title="Connect your data"
      subtitle="Choose what Aura can use to help you."
    >
      <div className="dashboard-grid">
        <section className="panel premium-panel">
          <div>
            <p className="kicker gold">AURA COMPANION</p>
            <h2>Private analytics, with the creator in control.</h2>
            <p className="muted">
              The companion runs locally, derives approved metrics, and gives
              Aura a scoped analytics feed. It never asks the creator to give
              Aura their platform password.
            </p>
          </div>
          <button className="gold-button" onClick={() => setEnabled((v) => !v)}>
            {enabled ? (
              <>
                <Check size={15} /> Bridge enabled
              </>
            ) : (
              <>
                <LockKeyhole size={15} /> Enable demo bridge
              </>
            )}
          </button>
        </section>
        <section className="panel">
          <PanelTitle title="Connection status" />
          <div className="activity-list">
            <ActivityItem
              icon={enabled ? Check : Clock3}
              title={
                enabled ? "Connection active" : "Waiting for your approval"
              }
              meta={
                enabled
                  ? "Analytics-only scope · last sync just now"
                  : "No creator data is connected"
              }
              time={enabled ? "Live" : "Setup"}
            />
            <ActivityItem
              icon={ShieldCheck}
              title="Your permission"
              meta="Aura asks before using creator data"
              time="Ready"
            />
            <ActivityItem
              icon={LockKeyhole}
              title="Your data stays private"
              meta="Full messages stay on your computer unless you choose otherwise"
              time="Protected"
            />
          </div>
        </section>
      </div>
      <section className="panel table-panel">
        <PanelTitle title="Approved analytics scope" />
        <div className="data-table">
          <div className="table-row table-head">
            <span>Signal</span>
            <span>What Aura receives</span>
            <span>Status</span>
            <span>Creator control</span>
          </div>
          {[
            [
              "Response time",
              "Aggregate timing metrics",
              "Ready",
              "Pause anytime",
            ],
            [
              "Engagement",
              "Counts and priority scores",
              "Ready",
              "Select accounts",
            ],
            [
              "Topics & sentiment",
              "Derived, de-identified signals",
              "Ready",
              "Review categories",
            ],
            [
              "Conversation content",
              "Not shared by default",
              "Blocked",
              "Explicit opt-in only",
            ],
          ].map((row) => (
            <div className="table-row" key={row[0]}>
              <span>
                <ShieldCheck size={15} className="gold" />
                {row[0]}
              </span>
              <span>{row[1]}</span>
              <span className={row[2] === "Blocked" ? "" : "positive"}>
                {row[2]}
              </span>
              <strong>{row[3]}</strong>
            </div>
          ))}
        </div>
      </section>
      <section className="panel privacy-panel">
        <LockKeyhole size={22} className="gold" />
        <div>
          <p className="kicker gold">IMPLEMENTATION FOUNDATION</p>
          <h2>Ready for the local companion service.</h2>
          <p className="muted">
            This Aura shell is designed around a narrow, validated analytics
            contract: account-scoped updates, date-window provenance, encrypted
            local persistence, reconnection, audit logging, and export/deletion
            controls.
          </p>
        </div>
        <Link className="text-button" href="/conversational-analytics">
          See analytics <ArrowRight size={13} />
        </Link>
      </section>
    </AppShell>
  );
}

function PersonaView() {
  const [saved, setSaved] = useState(false);
  return (
    <AppShell
      active="persona"
      title="Knowledge Base & AI Tuning"
      subtitle="Shape the intelligence behind your creator voice."
    >
      <div className="persona-grid">
        <section className="panel persona-main">
          <PanelTitle title="Knowledge base" action="Add entry" />
          <p className="muted">
            Aura uses these details to make every response feel authentically
            yours.
          </p>
          <div className="knowledge-list">
            <Knowledge
              icon={BookOpen}
              title="About me"
              text="Your story, interests, values, and the things that make your voice distinct."
            />
            <Knowledge
              icon={FileText}
              title="Content boundaries"
              text="Clear rules for topics, tone, and content your assistant should never cross."
            />
            <Knowledge
              icon={Instagram}
              title="Social context"
              text="Recent posts, launches, and current conversations to keep replies relevant."
            />
          </div>
          <button className="gold-button" onClick={() => setSaved(true)}>
            {saved ? (
              <>
                <Check size={15} /> Saved
              </>
            ) : (
              <>
                Save changes <ArrowRight size={15} />
              </>
            )}
          </button>
        </section>
        <section className="panel">
          <PanelTitle title="Response style matrix" />
          <div className="style-list">
            <Style label="Warm & personal" value="82%" />
            <Style label="Playful" value="68%" />
            <Style label="Direct" value="54%" />
            <Style label="Exclusive" value="91%" />
          </div>
          <div className="aura-instance">
            <div className="pulse">
              <Bot size={18} />
            </div>
            <div>
              <strong>Aura instance is active</strong>
              <span>Learning from 4,208 approved replies</span>
            </div>
            <i className="live-dot" />
          </div>
        </section>
      </div>
      <section className="panel privacy-panel">
        <ShieldCheck size={22} className="gold" />
        <div>
          <p className="kicker gold">PRIVATE BY DEFAULT</p>
          <h2>Your data stays yours.</h2>
          <p className="muted">
            Every knowledge-base entry is encrypted and exportable. Aura never
            trains on your information.
          </p>
        </div>
        <button className="text-button">
          Manage privacy <ArrowRight size={13} />
        </button>
      </section>
    </AppShell>
  );
}
function Knowledge({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof BookOpen;
  title: string;
  text: string;
}) {
  return (
    <div className="knowledge">
      <div className="activity-icon">
        <Icon size={17} />
      </div>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
      <MoreHorizontal size={18} />
    </div>
  );
}
function Style({ label, value }: { label: string; value: string }) {
  return (
    <div className="style-row">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <div className="meter">
        <i style={{ width: value }} />
      </div>
    </div>
  );
}

function ApplyView() {
  const [sent, setSent] = useState(false);
  return (
    <div className="apply-page">
      <header className="login-header">
        <Brand />
        <Link href="/login" className="text-button">
          <ArrowLeft size={15} /> Back to login
        </Link>
      </header>
      <main className="apply-main">
        <div className="apply-copy">
          <p className="kicker gold">BY INVITATION ONLY</p>
          <h1>
            Ascend to the
            <br />
            <em>inner circle.</em>
          </h1>
          <p className="lead">
            Aura is the private command center for creators who are ready to
            build an exceptional business — with intelligence, protection, and
            total transparency.
          </p>
          <div className="proof-list">
            <span>
              <Check size={15} /> AI-powered revenue intelligence
            </span>
            <span>
              <Check size={15} /> Military-grade content protection
            </span>
            <span>
              <Check size={15} /> 100% transparent management
            </span>
          </div>
        </div>
        <form
          className="apply-card"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <p className="kicker gold">REQUEST AN INVITATION</p>
          <h2>Tell us about your work.</h2>
          {sent ? (
            <div className="success-state">
              <div className="success-icon">
                <Check size={26} />
              </div>
              <h3>Application received.</h3>
              <p className="muted">
                Our team will be in touch within 48 hours.
              </p>
              <Link className="gold-button" href="/login">
                Return to login
              </Link>
            </div>
          ) : (
            <>
              <label>
                Your name
                <input required placeholder="Alex Morgan" />
              </label>
              <label>
                Work email
                <input type="email" required placeholder="you@example.com" />
              </label>
              <label>
                Primary platform
                <select defaultValue="">
                  <option value="" disabled>
                    Select a platform
                  </option>
                  <option>OnlyFans</option>
                  <option>Fansly</option>
                  <option>Independent</option>
                </select>
              </label>
              <label>
                Tell us about your goals
                <textarea
                  required
                  rows={4}
                  placeholder="What are you building?"
                />
              </label>
              <button className="gold-button" type="submit">
                Submit application <ArrowRight size={16} />
              </button>
              <p className="form-note">
                <LockKeyhole size={13} /> Your information is private and never
                shared.
              </p>
            </>
          )}
        </form>
      </main>
    </div>
  );
}

export default function AuraApp({ view }: { view: View }) {
  if (view === "login") return <LoginView />;
  if (view === "apply") return <ApplyView />;
  if (view === "earnings") return <EarningsView />;
  if (view === "chat") return <ChatView />;
  if (view === "analytics") return <ConversationIntelligenceView />;
  if (view === "connections") return <DataConnectionsView />;
  if (view === "persona") return <PersonaView />;
  return <DashboardView />;
}
