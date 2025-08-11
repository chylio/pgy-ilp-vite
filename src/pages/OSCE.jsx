
import React, { useEffect, useState } from 'react'
import { ModuleLayout, PrimaryButton, Badge } from '../components/UI.jsx'
import { useApp } from '../App.jsx'

const stations = [
  { id:1, title:'呼吸困難評估', prompt:'35 歲男性，SpO2 86%。請完成初步評估並提出處置計畫。', rubric:['自我介紹與手部衛生','ABCDE 完整','監測與氧療選擇','鑑別診斷與檢查','與病人/家屬溝通']},
  { id:2, title:'胸痛評估', prompt:'64 歲男性胸痛 2 小時，請完成處置與鑑別。', rubric:['12 導程 ECG','MONA 評估','風險分層','入院與會診']},
]

export default function OSCE(){
  const { setState } = useApp()
  const [active, setActive] = useState(1)
  const [timer, setTimer] = useState(480)
  const [running, setRunning] = useState(false)
  const [checks, setChecks] = useState({})
  const station = stations.find(s=>s.id===active)

  useEffect(()=>{ if(!running) return; const t=setInterval(()=>setTimer(s=>Math.max(0,s-1)),1000); return ()=>clearInterval(t) },[running])

  function toggle(i){ setChecks(c=>({...c, [i]: !c[i]})) }
  function finish(){
    const score = station.rubric.reduce((acc,_,i)=> acc + (checks[i]?1:0), 0)
    setState(s=>({...s, points: s.points + score * 5}))
    alert('完成！得分 ' + (score*5))
    setRunning(false)
  }

  return (
    <ModuleLayout title="OSCE 教案">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-3">
          {stations.map(s=>(
            <button key={s.id} onClick={()=>{setActive(s.id); setTimer(480); setRunning(false); setChecks({})}} className={"w-full text-left px-4 py-3 rounded-xl border " + (active===s.id ? "border-violet-500 bg-violet-50": "")}>
              <div className="font-medium">{s.title}</div>
            </button>
          ))}
        </div>
        <div className="md:col-span-2 card">
          <div className="flex items-center justify-between">
            <div className="font-semibold">{station.title}</div>
            <span className="badge">{Math.floor(timer/60)}:{String(timer%60).padStart(2,'0')}</span>
          </div>
          <div className="mt-2 text-sm text-neutral-700">{station.prompt}</div>
          <div className="mt-4">
            <div className="font-medium">評分規準（自評）</div>
            <div className="mt-2 space-y-2">
              {station.rubric.map((r,i)=>(
                <label key={i} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={!!checks[i]} onChange={()=>toggle(i)} />
                  <span>{r}</span>
                </label>
              ))}
            </div>
            <div className="mt-4 flex gap-2 items-center">
              <button className="btn-primary" onClick={()=>setRunning(true)} disabled={running}>開始計時</button>
              <button className="px-4 py-2 rounded-xl border" onClick={finish}>完成並計分</button>
              <button className="px-4 py-2 rounded-xl border" onClick={()=>setChecks({})}>重置勾選</button>
            </div>
          </div>
        </div>
      </div>
    </ModuleLayout>
  )
}
