import React from 'react'
import { View, Text, Image, FlatList, StatusBar } from 'react-native'
import Lottie from "lottie-react-native";
import { useIsFocused } from '@react-navigation/native';
import { router } from 'expo-router';

import { COLORS, FONTS, images, SIZES } from '@/src/constants'
import { WeeklyCard, WelcomeText } from '@/src/components/home';
import AffirmationCard from '@/src/components/home/AffirmationCard';
import { generateRandomAffirmations } from '@/src/utils/generateRandomAffirmations';
import { affirmationsGeneral } from '@/src/constants/affirmations';
import { useAffirmations } from '@/src/store/useAffirmations';
import { affirmationsCardData } from '@/src/constants/affirmationsCardData';
import { useTranslation } from 'react-i18next';


const Home = () => {
    const isFocused = useIsFocused();
    const { setSelectedAffirmations } = useAffirmations();
    const { t } = useTranslation();
    console.log(isFocused)
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.primaryLighter }}>
            {isFocused && (
                <StatusBar
                    translucent
                    backgroundColor="transparent"
                    barStyle="light-content"
                />
            )}
            <WelcomeText />
            {/* Header */}
            <View style={{ overflow: "hidden" }}>
                <Image
                    source={images.homeBackground}
                    style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover",
                        position: "absolute",
                        top: 0,

                    }}
                />
                {/* Animation */}
                <View
                    style={{
                        top: SIZES.height * 0.07,
                        paddingVertical: SIZES.height * 0.08,
                    }}
                >
                    <Lottie
                        source={require("@/src/assets/animations/hello.json")}
                        autoPlay
                        loop
                        style={{
                            width: SIZES.width * 0.45,
                            height: SIZES.width * 0.45,
                            alignSelf: "center",
                        }}
                    />
                </View>
            </View>
            {/* Weekly Card */}
            <WeeklyCard />
            <View style={{ marginHorizontal: SIZES.margin }}>
                <Text style={{ ...FONTS.h3, marginTop: 12, marginBottom: 3 }}>Afirmaciones</Text>
            </View>
            <FlatList
                data={affirmationsCardData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <AffirmationCard
                        title={t(item.title)}
                        image={item.image}
                        color={item.color}
                        affirmationFormat={item.affirmationFormat as "text" | "audio"}
                        onPress={() => {
                            //router.push("/affirmationscroll");
                            const affirmations = generateRandomAffirmations(affirmationsGeneral, 30);
                            setSelectedAffirmations(affirmations);
                            console.log("Affirmations", affirmations)
                            console.log(item.title)
                        }}
                    />
                )}
                numColumns={2} // Configura dos columnas
                contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: SIZES.height * 0.12 }}
            />
        </View>
    )
}

export default Home
