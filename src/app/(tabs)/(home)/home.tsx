import React from 'react'
import { View, Text, StatusBar, Image, FlatList } from 'react-native'
import Lottie from "lottie-react-native";

import { COLORS, FONTS, images, SIZES } from '@/src/constants'
import { WeeklyCard, WelcomeText } from '@/src/components/home';
import AffirmationCard from '@/src/components/home/AffirmationCard';

const data = [
    { id: '1', title: 'Música', image: images.onBoard1, color: '#FFB3BA', affirmationFormat: "text" },
    { id: '2', title: 'Podcasts', image: images.onBoard2, color: '#FFDFBA', affirmationFormat: "audio" },
    { id: '3', title: 'Eventos en vivo', image: images.onBoard3, color: '#FFFFBA', affirmationFormat: "text" },
    { id: '4', title: 'Nuevos lanzamientos', image: images.onBoard4, color: '#BAFFC9', affirmationFormat: "text" },
    { id: '5', title: 'Música', image: images.onBoard1, color: '#BAE1FF', affirmationFormat: "audio" },
    { id: '6', title: 'Podcasts', image: images.onBoard2, color: '#D5AAFF', affirmationFormat: "text" },
    { id: '7', title: 'Eventos en vivo', image: images.onBoard3, color: '#FFCCE5', affirmationFormat: "audio" },
    { id: '8', title: 'Nuevos lanzamientos', image: images.onBoard4, color: '#E6FFFA', affirmationFormat: "text" },
    { id: '9', title: 'Música', image: images.onBoard1, color: '#FDE1FF', affirmationFormat: "text" },
    { id: '10', title: 'Podcasts', image: images.onBoard2, color: '#FFF5BA', affirmationFormat: "text" },
    { id: '11', title: 'Eventos en vivo', image: images.onBoard3, color: '#C3FBD8', affirmationFormat: "text" },
    { id: '12', title: 'Nuevos lanzamientos', image: images.onBoard4, color: '#BFFCC6', affirmationFormat: "text" },
];

const Home = () => {
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.primaryLighter }}>
            <StatusBar
                translucent
                barStyle="dark-content"
                backgroundColor="transparent"
            />

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
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <AffirmationCard
                        title={item.title}
                        image={item.image}
                        color={item.color}
                        affirmationFormat={item.affirmationFormat as "text" | "audio"}
                        onPress={() => console.log(item.title)}
                    />
                )}
                numColumns={2} // Configura dos columnas
                contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: SIZES.height * 0.12 }}
            />
        </View>
    )
}

export default Home
