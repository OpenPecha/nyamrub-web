import { create } from 'zustand';

export const useFeatureStore = create((set) => ({
    inViewFeature: null,
    setInViewFeature: (feature:string | null) => set({ inViewFeature: feature }),
}));