
import React, { useState } from 'react'
import { ModuleLayout, PrimaryButton, Badge } from '../components/UI.jsx'
import { useApp } from '../App.jsx'

function todayStr(){ return new Date().toISOString().slice(0,10) }

export default function Portfolio(){
  const { state, setState } = useApp()
  const [title, setTitle] = useState('')
  const [reflection, setReflection] = useState('')
  const [tags, setTags] = useState('值班, 溝通')

  function addEntry(){
    if (!title) return
    const entry = { id: Date.now(), date: todayStr(), title, reflection, tags: tags.split(',').map(t=>t.trim()).filter(Boolean) }
    setState(s=>({...s, portfolio:[entry, ...s.portfolio]}))
    setTitle(''); setReflection('')
  }

  return (
    <ModuleLayout title="個人學習歷程">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {state.portfolio.map(p=>(
            <div key={p.id} className="card">
              <div className="flex items-center justify-between">
                <div className="text-sm text-neutral-500">{p.date}</div>
                <div className="flex gap-2">{p.tags.map((t,i)=>(<span key={i} className="badge">#{t}</span>))}</div>
              </div>
              <div className="mt-2 font-semibold text-neutral-800">{p.title}</div>
              <div className="mt-1 text-neutral-700 text-sm whitespace-pre-wrap">{p.reflection}</div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <div className="card">
            <div className="font-semibold">新增學習事件</div>
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="事件標題" className="w-full rounded-xl border px-3 py-2 mt-2" />
            <textarea value={reflection} onChange={e=>setReflection(e.target.value)} placeholder={"反思建議：\n1. 事情經過\n2. 做得好的地方\n3. 下次可改進\n4. 需支援/資源"} rows={6} className="w-full rounded-xl border px-3 py-2 mt-2" />
            <input value={tags} onChange={e=>setTags(e.target.value)} placeholder="以逗號分隔的標籤" className="w-full rounded-xl border px-3 py-2 mt-2" />
            <div className="mt-3"><PrimaryButton onClick={addEntry}>加入紀錄</PrimaryButton></div>
          </div>
        </div>
      </div>
    </ModuleLayout>
  )
}
