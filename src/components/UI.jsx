
import React from 'react'

export function Badge({children}) { return <span className="badge">{children}</span> }
export function PrimaryButton({children, ...props}) { return <button {...props} className="btn-primary">{children}</button> }
export function Card({title, icon, right, children}) {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-neutral-100 p-2">{icon}</div>
          <h3 className="text-base font-semibold text-neutral-800">{title}</h3>
        </div>
        {right}
      </div>
      <div className="mt-3 text-sm text-neutral-600">{children}</div>
    </div>
  )
}
export function ModuleLayout({title, icon, onBack, children}) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="text-neutral-600">{icon}</div>
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        {onBack && <button onClick={onBack} className="px-3 py-2 rounded-xl border">返回</button>}
      </div>
      {children}
    </div>
  )
}
