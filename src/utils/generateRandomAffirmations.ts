import { Affirmation } from '@/src/interfaces/affirmationsInterface';

function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function selectRandomAffirmations(arr: Affirmation[], numAffirmations: number) {
    const selectedAffirmations: Affirmation[] = [];
    const totalAffirmations = arr.length;

    // Mientras no se hayan seleccionado todas las preguntas requeridas
    while (selectedAffirmations.length < numAffirmations) {
        // Obtenemos un índice aleatorio
        const randomIndex = getRandomNumber(0, totalAffirmations);

        // Si el índice no ha sido seleccionado previamente, agregamos la pregunta al array de preguntas seleccionadas
        if (!selectedAffirmations.includes(arr[randomIndex])) {
            selectedAffirmations.push(arr[randomIndex]);
        }
    }
    return selectedAffirmations;
}