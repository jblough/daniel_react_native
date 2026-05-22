import {Week} from "@/types/week";
import {useAppDispatch, useAppSelector} from "@/hooks/hooks";
import {useEffect, useState} from "react";
import {fetchPassageContent} from "@/store/passageContentThunks";

export const usePassageContent = (week: Week) => {
    const dispatch = useAppDispatch();
    const content = useAppSelector(state => state.passageContent.paths[week.weekNumber]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            if (!content) {
                void dispatch(fetchPassageContent(week));
            }

            setLoading(false);
        };

        void loadData();
    }, [week, content, dispatch]);

    return {content, loading};
};