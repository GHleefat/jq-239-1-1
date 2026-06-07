import { Filter, X } from 'lucide-react'
import { useAppStore } from '../store/useAppStore'
import {
  categoryConfig,
  metalFilterOptions,
  categoryFilterOptions,
  stateFilterOptions
} from '../data/categories'
import { FilterOption } from '../types'
import { cn } from '../lib/utils'

export default function FilterBar() {
  const activeFilters = useAppStore((state) => state.activeFilters)
  const toggleFilter = useAppStore((state) => state.toggleFilter)
  const clearFilters = useAppStore((state) => state.clearFilters)

  const isFilterActive = (filter: FilterOption): boolean => {
    return activeFilters.some(
      (f) => f.type === filter.type && f.value === filter.value
    )
  }

  return (
    <div className="glass-card p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          <span className="font-semibold text-lg">元素筛选</span>
        </div>
        {activeFilters.length > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>清除筛选</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-white/70 mb-2">金属 / 非金属</h3>
          <div className="flex flex-wrap gap-2">
            {metalFilterOptions.map((option) => {
              const filter: FilterOption = {
                type: 'metal-nonmetal',
                value: option.value,
                label: option.label
              }
              const active = isFilterActive(filter)
              return (
                <button
                  key={option.value}
                  onClick={() => toggleFilter(filter)}
                  className={cn(
                    'btn-pill',
                    active
                      ? 'bg-white/20 border-white/40 text-white'
                      : 'bg-transparent border-white/15 text-white/60 hover:bg-white/10'
                  )}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white/70 mb-2">元素分类</h3>
          <div className="flex flex-wrap gap-2">
            {categoryFilterOptions.map((option) => {
              const filter: FilterOption = {
                type: 'category',
                value: option.value,
                label: option.label
              }
              const active = isFilterActive(filter)
              const config = categoryConfig[option.value]
              return (
                <button
                  key={option.value}
                  onClick={() => toggleFilter(filter)}
                  className={cn(
                    'btn-pill',
                    !active && 'bg-transparent border-white/15 text-white/60 hover:bg-white/10'
                  )}
                  style={
                    active
                      ? {
                          borderColor: config.color,
                          color: config.color,
                          backgroundColor: `${config.color}4D`
                        }
                      : undefined
                  }
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white/70 mb-2">物质状态</h3>
          <div className="flex flex-wrap gap-2">
            {stateFilterOptions.map((option) => {
              const filter: FilterOption = {
                type: 'state',
                value: option.value,
                label: option.label
              }
              const active = isFilterActive(filter)
              return (
                <button
                  key={option.value}
                  onClick={() => toggleFilter(filter)}
                  className={cn(
                    'btn-pill',
                    active
                      ? 'bg-white/20 border-white/40 text-white'
                      : 'bg-transparent border-white/15 text-white/60 hover:bg-white/10'
                  )}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <div
                key={`${filter.type}-${filter.value}`}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm bg-white/10 border border-white/15"
              >
                <span>{filter.label}</span>
                <button
                  onClick={() => toggleFilter(filter)}
                  className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
