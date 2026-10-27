import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import logoUrl from './assets/softvence-logo.png'
import tUrl from './assets/softvence-t.png'
import logoWhiteUrl from './assets/softvence-logo-white.png'
import {
  LayoutDashboard, FolderKanban, Inbox, Clock3, SquareKanban, CircleAlert,
  LifeBuoy, MessagesSquare, Rss, GraduationCap, Megaphone, Users, PlayCircle,
  Bug, Search, Bell, Plus, ArrowRight, ArrowUpRight, CheckCircle2, AlertTriangle,
  Paperclip, Send, Heart, MessageCircle, Share2, X, ChevronRight, Eye,
  LayoutGrid, List, Phone, Video, Smile, Image, Hash, AtSign, Flag, Sparkles,
  LogOut, CalendarDays, TrendingUp, Trash2
} from 'lucide-react'

/* ---------------- data (real structure from the live dashboard, cleaned) ---------------- */
const projects = [
  { id: 1, client: 'markmilnes', title: 'WordPress website build', order: 'FO21C254D3B86', value: 400, status: 'Delivered', deadline: 'Oct 17, 2026', service: 'WordPress', source: 'Fiverr', progress: 100 },
  { id: 2, client: 'gianni1985', title: 'WordPress website build', order: 'FO62A24E9B8C6', value: 400, status: 'Delivered', deadline: 'Oct 5, 2026', service: 'WordPress', source: 'Fiverr', progress: 100 },
  { id: 3, client: 'jonasraute', title: 'Peptide landing experience', order: 'FO32300566807', value: 450, status: 'Delivered', deadline: 'Oct 13, 2026', service: 'Peptide', source: 'Fiverr', progress: 100 },
  { id: 4, client: 'mwalker386', title: 'WordPress website build', order: 'FO11C215CC987', value: 100, status: 'Delivered', deadline: 'Oct 5, 2026', service: 'WordPress', source: 'Fiverr', progress: 100 },
  { id: 5, client: 'jonahlandy', title: 'WordPress website build', order: 'FO82A213279C4', value: 500, status: 'Delivered', deadline: 'Sep 22, 2026', service: 'WordPress', source: 'Fiverr', progress: 100 },
  { id: 6, client: 'blinkk701', title: 'WordPress website build', order: 'FO42309822686', value: 220, status: 'Delivered', deadline: 'Completed', service: 'WordPress', source: 'Fiverr', progress: 100 },
]
const team = [
  { name: 'Kazi Torikul Islam', role: 'Team Manager', title: 'Assistant Operation Manager', id: '15089', pts: 8 },
  { name: 'Md. Hasibul Islam', role: 'Team Leader', title: 'Web Developer', id: '15078', pts: 5 },
  { name: 'Khaled Hasan Ovi Chowdhury', role: 'Co-leader', title: 'Web Developer', id: '15210', pts: 5 },
  { name: 'Tamal Hossain', role: 'Member', title: 'Web Developer', id: '16834', pts: 1 },
  { name: 'Md. Sajid Miah', role: 'Member', title: 'Web Developer', id: '15861', pts: 3 },
  { name: 'Md. Yasin Arafat', role: 'Member', title: 'Web Developer', id: '16640', pts: 2 },
]
const initials = n => n.split(' ').map(w => w[0]).slice(0, 2).join('').replace('.', '')
const inboxThreads = [
  { id: 1, client: 'jonasraute', service: 'Peptide', age: '3d', by: 'Tamal Hossain', type: 'Update Message', status: 'Delivered', preview: 'Hello there, I hope you are doing well. Sharing the latest progress on your project…' },
  { id: 2, client: 'gianni1985', service: 'WordPress', age: '3d', by: 'Tamal Hossain', type: 'Update Message', status: 'Delivered', preview: 'Latest update on the website build, with the newest changes ready for review…' },
  { id: 3, client: 'markmilnes', service: 'WordPress', age: '6d', by: 'Tamal Hossain', type: 'Update Message', status: 'Delivered', preview: 'Progress update and next steps for your WordPress project…' },
  { id: 4, client: 'blinkk701', service: 'WordPress', age: '7d', by: 'Md. Hasibul Islam', type: 'Delivery Message', status: 'Ready for Sales', preview: 'Final delivery is ready. Files and access details are included…' },
  { id: 5, client: 'jonahlandy', service: 'WordPress', age: '7d', by: 'Md. Hasibul Islam', type: 'Delivery Message', status: 'Cancelled', preview: 'Already delivered.' },
  { id: 6, client: 'mwalker386', service: 'WordPress', age: '7d', by: 'Md. Hasibul Islam', type: 'Delivery Message', status: 'Cancelled', preview: 'Delivery message for your project.' },
]
const feedPosts = [
  { name: 'Azmain Mahmud Khan', dept: 'Sales', time: 'about 4 hours ago', text: 'At the end of the month, 1 day feels like 1 week :)', likes: 4, comments: 1 },
  { name: 'Sajid Talukder', dept: 'Sales Manager', time: '1 day ago', text: 'Morning sales are on fire today. Great start from the whole team, keep the momentum going.', likes: 9, comments: 3 },
  { name: 'Jesmin Sultana', dept: 'Sales', time: '1 day ago', text: 'New month, new beginning. Wishing everyone a focused and productive week ahead.', likes: 6, comments: 0 },
]
const chats = [
  { id: 1, name: 'Md. Hasibul Islam', meta: 'Offline · Operation · ID 15078', group: false },
  { id: 2, name: 'Md. Sajid Miah', meta: 'Offline · Operation · ID 15861', group: false },
  { id: 3, name: 'Md. Yasin Arafat', meta: 'Offline · Operation · ID 16640', group: false },
  { id: 4, name: 'SilentPress', meta: 'Group · 4 members', group: true },
]
const notifications = [
  { tag: 'Project', date: 'Oct 19, 2026', text: 'You have been assigned to a new project by Md. Hasibul Islam. Please check it out.' },
  { tag: 'Project', date: 'Oct 3, 2026', text: 'You have been assigned to a new project by Md. Hasibul Islam. Please check it out.' },
  { tag: 'Group', date: 'Sep 16, 2026', text: 'Md. Hasibul Islam added you to the group chat SilentPress.' },
]

/* ---------------- small pieces ---------------- */
const Pill = ({ tone = '', children }) => <span className={`pill ${tone}`}><span className="cdot" />{children}</span>

const fmtSize = b => b < 1024 ? b + ' B' : b < 1048576 ? (b / 1024).toFixed(1) + ' KB' : (b / 1048576).toFixed(1) + ' MB'
const fileExt = n => (n.split('.').pop() || '').toUpperCase()
const AttList = ({ atts }) => (!atts || !atts.length) ? null : (
  <div style={{ marginTop: 10, display: 'grid', gap: 6 }}>{atts.map((a, i) => (
    <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12.5, color: 'var(--ink2)' }}>
      <Paperclip size={14} color="#83838F" /><b style={{ fontWeight: 600 }}>{a.name}</b><span>{fileExt(a.name)} · {fmtSize(a.size)}</span>
      {a.url ? <a href={a.url} download={a.name} style={{ color: 'var(--violet-dark)', fontWeight: 700, textDecoration: 'none' }}>Download</a>
             : <span style={{ color: 'var(--violet-dark)', fontWeight: 700 }}>Download</span>}
    </div>))}
  </div>)
const AttChips = ({ atts, onRemove }) => (!atts.length) ? null : (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 10 }}>{atts.map((a, i) => (
    <span key={i} className="att-chip"><Paperclip size={12} /> {a.name} · {fmtSize(a.size)}
      <button onClick={() => onRemove(i)} aria-label="Remove attachment"><X size={12} /></button></span>))}
  </div>)

const store = { tasks: [], concerns: [], bugs: [], tutorials: [], feed: [] }
const toast = msg => window.dispatchEvent(new CustomEvent('sv-toast', { detail: msg }))
const FilePick = ({ label }) => {
  const [names, setNames] = useState([]); const ref = useRef(null)
  return <><button type="button" className="kadd" onClick={() => ref.current && ref.current.click()}>{names.length ? names.join(', ') : label}</button>
    <input type="file" multiple ref={ref} style={{ display: 'none' }} onChange={e => { setNames([...e.target.files].map(f => f.name)); e.target.value = '' }} /></>
}

const Avatar = ({ name, size = '' }) => <span className={`avatar ${size}`}>{initials(name)}<span className="dot" /></span>
const PageHead = ({ title, sub, children }) => (
  <div className="page-head"><div><h1>{title}</h1>{sub && <p>{sub}</p>}</div><div style={{ display: 'flex', gap: 9 }}>{children}</div></div>
)
const Empty = ({ icon: Icon, title, text, children }) => (
  <div className="card empty"><div className="eic"><Icon size={20} /></div><h4>{title}</h4><p>{text}</p>{children}</div>
)
function Modal({ title, sub, onClose, children, submit, onSubmit }) {
  return <div className="overlay" onClick={onClose}><motion.div className="modal" initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 320, damping: 28 }} onClick={e => e.stopPropagation()}>
    <form onSubmit={e => { e.preventDefault(); if (onSubmit) onSubmit(new FormData(e.currentTarget)); else onClose() }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div><h2>{title}</h2><p className="msub">{sub}</p></div>
      <button type="button" className="icon-btn" onClick={onClose}><X size={16} /></button>
    </div>{children}
    <div className="modal-foot"><button type="button" className="btn" onClick={onClose}>Cancel</button><button type="submit" className="btn dark">{submit}</button></div>
    </form>
  </motion.div></div>
}
const fadeUp = i => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.06 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] } })

/* decorative soft blob, like the reference's 3D flower */
const Blob = ({ className = '' }) => (
  <svg className={`blob ${className}`} viewBox="0 0 200 200" aria-hidden="true">
    <defs><linearGradient id="blg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#A9E8BC" /><stop offset="55%" stopColor="#3FBF67" /><stop offset="100%" stopColor="#00AB0C" />
    </linearGradient></defs>
    {[0, 60, 120, 180, 240, 300].map(a => (
      <ellipse key={a} cx="100" cy="62" rx="34" ry="52" fill="url(#blg)" opacity="0.75" transform={`rotate(${a} 100 100)`} />
    ))}
    <circle cx="100" cy="100" r="26" fill="#7ED492" />
  </svg>
)

