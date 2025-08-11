
import React, { useState } from 'react'
import { useApp } from '../App.jsx'

const avatars = [
  { id: 1, name: '阿心醫師', emoji: '🩺', role: '內科PGY' },
  { id: 2, name: '小外', emoji: '🔪', role: '外科PGY' },
  { id: 3, name: '急急國王', emoji: '🚑', role: '急診PGY' },
  { id: 4, name: '小兒派', emoji: '🍼', role: '兒科PGY' },
  { id: 5, name: '產檢俠', emoji: '🤰', role: '婦產PGY' },
  { id: 6, name: '影像眼', emoji: '🩻', role: '放射PGY' },
  { id: 7, name: '精神丸', emoji: '🧠', role: '身心PGY' },
  { id: 8, name: '麻吉手', emoji: '😴', role: '麻醉PGY' },
]

export default function Login(){
  const { state, setState } = useApp()
  const [name, setName] = useState(state.profile.name || '')
  const [avatarId, setAvatarId] = useState(state.profile.avatarId || 1)

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900">PGY ILP 個人化學習｜選擇你的虛擬人物</h1>
        <p className="mt-2 text-neutral-600">選好你的角色，開始像闖關一樣完成學習任務。</p>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {avatars.map(a => (
            <button key={a.id} onClick={()=>setAvatarId(a.id)} className={"rounded-2xl border p-4 bg-white text-left shadow-sm hover:shadow-md transition " + (avatarId===a.id ? "ring-2 ring-violet-500" : "")}>
              <div className="text-5xl">{a.emoji}</div>
              <div className="mt-3 font-semibold text-neutral-800">{a.name}</div>
              <div className="text-sm text-neutral-500">{a.role}</div>
            </button>
          ))}
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="card">
            <div className="font-semibold text-neutral-800">輸入暱稱</div>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="例：小吳醫師" className="w-full mt-2 rounded-xl border border-neutral-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500" />
          </div>
          <div className="card">
            <div className="font-semibold text-neutral-800">學習風格</div>
            <div className="mt-2 flex flex-wrap gap-2 text-sm">
              <span className="badge">任務導向</span>
              <span className="badge">情境模擬</span>
              <span className="badge">OSCE 反饋</span>
            </div>
          </div>
          <div className="card">
            <div className="font-semibold text-neutral-800">遊戲化設定</div>
            <div className="mt-2 text-neutral-600">完成任務獲得 ⭐ 分數與 🏆 徽章；累積升級解鎖新關卡。</div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button className="btn-primary" onClick={()=>{
            if(!name) return alert('請先輸入暱稱')
            setState(s=>({...s, profile:{name, avatarId}, signedIn:true}))
          }}>進入學習空間</button>
          <span className="text-neutral-500 text-sm">登入後可在設定更換角色</span>
        </div>
      </div>
    </div>
  )
}
