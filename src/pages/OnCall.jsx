
import React from 'react'
import { ModuleLayout } from '../components/UI.jsx'

export default function OnCall(){
  const tips = [
    { title:'交班三重點', items:['病況變化與警訊參數','重要檢查結果待追蹤','待辦事項與家屬關懷'] },
    { title:'夜班十大情境', items:['呼吸困難 / 低氧','胸痛 / ST 變化','低血壓 / 休克','意識改變','發燒 / 感染源不明','出血 / Hb 下降','低尿量 / AKI','電解質異常','疼痛控制','管路問題（NG/導尿/IV）'] },
    { title:'安全通報', items:['SBAR 溝通','高風險用藥雙人覆核','事件通報流程'] },
  ]
  return (
    <ModuleLayout title="值班注意事項">
      <div className="grid md:grid-cols-2 gap-6">
        {tips.map((t,i)=>(
          <div key={i} className="card">
            <div className="font-semibold">{t.title}</div>
            <ul className="mt-3 list-disc ml-5 space-y-1 text-sm">{t.items.map((it,j)=>(<li key={j}>{it}</li>))}</ul>
          </div>
        ))}
        <div className="card">
          <div className="font-semibold">常用電話速查</div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            {['主治醫師','護理站','呼吸治療','放射科','檢驗室','手術室'].map((d,i)=>(<div key={i} className="rounded-xl border p-3">{d}：Ext. 1234</div>))}
          </div>
        </div>
      </div>
    </ModuleLayout>
  )
}