/* ---------------- pages ---------------- */
function Home({ go, openProject }) {
  const [mOff, setMOff] = useState(0); const [selDay, setSelDay] = useState(26)
  const base = new Date(2026, 9 + mOff, 1)
  const calLabel = base.toLocaleString('en-US', { month: 'long' }) + ', ' + base.getFullYear()
  const calDays = mOff === 0 ? [20, 21, 22, 23, 24, 25, 26].map(d => [new Date(2026, 9, d).toLocaleString('en-US', { weekday: 'short' }).slice(0, 3), d]) : [1, 2, 3, 4, 5, 6, 7].map(d => [new Date(2026, 9 + mOff, d).toLocaleString('en-US', { weekday: 'short' }).slice(0, 3), d])
  const navMonth = dir => { const nm = mOff + dir; setMOff(nm); setSelDay(nm === 0 ? 26 : 1) }
  const stats = [
    ['My projects', '6', 'All 6 delivered', 'projects', FolderKanban, 'violet', '+100%'],
    ['Pending approvals', '0', 'Nothing waiting on you', 'pending', Clock3, 'pink', 'Clear'],
    ['Open blockers', '0', 'No active escalations', 'concerns', LifeBuoy, 'peach', 'Stable'],
    ['Issues & revisions', '0', 'No open tickets', 'issues', CircleAlert, 'mint', 'Clean'],
  ]
  const bars = [['Delivered', 100, '#00AB0C'], ['In progress', 34, '#17171D'], ['Revision', 18, '#9BD8A9'], ['On hold', 10, '#DCEFE1']]
  return <>
    <div className="home-top">
      <motion.section {...fadeUp(0)} className="hero">
        <Blob />
        <div className="hero-in">
          <span className="hero-chip"><Sparkles size={13} /> Monday, Oct 26, 2026 · Team Member</span>
          <h1>Good evening, Tamal Hossain</h1>
          <p>Assigned project tasks, collaboration and progress, all in one calm place. Two client messages are ready for Sales today.</p>
          <div className="hero-btns">
            <button className="btn dark" onClick={() => go('inbox')}>Review messages <ArrowRight size={15} /></button>
            <button className="btn glass" onClick={() => go('projects')}><FolderKanban size={15} /> My projects</button>
            <button className="btn glass" onClick={() => go('concerns')}><Flag size={15} /> Raise a concern</button>
          </div>
        </div>
      </motion.section>

      <motion.section {...fadeUp(1)} className="card cal-card">
        <div className="cal-head"><h3>{calLabel}</h3><span className="cal-nav"><button onClick={() => navMonth(-1)}>‹</button><button onClick={() => navMonth(1)}>›</button></span></div>
        <div className="cal-week">{calDays.map(([d, n]) => (
          <div key={d + n} className={`cal-day ${n === selDay ? 'on' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setSelDay(n)}><span>{d}</span><b>{n}</b></div>
        ))}</div>
        {mOff === 0 && selDay === 26
          ? <div className="cal-note"><CalendarDays size={15} /><p><b>Delivery day</b> · markmilnes was delivered Oct 17. Nothing is due today.</p></div>
          : <div className="cal-note"><CalendarDays size={15} /><p><b>{calLabel.split(',')[0]} {selDay}</b> · No project deadlines on this day.</p></div>}
        <h3 style={{ marginTop: 18 }}>Notifications</h3>
        {notifications.slice(0, 2).map((n, i) => (
          <div className="notif-row" key={i} style={{ cursor: 'pointer' }} onClick={() => go('projects')}><Avatar name="Md. Hasibul Islam" size="sm" />
            <div><p><b>{n.tag}</b> · {n.text}</p><time>{n.date}</time></div></div>
        ))}
      </motion.section>
    </div>

    <div className="kpis">
      {stats.map(([l, n, f, p, Icon, tone, tag], i) => (
        <motion.button key={l} {...fadeUp(2 + i)} whileHover={{ y: -5 }} className="card kpi" onClick={() => go(p)}>
          <span className="klabel"><span className={`stat-ic ${tone}`}><Icon size={17} /></span><span className="ktag">{tag}</span></span>
          <div className="knum">{n}</div>
          <div className="kfoot"><b>{l}</b> · {f}</div>
        </motion.button>
      ))}
    </div>

    <div className="home-grid">
      <motion.div {...fadeUp(6)} className="card">
        <div className="card-pad" style={{ paddingBottom: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div><h3>My projects</h3><div className="sub">6 assigned · all delivered</div></div>
          <button className="btn sm dark" onClick={() => go('projects')}>View all <ArrowRight size={14} /></button>
        </div>
        <table className="table"><thead><tr><th>Client</th><th>Status</th><th>Value</th><th>Deadline</th><th /></tr></thead>
          <tbody>{projects.map(p => <tr key={p.id} onClick={() => openProject(p)} style={{ cursor: 'pointer' }}>
            <td><div className="cell-main">{p.client}</div><div className="cell-sub">{p.service} · {p.source}</div></td>
            <td><Pill tone="green">{p.status}</Pill></td><td><b>${p.value}</b></td><td style={{ color: 'var(--ink2)' }}>{p.deadline}</td>
            <td><span className="row-arrow"><ChevronRight size={15} /></span></td></tr>)}
          </tbody></table>
      </motion.div>

      <div className="stack">
        <motion.div {...fadeUp(7)} className="card card-pad">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><h3>Delivery impact</h3><span className="ktag"><TrendingUp size={12} /> 2026–27</span></div>
          <div className="bars">{bars.map(([l, v, c]) => (
            <div className="bar-col" key={l}><div className="bar-track"><motion.i initial={{ height: 0 }} animate={{ height: v + '%' }} transition={{ duration: .8, ease: 'easeOut', delay: .2 }} style={{ background: c }} /></div><span>{l}</span></div>
          ))}</div>
          <p className="sub" style={{ marginTop: 12 }}><b style={{ color: 'var(--ink)' }}>6 of 6 delivered.</b> No late or cancelled work in this view.</p>
        </motion.div>
        <motion.div {...fadeUp(8)} className="card card-pad">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><div><h3>Blockers</h3><div className="sub">Escalations & PM solutions</div></div>
            <button className="btn sm ghost" onClick={() => go('concerns')}>View all</button></div>
          <div style={{ display: 'flex', gap: 10, marginTop: 14, alignItems: 'center' }}><span className="stat-ic mint"><CheckCircle2 size={17} /></span>
            <p style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.55 }}>No active blockers. All project pipelines are running smoothly.</p></div>
        </motion.div>
        <motion.div {...fadeUp(9)} className="card card-pad promo">
          <Blob className="promo-blob" />
          <div><Pill>General · Oct 8</Pill><h3 style={{ marginTop: 10, fontSize: 16 }}>System Server Update</h3>
            <p className="sub" style={{ marginTop: 4, lineHeight: 1.55 }}>Latest company notice from Admin. Server maintenance to improve performance, stability and security.</p>
            <button className="btn sm dark" style={{ marginTop: 13 }} onClick={() => go('notices')}>Open notice hub <ArrowRight size={13} /></button></div>
        </motion.div>
      </div>
    </div>
  </>
}

function Projects({ openProject, initialQ = '' }) {
  const [view, setView] = useState('table'); const [q, setQ] = useState(initialQ)
  const [fStatus, setFStatus] = useState('All statuses'); const [fService, setFService] = useState('All services'); const [fMonth, setFMonth] = useState('All months')
  const rows = projects.filter(p => (p.client + p.order + p.title).toLowerCase().includes(q.toLowerCase())
    && (fStatus === 'All statuses' || p.status === fStatus)
    && (fService === 'All services' || p.service === fService)
    && (fMonth === 'All months' || p.deadline.startsWith(fMonth === 'October 2026' ? 'Oct' : 'Sep')))
  return <>
    <PageHead title="Projects" sub="6 projects · Manage deliverables, deadlines and team assignments.">
      <div className="seg"><button className={view === 'table' ? 'on' : ''} onClick={() => setView('table')}><List size={14} /> Table</button>
        <button className={view === 'cards' ? 'on' : ''} onClick={() => setView('cards')}><LayoutGrid size={14} /> Cards</button></div>
    </PageHead>
    <div className="toolbar">
      <div className="searchbar"><Search size={15} /><input placeholder="Search client, order ID or project…" value={q} onChange={e => setQ(e.target.value)} /></div>
      <select className="select" value={fStatus} onChange={e => setFStatus(e.target.value)}><option>All statuses</option><option>Delivered</option><option>In progress</option><option>Revision</option></select>
      <select className="select" value={fService} onChange={e => setFService(e.target.value)}><option>All services</option><option>WordPress</option><option>Peptide</option></select>
      <select className="select" value={fMonth} onChange={e => setFMonth(e.target.value)}><option>All months</option><option>October 2026</option><option>September 2026</option></select>
    </div>
    {view === 'table' ? <div className="card"><table className="table">
      <thead><tr><th>Client / Project</th><th>Order ID</th><th>Status</th><th>Value</th><th>Deadline</th><th>Team</th><th /></tr></thead>
      <tbody>{rows.map(p => <tr key={p.id} onClick={() => openProject(p)} style={{ cursor: 'pointer' }}>
        <td><div className="cell-main">{p.client}</div><div className="cell-sub">{p.title} · {p.service}</div></td>
        <td><span className="mono">{p.order}</span></td><td><Pill tone="green">{p.status}</Pill></td>
        <td><b>${p.value}</b></td><td style={{ color: 'var(--ink2)' }}>{p.deadline}</td>
        <td><span className="avatars"><Avatar name="Kazi Torikul Islam" size="sm" /><Avatar name="Md. Hasibul Islam" size="sm" /><Avatar name="Tamal Hossain" size="sm" /></span></td>
        <td><Eye size={16} color="#B9B9C4" /></td></tr>)}</tbody></table>
      <div style={{ padding: '13px 20px', fontSize: 12.5, color: 'var(--muted)' }}>Showing {rows.length} of {projects.length} projects</div></div>
    : <div className="cards-grid">{rows.map((p, i) => <motion.button key={p.id} {...fadeUp(i)} whileHover={{ y: -5 }} className="card pcard" onClick={() => openProject(p)}>
        <div className="prow"><div><h4>{p.client}</h4><div className="cell-sub">{p.title}</div></div><Pill tone="green">{p.status}</Pill></div>
        <div style={{ marginTop: 12 }}><span className="mono">{p.order}</span></div>
        <div className="meta"><span>Value <b style={{ color: 'var(--ink)' }}>${p.value}</b></span><span>Due {p.deadline}</span><span>{p.service}</span></div>
      </motion.button>)}</div>}
    <p className="note" style={{ marginTop: 14 }}>Project creation is a Sales / Manager action, so there is no New Project button in the member view. The old “New” tab was a status filter and has been renamed to avoid confusion.</p>
  </>
}

function ProjectDetail({ project, back, go }) {
  const [files, setFiles] = useState([{ name: 'delivery-final.png', size: 7340032, url: null, meta: 'From the delivery message · Oct 17, 2026' }])
  const tabFileRef = useRef(null)
  const addFiles = e => { setFiles([...files, ...[...e.target.files].map(f => ({ name: f.name, size: f.size, url: URL.createObjectURL(f), meta: 'Added by you · Just now' }))]); e.target.value = '' }
  const p = project || projects[0]; const [tab, setTab] = useState('timeline')
  const [msgs, setMsgs] = useState([
    { type: 'Delivery Message', tone: 'blue', meta: 'Waiting for delivery · Sent by dev, reached Sales', body: 'Final delivery summary with project links and handover notes for the client.', atts: [{ name: 'delivery-final.png', size: 7340032, url: null }], gate: true },
    { type: 'Update Message', tone: '', meta: 'Passed by Sales', body: 'Progress update shared with the client during the build.' },
  ])
  const [composing, setComposing] = useState(false)
  const [draft, setDraft] = useState('')
  const [mtype, setMtype] = useState('Update Message')
  const [atts, setAtts] = useState([])
  const fileRef = useRef(null)
  const pickFiles = e => { setAtts([...atts, ...[...e.target.files].map(f => ({ name: f.name, size: f.size, url: URL.createObjectURL(f) }))]); e.target.value = '' }
  const addMessage = () => {
    if (!draft.trim() && !atts.length) return
    setMsgs([...msgs, { type: mtype, tone: mtype === 'Delivery Message' ? 'blue' : '', meta: mtype === 'Delivery Message' ? 'Waiting for delivery · Sent by you, just now' : 'Sent by you, just now · Needs approval before Sales can send it', body: draft.trim(), atts, mine: true }])
    setDraft(''); setAtts([]); setComposing(false)
  }
  return <>
    <button className="btn sm ghost" onClick={back} style={{ marginBottom: 12 }}>← Back to projects</button>
    <div className="page-head"><div><h1>{p.client}</h1><p>{p.title} · {p.source} · <span className="mono">{p.order}</span></p></div>
      <div style={{ display: 'flex', gap: 9 }}><Pill tone="green">{p.status}</Pill>
        <button className="btn dark" onClick={() => go('concerns')}><Flag size={14} /> Raise a concern</button></div></div>
    <div className="card card-pad" style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: 'var(--muted)', marginBottom: 7 }}><span>Project progress</span><b style={{ color: 'var(--ink)' }}>{p.progress}% · Delivered {p.deadline}</b></div>
      <div className="progress"><i style={{ width: p.progress + '%' }} /></div>
      <div className="kv" style={{ marginTop: 16 }}>
        <div><label>Client</label><b>{p.client}</b></div><div><label>Order ID</label><b>{p.order}</b></div><div><label>Value</label><b>${p.value}</b></div>
        <div><label>Service</label><b>{p.service}</b></div><div><label>Started</label><b>Oct 6, 2026</b></div><div><label>Delivery date</label><b>{p.deadline}</b></div>
        <div><label>Team</label><b>Bro Code (WordPress)</b></div><div><label>Manager</label><b>Kazi Torikul Islam</b></div><div><label>Lead</label><b>Md. Hasibul Islam</b></div>
      </div>
    </div>
    <div className="tabs">{[['timeline', 'Timeline & messages'], ['brief', 'Client brief & scope'], ['files', 'Files & resources'], ['team', 'Team']].map(([k, l]) =>
      <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{l}</button>)}</div>
    {tab === 'timeline' && <div>
      {msgs.map((m, i) => <div className="msg-card" key={i}><div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Pill tone={m.tone}>{m.type}</Pill><span style={{ fontSize: 12, color: 'var(--muted)' }}>{m.meta}</span>{m.mine && <button className="btn sm ghost" style={{ marginLeft: 'auto', color: '#D64545' }} onClick={() => setMsgs(msgs.filter((_, j) => j !== i))}><Trash2 size={13} /> Delete</button>}</div>
        <p>{m.body}</p>
        <AttList atts={m.atts} />
        {m.gate && <div className="note" style={{ marginTop: 12 }}>Only Sales and Sales Manager roles can cancel or deliver this message.</div>}</div>)}
      {composing ? <div className="msg-card" style={{ borderColor: 'var(--violet)' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <select className="select" value={mtype} onChange={e => setMtype(e.target.value)}><option>Update Message</option><option>Delivery Message</option></select>
          <span className="note" style={{ flex: 1 }}>{mtype === 'Update Message' ? 'Needs approval before Sales can send it.' : 'Goes to Sales for final delivery.'}</span></div>
        <textarea autoFocus placeholder="Write your message for the client timeline…" value={draft} onChange={e => setDraft(e.target.value)}
          style={{ width: '100%', border: '1.5px solid var(--line)', borderRadius: 14, padding: '11px 13px', minHeight: 84, resize: 'vertical', outline: 'none', background: '#FBFBFD', lineHeight: 1.55 }} />
        <AttChips atts={atts} onRemove={i => setAtts(atts.filter((_, j) => j !== i))} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
          <button className="btn sm ghost" onClick={() => fileRef.current && fileRef.current.click()}><Paperclip size={14} /> Attach files</button>
          <input type="file" multiple ref={fileRef} style={{ display: 'none' }} onChange={pickFiles} />
          <span style={{ display: 'flex', gap: 8 }}>
            <button className="btn sm" onClick={() => { setComposing(false); setDraft(''); setAtts([]) }}>Cancel</button>
            <button className="btn dark sm" disabled={!draft.trim() && !atts.length} style={{ opacity: (draft.trim() || atts.length) ? 1 : .45 }} onClick={addMessage}><Send size={14} /> Add to timeline</button></span></div></div>
      : <button className="btn dark" onClick={() => setComposing(true)}><Plus size={15} /> Add message</button>}</div>}
    {tab === 'brief' && <div className="stack">
      <div className="card card-pad"><h3>Instructions from client</h3><p style={{ color: 'var(--ink2)', lineHeight: 1.65, marginTop: 7, fontSize: 13.5 }}>Client briefing, direct specifications, guidelines and revision directions live here, in one place instead of three collapsed accordions.</p></div>
      <div className="card card-pad"><h3>Scope of work</h3><p style={{ color: 'var(--ink2)', lineHeight: 1.65, marginTop: 7, fontSize: 13.5 }}>Agreed deliverables, task boundaries, technical stack and milestones.</p></div>
      <div className="card card-pad"><h3>Special instructions & notes</h3><p style={{ color: 'var(--muted)', marginTop: 7, fontSize: 13.5 }}>No special notes recorded.</p></div></div>}
    {tab === 'files' && <div className="card card-pad">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}><div><h3>Project files</h3><div className="sub">{files.length} file{files.length !== 1 ? 's' : ''} · documents, assets and delivery files in one place</div></div>
        <button className="btn dark sm" onClick={() => tabFileRef.current && tabFileRef.current.click()}><Plus size={14} /> Add files</button>
        <input type="file" multiple ref={tabFileRef} style={{ display: 'none' }} onChange={addFiles} /></div>
      {files.map((f, i) => <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 2px', borderTop: i ? '1px solid var(--line)' : 'none' }}>
        <span className="stat-ic mint"><Paperclip size={15} /></span>
        <span style={{ flex: 1 }}><b style={{ fontSize: 13.5 }}>{f.name}</b><div className="cell-sub">{fileExt(f.name)} · {fmtSize(f.size)} · {f.meta}</div></span>
        {f.url ? <a className="btn sm" href={f.url} download={f.name} style={{ textDecoration: 'none' }}>Download</a> : <span className="btn sm">Download</span>}</div>)}
    </div>}
    {tab === 'team' && <div className="cards-grid">{team.slice(0, 4).map(m => <div className="card pcard" key={m.id} style={{ cursor: 'pointer' }} onClick={() => toast(m.name + ' · ' + m.title + ' · ' + m.pts + ' pts')}><div style={{ display: 'flex', gap: 11, alignItems: 'center' }}><Avatar name={m.name} /><div><div className="cell-main">{m.name}</div><div className="cell-sub">{m.title} · ID {m.id}</div></div></div><div className="meta"><span>{m.role}</span><span>{m.pts} pts</span></div></div>)}</div>}
  </>
}

function InboxPage({ openProject }) {
  const [sel, setSel] = useState(inboxThreads[0]); const [tab, setTab] = useState('All')
  const [extra, setExtra] = useState({})
  const [draft, setDraft] = useState('')
  const [ctype, setCtype] = useState('Update Message')
  const [noteMode, setNoteMode] = useState(false)
  const [iq, setIq] = useState('')
  const [iatts, setIatts] = useState([])
  const ifileRef = useRef(null)
  const ipickFiles = e => { setIatts([...iatts, ...[...e.target.files].map(f => ({ name: f.name, size: f.size, url: URL.createObjectURL(f) }))]); e.target.value = '' }
  const sendMsg = () => {
    if (!draft.trim() && !iatts.length) return
    setExtra({ ...extra, [sel.id]: [...(extra[sel.id] || []), { type: noteMode ? 'Internal Note' : ctype, note: noteMode, body: draft.trim(), atts: iatts }] })
    setDraft(''); setIatts([]); setNoteMode(false)
  }
  const tabs = ['All', 'Needs me', 'Pending', 'Ready for Sales']
  const list = inboxThreads.filter(t => (t.client + t.type + t.preview).toLowerCase().includes(iq.toLowerCase())
    && (tab === 'All' || (tab === 'Needs me' ? t.by !== 'Tamal Hossain' : tab === 'Pending' ? t.status !== 'Delivered' : t.status === 'Ready for Sales')))
  return <>
    <PageHead title="Client Inbox" sub="Every client message for your projects: review, approve and reply from one place." />
    <div className="card split">
      <div className="split-list">
        <div className="sl-head"><div className="searchbar" style={{ maxWidth: 'none', margin: 0 }}><Search size={15} /><input placeholder="Search project, client or order ID" value={iq} onChange={e => setIq(e.target.value)} /></div>
          <div className="chips" style={{ marginTop: 11 }}>{tabs.map(t => <button key={t} className={`chip ${tab === t ? 'on' : ''}`} onClick={() => setTab(t)}>{t}{t === 'Ready for Sales' ? ' · 1' : ''}</button>)}</div></div>
        <div>{list.length ? list.map(t => <button key={t.id} className={`list-row ${sel.id === t.id ? 'on' : ''}`} onClick={() => { setSel(t); setDraft(''); setIatts([]); setNoteMode(false) }}>
          <Avatar name={t.client} size="sm" /><span className="lr-main"><span className="lr-title">{t.client}<time>{t.age}</time></span>
            <span className="lr-prev">{t.type}: {t.preview}</span>
            <span style={{ display: 'block', marginTop: 5 }}><Pill tone={t.status === 'Delivered' ? 'green' : t.status === 'Ready for Sales' ? 'amber' : 'red'}>{t.status}</Pill></span></span></button>)
          : <p style={{ padding: 16, fontSize: 13, color: 'var(--muted)' }}>No threads match this filter.</p>}</div>
      </div>
      <div className="split-detail">
        <div className="sd-head"><div style={{ flex: 1 }}><b>{sel.client} · {sel.service}</b><div className="cell-sub">Order {projects.find(p => p.client === sel.client)?.order || ''} · ${projects.find(p => p.client === sel.client)?.value || ''}</div></div>
          <Pill tone="green">{sel.status}</Pill><button className="btn sm" onClick={() => { const p = projects.find(p => p.client === sel.client); if (p) openProject(p) }}>Open project</button></div>
        <div className="sd-body">
          <div className="msg-card"><div style={{ display: 'flex', gap: 8 }}><Pill tone="blue">{sel.type}</Pill><span style={{ fontSize: 12, color: 'var(--muted)' }}>Passed by Sales for {sel.client} · Sent by {sel.by}</span></div>
            <p>{sel.preview} The full message, approvals and seen-by avatars stay on the card, without extra panels competing for attention.</p>
            <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 12, color: 'var(--muted)' }}><span>Approved: TH, MHI</span><span>Seen: Sales</span></div></div>
          {(extra[sel.id] || []).map((m, i) => <div className="msg-card" key={i}><div style={{ display: 'flex', gap: 8 }}><Pill tone={m.note ? 'amber' : m.type === 'Delivery Message' ? 'blue' : ''}>{m.type}</Pill><span style={{ fontSize: 12, color: 'var(--muted)' }}>{m.note ? 'Internal · Only your team can see this' : 'Sent by you · just now' + (m.type === 'Update Message' ? ' · Needs approval before Sales can send it' : '')}</span></div><p>{m.body}</p><AttList atts={m.atts} /></div>)}
        </div>
        <div className="composer">
          <div style={{ display: 'flex', gap: 8, marginBottom: 9 }}><select className="select" value={ctype} onChange={e => setCtype(e.target.value)} disabled={noteMode}><option>Update Message</option><option>Delivery Message</option></select>
            <span className="note" style={{ flex: 1 }}>{noteMode ? 'Internal note: only your team can see this, the client never will.' : 'Update messages need approval before Sales can send them.'}</span></div>
          <textarea placeholder={noteMode ? 'Write an internal note for the team…' : 'Write a message to the client…'} value={draft} onChange={e => setDraft(e.target.value)} />
          <AttChips atts={iatts} onRemove={i => setIatts(iatts.filter((_, j) => j !== i))} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 9 }}>
            <div style={{ display: 'flex', gap: 6 }}><button className="btn sm ghost" onClick={() => ifileRef.current && ifileRef.current.click()}><Paperclip size={14} /> Attach files</button>
              <input type="file" multiple ref={ifileRef} style={{ display: 'none' }} onChange={ipickFiles} />
              <button className="btn sm ghost" style={noteMode ? { background: 'var(--lav-soft)', color: 'var(--violet-dark)', fontWeight: 700 } : {}} onClick={() => setNoteMode(!noteMode)}>Internal note{noteMode ? ' · On' : ''}</button></div>
            <button className="btn dark sm" disabled={!draft.trim() && !iatts.length} style={{ opacity: (draft.trim() || iatts.length) ? 1 : .45 }} onClick={sendMsg}><Send size={14} /> {noteMode ? 'Add note' : 'Send'}</button></div>
        </div>
      </div>
    </div>
  </>
}

function Tasks({ setModal }) {
  const [items, setItems] = useState(() => store.tasks.map((t, i) => ({ ...t, id: 's' + i })))
  const [view, setView] = useState('Kanban'); const [q, setQ] = useState('')
  const [fa, setFa] = useState('All tasks'); const [fp, setFp] = useState('All priorities')
  const colMeta = [['To Do', 'Ready to start', 'violet'], ['In Progress', 'Actively working', 'dark'], ['Under Review', 'Deliverables & proofs', 'pink'], ['Completed', 'Done & verified', 'mint']]
  const order = colMeta.map(c => c[0])
  const filtered = items.filter(t => ((t.title || '') + (t.project || '') + (t.assignee || '')).toLowerCase().includes(q.toLowerCase())
    && (fa === 'All tasks' || (fa === 'Assigned to me' ? t.assignee === 'Tamal Hossain' : t.assignee !== 'Tamal Hossain'))
    && (fp === 'All priorities' || t.priority === fp))
  const advance = t => {
    const nx = order[Math.min(order.indexOf(t.status) + 1, order.length - 1)]
    const st = store.tasks.find(x => x.title === t.title && x.assignee === t.assignee); if (st) st.status = nx
    t.status = nx; setItems([...items]); toast(nx === 'Completed' ? 'Task completed · ' + t.title : 'Moved to ' + nx + ' · ' + t.title)
  }
  const prioTone = p => p === 'High' ? 'red' : p === 'Medium' ? 'amber' : ''
  const card = t => <div className="kcard" key={t.id}>
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><Pill tone={prioTone(t.priority)}>{t.priority}</Pill><span className="ktag">{t.project || 'General'}</span></div>
    <h5>{t.title}</h5>
    <div className="kmeta"><Avatar name={t.assignee || 'Tamal Hossain'} size="sm" /><span>{t.assignee}</span>{t.due ? <span style={{ marginLeft: 'auto' }}>{String(t.due).slice(0, 10)}</span> : null}</div>
    {t.status !== 'Completed'
      ? <button className="btn sm" style={{ marginTop: 10, width: '100%', justifyContent: 'center' }} onClick={() => advance(t)}>Move to {order[order.indexOf(t.status) + 1]} →</button>
      : <div style={{ marginTop: 10, display: 'flex', gap: 6, alignItems: 'center', fontSize: 12.5, color: 'var(--violet-dark)', fontWeight: 700 }}><CheckCircle2 size={14} /> Done</div>}
  </div>
  const done = items.filter(t => t.status === 'Completed').length
  return <>
    <PageHead title="Tasks" sub="Your task workspace. Assigned, delegated and team tasks, in one calm board.">
      <button className="btn dark" onClick={() => setModal('task')}><Plus size={15} /> New task</button></PageHead>
    <div className="kpis">
      {[['Total tasks', String(items.length), 'violet'], ['Completion rate', items.length ? Math.round(done / items.length * 100) + '%' : '0%', 'pink'], ['In progress', String(items.filter(t => t.status === 'In Progress').length), 'peach'], ['Under review', String(items.filter(t => t.status === 'Under Review').length), 'mint']].map(([l, n, tone], i) =>
        <motion.div key={l} {...fadeUp(i)} whileHover={{ y: -5 }} className="card kpi"><span className="klabel"><span className={`stat-ic ${tone}`}><SquareKanban size={16} /></span></span><div className="knum">{n}</div><div className="kfoot"><b>{l}</b> · On schedule</div></motion.div>)}
    </div>
    <div className="toolbar"><div className="searchbar"><Search size={15} /><input placeholder="Search tasks by title, project or assignee…" value={q} onChange={e => setQ(e.target.value)} /></div>
      <select className="select" value={fa} onChange={e => setFa(e.target.value)}><option>All tasks</option><option>Assigned to me</option><option>Delegated by me</option></select>
      <select className="select" value={fp} onChange={e => setFp(e.target.value)}><option>All priorities</option><option>High</option><option>Medium</option><option>Low</option></select>
      <div className="seg">{['Kanban', 'List', 'Priority'].map(v => <button key={v} className={view === v ? 'on' : ''} onClick={() => setView(v)}>{v}</button>)}</div></div>
    {view === 'Kanban' && <div className="kanban">{colMeta.map(([t, sub, tone]) => { const list = filtered.filter(x => x.status === t); return <div className={`kcol ${tone}`} key={t}><h4>{t}<span style={{ marginLeft: 'auto' }} className="kcount">{list.length}</span></h4>
      <div className="ksub">{sub}</div>{list.length ? list.map(card) : <p style={{ fontSize: 12.5, color: 'var(--muted)', padding: '4px 2px 10px' }}>No tasks here yet.</p>}
      <button className="kadd" onClick={() => setModal('task')}>+ Add a task</button></div> })}</div>}
    {view === 'List' && <div className="card"><table className="table"><thead><tr><th>Task</th><th>Project</th><th>Priority</th><th>Status</th><th>Assignee</th><th /></tr></thead>
      <tbody>{filtered.length ? filtered.map(t => <tr key={t.id}><td><div className="cell-main">{t.title}</div>{t.details ? <div className="cell-sub">{t.details}</div> : null}</td>
        <td>{t.project || 'General'}</td><td><Pill tone={prioTone(t.priority)}>{t.priority}</Pill></td><td>{t.status}</td>
        <td><span className="avatars"><Avatar name={t.assignee || 'Tamal Hossain'} size="sm" /></span> {t.assignee}</td>
        <td>{t.status !== 'Completed' && <button className="btn sm" onClick={() => advance(t)}>Move →</button>}</td></tr>)
      : <tr><td colSpan={6} style={{ color: 'var(--muted)', padding: 18 }}>No tasks match. Create one with New task.</td></tr>}</tbody></table></div>}
    {view === 'Priority' && <div className="kanban">{['High', 'Medium', 'Low'].map(p => { const list = filtered.filter(x => x.priority === p); return <div className="kcol" key={p}><h4>{p} priority<span style={{ marginLeft: 'auto' }} className="kcount">{list.length}</span></h4>
      <div className="ksub">Across all statuses</div>{list.length ? list.map(card) : <p style={{ fontSize: 12.5, color: 'var(--muted)', padding: '4px 2px 10px' }}>Nothing at this priority.</p>}</div> })}</div>}
  </>
}

function Concerns({ setModal }) {
  const [list] = useState(() => [...store.concerns])
  const [f, setF] = useState('All')
  const chips = ['All', 'Critical', 'Open', 'Solution ready', 'Resolved']
  const match = c => f === 'All' || (f === 'Critical' ? (c.severity || '').startsWith('High') : c.status === f)
  const shown = list.filter(match)
  const count = lbl => lbl === 'All' ? list.length : list.filter(c => lbl === 'Critical' ? (c.severity || '').startsWith('High') : c.status === lbl).length
  return <>
    <PageHead title="Concerns & PM solutions" sub="Raise a blocker once, track the PM's solution in the same place.">
      <button className="btn dark" onClick={() => setModal('concern')}><Flag size={15} /> Raise a concern</button></PageHead>
    <div className="chips" style={{ marginBottom: 14 }}>{chips.map(c =>
      <button key={c} className={`chip ${f === c ? 'on' : ''}`} onClick={() => setF(c)}>{c} · {count(c)}</button>)}</div>
    {shown.length ? <div className="stack">{shown.map((c, i) => <div className="card card-pad" key={i}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}><Pill tone={(c.severity || '').startsWith('High') ? 'red' : 'amber'}>{c.severity}</Pill><Pill>{c.category}</Pill>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>{c.project} · Raised by you · Just now</span>
        <span style={{ marginLeft: 'auto' }}><Pill tone="blue">{c.status} · Waiting for PM</Pill></span></div>
      <h3 style={{ marginTop: 11, fontSize: 15.5 }}>{c.title}</h3>
      {c.details ? <p style={{ color: 'var(--ink2)', lineHeight: 1.6, marginTop: 6, fontSize: 13.5 }}>{c.details}</p> : null}
      <p className="note" style={{ marginTop: 10 }}>Your Project Manager has been notified and will respond with a solution here.</p></div>)}</div>
    : <Empty icon={CheckCircle2} title="No project concerns" text="Everything is running smoothly. If you hit a blocker or technical obstacle, raise a concern and your Project Manager will respond with a solution here.">
      <button className="btn dark" onClick={() => setModal('concern')}>Raise your first concern</button></Empty>}
  </>
}

function Feed() {
  const [posts, setPosts] = useState(() => [...store.feed, ...feedPosts.map(p => ({ ...p, chan: 'General', commentsList: [] }))])
  const [liked, setLiked] = useState({})
  const [text, setText] = useState(''); const [cat, setCat] = useState('General')
  const [photoName, setPhotoName] = useState(''); const photoRef = useRef(null)
  const [openC, setOpenC] = useState({}); const [cDraft, setCDraft] = useState({})
  const [chan, setChan] = useState('All Channels'); const [more, setMore] = useState(0)
  const pool = [
    { name: 'Md. Hasibul Islam', dept: 'Web Developer', time: '2 days ago', text: 'New design system components are live for the WordPress team. Please use the shared library for all new builds.', likes: 12, comments: 2, chan: 'Tech & Dev', commentsList: [] },
    { name: 'Kazi Torikul Islam', dept: 'Assistant Operation Manager', time: '3 days ago', text: 'Reminder: weekly standup moves to 10:30 AM from next Sunday.', likes: 5, comments: 0, chan: 'Announcements', commentsList: [] },
  ]
  const publish = () => {
    if (!text.trim() && !photoName) return
    const np = { name: 'Tamal Hossain', dept: 'Web Developer', time: 'Just now', text: text.trim() || 'Shared a photo with the team.', likes: 0, comments: 0, chan: cat, commentsList: [], photo: photoName }
    store.feed.unshift(np); setPosts([np, ...posts]); setText(''); setPhotoName(''); toast('Posted to ' + cat)
  }
  const addComment = (p, i) => {
    const t = (cDraft[i] || '').trim(); if (!t) return
    const list = posts.map((x, j) => j === i ? { ...x, commentsList: [...(x.commentsList || []), { by: 'Tamal Hossain', text: t }] } : x)
    setPosts(list); setCDraft({ ...cDraft, [i]: '' })
  }
  const share = () => { try { navigator.clipboard.writeText(window.location.href) } catch (e) {} toast('Post link copied to clipboard') }
  const visible = posts.filter(p => chan === 'All Channels' || p.chan === chan)
  const shown = chan === 'All Channels' ? [...visible, ...pool.slice(0, more)] : visible
  return <>
    <PageHead title="Team Feed" sub="Updates, milestones and shoutouts from the whole company." />
    <div className="home-grid"><div>
      <div className="card card-pad" style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', gap: 11 }}><Avatar name="Tamal Hossain" />
          <textarea placeholder="What's on your mind, Tamal?" value={text} onChange={e => setText(e.target.value)} style={{ flex: 1, border: '1.5px solid var(--line)', borderRadius: 16, padding: '11px 14px', resize: 'none', outline: 'none', background: '#FBFBFD', minHeight: 46 }} /></div>
        {photoName && <div style={{ marginTop: 9 }}><span className="att-chip"><Image size={12} /> {photoName}<button onClick={() => setPhotoName('')} aria-label="Remove photo"><X size={12} /></button></span></div>}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 11, flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            <button className="btn sm ghost" onClick={() => photoRef.current && photoRef.current.click()}><Image size={14} /> Photo</button>
            <input type="file" accept="image/*" ref={photoRef} style={{ display: 'none' }} onChange={e => { if (e.target.files[0]) setPhotoName(e.target.files[0].name); e.target.value = '' }} />
            <button className="btn sm ghost" onClick={() => setText(text + '@Md. Hasibul Islam ')}><AtSign size={14} /> Tag</button>
            <button className="btn sm ghost" onClick={() => setText(text + '#teamwork ')}><Hash size={14} /> Hashtag</button></div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><select className="select" value={cat} onChange={e => setCat(e.target.value)}><option>General</option><option>Announcements</option><option>Wins & Kudos</option><option>Tech & Dev</option></select>
            <button className="btn dark sm" disabled={!text.trim() && !photoName} style={{ opacity: (text.trim() || photoName) ? 1 : .45 }} onClick={publish}>Post</button></div></div>
      </div>
      {shown.length ? shown.map((p, i) => <motion.div key={p.name + i} {...fadeUp(0)} className="card post">
        <div className="post-head"><Avatar name={p.name} /><div><div className="cell-main">{p.name}</div><div className="cell-sub">{p.dept} · {p.time} · {p.chan || 'General'}</div></div></div>
        <p className="body">{p.text}</p>
        {p.photo && <div style={{ marginTop: 8 }}><span className="att-chip"><Image size={12} /> {p.photo}</span></div>}
        <div className="post-actions">
          <button onClick={() => setLiked({ ...liked, [i]: !liked[i] })} style={liked[i] ? { color: '#D64560' } : {}}><Heart size={15} fill={liked[i] ? '#D64560' : 'none'} /> Like{p.likes + (liked[i] ? 1 : 0) > 0 ? ` · ${p.likes + (liked[i] ? 1 : 0)}` : ''}</button>
          <button onClick={() => setOpenC({ ...openC, [i]: !openC[i] })}><MessageCircle size={15} /> Comment{p.comments + (p.commentsList || []).length ? ` · ${p.comments + (p.commentsList || []).length}` : ''}</button>
          <button onClick={share}><Share2 size={15} /> Share</button></div>
        {(p.commentsList || []).map((c, j) => <div key={j} style={{ display: 'flex', gap: 9, marginTop: 10 }}><Avatar name={c.by} size="sm" /><p style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.5 }}><b style={{ color: 'var(--ink)' }}>{c.by}</b> · {c.text}</p></div>)}
        {openC[i] && <div style={{ display: 'flex', gap: 8, marginTop: 11 }}><Avatar name="Tamal Hossain" size="sm" />
          <input placeholder="Write a comment…" value={cDraft[i] || ''} onChange={e => setCDraft({ ...cDraft, [i]: e.target.value })} onKeyDown={e => { if (e.key === 'Enter') addComment(p, i) }}
            style={{ flex: 1, border: '1.5px solid var(--line)', borderRadius: 12, padding: '8px 12px', outline: 'none', background: '#FBFBFD', fontSize: 13 }} />
          <button className="btn dark sm" onClick={() => addComment(p, i)}>Reply</button></div>}
      </motion.div>) : <div className="card empty"><div className="eic"><MessagesSquare size={20} /></div><h4>Nothing in this channel yet</h4><p>Posts in {chan} will appear here. Be the first to share an update.</p></div>}
      {chan === 'All Channels' && (more < pool.length
        ? <button className="btn" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setMore(more + 1)}>Load more posts</button>
        : <p className="note" style={{ textAlign: 'center' }}>You are all caught up.</p>)}
    </div>
    <div className="stack">
      <div className="card card-pad"><h3>Channels</h3>{['All Channels', 'Announcements', 'Wins & Kudos', 'Tech & Dev', 'Q&A & Help', 'Fun & Casual'].map(c =>
        <button key={c} className={`side-link ${chan === c ? 'on' : ''}`} onClick={() => setChan(c)}><MessagesSquare size={15} />{c}</button>)}</div>
      <div className="card card-pad"><h3>Trending hashtags</h3><div className="chips" style={{ marginTop: 11 }}>{['#we_demand_faria', '#newbeginnings', '#rip_telegram'].map(h =>
        <button key={h} className="chip" onClick={() => setText(text + h + ' ')}>{h} · 1</button>)}</div></div>
    </div></div>
  </>
}

function Messages() {
  const [list, setList] = useState(() => chats.map(c => ({ ...c })))
  const [sel, setSel] = useState(chats[0]); const [sentMap, setSentMap] = useState({}); const [draft, setDraft] = useState('')
  const [filter, setFilter] = useState('All'); const [q, setQ] = useState('')
  const [dlg, setDlg] = useState(null); const [emoji, setEmoji] = useState(false)
  const fileRef = useRef(null)
  const sent = sentMap[sel.id] || []
  const push = item => setSentMap({ ...sentMap, [sel.id]: [...sent, item] })
  const send = () => { if (draft.trim()) { push({ kind: 'text', text: draft.trim() }); setDraft('') } }
  const visible = list.filter(c => (filter === 'All' || (filter === 'Direct' ? !c.group : c.group)) && c.name.toLowerCase().includes(q.toLowerCase()))
  const pickMember = m => {
    const ex = list.find(c => c.name === m.name)
    if (ex) setSel(ex)
    else { const nc = { id: 'dm' + m.id, name: m.name, meta: 'Direct · ' + m.title, group: false }; setList([nc, ...list]); setSel(nc) }
    setDlg(null)
  }
  return <>
    <PageHead title="Messages" sub="Direct and group conversations with your team.">
      <button className="btn" onClick={() => setDlg('dm')}><Plus size={15} /> New DM</button><button className="btn" onClick={() => setDlg('group')}><Plus size={15} /> New group</button></PageHead>
    <div className="card split">
      <div className="split-list"><div className="sl-head"><div className="searchbar" style={{ maxWidth: 'none', margin: 0 }}><Search size={15} /><input placeholder="Search chats, people, roles…" value={q} onChange={e => setQ(e.target.value)} /></div>
        <div className="chips" style={{ marginTop: 11 }}>{[['All', list.length], ['Direct', list.filter(c => !c.group).length], ['Groups', list.filter(c => c.group).length]].map(([l, n]) => <button key={l} className={`chip ${filter === l ? 'on' : ''}`} onClick={() => setFilter(l)}>{l} · {n}</button>)}</div></div>
        {visible.length ? visible.map(c => <button key={c.id} className={`list-row ${sel.id === c.id ? 'on' : ''}`} onClick={() => setSel(c)}>
          <Avatar name={c.name} size="sm" /><span className="lr-main"><span className="lr-title">{c.name}</span><span className="lr-prev">{c.meta}</span></span></button>)
        : <p style={{ padding: 16, fontSize: 13, color: 'var(--muted)' }}>No chats match.</p>}
      </div>
      <div className="split-detail">
        <div className="sd-head"><Avatar name={sel.name} /><div style={{ flex: 1 }}><b>{sel.name}</b><div className="cell-sub">{sel.meta}</div></div>
          <button className="icon-btn" title="Voice call" onClick={() => toast('Voice calls are not part of this design prototype')}><Phone size={16} /></button>
          <button className="icon-btn" title="Video call" onClick={() => toast('Video calls are not part of this design prototype')}><Video size={16} /></button></div>
        <div className="sd-body">
          {sent.length === 0 ? <div style={{ textAlign: 'center', color: 'var(--muted)', paddingTop: 42 }}><Sparkles size={22} style={{ marginBottom: 8 }} />
            <p style={{ fontWeight: 700, color: 'var(--ink)' }}>Say hello</p><p style={{ fontSize: 13, marginTop: 3 }}>This is the start of your conversation with {sel.name}.</p></div>
          : sent.map((m, i) => m.kind === 'file'
            ? <div key={i} className="bubble-me" style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Paperclip size={14} /><span><b>{m.name}</b> · {fmtSize(m.size)}<br /><a href={m.url} download={m.name} style={{ color: '#fff', textDecoration: 'underline', fontSize: 12 }}>Download</a></span></div>
            : <div key={i} className="bubble-me">{m.text}</div>)}
        </div>
        <div className="composer">
          {emoji && <div style={{ display: 'flex', gap: 4, marginBottom: 9 }}>{['😀', '😂', '👍', '🎉', '🔥', '❤️', '🙏', '💯'].map(e => <button key={e} className="btn sm ghost" onClick={() => setDraft(draft + e)}>{e}</button>)}</div>}
          <div style={{ display: 'flex', gap: 8 }}>
          <button className="icon-btn" onClick={() => fileRef.current && fileRef.current.click()}><Paperclip size={16} /></button>
          <input type="file" ref={fileRef} style={{ display: 'none' }} onChange={e => { const f = e.target.files[0]; if (f) push({ kind: 'file', name: f.name, size: f.size, url: URL.createObjectURL(f) }); e.target.value = '' }} />
          <textarea placeholder="Type a message… (Enter to send)" value={draft} onChange={e => setDraft(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }} />
          <button className="icon-btn" onClick={() => setEmoji(!emoji)}><Smile size={16} /></button>
          <button className="btn dark" disabled={!draft.trim()} style={{ opacity: draft.trim() ? 1 : .45 }} onClick={send}><Send size={15} /></button></div></div>
      </div>
    </div>
    {dlg === 'dm' && <Modal title="New direct message" sub="Pick a team member to start a conversation." submit="Close" onClose={() => setDlg(null)}>
      {team.filter(m => m.name !== 'Tamal Hossain').map(m => <button key={m.id} className="list-row" style={{ width: '100%' }} onClick={() => pickMember(m)}>
        <Avatar name={m.name} size="sm" /><span className="lr-main"><span className="lr-title">{m.name}</span><span className="lr-prev">{m.title} · {m.role}</span></span></button>)}</Modal>}
    {dlg === 'group' && <Modal title="Create a group" sub="Group chats are for project squads and team discussions." submit="Create group" onClose={() => setDlg(null)}
      onSubmit={fd => { const name = (fd.get('gname') || 'New group').toString(); const nc = { id: 'g' + Date.now(), name, meta: 'Group · Created by you · 1 member', group: true }; setList([nc, ...list]); setSel(nc); setDlg(null); toast('Group created · ' + name) }}>
      <div className="field"><label>Group name <i>*</i></label><input name="gname" required placeholder="e.g. WordPress Squad" /></div>
      <div className="field"><label>Members</label><p className="note">You can add members from the team list after creating the group (prototype keeps it to you for now).</p></div></Modal>}
  </>
}

function Learning({ setModal }) {
  const cats = ['All', 'Development & Code', 'UI/UX & Design', 'Sales & Client Negotiation', 'SQA & Bug Hunting', 'Operations & Management', 'Tools & Productivity', 'Soft Skills & English']
  const [cat, setCat] = useState('All'); const [tab, setTab] = useState('Explore library'); const [q, setQ] = useState('')
  const [list] = useState(() => [...store.tutorials])
  const shown = list.filter(t => (cat === 'All' || t.category === cat) && (t.title + (t.tags || '')).toLowerCase().includes(q.toLowerCase()))
  return <>
    <PageHead title="Learn & Improvement" sub="Video masterclasses and playlists shared by the team, for the team.">
      <button className="btn dark" onClick={() => setModal('tutorial')}><Plus size={15} /> Submit tutorial</button></PageHead>
    <div className="tabs">{['Explore library', 'My submissions'].map(t => <button key={t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>{t}{t === 'My submissions' && list.length ? ` · ${list.length}` : ''}</button>)}</div>
    <div className="toolbar"><div className="searchbar"><Search size={15} /><input placeholder="Search tutorials, skills, tags…" value={q} onChange={e => setQ(e.target.value)} /></div></div>
    <div className="chips" style={{ marginBottom: 16 }}>{cats.map(c => <button key={c} className={`chip ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>{c}</button>)}</div>
    {shown.length ? <div className="cards-grid">{shown.map((t, i) => <motion.div key={i} {...fadeUp(i)} whileHover={{ y: -5 }} className="card pcard" style={{ cursor: 'pointer' }} onClick={() => toast('This tutorial player connects in the full system')}>
      <div className="video-thumb"><Blob className="video-blob" /><span className="play-btn"><PlayCircle size={28} /></span></div>
      <div style={{ marginTop: 11 }}><Pill tone="blue">{t.category}</Pill></div>
      <h4 style={{ marginTop: 9 }}>{t.title}</h4>
      <div className="meta"><span>{t.format} · Submitted by you</span>{t.tags ? <span>{t.tags}</span> : null}</div></motion.div>)}</div>
    : <Empty icon={GraduationCap} title={tab === 'My submissions' ? 'No submissions yet' : 'No tutorials yet'} text={tab === 'My submissions' ? 'Tutorials you submit will appear here for review.' : 'Be the first to submit a practical video tutorial or course playlist for the team.'}>
      <button className="btn dark" onClick={() => setModal('tutorial')}>Submit a tutorial</button></Empty>}
  </>
}

function TeamPage({ go }) {
  const [q, setQ] = useState(''); const [f, setF] = useState('All')
  const lead = m => m.role !== 'Member'
  const shown = team.filter(m => m.name.toLowerCase().includes(q.toLowerCase()) && (f === 'All' || (f === 'Leadership' ? lead(m) : !lead(m))))
  return <>
    <PageHead title="My Team" sub="Bro Code (WordPress) · Day Shift · 14 members · Established Aug 26, 2026">
      <button className="btn" onClick={() => go('tasks')}>View full team pipeline</button></PageHead>
    <div className="cards-grid" style={{ marginBottom: 14 }}>{team.slice(0, 2).map(m => <div className="card pcard lead-card" key={m.id}>
      <div className="cell-sub" style={{ textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 700, fontSize: 11 }}>{m.role}</div>
      <div style={{ display: 'flex', gap: 11, alignItems: 'center', marginTop: 9 }}><Avatar name={m.name} /><div><div className="cell-main">{m.name}</div><div className="cell-sub">{m.title} · ID {m.id} · {m.pts} pts</div></div></div>
      <div style={{ display: 'flex', gap: 8, marginTop: 13 }}><button className="btn sm" onClick={() => toast('Reach ' + m.name.split(' ')[0] + ' instantly from the Messages page')}>Send email</button><button className="btn sm" onClick={() => toast('Calls are not part of this design prototype')}>Call</button></div></div>)}
      <div className="card pcard"><div className="knum" style={{ fontSize: 30 }}>14</div><div className="kfoot">Total members · Day shift schedule</div></div></div>
    <div className="toolbar"><div className="searchbar"><Search size={15} /><input placeholder="Search colleagues…" value={q} onChange={e => setQ(e.target.value)} /></div>
      <div className="chips">{[['All', team.length], ['Leadership', team.filter(lead).length], ['Members', team.filter(m => !lead(m)).length]].map(([l, n]) => <button key={l} className={`chip ${f === l ? 'on' : ''}`} onClick={() => setF(l)}>{l} · {n}</button>)}</div></div>
    <div className="cards-grid">{shown.map((m, i) => <motion.div className="card pcard" key={m.id} {...fadeUp(i)} whileHover={{ y: -5 }} style={{ cursor: 'pointer' }} onClick={() => toast(m.name + ' · ' + m.title + ' · ' + m.pts + ' pts')}>
      <div style={{ display: 'flex', gap: 11, alignItems: 'center' }}><Avatar name={m.name} /><div><div className="cell-main">{m.name}</div><div className="cell-sub">{m.title} · ID {m.id}</div></div></div>
      <div className="meta"><span>{m.role}</span><span>{m.pts} pts</span></div></motion.div>)}</div>
  </>
}

function Notices() {
  const [liked, setLiked] = useState(false); const [refreshing, setRefreshing] = useState(false)
  const [f, setF] = useState('All'); const [q, setQ] = useState('')
  const [openC, setOpenC] = useState(false); const [comments, setComments] = useState([]); const [cDraft, setCDraft] = useState('')
  const match = f !== 'Direct to me' && ('system server update dear team maintenance performance stability security').includes(q.toLowerCase().split(' ')[0] || '') || (f !== 'Direct to me' && !q)
  const addComment = () => { if (!cDraft.trim()) return; setComments([...comments, { by: 'Tamal Hossain', text: cDraft.trim() }]); setCDraft('') }
  return <>
    <PageHead title="Notices" sub="Official company announcements, directives and event notices.">
      <button className="btn" style={refreshing ? { opacity: .5 } : {}} onClick={() => { setRefreshing(true); setTimeout(() => { setRefreshing(false); toast('Notices are up to date') }, 700) }}>{refreshing ? 'Refreshing…' : 'Refresh'}</button></PageHead>
    <div className="toolbar"><div className="searchbar"><Search size={15} /><input placeholder="Search announcements, headlines, authors…" value={q} onChange={e => setQ(e.target.value)} /></div>
      <div className="chips">{['All', 'Company-wide', 'Pinned', 'Direct to me'].map(c => <button key={c} className={`chip ${f === c ? 'on' : ''}`} onClick={() => setF(c)}>{c}{c === 'All' ? ' · 1' : ''}</button>)}</div></div>
    {match ? <div className="card post" style={{ maxWidth: 720 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Pill>General Notice</Pill><Pill>All Company</Pill><span style={{ fontSize: 12, color: 'var(--muted)' }}>1 seen</span></div>
      <h3 style={{ fontSize: 17, marginTop: 12 }}>System Server Update</h3>
      <div className="cell-sub" style={{ marginTop: 3 }}>System Admin · Oct 8, 2026 at 11:40 AM</div>
      <p className="body" style={{ marginTop: 10 }}>Dear Team, Please be informed that we will be performing a system server update and maintenance to improve server performance, stability, security, and overall system reliability.</p>
      <div className="post-actions">
        <button onClick={() => setLiked(!liked)} style={liked ? { color: '#D64560' } : {}}><Heart size={15} fill={liked ? '#D64560' : 'none'} /> {2 + (liked ? 1 : 0)} Likes</button>
        <button onClick={() => setOpenC(!openC)}><MessageCircle size={15} /> {comments.length} Comments</button></div>
      {comments.map((c, i) => <div key={i} style={{ display: 'flex', gap: 9, marginTop: 10 }}><Avatar name={c.by} size="sm" /><p style={{ fontSize: 13, color: 'var(--ink2)', lineHeight: 1.5 }}><b style={{ color: 'var(--ink)' }}>{c.by}</b> · {c.text}</p></div>)}
      {openC && <div style={{ display: 'flex', gap: 8, marginTop: 11 }}><Avatar name="Tamal Hossain" size="sm" />
        <input placeholder="Write a comment…" value={cDraft} onChange={e => setCDraft(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addComment() }}
          style={{ flex: 1, border: '1.5px solid var(--line)', borderRadius: 12, padding: '8px 12px', outline: 'none', background: '#FBFBFD', fontSize: 13 }} />
        <button className="btn dark sm" onClick={addComment}>Reply</button></div>}
    </div>
    : <Empty icon={Megaphone} title="No notices here" text={f === 'Direct to me' ? 'No notices have been sent directly to you.' : 'No notices match your search.'} />}
  </>
}

function Bugs({ setModal }) {
  const [list] = useState(() => [...store.bugs])
  const [f, setF] = useState('Total')
  const chips = ['Total', 'Pending review', 'In progress', 'Resolved', 'Critical']
  const match = b => f === 'Total' || (f === 'Critical' ? (b.severity || '').startsWith('Critical') : b.status === f)
  const shown = list.filter(match)
  const count = lbl => lbl === 'Total' ? list.length : list.filter(b => lbl === 'Critical' ? (b.severity || '').startsWith('Critical') : b.status === lbl).length
  return <>
    <PageHead title="Bug Reports" sub="Track your submitted bugs, status changes and admin replies.">
      <button className="btn dark" onClick={() => setModal('bug')}><Plus size={15} /> Report a bug</button></PageHead>
    <div className="chips" style={{ marginBottom: 14 }}>{chips.map(c => <button key={c} className={`chip ${f === c ? 'on' : ''}`} onClick={() => setF(c)}>{c} · {count(c)}</button>)}</div>
    {shown.length ? <div className="stack">{shown.map((b, i) => <div className="card card-pad" key={i}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}><Pill tone={(b.severity || '').startsWith('Critical') ? 'red' : 'amber'}>{b.severity}</Pill><Pill>{b.module}</Pill>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>Reported by you · Just now</span>
        <span style={{ marginLeft: 'auto' }}><Pill tone="blue">{b.status}</Pill></span></div>
      <h3 style={{ marginTop: 11, fontSize: 15.5 }}>{b.summary}</h3>
      {b.details ? <p style={{ color: 'var(--ink2)', lineHeight: 1.6, marginTop: 6, fontSize: 13.5 }}>{b.details}</p> : null}</div>)}</div>
    : <Empty icon={Bug} title="No bug reports" text="There are no recorded bug reports in the system. Found something broken? Report it with a screenshot and it goes straight to the dev & SQA team.">
      <button className="btn dark" onClick={() => setModal('bug')}>Submit first report</button></Empty>}
  </>
}

function Account() {
  const [edit, setEdit] = useState(false)
  const [pw, setPw] = useState(false)
  const [links, setLinks] = useState([])
  return <>
    <PageHead title="My Account" sub="Profile, credentials and team assignment.">
      <button className="btn" onClick={() => setPw(true)}>Change password</button>
      <button className={`btn ${edit ? '' : 'dark'}`} onClick={() => setEdit(!edit)}>{edit ? 'Cancel editing' : 'Edit profile'}</button></PageHead>
    <div className="card card-pad" style={{ marginBottom: 14, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Avatar name="Tamal Hossain" size="lg" />
      <div style={{ flex: 1, minWidth: 220 }}><div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><b style={{ fontSize: 16 }}>Tamal Hossain</b><Pill tone="green">Active</Pill><Pill>Operation</Pill></div>
        <div className="cell-sub" style={{ marginTop: 3 }}>Web Developer · tamal@softvence.com · Bro Code (WordPress)</div></div>
      <div style={{ width: 220 }}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}><span>Profile completion</span><b style={{ color: 'var(--ink)' }}>91%</b></div>
        <div className="progress"><i style={{ width: '91%' }} /></div></div>
    </div>
    <div className="stack">
      {[['Identity', [['Username', '@tamalhossain16834'], ['Email', 'tamal@softvence.com'], ['First name', 'Tamal'], ['Last name', 'Hossain']]],
        ['Professional', [['Designation', 'Web Developer'], ['Phone', 'On file'], ['Team', 'Bro Code (WordPress) · Day Shift']]],
        ['Personal', [['Date of birth', 'Not added'], ['Blood group', 'Not added'], ['Address', 'Not added']]]].map(([t, fields]) =>
        <div className="card card-pad" key={t}><h3>{t} information</h3><div className="kv" style={{ marginTop: 13 }}>
          {fields.map(([l, v]) => <div key={l}><label>{l}</label>{edit && l !== 'Username' ? <input defaultValue={v === 'Not added' ? '' : v} placeholder={v} style={{ border: '1.5px solid var(--line)', borderRadius: 10, padding: '7px 10px', width: '100%', outline: 'none' }} /> : <b>{v}</b>}</div>)}
        </div></div>)}
      <div className="card card-pad"><h3>Portfolio links</h3><div className="sub">GitHub, Figma, Behance, LinkedIn, Upwork or custom links, visible to your team leads.</div>
        {links.length === 0 && !edit && <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 12 }}>No profile links configured yet.</p>}
        {!edit && links.map((l, i) => <p key={i} style={{ fontSize: 13, marginTop: 8 }}><a href={l.startsWith('http') ? l : 'https://' + l} target="_blank" rel="noreferrer" style={{ color: 'var(--violet-dark)', fontWeight: 600 }}>{l}</a></p>)}
        {edit && links.map((l, i) => <div key={i} style={{ display: 'flex', gap: 8, marginTop: 9 }}>
          <input value={l} onChange={e => setLinks(links.map((x, j) => j === i ? e.target.value : x))} placeholder="https://github.com/you" style={{ flex: 1, border: '1.5px solid var(--line)', borderRadius: 10, padding: '8px 11px', outline: 'none' }} />
          <button className="btn sm ghost" style={{ color: '#D64545' }} onClick={() => setLinks(links.filter((_, j) => j !== i))}><X size={13} /></button></div>)}
        <button className="btn sm" style={{ marginTop: 10 }} onClick={() => { if (!edit) setEdit(true); setLinks([...links, '']) }}><Plus size={14} /> Add link</button></div>
      {edit && <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 9 }}><button className="btn" onClick={() => setEdit(false)}>Discard changes</button><button className="btn dark" onClick={() => { setEdit(false); setLinks(links.filter(l => l.trim())); toast('Profile changes saved') }}>Save changes</button></div>}
    </div>
    {pw && <Modal title="Change password" sub="Use a strong password you do not reuse anywhere else." submit="Update password" onClose={() => setPw(false)}
      onSubmit={() => { setPw(false); toast('Password updated (prototype only, nothing is stored)') }}>
      <div className="field"><label>Current password <i>*</i></label><input type="password" name="current" required placeholder="••••••••" /></div>
      <div className="field"><label>New password <i>*</i></label><input type="password" name="next" required placeholder="••••••••" /></div></Modal>}
  </>
}

