import React, { useCallback, useMemo, useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Image,
    StatusBar,
    Text,
    View,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import { useTranslation } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useStorage } from "@/src/store";
import { COLORS, FONTS, SIZES, constants, icons } from "@/src/constants";
import {
    Animation1,
    Animation2,
    Animation3,
    Animation4,
    Footer,
} from "@/src/components/onBoard";
import { IconButton, SelectLangModal } from "@/src/components/shared";

const { width } = Dimensions.get("window");

const Page = () => {
    const { top } = useSafeAreaInsets();
    const router = useRouter();
    const { t } = useTranslation();
    //Animation 2
    const [animation2, setAnimation2] = useState(false);
    const ref = useRef<any>(null);
    const [currentSliceIndex, setCurrentSliceIndex] = useState(0);
    //SVG
    const controllX = SIZES.width / 2; //Control center points x coordinate

    const { language } = useStorage();

    const selectLangModalRef = useRef<any>(null);
    const openLangModal = () => {
        selectLangModalRef.current.openModal();
    };

    const updateCurrentSlideIndex = (e: any) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;

        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSliceIndex(currentIndex);
    };

    const goNextSlide = () => {
        const nextSlideIndex = currentSliceIndex + 1;
        if (nextSlideIndex !== constants.onBoard.length) {
            const offset = nextSlideIndex * width;
            ref?.current?.scrollToOffset({ offset });
            setCurrentSliceIndex(nextSlideIndex);
        }
    };

    const skipSlides = () => {
        const lastSlideIndex = constants.onBoard.length - 1;
        const offset = lastSlideIndex * width;
        ref?.current?.scrollToOffset({ offset });
        setCurrentSliceIndex(lastSlideIndex);
    };

    const onViewChangeRef = useRef(({ viewableItems }: any) => {
        if (viewableItems[0].index === 1) {
            setAnimation2(true);
        } else {
            setAnimation2(false);
        }
    });
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: COLORS.primaryLighter }}>
                <StatusBar
                    translucent
                    barStyle="dark-content"
                    backgroundColor="transparent"
                />

                {/* Language */}
                <View
                    style={{
                        zIndex: 10,
                        position: "absolute",
                        backgroundColor: "transparent",
                        flexDirection: "row",
                        top: top + 10,
                        right: 40,
                    }}
                >
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
                            backgroundColor: COLORS.primaryLighter,
                        }}
                        onPress={openLangModal}
                        icon={language === "es" ? icons.es : icons.us}
                    />
                </View>

                <Animated.FlatList
                    data={constants.onBoard}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    ref={ref}
                    onMomentumScrollEnd={updateCurrentSlideIndex}
                    snapToInterval={SIZES.width}
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onViewableItemsChanged={onViewChangeRef.current}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ width: SIZES.width, justifyContent: "center" }}>
                                {/* Walkthrough Images */}
                                <View style={{ flex: 1, justifyContent: "center" }}>
                                    {index === 0 && <Animation1 />}
                                    {index === 1 && <Animation2 animate={animation2} />}
                                    {index === 2 && <Animation3 />}
                                    {index === 3 && <Animation4 />}
                                </View>
                                {/* Title & description */}
                                <View
                                    style={{
                                        height:
                                            SIZES.height > 700
                                                ? SIZES.height * 0.35
                                                : SIZES.height * 0.4,
                                        alignItems: "center",
                                        justifyContent: "flex-start",
                                        paddingHorizontal: SIZES.padding,
                                    }}
                                >
                                    {/* Curve - calculate center point of curve so it works on all screens */}
                                    <Svg
                                        style={{ position: "absolute", top: -100 }}
                                        width={SIZES.width}
                                        height={100}
                                    >
                                        <Path
                                            d={`M 0 20 Q ${controllX} 130 ${SIZES.width} 20 L ${SIZES.width} 100 L 0 100 Z`}
                                            fill={COLORS.primaryLighter}
                                        />
                                    </Svg>
                                    <Text
                                        style={{
                                            ...FONTS.h1,
                                            color: COLORS.secondaryDarker,
                                            marginTop: 10,
                                        }}
                                    >
                                        {t(item.title)}
                                    </Text>
                                    <Text
                                        style={{
                                            marginTop: SIZES.radius,
                                            textAlign: "center",
                                            ...FONTS.body3,
                                            color: COLORS.secondary,
                                        }}
                                    >
                                        {t(item.sub_title)}
                                    </Text>

                                    <Footer
                                        scrollX={scrollX}
                                        nextSlide={goNextSlide}
                                        isLastSlide={index === constants.onBoard.length - 1}
                                        router={router}
                                        skip={skipSlides}
                                    />
                                </View>
                            </View>
                        );
                    }}
                />

                {/* Bottom Sheet Lang */}
                <SelectLangModal ref={selectLangModalRef} />
            </View>
        </GestureHandlerRootView>
    );
};
export default Page;