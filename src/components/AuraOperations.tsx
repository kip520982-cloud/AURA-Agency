import { FormEvent, useMemo, useState } from 'react'
import { AppShell, type View } from './AuraApp'
import { Check, Clock3, LockKeyhole, Plus, Search, Send, ShieldCheck, Users } from 'lucide-react'

type Screen = Extract<View, 'accounts' | 'mailings' | 'collections' | 'statistics' | 'settings' | 'admin'>

const creatorSeed = [
  { name: 'Stacey Thurston', platform: 'Independent', status: 'Active', fans: '4,820', revenue: '$8,460' },
  { name: 'Mira Wren', platform: 'OnlyFans', status: 'Active', fans: '12,940', revenue: '$24,190' },
  { name: 'Sage Holloway', platform: 'Fansly', status: 'Review', fans: '2,110', revenue: '$3,420' },
]

const panels: Record<Screen, { title: string; subtitle: string }> = {
  accounts: { title: 'Creator Accounts', subtitle: 'Manage every creator workspace from one private roster.' },
  mailings: { title: 'Campaign Studio', subtitle: 'Plan creator-approved messages, drops, and re-engagement campaigns.' },
  collections: { title: 'Collections', subtitle: 'Group creators, campaigns, and high-value opportunities into working lists.' },
  statistics: { title: 'Statistics', subtitle: 'Read creator performance across audience, content, and conversations.' },
  settings: { title: 'Workspace Settings', subtitle: 'Set access, notifications, privacy, and operating preferences.' },
  admin: { title: 'Agency Admin', subtitle: 'Control staff access and review a complete activity trail.' },
}

function Notice({ children }: { children: React.ReactNode }) { return <div className="aura-notice"><ShieldCheck size={17} /><span>{children}</span></div> }

function Accounts() {
  const [creators, setCreators] = useState(creatorSeed)
  const [query, setQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const visible = useMemo(() => creators.filter(c => c.name.toLowerCase().includes(query.toLowerCase())), [creators, query])
  const addCreator = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = new FormData(event.currentTarget); const name = String(form.get('name') || '').trim()
    if (!name) return
    setCreators(items => [...items, { name, platform: String(form.get('platform')), status: 'Draft', fans: '—', revenue: '—' }]); setShowForm(false)
  }
  return <>
    <div className="aura-toolbar"><div className="search-box"><Search size={15} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search creators" /></div><button className="gold-button" onClick={() => setShowForm(v => !v)}><Plus size={15} /> Add creator</button></div>
    {showForm && <form className="aura-inline-form" onSubmit={addCreator}><label>Creator name<input name="name" required autoFocus placeholder="Creator name" /></label><label>Primary platform<select name="platform"><option>Independent</option><option>OnlyFans</option><option>Fansly</option></select></label><button className="gold-button">Save creator</button></form>}
    <div className="aura-card-grid">{visible.map(c => <article className="aura-creator-card" key={c.name}><div className="avatar">{c.name.slice(0, 2).toUpperCase()}</div><div><p className="kicker gold">{c.platform}</p><h2>{c.name}</h2><p className="muted">{c.status} workspace · {c.fans} fans</p></div><div className="aura-card-metric"><span>Monthly net</span><strong>{c.revenue}</strong></div><button className="text-button">Open workspace</button></article>)}</div>
  </>
}

function Mailings() {
  const [drafts, setDrafts] = useState([{ title: 'Friday release', audience: 'VIP subscribers', state: 'Ready for review' }, { title: 'Re-engagement check-in', audience: 'Lapsed fans', state: 'Draft' }])
  const [message, setMessage] = useState('')
  const save = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const form = new FormData(event.currentTarget); const title = String(form.get('title') || '').trim(); if (!title) return; setDrafts(items => [{ title, audience: String(form.get('audience')), state: 'Draft' }, ...items]); setMessage('Campaign saved as a local draft.'); event.currentTarget.reset() }
  return <div className="aura-split"><section className="panel"><div className="panel-title"><h2>New campaign</h2><span className="status-dot">Preview</span></div><form className="aura-inline-form" onSubmit={save}><label>Campaign name<input name="title" required placeholder="New content release" /></label><label>Audience<select name="audience"><option>VIP subscribers</option><option>Active subscribers</option><option>Lapsed fans</option><option>Custom collection</option></select></label><label>Message<textarea name="body" rows={6} required placeholder="Write the creator-approved message…" /></label><button className="gold-button"><Send size={15} /> Save for review</button></form>{message && <Notice>{message}</Notice>}</section><section className="panel"><div className="panel-title"><h2>Campaign queue</h2><span className="count">{drafts.length}</span></div>{drafts.map(d => <div className="aura-list-item" key={d.title}><div><strong>{d.title}</strong><span>{d.audience}</span></div><span className={d.state === 'Ready for review' ? 'positive' : 'gold'}>{d.state}</span></div>)}<p className="muted">Campaigns are preview-only until a delivery integration is connected.</p></section></div>
}

function Collections() {
  const [collections, setCollections] = useState([{ name: 'High-touch creators', detail: '3 creators · weekly review' }, { name: 'VIP campaign queue', detail: '7 campaigns · approval needed' }, { name: 'Protection follow-up', detail: '3 matches · owner review' }])
  const [name, setName] = useState('')
  return <><div className="aura-toolbar"><div><p className="kicker gold">WORKING LISTS</p><h2 className="aura-section-title">Keep the right work together.</h2></div><form className="aura-quick-add" onSubmit={e => { e.preventDefault(); if (!name.trim()) return; setCollections(v => [{ name: name.trim(), detail: '0 items · new collection' }, ...v]); setName('') }}><input value={name} onChange={e => setName(e.target.value)} placeholder="New collection" /><button className="gold-button"><Plus size={15} /></button></form></div><div className="aura-card-grid">{collections.map((collection, i) => <article className="aura-collection-card" key={collection.name}><span className="aura-collection-number">0{i + 1}</span><h2>{collection.name}</h2><p>{collection.detail}</p><button className="text-button">View collection</button></article>)}</div></>
}