/* ---------------- shell ---------------- */
const NAV = [
  ['Overview', [['home', 'Dashboard', LayoutDashboard]]],
  ['Work', [['projects', 'Projects', FolderKanban], ['inbox', 'Client Inbox', Inbox, 2], ['pending', 'Pending Approvals', Clock3], ['tasks', 'Tasks', SquareKanban]]],
  ['Resolve', [['issues', 'Issues', CircleAlert], ['concerns', 'Concerns', LifeBuoy], ['bugs', 'Bug Reports', Bug]]],
  ['Team', [['feed', 'Team Feed', Rss], ['messages', 'Messages', MessagesSquare], ['team', 'My Team', Users], ['learning', 'Learning', GraduationCap]]],
  ['Company', [['notices', 'Notices', Megaphone], ['videos', 'Instruction Videos', PlayCircle]]],
]
const TITLES = { home: 'Dashboard', projects: 'Projects', project: 'Project Details', inbox: 'Client Inbox', pending: 'Pending Approvals', tasks: 'Tasks', issues: 'Issues', concerns: 'Concerns', bugs: 'Bug Reports', feed: 'Team Feed', messages: 'Messages', team: 'My Team', learning: 'Learn & Improvement', notices: 'Notices', videos: 'Instruction Videos', account: 'My Account' }

