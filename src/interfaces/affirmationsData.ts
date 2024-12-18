export enum AffirmationsCategories {
    GENERAL = "GENERAL",
    SELF_LOVE = "SELF_LOVE",
    HEALTH = "HEALTH",
    ABUNDANCE = "ABUNDANCE",
    GRIEF_AND_HEALING = "GRIEF_AND_HEALING",
    CONFIDENCE = "CONFIDENCE",
    RELATIONSHIPS = "RELATIONSHIPS",
    MOTIVATION = "MOTIVATION",
    POSITIVITY = "POSITIVITY",
    LEARNING_EDUCATION = "LEARNING_EDUCATION",
    SUCCESS_ACHIEVEMENT = "SUCCESS_ACHIEVEMENT",
    SPIRITUALITY = "SPIRITUALITY",
    RESILIENCE = "RESILIENCE",
    CREATIVITY_INSPIRATION = "CREATIVITY_INSPIRATION",
    STRESS_MANAGEMENT = "STRESS_MANAGEMENT",
    MINDFULNESS = "MINDFULNESS",
}

export enum AffirmationsFormats {
    TEXT = "text",
    AUDIO = "audio",
    RECORDED_AUDIO = "recorded_audio",
}

export interface AffirmationsCardData {
    id: string;
    title: string;
    description: string;
    category: AffirmationsCategories;
    color: string;
    affirmationFormat: AffirmationsFormats;
    image: any;
}