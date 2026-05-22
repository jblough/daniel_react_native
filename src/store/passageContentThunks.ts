import {createAsyncThunk} from "@reduxjs/toolkit";
import {downloadPassage} from "@/api";
import {Week} from "@/types/week";
import {storageService} from '@/services/storageService';

export const fetchPassageContent = createAsyncThunk(
    'content/fetchPassageContent',
    async (week: Week) => {
        let content = await storageService.getContent(week);

        if (!content) {
            const response = await downloadPassage(week.passage);
            if (response?.data) {
                content = JSON.stringify(response.data);
                void storageService.saveContent(week, content);
            }
        }

        return {weekNumber: week.weekNumber, content};
    }
);