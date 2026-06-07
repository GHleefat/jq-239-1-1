import { Box as Cube, Droplets, Wind, CircleHelp as HelpCircle } from 'lucide-react'

export const categoryConfig: Record<string, { color: string; label: string; bgClass: string; borderClass: string; textClass: string }> = {
  'alkali-metal': {
    color: '#ff6b6b',
    label: '碱金属',
    bgClass: 'bg-[#ff6b6b]/20',
    borderClass: 'border-[#ff6b6b]',
    textClass: 'text-[#ff6b6b]'
  },
  'alkaline-earth': {
    color: '#ffa94d',
    label: '碱土金属',
    bgClass: 'bg-[#ffa94d]/20',
    borderClass: 'border-[#ffa94d]',
    textClass: 'text-[#ffa94d]'
  },
  'transition-metal': {
    color: '#ffd43b',
    label: '过渡金属',
    bgClass: 'bg-[#ffd43b]/20',
    borderClass: 'border-[#ffd43b]',
    textClass: 'text-[#ffd43b]'
  },
  'post-transition': {
    color: '#69db7c',
    label: '贫金属',
    bgClass: 'bg-[#69db7c]/20',
    borderClass: 'border-[#69db7c]',
    textClass: 'text-[#69db7c]'
  },
  'metalloid': {
    color: '#38d9a9',
    label: '准金属',
    bgClass: 'bg-[#38d9a9]/20',
    borderClass: 'border-[#38d9a9]',
    textClass: 'text-[#38d9a9]'
  },
  'nonmetal': {
    color: '#4dabf7',
    label: '非金属',
    bgClass: 'bg-[#4dabf7]/20',
    borderClass: 'border-[#4dabf7]',
    textClass: 'text-[#4dabf7]'
  },
  'halogen': {
    color: '#748ffc',
    label: '卤素',
    bgClass: 'bg-[#748ffc]/20',
    borderClass: 'border-[#748ffc]',
    textClass: 'text-[#748ffc]'
  },
  'noble-gas': {
    color: '#da77f2',
    label: '稀有气体',
    bgClass: 'bg-[#da77f2]/20',
    borderClass: 'border-[#da77f2]',
    textClass: 'text-[#da77f2]'
  },
  'lanthanide': {
    color: '#f783ac',
    label: '镧系元素',
    bgClass: 'bg-[#f783ac]/20',
    borderClass: 'border-[#f783ac]',
    textClass: 'text-[#f783ac]'
  },
  'actinide': {
    color: '#e599f7',
    label: '锕系元素',
    bgClass: 'bg-[#e599f7]/20',
    borderClass: 'border-[#e599f7]',
    textClass: 'text-[#e599f7]'
  }
}

export const stateConfig: Record<string, { label: string; icon: string }> = {
  solid: { label: '固态', icon: 'Cube' },
  liquid: { label: '液态', icon: 'Droplets' },
  gas: { label: '气态', icon: 'Wind' },
  unknown: { label: '未知', icon: 'HelpCircle' }
}

export const stateIconMap = {
  Cube,
  Droplets,
  Wind,
  HelpCircle
}

export const metalFilterOptions = [
  { value: 'all', label: '全部', categories: Object.keys(categoryConfig) },
  {
    value: 'metal',
    label: '金属',
    categories: ['alkali-metal', 'alkaline-earth', 'transition-metal', 'post-transition', 'lanthanide', 'actinide']
  },
  {
    value: 'nonmetal',
    label: '非金属',
    categories: ['metalloid', 'nonmetal', 'halogen', 'noble-gas']
  }
]

export const categoryFilterOptions = Object.entries(categoryConfig).map(([value, config]) => ({
  value,
  label: config.label,
  categories: [value]
}))

export const stateFilterOptions = Object.entries(stateConfig).map(([value, config]) => ({
  value,
  label: config.label,
  icon: config.icon
}))
