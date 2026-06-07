import PeriodicTable from './components/PeriodicTable'
import FilterBar from './components/FilterBar'
import ElementModal from './components/ElementModal'
import CompoundBuilder from './components/CompoundBuilder'
import { Atom, Sparkles } from 'lucide-react'

export default function App() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Atom className="animate-float w-10 h-10 text-cyan-400" />
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent text-glow">
              元素周期表互动探索
            </h1>
          </div>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            探索118种化学元素的奥秘，点击元素查看详细信息、实物照片和趣味知识
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-xs text-white/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>按分类着色 · 支持筛选 · 组合化合物</span>
          </div>
        </header>

        <FilterBar />
        <CompoundBuilder />
        <PeriodicTable />
        <ElementModal />
      </div>
    </div>
  )
}
