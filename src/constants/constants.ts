import { OnBoardQuestionsInterface } from "../interfaces/onBoardInterfaces";

let onBoard = [
    {
        id: 0,
        title: "onboarding.title1",
        sub_title: "onboarding.subtitle1",
    },
    {
        id: 1,
        title: "onboarding.title2",
        sub_title: "onboarding.subtitle2",
    },
    {
        id: 2,
        title: "onboarding.title3",
        sub_title: "onboarding.subtitle3",
    },
];

let onBoardQuestions: OnBoardQuestionsInterface[] = [
    {
        id: 1,
        question: "onboarding.question1",
        options: [
            {
                id: 1,
                text: "onboarding.question1Option1",
                hasImage: false,
            },
            {
                id: 2,
                text: "onboarding.question1Option2",
                hasImage: false,
            },
            {
                id: 3,
                text: "onboarding.question1Option3",
                hasImage: false,
            },
            {
                id: 4,
                text: "onboarding.question1Option4",
                hasImage: false,
            },
        ],
        multiple: false
    },
    {
        id: 2,
        question: "onboarding.question2",
        options: [
            {
                id: 1,
                text: "onboarding.question2Option1",
                hasImage: true,
                image: require('@/src/assets/images/ui/hatch.png'),
            },
            {
                id: 2,
                text: "onboarding.question2Option2",
                hasImage: true,
                image: require('@/src/assets/images/ui/seedling.png'),
            },
            {
                id: 3,
                text: "onboarding.question2Option3",
                hasImage: true,
                image: require('@/src/assets/images/ui/sunglasses.png'),
            },
        ],
        multiple: false
    },
]





export default {
    onBoard,
    onBoardQuestions,
};