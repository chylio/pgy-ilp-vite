
import React, { useState } from 'react'
import { ModuleLayout, PrimaryButton } from '../components/UI.jsx'
import { useApp } from '../App.jsx'

export default function AICoach(){
  const { state, setState } = useApp()
  const [input, setInput] = useState('')
  const [msgs, setMsgs] = useState(state.chats.coach || [])

  function reply(text){
    const lower = text.toLowerCase()
    let ans = '我建議先用 ABCDE 框架檢視現況，找出最優先的不穩定項目。'
    if (lower.includes('cpr') || lower.includes('按壓')) ans = 'CPR 重點：深度 5–6 公分、頻率 100–120/min、最少中斷。'
    if (lower.includes('oxygen') || lower.includes('低氧') || lower.includes('spo2')) ans = '低氧：先給氧（面罩/鼻導管），同時評估工作呼吸與二氧化碳滯留風險。'
    if (lower.includes('osce')) ans = 'OSCE：先自我介紹與手部衛生，口述思路，最後做安全檢查與病人教育。'

    const m = { role: 'assistant', text: ans, time: new Date().toLocaleTimeString() }
    setMsgs(arr => [...arr, { role:'user', text, time: m.time }, m])
    setState(s => ({ ...s, chats: { ...s.chats, coach: [...(s.chats.coach||[]), { role:'user', text, time:m.time }, m ] } }))
  }

  return (
    <ModuleLayout title="AI Coach（學習助教）">
      <div className="max-w-3xl mx-auto card">
        <div className="text-sm text-neutral-500">離線示範。未來可改為串接雲端 AI（OpenAI / Azure）。</div>
        <div className="mt-3 h-72 overflow-auto rounded-xl border p-3 bg-neutral-50">
          {msgs.length===0 ? <div className="text-neutral-400 text-sm">開始詢問：例如「低氧先做什麼？」或「OSCE 口述要點」</div> :
            msgs.map((m,i)=>(
              <div key={i} className={"mb-2 " + (m.role==='user' ? 'text-right':'text-left')}>
                <div className={"inline-block px-3 py-2 rounded-2xl text-sm " + (m.role==='user' ? 'bg-violet-500 text-white':'bg-white border')}>{m.text}</div>
              </div>
            ))
          }
        </div>
        <div className="mt-3 flex gap-2">
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="輸入你的問題或想學的重點" className="flex-1 rounded-xl border px-3 py-2" />
          <button className="btn-primary" onClick={()=>{ if(input){ reply(input); setInput('') }}}>送出</button>
        </div>
      </div>
    </ModuleLayout>
  )
}
