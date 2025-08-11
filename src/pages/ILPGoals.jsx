
import React, { useState } from 'react'
import { ModuleLayout, PrimaryButton } from '../components/UI.jsx'
import { useApp } from '../App.jsx'

const domains = [
  { key: 'patientCare', label: '病人照護' },
  { key: 'medicalKnowledge', label: '醫學知識' },
  { key: 'practiceBased', label: '實證/改善' },
  { key: 'interpersonal', label: '溝通協作' },
  { key: 'professionalism', label: '專業素養' },
  { key: 'systemBased', label: '系統導向' },
]

function nextDays(n){ const d=new Date(); d.setDate(d.getDate()+n); return d.toISOString().slice(0,10) }

export default function ILPGoals(){
  const { state, setState } = useApp()
  const [title, setTitle] = useState('')
  const [domain, setDomain] = useState('patientCare')
  const [due, setDue] = useState(nextDays(21))

  return (
    <ModuleLayout title="ILP 目標設定">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="card">
            <div className="font-semibold text-neutral-800">我的目標</div>
            <div className="mt-4 space-y-4">
              {state.goals.map(g => (
                <div key={g.id} className="rounded-xl border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{g.title}</div>
                      <div className="text-xs text-neutral-500 mt-1">領域：{domains.find(d=>d.key===g.domain)?.label}，到期：{g.due}</div>
                    </div>
                    <div className="w-40">
                      <div className="h-2 rounded-full bg-neutral-200">
                        <div className="h-full rounded-full bg-violet-500" style={{width: g.progress + '%'}} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="card">
            <div className="font-semibold mb-2">新增 SMART 目標</div>
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="例：完成 OSCE 呼吸困難站並獲得導師回饋" className="w-full rounded-xl border px-3 py-2" />
            <div className="mt-2">
              <select value={domain} onChange={e=>setDomain(e.target.value)} className="w-full rounded-xl border px-3 py-2">
                {domains.map(d=>(<option key={d.key} value={d.key}>{d.label}</option>))}
              </select>
            </div>
            <div className="mt-2">
              <input type="date" value={due} onChange={e=>setDue(e.target.value)} className="w-full rounded-xl border px-3 py-2" />
            </div>
            <div className="mt-3">
              <PrimaryButton onClick={()=>{
                if(!title) return
                const goal = { id: Date.now(), title, domain, due, progress:0, tasks:[] }
                setState(s=>({...s, goals:[goal, ...s.goals]})); setTitle('')
              }}>加入目標</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </ModuleLayout>
  )
}
