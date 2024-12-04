import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Pressable,
    SafeAreaView,
    Image,
    Dimensions,
    StatusBar,
} from 'react-native';
import { COLORS, constants, icons, SIZES } from '@/src/constants';
import { OnBoardQuestionsInterface, Option } from '@/src/interfaces/onBoardInterfaces';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton } from '../components/shared';

const { width } = Dimensions.get('window');

const { onBoardQuestions } = constants;


const OnboardingQuestionsScreen = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number[]>>({});
    const { top } = useSafeAreaInsets();

    const handleOptionSelect = (questionId: number, optionId: number) => {
        setAnswers(prevAnswers => {
            const currentQuestion = onBoardQuestions[currentQuestionIndex];
            if (currentQuestion.multiple) {
                const currentAnswers = prevAnswers[questionId] || [];
                if (currentAnswers.includes(optionId)) {
                    return {
                        ...prevAnswers,
                        [questionId]: currentAnswers.filter(id => id !== optionId)
                    };
                } else {
                    return {
                        ...prevAnswers,
                        [questionId]: [...currentAnswers, optionId]
                    };
                }
            } else {
                return {
                    ...prevAnswers,
                    [questionId]: [optionId]
                };
            }
        });
    };

    const isAnswerSelected = () => {
        const currentQuestionId = onBoardQuestions[currentQuestionIndex].id;
        return answers[currentQuestionId] && answers[currentQuestionId].length > 0;
    };

    const handleNextQuestion = () => {
        if (isAnswerSelected() && currentQuestionIndex < onBoardQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else if (isAnswerSelected() && currentQuestionIndex === onBoardQuestions.length - 1) {
            // Handle completion of onboarding
            console.log('Onboarding completed', answers);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const renderOption = (option: Option, isSelected: boolean) => (
        <Pressable
            key={option.id}
            style={({ pressed }) => [
                styles.optionButton,
                isSelected && styles.selectedOption,
                pressed && styles.pressedOption
            ]}
            onPress={() => handleOptionSelect(onBoardQuestions[currentQuestionIndex].id, option.id)}
        >
            {option.hasImage && option.image && (
                <Image source={option.image} style={styles.optionImage} />
            )}
            <Text style={styles.optionText}>{option.text}</Text>
        </Pressable>
    );

    const renderQuestion = ({ item }: { item: OnBoardQuestionsInterface }) => {
        const isSelected = (optionId: number) => {
            const selectedOptions = answers[item.id] || [];
            return selectedOptions.includes(optionId);
        };

        return (
            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{item.question}</Text>
                {item.options.map(option => renderOption(option, isSelected(option.id)))}
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.primaryLighter }}>
            <StatusBar
                translucent
                barStyle="dark-content"
                backgroundColor="transparent"
            />
            <View style={{
                flex: 1,
                marginHorizontal: SIZES.base,
                marginTop: SIZES.base,
            }} >
                <View style={{ ...styles.topSection, marginTop: top }}>
                    {currentQuestionIndex > 0 && (
                        <IconButton
                            iconStyle={{
                                width: 28,
                                height: 28,
                            }}
                            containerStyle={{
                                width: 50,
                                height: 50,
                                alignItems: "center",
                                justifyContent: "center",
                                borderWidth: 1,
                                borderColor: COLORS.primaryDarker,
                                borderRadius: 25,
                                backgroundColor: COLORS.primary,
                                marginRight: 20,
                            }}
                            onPress={handlePreviousQuestion}
                            icon={icons.back}
                        />
                    )}
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, { width: `${((currentQuestionIndex + 1) / onBoardQuestions.length) * 100}%` }]} />
                    </View>
                </View>
                {/* <View style={{ marginTop: top }} /> */}
                <FlatList
                    data={[onBoardQuestions[currentQuestionIndex]]}
                    renderItem={renderQuestion}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
                <View style={styles.buttonContainer}>
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
                            {currentQuestionIndex === onBoardQuestions.length - 1 ? 'Finalizar' : 'Siguiente'}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    topSection: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: SIZES.height * 0.08,
        marginHorizontal: 20,
        //marginBottom: 10,
    },
    progressContainer: {
        flex: 1,
        height: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
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
        flexDirection: 'row',
        alignItems: 'center',
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
        flex: 1,
    },
    optionImage: {
        width: 30,
        height: 30,
        marginRight: 10,
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

