
import React, { useState } from 'react'
import { ModuleLayout, PrimaryButton } from '../components/UI.jsx'
import { useApp } from '../App.jsx'

export default function AIMentor(){
  const { state, setState } = useApp()
  const [input, setInput] = useState('')
  const [msgs, setMsgs] = useState(state.chats.mentor || [])

  function breathe(){ alert('跟著 4-4-6 呼吸：吸氣4拍、停4拍、吐氣6拍，重複 3 次。') }
  function reply(text){
    const templates = [
      '我聽見你的努力，也看見你在不容易的情境中仍願意學習，這很不簡單。',
      '你已經完成了第一步，接下來我們一起把任務拆小，一次前進一點點就好。',
      '卡關是訊號，不是失敗。我們換個角度試試看：先做最小可行的一步。',
    ]
    const m = { role:'assistant', text: templates[Math.floor(Math.random()*templates.length)], time: new Date().toLocaleTimeString() }
    setMsgs(arr => [...arr, { role:'user', text, time:m.time }, m])
    setState(s => ({ ...s, chats: { ...s.chats, mentor: [...(s.chats.mentor||[]), { role:'user', text, time:m.time }, m ] } }))
  }

  return (
    <ModuleLayout title="AI Mentor（心理支持）">
      <div className="max-w-3xl mx-auto card">
        <div className="text-sm text-neutral-500">感到壓力或自我懷疑時，先深呼吸，我在這裡陪你。</div>
        <div className="mt-3 h-72 overflow-auto rounded-xl border p-3 bg-neutral-50">
          {msgs.length===0 ? <div className="text-neutral-400 text-sm">說說你現在的感受或擔心的事。</div> :
            msgs.map((m,i)=>(
              <div key={i} className={"mb-2 " + (m.role==='user' ? 'text-right':'text-left')}>
                <div className={"inline-block px-3 py-2 rounded-2xl text-sm " + (m.role==='user' ? 'bg-pink-500 text-white':'bg-white border')}>{m.text}</div>
              </div>
            ))
          }
        </div>
        <div className="mt-3 flex gap-2">
          <input value={input} onChange={e=>setInput(e.target.value)} placeholder="想和我分享什麼？" className="flex-1 rounded-xl border px-3 py-2" />
          <button className="btn-primary" onClick={()=>{ if(input){ reply(input); setInput('') }}}>送出</button>
          <button className="px-4 py-2 rounded-xl border" onClick={breathe}>呼吸練習</button>
        </div>
      </div>
    </ModuleLayout>
  )
}
