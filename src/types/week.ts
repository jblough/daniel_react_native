export class Week {
    public readonly weekNumber: number;
    public readonly passage: string;
    public readonly videoUrl: string;

    constructor(weekNumber: number, passage: string) {
        this.weekNumber = weekNumber;
        this.passage = passage;
        this.videoUrl = `https://josephblough.com/daniel/videos/week${weekNumber}.m4v`;
    }
}
