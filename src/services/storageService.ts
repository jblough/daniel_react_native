import {Week} from "@/types/week";

export interface StorageService {
    saveContent: (week: Week, content: string) => Promise<void>;
    getContent: (week: Week) => Promise<string | null>;
    deleteContent: (week: Week) => Promise<void>;
}

export const storageService: StorageService = {
    saveContent: async (week: Week, content) => localStorage.setItem(`reading_${week.weekNumber}`, content),
    getContent: async (week: Week) => localStorage.getItem(`reading_${week.weekNumber}`),
    deleteContent: async (week: Week) => localStorage.removeItem(`reading_${week.weekNumber}`),
};