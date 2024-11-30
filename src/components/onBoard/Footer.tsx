import { Animated, View } from "react-native";
import { useTranslation } from "react-i18next";

import { COLORS, constants, FONTS, SIZES } from "@/src/constants";
import { TextButton } from "@/src/components/shared";

interface Props {
    scrollX: Animated.Value;
    nextSlide: () => void;
    isLastSlide: boolean;
    router: any;
    skip: () => void;
}

export const Footer = ({
    scrollX,
    nextSlide,
    isLastSlide,
    router,
    skip,
}: Props) => {
    //Calculate the position of the dots
    const { t } = useTranslation();
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    const Dots = () => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {constants.onBoard.map((item, index) => {
                    const dotColor = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [
                            COLORS.primary,
                            COLORS.primaryDarker,
                            COLORS.primaryDarker,
                        ],
                        extrapolate: "clamp",
                    });
                    return (
                        <Animated.View
                            key={`dot-${index}`}
                            style={{
                                borderRadius: 5,
                                marginHorizontal: 6,
                                width: 10,
                                height: 10,
                                backgroundColor: dotColor,
                            }}
                        />
                    );
                })}
            </View>
        );
    };
    return (
        <View
            style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: SIZES.height * 0.2,
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.height > 700 ? SIZES.padding : 20,
            }}
        >
            <Dots />

            {/* Buttons */}
            {isLastSlide ? (
                <View
                    style={{
                        flexDirection: "row",
                        height: SIZES.buttonContainerHeight,
                    }}
                >
                    <TextButton
                        label={t("onboarding.beginButton")}
                        contentContainerStyle={{
                            flex: 1,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.secondaryDarker,
                        }}
                        labelStyle={{
                            ...FONTS.h3,
                            fontWeight: "bold",
                            color: COLORS.primaryLighter,
                        }}
                        onPress={() => {
                            router.replace("/username");
                        }}
                    />
                </View>
            ) : (
                <View
                    style={{
                        flexDirection: "row",
                        height: SIZES.buttonContainerHeight,
                    }}
                >
                    <TextButton
                        label={t("onboarding.skipButton")}
                        contentContainerStyle={{
                            flex: 1,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.secondaryDark,
                            borderWidth: 0.5,
                            borderColor: COLORS.secondaryDarker,
                        }}
                        labelStyle={{
                            color: COLORS.primaryLighter,
                            fontWeight: "bold",
                            ...FONTS.h3,
                        }}
                        onPress={() => {
                            skip();
                        }}
                    />
                    <TextButton
                        label={t("onboarding.nextButton")}
                        contentContainerStyle={{
                            flex: 1,
                            marginLeft: SIZES.radius,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.primary,
                            borderWidth: 1,
                            borderColor: COLORS.primaryDark,
                        }}
                        labelStyle={{
                            ...FONTS.h3,
                            fontWeight: "bold",
                            color: COLORS.secondaryDarker,
                        }}
                        onPress={() => {
                            nextSlide();
                        }}
                    />
                </View>
            )}
        </View>
    );
};