import { AffirmationsCategories } from "./affirmationsData";

export interface Affirmation {
    id: string;
    affirmationEN: string;
    affirmationES: string;
    isFavorite: boolean;
    category: AffirmationsCategories;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}
