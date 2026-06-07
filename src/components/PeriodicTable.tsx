import ElementCell from './ElementCell'
import elementsData from '../data/elements.json'
import { useAppStore } from '../store/useAppStore'
import { Element, FilterOption } from '../types'
import { categoryConfig } from '../data/categories'

const elements = elementsData as Element[]

export default function PeriodicTable() {
  const activeFilters = useAppStore((state) => state.activeFilters)
  const selectedElementsForCompound = useAppStore((state) => state.selectedElementsForCompound)
  const addElementForCompound = useAppStore((state) => state.addElementForCompound)

  const isElementFiltered = (element: Element): boolean => {
    if (activeFilters.length === 0) return false

    const metalCategories = ['alkali-metal', 'alkaline-earth', 'transition-metal', 'post-transition', 'lanthanide', 'actinide']
    const nonmetalCategories = ['metalloid', 'nonmetal', 'halogen', 'noble-gas']

    const filterTypes = [...new Set(activeFilters.map((f: FilterOption) => f.type))]

    const typeResults = filterTypes.map((type) => {
      const filtersOfType = activeFilters.filter((f: FilterOption) => f.type === type)
      return filtersOfType.some((filter: FilterOption) => {
        switch (type) {
          case 'category':
            return filter.value === element.category
          case 'state':
            return filter.value === element.stateAtSTP
          case 'metal-nonmetal':
            if (filter.value === 'metal') {
              return metalCategories.includes(element.category)
            } else if (filter.value === 'nonmetal') {
              return nonmetalCategories.includes(element.category)
            }
            return false
          default:
            return false
        }
      })
    })

    const anyTypePassed = typeResults.some((passed) => passed)
    return !anyTypePassed
  }

  const isInCompoundSelection = (symbol: string): boolean => {
    return selectedElementsForCompound.some((e) => e.symbol === symbol)
  }

  const sortedElements = [...elements].sort((a, b) => a.atomicNumber - b.atomicNumber)

  const mainGridElements = sortedElements.filter(
    (el) => el.group !== null && el.period >= 1 && el.period <= 7
  )

  const lanthanides = sortedElements.filter((el) => el.atomicNumber >= 57 && el.atomicNumber <= 71)
  const actinides = sortedElements.filter((el) => el.atomicNumber >= 89 && el.atomicNumber <= 103)

  const lanthanideConfig = categoryConfig['lanthanide']
  const actinideConfig = categoryConfig['actinide']

  return (
    <div className="overflow-x-auto pb-4">
      <div className="grid grid-cols-18 gap-1 lg:gap-1.5 mb-4">
        {mainGridElements.map((element) => (
          <div
            key={element.symbol}
            style={{ gridColumn: element.group!, gridRow: element.period }}
          >
            <ElementCell
              element={element}
              dimmed={isElementFiltered(element)}
              inCompoundSelection={isInCompoundSelection(element.symbol)}
              onAddToCompound={() => addElementForCompound(element)}
            />
          </div>
        ))}

        <div
          style={{ gridColumn: 3, gridRow: 6 }}
          className={`flex items-center justify-center rounded-lg p-1 aspect-square min-w-[56px] min-h-[56px] ${lanthanideConfig.bgClass} border ${lanthanideConfig.borderClass}`}
        >
          <span className={`text-xs font-semibold ${lanthanideConfig.textClass}`}>57-71</span>
        </div>

        <div
          style={{ gridColumn: 3, gridRow: 7 }}
          className={`flex items-center justify-center rounded-lg p-1 aspect-square min-w-[56px] min-h-[56px] ${actinideConfig.bgClass} border ${actinideConfig.borderClass}`}
        >
          <span className={`text-xs font-semibold ${actinideConfig.textClass}`}>89-103</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <div className={`flex items-center justify-center rounded-lg p-1 w-16 ${lanthanideConfig.bgClass} border ${lanthanideConfig.borderClass}`}>
          <span className={`text-xs font-semibold ${lanthanideConfig.textClass}`}>镧系</span>
        </div>
        <div className="grid grid-cols-15 gap-1 lg:gap-1.5 flex-1">
          {lanthanides.map((element) => (
            <ElementCell
              key={element.symbol}
              element={element}
              dimmed={isElementFiltered(element)}
              inCompoundSelection={isInCompoundSelection(element.symbol)}
              onAddToCompound={() => addElementForCompound(element)}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className={`flex items-center justify-center rounded-lg p-1 w-16 ${actinideConfig.bgClass} border ${actinideConfig.borderClass}`}>
          <span className={`text-xs font-semibold ${actinideConfig.textClass}`}>锕系</span>
        </div>
        <div className="grid grid-cols-15 gap-1 lg:gap-1.5 flex-1">
          {actinides.map((element) => (
            <ElementCell
              key={element.symbol}
              element={element}
              dimmed={isElementFiltered(element)}
              inCompoundSelection={isInCompoundSelection(element.symbol)}
              onAddToCompound={() => addElementForCompound(element)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