export default function App() {
  const [page, setPage] = useState('home'); const [project, setProject] = useState(null)
  const [modal, setModal] = useState(null); const [showNotifs, setShowNotifs] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [pushOn, setPushOn] = useState(false); const [readN, setReadN] = useState([])
  const [loggedOut, setLoggedOut] = useState(false)
  const [sq, setSq] = useState(''); const [globalQ, setGlobalQ] = useState('')
  const [tick, setTick] = useState(0); const [tutFmt, setTutFmt] = useState('Single video')
  const [pendTab, setPendTab] = useState(0); const [vidCat, setVidCat] = useState('All')
  useEffect(() => { const h = e => setToastMsg(e.detail); window.addEventListener('sv-toast', h); return () => window.removeEventListener('sv-toast', h) }, [])
  useEffect(() => { if (!toastMsg) return; const t = setTimeout(() => setToastMsg(''), 2800); return () => clearTimeout(t) }, [toastMsg])
  const go = p => { setPage(p); setShowNotifs(false); window.scrollTo(0, 0) }
  const openProject = p => { setProject(p); setPage('project'); window.scrollTo(0, 0) }
  const submitTask = fd => { const t = { title: (fd.get('title') || 'Untitled task').toString(), assignee: fd.get('assignee'), due: fd.get('due'), priority: fd.get('priority'), status: fd.get('status'), project: fd.get('project'), details: fd.get('details') }; store.tasks.push(t); setModal(null); setTick(x => x + 1); toast('Task created · ' + t.title) }
  const submitConcern = fd => { store.concerns.push({ title: (fd.get('title') || 'Untitled concern').toString(), project: fd.get('project'), category: fd.get('category'), severity: fd.get('severity'), details: fd.get('details'), status: 'Open' }); setModal(null); setTick(x => x + 1); toast('Concern sent to your PM') }
  const submitBug = fd => { store.bugs.push({ summary: (fd.get('summary') || 'Untitled bug').toString(), module: fd.get('module'), severity: fd.get('severity'), details: fd.get('details'), status: 'Pending review' }); setModal(null); setTick(x => x + 1); toast('Bug report submitted') }
  const submitTutorial = fd => { store.tutorials.push({ title: (fd.get('title') || 'Untitled tutorial').toString(), category: fd.get('category'), tags: fd.get('tags'), overview: fd.get('overview'), link: fd.get('link'), format: tutFmt }); setModal(null); setTick(x => x + 1); toast('Tutorial submitted for review') }

  return <div className="stage"><div className="frame">
    <aside className="rail">
      <div className="rail-logo" title="Softvence"><img className="logo-t" src={tUrl} alt="Softvence" /><img className="logo-full" src={logoWhiteUrl} alt="Softvence" /></div>
      <nav className="rail-nav">{NAV.map(([group, items]) => <div className="rail-group" key={group}>
        <div className="rail-group-label">{group}</div>
        {items.map(([key, label, Icon, badge]) => <button key={key} data-label={label} className={`rail-item ${page === key || (key === 'projects' && page === 'project') ? 'active' : ''}`} onClick={() => go(key)}>
          <Icon size={19} /><span className="rail-label">{label}</span>{badge ? <span className="rail-badge">{badge}</span> : null}</button>)}
      </div>)}</nav>
      <button className="rail-item" data-label="Log out" onClick={() => setLoggedOut(true)}><LogOut size={19} /><span className="rail-label">Log out</span></button>
      <button className="rail-avatar" data-label="My Account" onClick={() => go('account')}><Avatar name="Tamal Hossain" size="sm" /><span className="rail-label">Tamal Hossain</span></button>
    </aside>

    <div className="main">
      <header className="topbar">
        <span className="crumb brand"><img className="brand-logo" src={logoUrl} alt="Softvence" /><i>/</i> <b>{TITLES[page]}</b></span>
        <div className="searchbar"><Search size={15} /><input placeholder="Search projects, people, tasks…" value={sq} onChange={e => setSq(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { setGlobalQ(sq); go('projects') } }} /><kbd>⌘K</kbd></div>
        <button className="date-pill" style={{ border: 'none', cursor: 'pointer' }} onClick={() => go('home')}><CalendarDays size={14} /> Mon, Oct 26</button>
        <div style={{ position: 'relative' }}>
          <button className="icon-btn round" onClick={() => setShowNotifs(!showNotifs)}><Bell size={17} />{readN.length < notifications.length && <span className="ping" />}</button>
          {showNotifs && <div className="pop"><div className="pop-head"><b>Notifications</b><button className="btn sm ghost" onClick={() => { setPushOn(!pushOn); toast(pushOn ? 'Device push turned off' : 'Device push enabled') }}>{pushOn ? 'Push enabled' : 'Enable device push'}</button></div>
            {notifications.map((n, i) => <button className="pop-item" key={i} style={readN.includes(i) ? { opacity: .55 } : {}} onClick={() => { setReadN([...readN, i]); setShowNotifs(false); go('projects') }}><Avatar name="Md. Hasibul Islam" size="sm" /><span><p><b>{n.tag}</b> · {n.text}</p><time>{n.date}</time></span></button>)}
            <button className="pop-item" style={{ justifyContent: 'center', fontWeight: 700, fontSize: 13 }} onClick={() => { setReadN(notifications.map((_, i) => i)); setShowNotifs(false); toast('You are all caught up') }}>Mark all as read</button></div>}
        </div>
        <button className="btn dark" onClick={() => setModal('task')}><Plus size={15} /> New task</button>
      </header>

      <motion.main className="content" key={page} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
        {page === 'home' && <Home go={go} openProject={openProject} />}
        {page === 'projects' && <Projects key={'p' + globalQ} openProject={openProject} initialQ={globalQ} />}
        {page === 'project' && <ProjectDetail project={project} back={() => go('projects')} go={go} />}
        {page === 'inbox' && <InboxPage openProject={openProject} />}
        {page === 'pending' && <><PageHead title="Pending Approvals" sub="Messages waiting for review before final client delivery." />
          <div className="tabs"><button className={pendTab === 0 ? 'on' : ''} onClick={() => setPendTab(0)}>All messages · 0</button><button className={pendTab === 1 ? 'on' : ''} onClick={() => setPendTab(1)}>My pending · 0</button></div>
          <Empty icon={CheckCircle2} title="Nothing pending" text="All project messages have been reviewed and approved. New items needing your approval will appear here first."><button className="btn" onClick={() => go('inbox')}>Open Client Inbox</button></Empty></>}
        {page === 'tasks' && <Tasks key={'t' + tick} setModal={setModal} />}
        {page === 'issues' && <><PageHead title="Issues" sub="Task revisions and issue tickets on your projects, counted the same way everywhere." />
          <Empty icon={CircleAlert} title="No open issues" text="There are no active issue tickets on your projects right now. Issues raised inside a project timeline will show up here."><button className="btn" onClick={() => go('projects')}>Browse projects</button></Empty></>}
        {page === 'concerns' && <Concerns key={'c' + tick} setModal={setModal} />}
        {page === 'bugs' && <Bugs key={'b' + tick} setModal={setModal} />}
        {page === 'feed' && <Feed />}
        {page === 'messages' && <Messages />}
        {page === 'team' && <TeamPage go={go} />}
        {page === 'learning' && <Learning key={'l' + tick} setModal={setModal} />}
        {page === 'notices' && <Notices />}
        {page === 'videos' && <><PageHead title="Instruction Videos" sub="Role-tailored walkthroughs and SOP guides to help you master each workflow." />
          <div className="toolbar"><div className="searchbar"><Search size={15} /><input placeholder="Search guides by title, category or notes…" /></div>
            <div className="chips">{['All', 'General'].map(c => <button key={c} className={`chip ${vidCat === c ? 'on' : ''}`} onClick={() => setVidCat(c)}>{c}</button>)}</div></div>
          <div className="cards-grid"><motion.div className="card pcard" {...fadeUp(0)} whileHover={{ y: -5 }} style={{ cursor: 'pointer', textAlign: 'left' }} onClick={() => setModal('video')}><div className="video-thumb"><Blob className="video-blob" /><span className="play-btn"><PlayCircle size={30} /></span></div>
            <Pill>General</Pill><h4 style={{ marginTop: 9 }}>Operation Member: Step-by-Step Video Tutorial</h4>
            <div className="meta"><span>For Operation role</span><span style={{ marginLeft: 'auto', color: 'var(--violet-dark)', fontWeight: 700 }}>Watch →</span></div></motion.div></div></>}
        {page === 'account' && <Account />}
      </motion.main>
    </div>

    {modal === 'task' && <Modal title="Create a task" sub="A clear title, one owner and a due date. Everything else is optional." submit="Create task" onClose={() => setModal(null)} onSubmit={submitTask}>
      <div className="field"><label>Task title <i>*</i></label><input name="title" required placeholder="e.g. Complete responsive layout for checkout page" /></div>
      <div className="frow"><div className="field"><label>Assign to <i>*</i></label><select name="assignee"><option>Tamal Hossain</option><option>Md. Hasibul Islam</option><option>Md. Sajid Miah</option></select></div>
        <div className="field"><label>Due date & time</label><input name="due" type="datetime-local" /></div></div>
      <div className="frow"><div className="field"><label>Priority</label><select name="priority"><option>Medium</option><option>High</option><option>Low</option></select></div>
        <div className="field"><label>Initial status</label><select name="status"><option>To Do</option><option>In Progress</option></select></div></div>
      <div className="field"><label>Related project</label><select name="project"><option>General</option>{projects.map(p => <option key={p.id}>{p.client}</option>)}</select></div>
      <div className="field"><label>Details & instructions</label><textarea name="details" placeholder="Clear steps, deliverables, attachments and context…" /></div></Modal>}

    {modal === 'concern' && <Modal title="Raise a concern" sub="Stuck on an assigned project? Describe the blocker. Your Project Manager will review it and suggest a solution here." submit="Submit to PM" onClose={() => setModal(null)} onSubmit={submitConcern}>
      <div className="field"><label>Project <i>*</i></label><select name="project">{projects.map(p => <option key={p.id}>{p.client} · {p.order}</option>)}</select></div>
      <div className="field"><label>Concern title <i>*</i></label><input name="title" required placeholder="e.g. Stuck on custom checkout webhook verification" /></div>
      <div className="frow"><div className="field"><label>Category</label><select name="category"><option>Technical Blocker</option><option>Client / Content</option><option>Access / Tools</option></select></div>
        <div className="field"><label>Severity</label><select name="severity"><option>High · work blocked</option><option>Medium</option><option>Low</option></select></div></div>
      <div className="field"><label>What is happening? <i>*</i></label><textarea name="details" placeholder="Expected vs current behaviour, what you already tried, and the decision or help you need from the PM…" /></div>
      <div className="field"><label>Attachments</label><FilePick label="Upload a screenshot or file" /></div></Modal>}

    {modal === 'bug' && <Modal title="Report a bug" sub="Help the dev & SQA team investigate and fix defects quickly." submit="Submit bug report" onClose={() => setModal(null)} onSubmit={submitBug}>
      <div className="field"><label>Bug summary <i>*</i></label><input name="summary" required placeholder="e.g. Order ID dropdown is empty in the issue modal" /></div>
      <div className="frow"><div className="field"><label>Module / area <i>*</i></label><select name="module"><option>UI / UX & Layout</option><option>Projects</option><option>Messages</option></select></div>
        <div className="field"><label>Severity <i>*</i></label><select name="severity"><option>Medium · normal function affected</option><option>Critical</option><option>Low</option></select></div></div>
      <div className="field"><label>Detailed description <i>*</i></label><textarea name="details" placeholder="What happened, any error messages, and what went wrong…" /></div>
      <div className="field"><label>Screenshots / logs</label><FilePick label="Drag & drop files, or browse" /></div></Modal>}

    {modal === 'tutorial' && <Modal title="Submit a tutorial" sub="Share a practical video or playlist the whole team can learn from." submit="Submit tutorial" onClose={() => setModal(null)} onSubmit={submitTutorial}>
      <div className="field"><label>Format</label><div className="seg"><button type="button" className={tutFmt === 'Single video' ? 'on' : ''} onClick={() => setTutFmt('Single video')}>Single video</button><button type="button" className={tutFmt !== 'Single video' ? 'on' : ''} onClick={() => setTutFmt('Multi-lesson playlist')}>Multi-lesson playlist</button></div></div>
      <div className="field"><label>Tutorial title <i>*</i></label><input name="title" required placeholder="e.g. Masterclass: Closing enterprise contracts" /></div>
      <div className="frow"><div className="field"><label>Skill category</label><select name="category"><option>Development & Code</option><option>UI/UX & Design</option><option>Sales & Client Negotiation</option></select></div>
        <div className="field"><label>Tags</label><input name="tags" placeholder="React, Figma, Sales…" /></div></div>
      <div className="field"><label>What will the team learn?</label><textarea name="overview" placeholder="A short overview…" /></div>
      <div className="field"><label>Video link</label><input name="link" placeholder="Paste a YouTube, Loom, Vimeo or Drive link…" /></div></Modal>}

    {modal === 'video' && <Modal title="Operation Member: Step-by-Step Video Tutorial" sub="General · For Operation role · Softvence SOP library" submit="Done" onClose={() => setModal(null)}>
      <div className="video-thumb" style={{ height: 200, marginBottom: 14 }}><Blob className="video-blob" /><span className="play-btn"><PlayCircle size={44} /></span></div>
      <div className="field"><label>What this covers</label><p className="note">Dashboard navigation, project timelines, client messages, tasks, concerns and bug reports. The full member workflow, from login to delivery.</p></div>
      <div className="field"><label>Chapters</label><p className="note">1 · Getting around the dashboard &nbsp; 2 · Projects & timelines &nbsp; 3 · Messages & approvals &nbsp; 4 · Tasks, concerns & bugs</p></div>
      <p className="note">Video playback connects when this design is implemented in the live system.</p></Modal>}

    {toastMsg && <motion.div className="toast" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}><CheckCircle2 size={15} /> {toastMsg}</motion.div>}
    {loggedOut && <div className="overlay"><motion.div className="modal" style={{ textAlign: 'center', maxWidth: 380 }} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }}>
      <img src={logoUrl} alt="Softvence" style={{ height: 30, margin: '4px auto 12px', display: 'block' }} />
      <h2>You have signed out</h2><p className="msub">This is a design prototype, so no real session ends here.</p>
      <button className="btn dark" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} onClick={() => { setLoggedOut(false); toast('Welcome back, Tamal') }}>Sign back in</button></motion.div></div>}
  </div></div>
}
