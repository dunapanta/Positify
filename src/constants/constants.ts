import { OnBoardQuestionsInterface } from "@/src/interfaces/onBoardInterfaces";

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
                isMultiipleAnswer: false,
            },
            {
                id: 2,
                text: "onboarding.question1Option2",
                hasImage: false,
                isMultiipleAnswer: false,
            },
            {
                id: 3,
                text: "onboarding.question1Option3",
                hasImage: false,
                isMultiipleAnswer: false,
            },
            {
                id: 4,
                text: "onboarding.question1Option4",
                hasImage: false,
                isMultiipleAnswer: false,
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
                image: require('@/src/assets/icons/hatch.png'),
                isMultiipleAnswer: false,
            },
            {
                id: 2,
                text: "onboarding.question2Option2",
                hasImage: true,
                image: require('@/src/assets/icons/seedling.png'),
                isMultiipleAnswer: false,
            },
            {
                id: 3,
                text: "onboarding.question2Option3",
                hasImage: true,
                image: require('@/src/assets/icons/sunglasses.png'),
                isMultiipleAnswer: false,
            },
        ],
        multiple: false
    },
    {
        id: 3,
        question: "onboarding.question3",
        options: [
            {
                id: 1,
                text: "onboarding.question3Option1",
                hasImage: true,
                image: require('@/src/assets/icons/sparkle.png'),
                isMultiipleAnswer: true,
            },
            {
                id: 2,
                text: "onboarding.question3Option2",
                hasImage: true,
                image: require('@/src/assets/icons/rocket.png'),
                isMultiipleAnswer: true,
            },
            {
                id: 3,
                text: "onboarding.question3Option3",
                hasImage: true,
                image: require('@/src/assets/icons/heart.png'),
                isMultiipleAnswer: true,
            },
            {
                id: 4,
                text: "onboarding.question3Option4",
                hasImage: true,
                image: require('@/src/assets/icons/meditate.png'),
                isMultiipleAnswer: true,
            },
            {
                id: 5,
                text: "onboarding.question3Option5",
                hasImage: true,
                image: require('@/src/assets/icons/sun.png'),
                isMultiipleAnswer: true,
            },
            {
                id: 6,
                text: "onboarding.question3Option6",
                hasImage: true,
                image: require('@/src/assets/icons/apple.png'),
                isMultiipleAnswer: true,
            },
            {
                id: 7,
                text: "onboarding.question3Option7",
                hasImage: true,
                image: require('@/src/assets/icons/leaf.png'),
                isMultiipleAnswer: true,
            },
            {
                id: 8,
                text: "onboarding.question3Option8",
                hasImage: true,
                image: require('@/src/assets/icons/trophy.png'),
                isMultiipleAnswer: true,
            },
        ],
        multiple: true
    },
]





export default {
    onBoard,
    onBoardQuestions,
};