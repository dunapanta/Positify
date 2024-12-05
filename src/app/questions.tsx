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
import * as Haptics from "expo-haptics";
import { COLORS, constants, FONTS, icons, SIZES } from '@/src/constants';
import { OnBoardQuestionsInterface, Option } from '@/src/interfaces/onBoardInterfaces';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton, TextButton } from '@/src/components/shared';
import { useTranslation } from 'react-i18next';

const { onBoardQuestions } = constants;


const OnboardingQuestionsScreen = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number[]>>({});
    const { top } = useSafeAreaInsets();
    const { t } = useTranslation();

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
            onPress={() => {
                Haptics.selectionAsync();
                handleOptionSelect(onBoardQuestions[currentQuestionIndex].id, option.id)
            }}
        >
            {option.hasImage && option.image && (
                <Image source={option.image} style={styles.optionImage} />
            )}
            <Text style={{ ...FONTS.h3, flex: 1 }}>{t(option.text)}</Text>

            {option.isMultiipleAnswer ? (
                <Image source={icons.dot} style={{
                    ...styles.optionImage, tintColor:
                        isSelected ? COLORS.successAnswerDark : COLORS.primaryLighter
                }} />
            ) : (
                <Image source={icons.check} style={{
                    ...styles.optionImage, tintColor:
                        isSelected ? COLORS.successAnswerDark : COLORS.white
                }} />
            )}

        </Pressable>
    );

    const renderQuestion = ({ item }: { item: OnBoardQuestionsInterface }) => {
        const isSelected = (optionId: number) => {
            const selectedOptions = answers[item.id] || [];
            return selectedOptions.includes(optionId);
        };

        return (
            <View style={styles.questionContainer}>
                <Text style={{ ...FONTS.h2, marginBottom: SIZES.margin, color: COLORS.secondaryDarker }}>{t(item.question)}</Text>
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
                {/*  */}
                <View
                    style={{
                        marginTop: SIZES.margin,
                        height: SIZES.height * 0.14,
                        backgroundColor: COLORS.primaryLighter,
                        alignItems: "center",
                        paddingHorizontal: SIZES.padding,

                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            height: SIZES.buttonContainerHeight,
                        }}
                    >
                        <TextButton
                            label={t("onboarding.usernameButton")}
                            contentContainerStyle={{
                                flex: 1,
                                borderRadius: SIZES.radius,
                                backgroundColor: !isAnswerSelected()
                                    ? COLORS.secondaryLighter
                                    : COLORS.secondaryDarker,
                            }}
                            labelStyle={{
                                ...FONTS.h3,
                                color: COLORS.primaryLighter,
                            }}
                            onPress={handleNextQuestion}
                            disabled={!isAnswerSelected()}
                        />
                    </View>
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
        backgroundColor: COLORS.successAnswerDark,
        borderRadius: 5,
    },
    questionContainer: {
        padding: 20,
    },
    optionButton: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.white,
        marginVertical: SIZES.margin / 2,
        borderWidth: 2,
        borderRadius: SIZES.radius + 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.padding - 8,
    },
    selectedOption: {
        backgroundColor: COLORS.successAnswer,
        borderColor: COLORS.successAnswerDark,
    },
    pressedOption: {
        opacity: 0.8,
    },
    optionImage: {
        width: 30,
        height: 30,
        marginRight: 13,
    },
});

export default OnboardingQuestionsScreen;

