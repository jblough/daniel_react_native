import {Week} from "@/types/week";
import {StorageService} from "@/services/storageService";
import {File, Paths} from "expo-file-system";

function getFile(week: Week): File {
    return new File(Paths.cache, `passage_${week.weekNumber}.json`);
}

export const storageService: StorageService = {
    saveContent: async (week: Week, content: string) => getFile(week).write(content),
    getContent: async (week: Week) => {
        const file = getFile(week);
        if (!file.exists) {
            return null;
        }
        return getFile(week).text();
    },
    deleteContent: async (week: Week) => getFile(week).delete(),
}