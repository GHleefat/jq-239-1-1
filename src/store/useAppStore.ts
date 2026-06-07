import { create } from 'zustand';
import { Element, Compound, FilterOption } from '../types';
import compounds from '../data/compounds.json';

interface AppState {
  selectedElement: Element | null;
  isModalOpen: boolean;
  activeFilters: FilterOption[];
  selectedElementsForCompound: Element[];
  matchedCompound: Compound | null;
  hasCheckedCompound: boolean;
  setSelectedElement: (el: Element | null) => void;
  toggleModal: (open: boolean) => void;
  toggleFilter: (filter: FilterOption) => void;
  clearFilters: () => void;
  addElementForCompound: (el: Element) => void;
  removeElementForCompound: (symbol: string) => void;
  clearCompoundSelection: () => void;
  checkCompoundMatch: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  selectedElement: null,
  isModalOpen: false,
  activeFilters: [],
  selectedElementsForCompound: [],
  matchedCompound: null,
  hasCheckedCompound: false,

  setSelectedElement: (el) => {
    set({ selectedElement: el });
  },

  toggleModal: (open) => {
    if (open) {
      const { selectedElement } = get();
      if (selectedElement) {
        set({ isModalOpen: true });
      }
    } else {
      set({ isModalOpen: false });
    }
  },

  toggleFilter: (filter) => {
    const { activeFilters } = get();
    const exists = activeFilters.some(
      (f) => f.type === filter.type && f.value === filter.value
    );
    if (exists) {
      set({
        activeFilters: activeFilters.filter(
          (f) => !(f.type === filter.type && f.value === filter.value)
        ),
      });
    } else {
      set({ activeFilters: [...activeFilters, filter] });
    }
  },

  clearFilters: () => {
    set({ activeFilters: [] });
  },

  addElementForCompound: (el) => {
    const { selectedElementsForCompound } = get();
    if (selectedElementsForCompound.length >= 5) return;
    const exists = selectedElementsForCompound.some((e) => e.symbol === el.symbol);
    if (exists) return;
    set({
      selectedElementsForCompound: [...selectedElementsForCompound, el],
      hasCheckedCompound: false,
    });
  },

  removeElementForCompound: (symbol) => {
    const { selectedElementsForCompound } = get();
    set({
      selectedElementsForCompound: selectedElementsForCompound.filter(
        (e) => e.symbol !== symbol
      ),
      hasCheckedCompound: false,
    });
  },

  clearCompoundSelection: () => {
    set({
      selectedElementsForCompound: [],
      matchedCompound: null,
      hasCheckedCompound: false,
    });
  },

  checkCompoundMatch: () => {
    const { selectedElementsForCompound } = get();
    const selectedSymbols = selectedElementsForCompound
      .map((e) => e.symbol)
      .sort();

    const matched =
      (compounds as Compound[]).find((compound) => {
        const compoundElements = [...compound.elements].sort();
        return (
          selectedSymbols.length === compoundElements.length &&
          selectedSymbols.every((s, i) => s === compoundElements[i])
        );
      }) || null;

    set({ matchedCompound: matched, hasCheckedCompound: true });
  },
}));
