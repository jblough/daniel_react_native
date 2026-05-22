import {Week} from "@/types/week";
import {StorageService} from "@/services/storageService";
import {File, Paths} from "expo-file-system";

function getFile(week: Week): File {
    return new File(Paths.cache, `passage_${week.weekNumber}`);
}

export const storageService: StorageService = {
    saveContent: async (week: Week, content: string) => getFile(week).write(content),
    getContent: async (week: Week) => getFile(week).text(),
    deleteContent: async (week: Week) => getFile(week).delete(),
}