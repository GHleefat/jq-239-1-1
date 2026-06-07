import React from 'react'
import { useAppStore } from '../store/useAppStore'
import { categoryConfig } from '../data/categories'
import { Beaker, X, Sparkles, AlertCircle } from 'lucide-react'

export default function CompoundBuilder() {
  const selectedElementsForCompound = useAppStore((state) => state.selectedElementsForCompound)
  const removeElementForCompound = useAppStore((state) => state.removeElementForCompound)
  const clearCompoundSelection = useAppStore((state) => state.clearCompoundSelection)
  const matchedCompound = useAppStore((state) => state.matchedCompound)
  const checkCompoundMatch = useAppStore((state) => state.checkCompoundMatch)
  const hasCheckedCompound = useAppStore((state) => state.hasCheckedCompound)

  return (
    <div className="glass-card p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Beaker className="w-5 h-5 text-cyan-400" />
            <h2 className="font-display text-lg font-bold">化合物组合实验室</h2>
          </div>
          <p className="text-xs text-white/50 mt-0.5">选择元素拼出化合物（最多5个）</p>
        </div>
        {selectedElementsForCompound.length > 0 && (
          <button
            onClick={clearCompoundSelection}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
            清空
          </button>
        )}
      </div>

      {selectedElementsForCompound.length === 0 ? (
        <div className="text-center py-6 text-white/40">
          <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">点击元素右上角的 + 号添加到组合</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 items-center">
          {selectedElementsForCompound.map((element, index) => {
            const config = categoryConfig[element.category]
            return (
              <React.Fragment key={element.symbol}>
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${config.bgClass} ${config.borderClass}`}
                >
                  <span className="font-display font-bold">{element.symbol}</span>
                  <span className="text-xs opacity-70">{element.chineseName}</span>
                  <button
                    onClick={() => removeElementForCompound(element.symbol)}
                    className="w-5 h-5 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
                {index < selectedElementsForCompound.length - 1 && (
                  <span className="text-white/30 font-bold">+</span>
                )}
              </React.Fragment>
            )
          })}
        </div>
      )}

      <div className="mt-4">
        {selectedElementsForCompound.length >= 2 ? (
          <button
            onClick={checkCompoundMatch}
            className="btn-pill bg-gradient-to-r from-cyan-500 to-blue-500 border-transparent text-white hover:from-cyan-400 hover:to-blue-400 shadow-glow flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            检测化合物
          </button>
        ) : selectedElementsForCompound.length > 0 ? (
          <p className="text-xs text-white/40">至少选择2个元素</p>
        ) : null}
      </div>

      {matchedCompound && (
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 animate-fade-in-up">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold text-cyan-300">{matchedCompound.formula}</span>
            <span className="text-lg">{matchedCompound.name}</span>
          </div>
          {matchedCompound.commonName && (
            <p className="text-sm text-white/60 mt-1">俗称：{matchedCompound.commonName}</p>
          )}
          <p className="mt-2 text-sm text-white/80">{matchedCompound.description}</p>
        </div>
      )}

      {hasCheckedCompound && !matchedCompound && (
        <div className="mt-4 text-sm text-white/50">
          未找到匹配的化合物，请尝试其他元素组合。
        </div>
      )}
    </div>
  )
}
