import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Pressable,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import { COLORS } from '../constants';

const { width } = Dimensions.get('window');

const questions = [
    {
        "id": 1,
        "question": "¿Cuál es tu objetivo principal al usar esta app?",
        "options": [
            "Sentirme más positivo/a",
            "Reducir el estrés y la ansiedad",
            "Aumentar mi confianza",
            "Alcanzar metas específicas",
            "Mejorar mis relaciones personales"
        ],
        "multiple": false
    },
    {
        "id": 2,
        "question": "¿En qué área te gustaría enfocarte más?",
        "options": [
            "Salud y bienestar",
            "Carrera y éxito profesional",
            "Relaciones y conexión emocional",
            "Autoestima y amor propio",
            "Crecimiento personal y desarrollo"
        ],
        "multiple": false
    },
    {
        "id": 3,
        "question": "¿Qué desafíos enfrentaste recientemente y te gustaría superar?",
        "options": [
            "Estrés laboral o académico",
            "Dificultad para mantener el enfoque",
            "Ansiedad social",
            "Falta de motivación",
            "Problemas de autoestima"
        ],
        "multiple": true
    },
    {
        "id": 4,
        "question": "¿Cómo prefieres que se personalicen tus afirmaciones?",
        "options": [
            "En masculino",
            "En femenino",
            "Neutro o sin género"
        ],
        "multiple": false
    },
    {
        "id": 5,
        "question": "¿Qué tipo de afirmaciones prefieres?",
        "options": [
            "Cortas y directas",
            "Inspiradoras y profundas",
            "Espirituales y meditativas",
            "Motivacionales y enfocadas en el éxito"
        ],
        "multiple": true
    },
    {
        "id": 6,
        "question": "¿A qué hora del día te gustaría recibir afirmaciones?",
        "options": [
            "Mañana",
            "Tarde",
            "Noche"
        ],
        "multiple": false
    },
    {
        "id": 7,
        "question": "¿Te gustaría recibir afirmaciones en formato de audio?",
        "options": [
            "Sí, me gustaría escuchar afirmaciones",
            "No, prefiero leerlas"
        ],
        "multiple": false
    },
    {
        "id": 8,
        "question": "¿Cómo encontraste esta app?",
        "options": [
            "App Store/Google Play",
            "Recomendación de un amigo",
            "Redes sociales",
            "Anuncio online"
        ],
        "multiple": false
    },
    {
        "id": 9,
        "question": "¿Qué emociones te gustaría trabajar?",
        "options": [
            "Calma y tranquilidad",
            "Confianza y autoestima",
            "Motivación y energía",
            "Gratitud y aprecio"
        ],
        "multiple": true
    },
    {
        "id": 10,
        "question": "¿Qué logros te gustaría celebrar más?",
        "options": [
            "Pequeños avances diarios",
            "Metas profesionales alcanzadas",
            "Progreso en salud y bienestar",
            "Conexiones emocionales significativas"
        ],
        "multiple": true
    }
];

const OnboardingQuestionsScreen = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    const handleOptionSelect = (questionId, option) => {
        setAnswers(prevAnswers => {
            const currentQuestion = questions[currentQuestionIndex];
            if (currentQuestion.multiple) {
                const currentAnswers = prevAnswers[questionId] || [];
                if (currentAnswers.includes(option)) {
                    return {
                        ...prevAnswers,
                        [questionId]: currentAnswers.filter(item => item !== option)
                    };
                } else {
                    return {
                        ...prevAnswers,
                        [questionId]: [...currentAnswers, option]
                    };
                }
            } else {
                return {
                    ...prevAnswers,
                    [questionId]: [option]
                };
            }
        });
    };

    const isAnswerSelected = () => {
        const currentQuestionId = questions[currentQuestionIndex].id;
        return answers[currentQuestionId] && answers[currentQuestionId].length > 0;
    };

    const handleNextQuestion = () => {
        if (isAnswerSelected() && currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else if (isAnswerSelected() && currentQuestionIndex === questions.length - 1) {
            // Handle completion of onboarding
            console.log('Onboarding completed', answers);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const renderQuestion = ({ item }) => {
        const isSelected = (option) => {
            const selectedOptions = answers[item.id] || [];
            return selectedOptions.includes(option);
        };

        return (
            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{item.question}</Text>
                {item.options.map((option, index) => (
                    <Pressable
                        key={index}
                        style={({ pressed }) => [
                            styles.optionButton,
                            isSelected(option) && styles.selectedOption,
                            pressed && styles.pressedOption
                        ]}
                        onPress={() => handleOptionSelect(item.id, option)}
                    >
                        <Text style={styles.optionText}>{option}</Text>
                    </Pressable>
                ))}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }]} />
            </View>
            <FlatList
                data={[questions[currentQuestionIndex]]}
                renderItem={renderQuestion}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
            />
            <View style={styles.buttonContainer}>
                <Pressable
                    style={({ pressed }) => [
                        styles.navigationButton,
                        styles.backButton,
                        pressed && styles.pressedNavigationButton,
                        currentQuestionIndex === 0 && styles.disabledButton
                    ]}
                    onPress={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                >
                    <Text style={styles.navigationButtonText}>Atrás</Text>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [
                        styles.navigationButton,
                        styles.nextButton,
                        pressed && styles.pressedNavigationButton,
                        !isAnswerSelected() && styles.disabledButton
                    ]}
                    onPress={handleNextQuestion}
                    disabled={!isAnswerSelected()}
                >
                    <Text style={styles.navigationButtonText}>
                        {currentQuestionIndex === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primaryLighter,
    },
    progressContainer: {
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 5,
    },
    questionContainer: {
        padding: 20,
    },
    questionText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    optionButton: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    selectedOption: {
        backgroundColor: '#e8f5e9',
        borderColor: '#4CAF50',
    },
    pressedOption: {
        opacity: 0.8,
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    navigationButton: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        backgroundColor: '#9E9E9E',
        marginRight: 10,
    },
    nextButton: {
        backgroundColor: '#4CAF50',
        marginLeft: 10,
    },
    pressedNavigationButton: {
        opacity: 0.8,
    },
    disabledButton: {
        opacity: 0.5,
    },
    navigationButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default OnboardingQuestionsScreen;

