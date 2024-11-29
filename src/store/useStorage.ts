import { MMKV } from "react-native-mmkv";
import { create } from "zustand";

import { changeLanguage } from "@/src/locales/i18n";

interface IStorageStore {
    isOnBoardCompleted: boolean;
    setIsOnBoardCompleted: () => void;
    language: string;
    setLanguage: (language: string) => void;
    username: string;
    setUsername: (username: string) => void;
}

const storage = new MMKV();

const usernameStorage = storage.getString("username");
const languagePreference = storage.getString("language");

export const useStorage = create<IStorageStore>((set) => ({
    //onBoading
    isOnBoardCompleted: storage.getBoolean("showOnBoard") || false,
    setIsOnBoardCompleted: () => {
        storage.set("showOnBoard", true);
        set({ isOnBoardCompleted: true });
    },
    //language
    language: languagePreference?.startsWith("es") ? "es" : "en",
    setLanguage: (language: string) => {
        changeLanguage(language);
        storage.set("language", language);
        set({ language: language });
    },
    //username
    username: usernameStorage || "Usuario",
    setUsername: (username) => {
        storage.set("username", username);
        set({ username });
    },
}));