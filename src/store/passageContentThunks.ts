import {createAsyncThunk} from "@reduxjs/toolkit";
import {downloadPassage} from "@/api";
import {Week} from "@/types/week";
import {storageService} from '@/services/storageService';

export const fetchPassageContent = createAsyncThunk(
    'content/fetchPassageContent',
    async (week: Week) => {
        let content: string | null = null;

        try {
            content = await storageService.getContent(week);

            if (!content) {
                const response = await downloadPassage(week.passage);
                if (response?.data) {
                    content = JSON.stringify(response.data);
                    void storageService.saveContent(week, content);
                }
                
                // TODO: Check if more than 6 passages have been downloaded and if so then remove the passages
                //  that were downloaded earliest to make sure that no more than 6 passages are on the device
                //  at the same time.  This is part of the ESV API licensing requirements.
            }
        } catch (e) {
            console.log(e);
        }

        return {weekNumber: week.weekNumber, content};
    }
);