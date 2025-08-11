import React, { createContext, useContext, useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Brain, Gamepad2, Stethoscope, ClipboardList, FileText, ShieldCheck, Target, GraduationCap, Heart } from 'lucide-react'
import { Card } from './components/UI.jsx'
import Login from './pages/Login.jsx'
import ILPGoals from './pages/ILPGoals.jsx'
import Emergency from './pages/Emergency.jsx'
import OnCall from './pages/OnCall.jsx'
import OSCE from './pages/OSCE.jsx'
import Quiz from './pages/Quiz.jsx'
import Game from './pages/Game.jsx'
import Portfolio from './pages/Portfolio.jsx'
import AICoach from './pages/AICoach.jsx'
import AIMentor from './pages/AIMentor.jsx'
import MentorFeedback from './pages/MentorFeedback.jsx'

// Context
export const AppCtx = createContext(null)
export function useApp() { return useContext(AppCtx) }

// utils & seed
const STORAGE_KEY = 'pgy-ilp-state-v1'
function todayStr(){ return new Date().toISOString().slice(0,10) }
function nextDays(n){ const d=new Date(); d.setDate(d.getDate()+n); return d.toISOString().slice(0,10) }

const avatars = [
  { id: 1, name: '阿心醫師', emoji: '🩺', role: '內科PGY' },
  { id: 2, name: '小外', emoji: '🔪', role: '外科PGY' },
  { id: 3, name: '急急國王', emoji: '🚑', role: '急診PGY' },
  { id: 4, name: '小兒派', emoji: '🍼', role: '兒科PGY' },
  { id: 5, name: '產檢俠', emoji: '🤰', role: '婦產PGY' },
  { id: 6, name: '影像眼', emoji: '🩻', role: '放射PGY' },
  { id: 7, name: '精神丸', emoji: '🧠', role: '身心PGY' },
  { id: 8, name: '麻吉手', emoji: '😴', role: '麻醉PGY' },
]

const defaultState = {
  signedIn: false,
  profile: { name: 'PGY', avatarId: 1 },
  points: 0, level: 1,
  progress: { patientCare:30, medicalKnowledge:35, practiceBased:20, interpersonal:25, professionalism:28, systemBased:22 },
  goals: [{
    id: 1,
    title: '掌握成人CPR流程（AHA 2020+）',
    domain: 'patientCare',
    due: nextDays(14),
    progress: 40,
    tasks: [
      { id: 't1', text: '完成急救教案 Level 1', done: true },
      { id: 't2', text: '完成模擬情境 2 次', done: false },
      { id: 't3', text: '通過 8 題測驗', done: false },
    ],
  }],
  portfolio: [{ id: 1, date: todayStr(), title: '值班首次處理喘寮個案', reflection: '嘗試用ABCDE評估；氣道判斷與氧療需強化。', tags: ['值班','呼吸','ABCDE']}],
  mentorNotes: [],
  chats: { coach: [], mentor: [] },
}

export default function App(){
  const [state, setState] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : defaultState
  })
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)) }, [state])

  const navigate = useNavigate()
  const avatar = avatars.find(a => a.id === state.profile.avatarId)

  const cards = [
    { path:'/emergency', title:'急救訓練教案', icon:<Heart className='w-5 h-5'/>, desc:'ABCDE + CPR 分級闖關與情境模擬' },
    { path:'/oncall', title:'值班注意事項', icon:<ShieldCheck className='w-5 h-5'/>, desc:'夜班常見十情境、交班與安全通報' },
    { path:'/osce', title:'OSCE 教案', icon:<Stethoscope className='w-5 h-5' />, desc:'站站有題與自評計分、支援計時' },
    { path:'/quiz', title:'個人化測驗', icon:<ClipboardList className='w-5 h-5'/>, desc:'依 ILP 目標出題，弱點加強' },
    { path:'/game', title:'互動闖關遊戲', icon:<Gamepad2 className='w-5 h-5'/>, desc:'情境選擇題 + 即時提示' },
    { path:'/portfolio', title:'個人學習歷程', icon:<FileText className='w-5 h-5'/>, desc:'事件導向紀錄，智慧回顧' },
    { path:'/ilp', title:'ILP 目標設定', icon:<Target className='w-5 h-5'/>, desc:'SMART 目標 + 進度' },
    { path:'/coach', title:'AI Coach', icon:<Brain className='w-5 h-5'/>, desc:'學習助教：知識點與解析' },
    { path:'/mentor', title:'AI Mentor', icon:<Brain className='w-5 h-5'/>, desc:'正向支持與呼吸練習' },
    { path:'/feedback', title:'導師回饋', icon:<GraduationCap className='w-5 h-5'/>, desc:'導師評語與里程碑' },
  ]

  return (
    <AppCtx.Provider value={{ state, setState }}>
      {!state.signedIn ? (
        <Login />
      ) : (
        <>
          <div className="min-h-screen bg-gradient-to-b from-white to-neutral-100">
            <div className="mx-auto max-w-6xl px-6 py-6">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{avatar?.emoji}</div>
                  <div>
                    <div className="text-sm text-neutral-500">歡迎回來</div>
                    <div className="font-semibold text-neutral-900 text-lg">{state.profile.name}</div>
                  </div>
                  <span className="badge">Lv.{state.level}</span>
                  <span className="badge">⭐ {state.points}</span>
                </div>
                <button className="px-3 py-2 rounded-xl border" onClick={()=>{ setState(s=>({...s, signedIn:false})) }}>登出</button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
                {cards.map(c => (
                  <div key={c.path} className="cursor-pointer" onClick={()=>navigate(c.path)}>
                    <Card title={c.title} icon={c.icon}>{c.desc}</Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Routes>
            <Route path="/ilp" element={<ILPGoals/>} />
            <Route path="/portfolio" element={<Portfolio/>} />
            <Route path="/emergency" element={<Emergency/>} />
            <Route path="/oncall" element={<OnCall/>} />
            <Route path="/osce" element={<OSCE/>} />
            <Route path="/quiz" element={<Quiz/>} />
            <Route path="/game" element={<Game/>} />
            <Route path="/coach" element={<AICoach/>} />
            <Route path="/mentor" element={<AIMentor/>} />
            <Route path="/feedback" element={<MentorFeedback/>} />
          </Routes>
        </>
      )}
    </AppCtx.Provider>
  )
}
