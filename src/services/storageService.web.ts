import {StorageService} from "@/services/storageService";
import {Week} from "@/types/week";

export const storageService: StorageService = {
    saveContent: async (week: Week, content) => localStorage.setItem(`reading_${week.weekNumber}`, content),
    getContent: async (week: Week) => localStorage.getItem(`reading_${week.weekNumber}`),
    deleteContent: async (week: Week) => localStorage.removeItem(`reading_${week.weekNumber}`),
};