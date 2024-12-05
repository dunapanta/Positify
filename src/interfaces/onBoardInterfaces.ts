export interface OnBoardQuestionsInterface {
    id: number;
    question: string;
    options: Option[];
    multiple: boolean;
}

export interface Option {
    id: number;
    text: string;
    hasImage: boolean;
    image?: any;
    isMultiipleAnswer: boolean;
}