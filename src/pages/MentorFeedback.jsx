
import React, { useState } from 'react'
import { ModuleLayout, PrimaryButton, Badge } from '../components/UI.jsx'
import { useApp } from '../App.jsx'

function todayStr(){ return new Date().toISOString().slice(0,10) }

export default function MentorFeedback(){
  const { state, setState } = useApp()
  const [mentor, setMentor] = useState('')
  const [comment, setComment] = useState('')
  const [score, setScore] = useState(4)

  function save(){
    if (!mentor || !comment) return alert('請填寫導師與回饋內容')
    const note = { id: Date.now(), mentor, comment, score, date: todayStr() }
    setState(s=>({...s, mentorNotes:[note, ...s.mentorNotes]}))
    setMentor(''); setComment('')
  }

  return (
    <ModuleLayout title="導師回饋">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {state.mentorNotes.length===0 ? (
            <div className="card text-neutral-500">尚無回饋，請導師填寫右側表單。</div>
          ) : state.mentorNotes.map(n=>(
            <div key={n.id} className="card">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{n.mentor}</div>
                <span className="badge">{n.date}</span>
              </div>
              <div className="text-sm text-neutral-700 mt-2 whitespace-pre-wrap">{n.comment}</div>
              <div className="mt-2 text-sm">整體評分：{n.score} / 5</div>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <div className="card">
            <div className="font-semibold">新增導師回饋</div>
            <input value={mentor} onChange={e=>setMentor(e.target.value)} placeholder="導師姓名" className="w-full rounded-xl border px-3 py-2 mt-2" />
            <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="具體優勢、可改進處、下一步建議/里程碑" rows={6} className="w-full rounded-xl border px-3 py-2 mt-2" />
            <div className="mt-2 text-sm">整體評分：
              <select value={score} onChange={e=>setScore(Number(e.target.value))} className="rounded-xl border px-3 py-1 ml-2">
                {[1,2,3,4,5].map(s=>(<option key={s} value={s}>{s}</option>))}
              </select>
            </div>
            <div className="mt-3"><button className="btn-primary" onClick={save}>儲存</button></div>
          </div>
        </div>
      </div>
    </ModuleLayout>
  )
}
