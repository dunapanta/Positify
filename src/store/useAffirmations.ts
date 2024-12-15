import { create } from "zustand";
import { Affirmation } from "@/src/interfaces/affirmationsInterface";

interface IStorageStore {
    selectedAffirmations: Affirmation[];
    setSelectedAffirmations: (affirmations: Affirmation[]) => void;
}

export const useAffirmations = create<IStorageStore>((set) => ({
    selectedAffirmations: [],
    setSelectedAffirmations: (affirmations) => {
        set({ selectedAffirmations: affirmations });
    },
}));