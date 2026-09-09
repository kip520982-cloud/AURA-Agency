import { useEffect, useState } from 'react'
import { AppShell } from '../components/AuraApp'

type Creator = { id: string; name: string; platform: string }
type Draft = { id: string; creator: string; title: string; body: string }
export default function Workspace() {
  const [creators, setCreators] = useState<Creator[]>([])
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [ready, setReady] = useState(false)
  const [message, setMessage] = useState('')
  const [query, setQuery] = useState('')
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('aura-workspace-v1') || 'null')
      if (saved && Array.isArray(saved.creators) && Array.isArray(saved.drafts)) {
        setCreators(saved.creators); setDrafts(saved.drafts)
      }
    } catch { setMessage('Saved workspace could not be loaded.') }
    setReady(true)
  }, [])
  useEffect(() => {
    if (!ready) return
    try { localStorage.setItem('aura-workspace-v1', JSON.stringify({ creators, drafts })) }
    catch { setMessage('Browser storage unavailable. Changes will last for this session only.') }
  }, [creators, drafts, ready])
  return <AppShell active="dashboard" title="Creator workspace" subtitle="Your roster, your plans, your next move.">
    <p className="muted">Local preview · Saved in this browser · Campaigns remain drafts</p>
    <div className="dashboard-grid" style={{ marginTop: 24 }}>
      <section className="panel"><h2>Creator roster</h2><p className="muted">Organise the creators you work with.</p>
        <form className="aura-work-form" onSubmit={event => {
          event.preventDefault(); const data = new FormData(event.currentTarget)
          const name = String(data.get('name') || '').trim(); if (!name) return
          setCreators(items => [...items, { id: crypto.randomUUID(), name, platform: String(data.get('platform')) }]); event.currentTarget.reset()
        }}><label>Creator name<input name="name" required maxLength={100} placeholder="Stacey Thurston" /></label>
          <label>Platform<select name="platform"><option>OnlyFans</option><option>Fansly</option><option>Independent</option></select></label>
          <button className="gold-button" disabled={!ready}>Add creator</button></form>
        <label className="aura-work-form">Search roster<input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name" /></label>
        {creators.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).map(c => <div className="activity-item" key={c.id}><div className="avatar">{c.name.slice(0, 2).toUpperCase()}</div><div><strong>{c.name}</strong><span>{c.platform} · Account not connected</span></div></div>)}
        {!creators.length && <p className="muted">Add your first creator to start planning.</p>}
      </section>
      <section className="panel"><h2>Campaign studio</h2><p className="muted">Prepare a content announcement for review.</p>
        <form className="aura-work-form" onSubmit={event => {
          event.preventDefault(); const data = new FormData(event.currentTarget)
          const title = String(data.get('title') || '').trim(), body = String(data.get('body') || '').trim()
          if (!title || !body) return
          setDrafts(items => [{ id: crypto.randomUUID(), creator: String(data.get('creator')), title, body }, ...items]); event.currentTarget.reset(); setMessage('Campaign draft saved.')
        }}><label>Creator<select name="creator" required>{creators.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></label>
          <label>Campaign title<input name="title" required maxLength={160} placeholder="This week's new release" /></label>
          <label>Message<textarea name="body" required rows={5} maxLength={5000} placeholder="Write your announcement…" /></label>
          <button className="gold-button" disabled={!creators.length}>Save draft</button></form>
      </section>
    </div>
    <p role="status">{message}</p>
    <section className="panel"><h2>Saved campaigns <span className="gold">{drafts.length}</span></h2>
      {!drafts.length && <p className="muted">Your campaign drafts will appear here.</p>}
      {drafts.map(d => <article key={d.id} className="aura-draft"><p className="kicker gold">DRAFT · {creators.find(c => c.id === d.creator)?.name || 'Creator'}</p><h3>{d.title}</h3><p style={{ whiteSpace: 'pre-wrap' }}>{d.body}</p></article>)}
    </section>
  </AppShell>
}