function Statistics() {
  const [period, setPeriod] = useState('30 days')
  return <><div className="aura-toolbar"><div className="aura-periods">{['7 days', '30 days', '90 days'].map(p => <button key={p} className={period === p ? 'active' : ''} onClick={() => setPeriod(p)}>{p}</button>)}</div><button className="text-button">Export preview</button></div><div className="stat-grid"><div className="stat-card"><span>Net earnings</span><strong>$42,680</strong><small className="positive">+18.4%</small></div><div className="stat-card"><span>Active fans</span><strong>18,492</strong><small className="positive">+12.8%</small></div><div className="stat-card"><span>Reply coverage</span><strong>92.4%</strong><small className="positive">+6.2%</small></div><div className="stat-card"><span>Content conversion</span><strong>8.7%</strong><small className="gold">{period}</small></div></div><div className="aura-split"><section className="panel"><div className="panel-title"><h2>Audience movement</h2><span className="gold">{period}</span></div><div className="aura-bars">{[42, 64, 48, 76, 58, 88, 70, 96].map((v, i) => <i style={{ height: `${v}%` }} key={i} />)}</div></section><section className="panel"><div className="panel-title"><h2>Top signals</h2></div><div className="source-list"><div className="source"><div><span>VIP content</span><strong>31%</strong></div><div className="source-bar"><i style={{ width: '31%' }} /></div></div><div className="source"><div><span>New release</span><strong>27%</strong></div><div className="source-bar"><i style={{ width: '27%' }} /></div></div><div className="source"><div><span>Custom requests</span><strong>18%</strong></div><div className="source-bar"><i style={{ width: '18%' }} /></div></div></div></section></div></>
}

function SettingsView() {
  const [settings, setSettings] = useState({ alerts: true, summaries: true, protection: true, local: true })
  const toggle = (key: keyof typeof settings) => setSettings(state => ({ ...state, [key]: !state[key] }))
  return <div className="aura-split"><section className="panel"><div className="panel-title"><h2>Workspace controls</h2><span className="status-dot">Saved locally</span></div>{[['alerts', 'Priority alerts', 'Show high-value conversation and protection changes.'], ['summaries', 'Daily summaries', 'Create a private daily operations summary.'], ['protection', 'Protection workflow', 'Keep content-monitoring and notice reviews visible.'], ['local', 'Local-first data', 'Keep raw creator data on the companion device.']].map(([key, title, desc]) => <div className="aura-toggle-row" key={key}><div><strong>{title}</strong><span>{desc}</span></div><button aria-pressed={settings[key as keyof typeof settings]} className={settings[key as keyof typeof settings] ? 'on' : ''} onClick={() => toggle(key as keyof typeof settings)}><i /></button></div>)}</section><section className="panel"><div className="panel-title"><h2>Data & access</h2></div><Notice>Creator data sharing requires a recorded consent setting before a bridge can connect.</Notice><div className="aura-list-item"><div><strong>Export workspace data</strong><span>Creator settings, campaign drafts and audit records</span></div><button className="text-button">Prepare export</button></div><div className="aura-list-item"><div><strong>Retention</strong><span>Default: 90 days for derived operational signals</span></div><button className="text-button">Configure</button></div></section></div>
}

function Admin() {
  const [members, setMembers] = useState([{ name: 'Kieran', role: 'Owner', status: 'Active' }, { name: 'Maya Chen', role: 'Manager', status: 'Active' }, { name: 'Jordan Reid', role: 'Analyst', status: 'Invite ready' }])
  const [invite, setInvite] = useState('')
  return <div className="aura-split"><section className="panel"><div className="panel-title"><h2>Team access</h2><span className="count">{members.length}</span></div><form className="aura-quick-add" onSubmit={e => { e.preventDefault(); if (!invite.trim()) return; setMembers(v => [...v, { name: invite.trim(), role: 'Manager', status: 'Invite ready' }]); setInvite('') }}><input value={invite} onChange={e => setInvite(e.target.value)} placeholder="Invite team member" /><button className="gold-button">Invite</button></form>{members.map(member => <div className="aura-list-item" key={member.name}><div className="avatar">{member.name.slice(0, 2).toUpperCase()}</div><div><strong>{member.name}</strong><span>{member.role} · {member.status}</span></div><button className="text-button">Manage</button></div>)}</section><section className="panel"><div className="panel-title"><h2>Recent activity</h2><Clock3 size={16} className="gold" /></div><div className="activity-list"><div className="activity-item"><ShieldCheck size={16} className="gold" /><div><strong>Campaign draft reviewed</strong><span>Friday release · Stacey Thurston</span></div><time>12m</time></div><div className="activity-item"><Users size={16} className="gold" /><div><strong>Creator added</strong><span>Roster access prepared</span></div><time>2h</time></div><div className="activity-item"><LockKeyhole size={16} className="gold" /><div><strong>Bridge scope checked</strong><span>No raw messages shared</span></div><time>Today</time></div></div></section></div>
}

export default function AuraOperations({ screen }: { screen: Screen }) {
  const meta = panels[screen]
  return <AppShell active={screen} title={meta.title} subtitle={meta.subtitle}>{screen === 'accounts' && <Accounts />}{screen === 'mailings' && <Mailings />}{screen === 'collections' && <Collections />}{screen === 'statistics' && <Statistics />}{screen === 'settings' && <SettingsView />}{screen === 'admin' && <Admin />}</AppShell>
}
