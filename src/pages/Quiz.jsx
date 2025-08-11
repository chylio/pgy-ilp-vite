
import React, { useState } from 'react'
import { ModuleLayout, PrimaryButton, Badge } from '../components/UI.jsx'
import { useApp } from '../App.jsx'

const quizBank = {
  breathing:[
    { q:'成人低氧第一線處置首選為？', options:['高流量鼻導管','非再吸入面罩','鼻導管 2L/min','立即插管'], a:2, explain:'多數情境先以鼻導管或簡易面罩補氧並評估反應。' },
    { q:'評估呼吸窘迫時，最不重要的是？', options:['呼吸頻率','SpO2','胸廓起伏','鞋子尺寸'], a:3, explain:'鞋子尺寸無關。' },
  ],
  cpr:[
    { q:'成人胸外按壓深度建議為？', options:['3–4 公分','5–6 公分','> 7 公分','依個人覺得'], a:1, explain:'AHA 建議 5–6 公分，頻率 100–120/min。' },
  ],
}

export default function Quiz(){
  const { setState } = useApp()
  const [domain, setDomain] = useState('breathing')
  const [idx, setIdx] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [chosen, setChosen] = useState(null)
  const list = quizBank[domain] || []
  const cur = list[idx]

  function choose(i){
    setChosen(i); if(i===cur.a) setCorrect(c=>c+1)
  }
  function next(){
    if (idx < list.length - 1){ setIdx(idx+1); setChosen(null) }
    else { const score = Math.round(correct / list.length * 100); setState(s=>({...s, points: s.points + score/10})); alert('完成！得分 ' + score) }
  }

  return (
    <ModuleLayout title="個人化測驗">
      <div className="max-w-3xl mx-auto card">
        <div className="flex items-center justify-between">
          <div className="font-semibold">題庫領域</div>
          <select className="rounded-xl border px-3 py-2" value={domain} onChange={e=>{setDomain(e.target.value); setIdx(0); setCorrect(0); setChosen(null)}}>
            <option value="breathing">呼吸與低氧</option>
            <option value="cpr">CPR 與 BLS</option>
          </select>
        </div>
        <div className="mt-4">
          <div className="text-sm text-neutral-500">第 {idx+1} / {list.length} 題</div>
          <div className="mt-2 text-lg font-medium">{cur.q}</div>
          <div className="mt-3 grid md:grid-cols-2 gap-2">
            {cur.options.map((op,i)=>{
              const isRight = i===cur.a; const selected = chosen===i
              const cls = selected ? (isRight ? 'border-green-500 bg-green-50' : 'border-red-400 bg-red-50') : 'hover:bg-neutral-50'
              return <button key={i} onClick={()=>choose(i)} className={"text-left px-4 py-3 rounded-xl border transition " + cls}>{op}</button>
            })}
          </div>
          {chosen!==null && <div className="mt-3 text-sm text-neutral-700"><span className="font-medium">解析：</span> {cur.explain}</div>}
          <div className="mt-4 flex items-center gap-2">
            <button className="btn-primary" onClick={next}>下一題</button>
            <span className="badge">目前正確：{correct}</span>
          </div>
        </div>
      </div>
    </ModuleLayout>
  )
}
