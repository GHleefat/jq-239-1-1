import { Plus, Check } from 'lucide-react'
import { Element } from '../types'
import { categoryConfig } from '../data/categories'
import { useAppStore } from '../store/useAppStore'
import { cn } from '../lib/utils'

interface ElementCellProps {
  element: Element
  dimmed?: boolean
  inCompoundSelection?: boolean
  onAddToCompound?: () => void
}

export default function ElementCell({
  element,
  dimmed = false,
  inCompoundSelection = false,
  onAddToCompound
}: ElementCellProps) {
  const setSelectedElement = useAppStore((state) => state.setSelectedElement)
  const toggleModal = useAppStore((state) => state.toggleModal)
  const config = categoryConfig[element.category]

  const handleClick = () => {
    setSelectedElement(element)
    toggleModal(true)
  }

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAddToCompound?.()
  }

  const bgColor = `${config.color}99`

  return (
    <div
      onClick={handleClick}
      style={{ backgroundColor: bgColor }}
      className={cn(
        'element-cell group relative flex flex-col items-center justify-center cursor-pointer rounded-lg p-1 aspect-square min-w-[56px] min-h-[56px]',
        `border ${config.borderClass}`,
        dimmed && 'opacity-20 pointer-events-none'
      )}
    >
      <span className="text-[10px] opacity-70 self-start ml-0.5">{element.atomicNumber}</span>
      <span className="font-display text-lg sm:text-xl font-bold category-glow">{element.symbol}</span>
      <span className="text-[9px] opacity-80 truncate w-full text-center">{element.chineseName}</span>

      {inCompoundSelection ? (
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500/80 border border-green-400 flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </div>
      ) : (
        <button
          onClick={handleAddClick}
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white/10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
        >
          <Plus className="w-3 h-3 text-white" />
        </button>
      )}
    </div>
  )
}
