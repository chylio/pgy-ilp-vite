
import React, { useState } from 'react'
import { ModuleLayout, PrimaryButton } from '../components/UI.jsx'
import { useApp } from '../App.jsx'

const emergencyLevels = [
  { id:1, title:'Level 1：ABCDE 初步評估', steps:[
    '檢查安全、呼叫支援、準備急救車',
    'Airway：評估是否通暢，必要時下頷托/口咽通氣道',
    'Breathing：觀察呼吸頻率、胸廓起伏、SpO2，給氧',
    'Circulation：量血壓脈搏、建立靜脈通路、抽血',
    'Disability：評估意識 AVPU、血糖',
    'Exposure：全身暴露檢查，注意體溫',
  ]},
  { id:2, title:'Level 2：成人異物哽塞處置', steps:[
    '確認可否發聲/咳嗽', '無效咳嗽 → 哈姆立克法', '失去意識 → 叫救援、開始 CPR', '每 2 分鐘重新評估'
  ]},
  { id:3, title:'Level 3：成人 CPR（BLS）', steps:[
    '確認反應與呼吸、叫 119 取 AED', '胸外按壓 30：2，深度 5–6 公分，頻率 100–120/min', 'AED 到場即貼片分析、依指示電擊', '持續循環並每 2 分鐘換人'
  ]},
]

export default function Emergency(){
  const { state, setState } = useApp()
  const [active, setActive] = useState(1)
  const [progressMap, setProgressMap] = useState({})

  function toggleStep(levelId, idx){
    setProgressMap(m => {
      const arr = m[levelId] || []
      const next = arr.includes(idx) ? arr.filter(i=>i!==idx) : [...arr, idx]
      return { ...m, [levelId]: next }
    })
  }
  function completeLevel(levelId){
    const steps = emergencyLevels.find(l=>l.id===levelId)?.steps.length || 0
    const done = (progressMap[levelId] || []).length
    if (done < steps) return alert('還有步驟未完成')
    setState(s=>({...s, points: s.points + 20, level: s.level + 1}))
    alert('恭喜完成！獲得 20 分與升級')
  }

  return (
    <ModuleLayout title="急救訓練教案">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-3">
          {emergencyLevels.map(l=>(
            <button key={l.id} onClick={()=>setActive(l.id)} className={"w-full text-left px-4 py-3 rounded-xl border " + (active===l.id ? "border-violet-500 bg-violet-50":"")}>
              <div className="font-medium">{l.title}</div>
              <div className="text-xs text-neutral-500">已勾選 {(progressMap[l.id]||[]).length} / {l.steps.length}</div>
            </button>
          ))}
        </div>
        <div className="md:col-span-2">
          {emergencyLevels.filter(l=>l.id===active).map(l=>(
            <div key={l.id} className="card">
              <div className="font-semibold">{l.title}</div>
              <div className="mt-3 space-y-2">
                {l.steps.map((s, idx)=>(
                  <label key={idx} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={(progressMap[l.id]||[]).includes(idx)} onChange={()=>toggleStep(l.id, idx)} />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
              <div className="mt-4"><PrimaryButton onClick={()=>completeLevel(l.id)}>完成本關卡</PrimaryButton></div>
            </div>
          ))}
        </div>
      </div>
    </ModuleLayout>
  )
}
