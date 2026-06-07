import { useAppStore } from "../store/useAppStore";
import ElectronOrbital from "./ElectronOrbital";
import { InfoCard } from "./InfoCard";
import { categoryConfig, stateConfig, stateIconMap } from "../data/categories";
import {
  X,
  Atom,
  Scale,
  ThermometerSun,
  Droplets,
  Box,
  History,
  Sparkles,
  Lightbulb,
  Target,
  Plus,
  Check,
} from "lucide-react";

export default function ElementModal() {
  const selectedElement = useAppStore((state) => state.selectedElement);
  const isModalOpen = useAppStore((state) => state.isModalOpen);
  const toggleModal = useAppStore((state) => state.toggleModal);
  const addElementForCompound = useAppStore(
    (state) => state.addElementForCompound,
  );
  const selectedElementsForCompound = useAppStore(
    (state) => state.selectedElementsForCompound,
  );

  if (!selectedElement || !isModalOpen) return null;

  const categoryInfo = categoryConfig[selectedElement.category];
  const stateInfo = stateConfig[selectedElement.stateAtSTP];
  const StateIcon = stateIconMap[stateInfo.icon];

  const isInCompound = selectedElementsForCompound.some(
    (e) => e.symbol === selectedElement.symbol,
  );

  const handleAddToCompound = () => {
    if (!isInCompound) {
      addElementForCompound(selectedElement);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          toggleModal(false);
        }
      }}
    >
      <div className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fade-in-up">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-6">
          <div className="lg:col-span-2">
            <div
              className={`text-center p-6 rounded-2xl mb-4 border ${categoryInfo.bgClass} ${categoryInfo.borderClass}`}
            >
              <div className="text-sm opacity-70">
                {selectedElement.atomicNumber}
              </div>
              <div
                className={`font-display text-6xl font-black category-glow mt-2 ${categoryInfo.textClass}`}
              >
                {selectedElement.symbol}
              </div>
              <div className="text-xl font-bold mt-1">
                {selectedElement.chineseName}
              </div>
              <div className="text-sm opacity-60 italic">
                {selectedElement.name}
              </div>
              <div
                className={`inline-flex items-center gap-1 mt-3 px-3 py-1 rounded-full text-xs font-medium border ${categoryInfo.bgClass} ${categoryInfo.borderClass} ${categoryInfo.textClass}`}
              >
                {categoryInfo.label}
              </div>
            </div>

            <ElectronOrbital shells={selectedElement.shells} />
            <div className="text-center text-xs text-white/50 mt-2">
              电子轨道模型
            </div>

            {isInCompound ? (
              <button
                className="btn-pill w-full mt-4 flex items-center justify-center gap-2 bg-green-500/30 border-green-400 text-green-300"
                disabled
              >
                <Check className="w-4 h-4" />
                已添加到组合
              </button>
            ) : (
              <button
                onClick={handleAddToCompound}
                className="btn-pill w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 border-transparent text-white hover:from-cyan-400 hover:to-blue-400"
              >
                <Plus className="w-4 h-4" />
                添加到化合物组合
              </button>
            )}
          </div>

          <div className="lg:col-span-3">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-display text-2xl font-bold">
                  {selectedElement.chineseName}
                </h2>
                <p className="text-white/60 text-sm">{selectedElement.name}</p>
              </div>
              <button
                onClick={() => toggleModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <InfoCard
                label="原子量"
                value={selectedElement.atomicMass}
                unit="u"
                icon={<Scale className="w-3.5 h-3.5" />}
              />
              <InfoCard
                label="物质状态"
                value={stateInfo.label}
                icon={<StateIcon className="w-3.5 h-3.5" />}
              />
              <InfoCard
                label="电子排布"
                value={selectedElement.electronConfiguration}
                icon={<Atom className="w-3.5 h-3.5" />}
              />
              <InfoCard
                label="密度"
                value={selectedElement.density}
                unit="g/cm³"
                icon={<Droplets className="w-3.5 h-3.5" />}
              />
              <InfoCard
                label="熔点"
                value={selectedElement.meltingPoint}
                unit="K"
                icon={<ThermometerSun className="w-3.5 h-3.5" />}
              />
              <InfoCard
                label="沸点"
                value={selectedElement.boilingPoint}
                unit="K"
                icon={<ThermometerSun className="w-3.5 h-3.5" />}
              />
              <InfoCard
                label="发现者"
                value={selectedElement.discoveredBy}
                icon={<History className="w-3.5 h-3.5" />}
              />
              <InfoCard
                label="发现年份"
                value={selectedElement.discoveryYear}
                icon={<History className="w-3.5 h-3.5" />}
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-white/70 mb-2">
                <Sparkles className="w-4 h-4" />
                命名来源
              </div>
              <p className="p-3 rounded-xl bg-white/5 border border-white/10 text-sm">
                {selectedElement.namedAfter || "暂无信息"}
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-white/70 mb-2">
                <Box className="w-4 h-4" />
                实物照片
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-video bg-space-800 border border-white/10">
                <img
                  src={selectedElement.imageUrl}
                  alt={selectedElement.chineseName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {!selectedElement.imageUrl && (
                  <div className="flex items-center justify-center h-full text-white/30 text-sm">
                    暂无图片
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-white/70 mb-2">
                <Lightbulb className="w-4 h-4" />
                趣味冷知识
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 border-l-4 border-l-yellow-500/60 text-sm leading-relaxed">
                {selectedElement.funFact || "暂无信息"}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-white/70 mb-2">
                <Target className="w-4 h-4" />
                主要用途
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedElement.uses && selectedElement.uses.length > 0 ? (
                  selectedElement.uses.map((use, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs"
                    >
                      {use}
                    </span>
                  ))
                ) : (
                  <span className="text-white/30 text-sm">暂无用途信息</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
