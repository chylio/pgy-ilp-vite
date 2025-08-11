
import React, { useState } from 'react'
import { ModuleLayout, PrimaryButton } from '../components/UI.jsx'
import { useApp } from '../App.jsx'

const scenario = {
  title: '夜班：突發呼吸困難',
  steps: [
    { text:'病人表情痛苦、呼吸急促。你第一步？', options:[
      { t:'先量血糖', hint:'血糖重要，但先處理威脅生命的氣道/呼吸。', ok:false },
      { t:'ABCDE 從 A 開始', hint:'正確，先確認氣道通暢與呼吸狀態。', ok:true },
      { t:'立即開點滴抽血', hint:'建立IV可並行，但此刻優先 ABC。', ok:false },
    ]},
    { text:'SpO2 85%，呼吸淺快。下一步？', options:[
      { t:'給氧並監測', hint:'好選擇，觀察反應並考慮高流量。', ok:true },
      { t:'先安排胸部X光', hint:'影像重要，但穩定化優先。', ok:false },
      { t:'叫家屬先回家', hint:'先穩定病況與溝通。', ok:false },
    ]},
  ],
}

export default function Game(){
  const { setState } = useApp()
  const [i, setI] = useState(0)
  const [chosen, setChosen] = useState(null)
  const step = scenario.steps[i]

  function choose(idx){
    setChosen(idx); if(step.options[idx].ok) setState(s=>({...s, points: s.points + 5}))
  }
  function next(){
    if (i < scenario.steps.length - 1) { setI(i+1); setChosen(null) }
    else alert('恭喜過關！獲得徽章：呼吸守門員')
  }
  function hint(){ if(chosen==null) return alert('先選一個答案，我再提示你為何對或錯。'); alert(step.options[chosen].hint) }

  return (
    <ModuleLayout title="互動闖關遊戲">
      <div className="max-w-3xl mx-auto card">
        <div className="text-lg font-semibold">{scenario.title}</div>
        <div className="mt-4 text-neutral-800">{step.text}</div>
        <div className="mt-4 grid md:grid-cols-2 gap-2">
          {step.options.map((op,idx)=>{
            const selected = chosen===idx
            const cls = selected ? (op.ok ? 'border-green-500 bg-green-50' : 'border-red-400 bg-red-50') : 'hover:bg-neutral-50'
            return <button key={idx} onClick={()=>choose(idx)} className={"text-left px-4 py-3 rounded-xl border transition " + cls}>{op.t}</button>
          })}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <button className="btn-primary" onClick={next}>下一步/結束</button>
          <button className="px-4 py-2 rounded-xl border" onClick={hint}>AI 提示（離線）</button>
        </div>
      </div>
    </ModuleLayout>
  )
}
