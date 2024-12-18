import { AffirmationsCardData, AffirmationsCategories, AffirmationsFormats } from "../interfaces/affirmationsData";
import { COLORS } from "./theme";

export const affirmationsCardData: AffirmationsCardData[] = [
    {
        id: "generalAffirmation1",
        title: "affirmations.general1",
        description: "Affirmation for free users of general category text",
        category: AffirmationsCategories.GENERAL,
        color: COLORS.weeklyColor1,
        affirmationFormat: AffirmationsFormats.TEXT,
        image: require("@/src/assets/images/onBoard/onBoarding1.webp"),
    },
    {
        id: "generalAffirmation2",
        title: "affirmations.general2",
        description: "Affirmation for free users of general category audio",
        category: AffirmationsCategories.GENERAL,
        color: COLORS.weeklyColor2,
        affirmationFormat: AffirmationsFormats.AUDIO,
        image: require("@/src/assets/images/onBoard/onBoarding2.webp"),
    },
    {
        id: "selfLoveAffirmation1",
        title: "affirmations.selfLove1",
        description: "Embrace who you are with kindness and understanding. Cultivate inner peace by accepting your strengths and imperfections, fostering a deeper sense of self-worth and personal growth",
        category: AffirmationsCategories.SELF_LOVE,
        color: COLORS.weeklyColor3,
        affirmationFormat: AffirmationsFormats.AUDIO,
        image: require("@/src/assets/images/affirmations/self-acceptance.webp"),
    },
    {
        id: "selfLoveAffirmation2",
        title: "affirmations.selfLove1",
        description: "Self-esteem is the foundation of a healthy self-image. It is the belief in your own worth and abilities, and the confidence to pursue your goals and dreams",
        category: AffirmationsCategories.SELF_LOVE,
        color: COLORS.weeklyColor4,
        affirmationFormat: AffirmationsFormats.AUDIO,
        image: require("@/src/assets/images/affirmations/self-esteem.webp"),
    },
    {
        id: "abundanceAffirmation1",
        title: "affirmations.abundance1",
        description: "Manifesting abundance is about attracting prosperity and success into your life. It is the belief that you are worthy of abundance and the ability to create the life you desire",
        category: AffirmationsCategories.ABUNDANCE,
        color: COLORS.weeklyColor5,
        affirmationFormat: AffirmationsFormats.TEXT,
        image: require("@/src/assets/images/affirmations/manifesting_abundance.webp"),
    },
    {
        id: "abundanceAffirmation2",
        title: "affirmations.abundance2",
        description: "Believing in limitless opportunities and focusing on growth, gratitude, and success.",
        category: AffirmationsCategories.ABUNDANCE,
        color: COLORS.weeklyColor6,
        affirmationFormat: AffirmationsFormats.AUDIO,
        image: require("@/src/assets/images/affirmations/abundance_mindset.webp"),
    },
]