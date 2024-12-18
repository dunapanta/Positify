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
        id: "generalAffirmation1",
        title: "affirmations.general1",
        description: "Affirmation for free users of general category text",
        category: AffirmationsCategories.SELF_LOVE,
        color: COLORS.weeklyColor1,
        affirmationFormat: AffirmationsFormats.AUDIO,
        image: require("@/src/assets/images/onBoard/onBoarding1.webp"),
    },
]