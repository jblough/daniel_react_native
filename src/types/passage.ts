export interface Passage {
    query: string
    id: string;
    canonical: string;
    passage_meta?: PassageMeta;
    passages: string[];
}

export interface PassageMeta {
    canonical: string;
    chapter_start: number[];
    chapter_end: number[];
    prev_verse?: number;
    next_verse?: number;
    prev_chapter?: number[];
    next_chapter?: number[];
}