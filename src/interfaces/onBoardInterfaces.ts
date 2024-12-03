export interface OnBoardQuestionsInterface {
    id: number;
    question: string;
    options: Options[];
    multiple: boolean;
}

export interface Options {
    id: number;
    text: string;
    hasImage: boolean;
    image?: any;
}