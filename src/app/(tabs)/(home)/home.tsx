import React from 'react'
import { View, Text, StatusBar, Image, FlatList } from 'react-native'
import Lottie from "lottie-react-native";

import { COLORS, FONTS, images, SIZES } from '@/src/constants'
import { WeeklyCard, WelcomeText } from '@/src/components/home';
import AffirmationCard from '@/src/components/home/AffirmationCard';

const data = [
    { id: '1', title: 'Música', image: images.onBoard1, color: '#ff4c4c' },
    { id: '2', title: 'Podcasts', image: images.onBoard2, color: '#1db954' },
    { id: '3', title: 'Eventos en vivo', image: images.onBoard3, color: '#8e44ad' },
    { id: '4', title: 'Nuevos lanzamientos', image: images.onBoard4, color: '#3498db' },
    { id: '5', title: 'Música', image: images.onBoard1, color: '#ff4c4c' },
    { id: '6', title: 'Podcasts', image: images.onBoard2, color: '#1db954' },
    { id: '7', title: 'Eventos en vivo', image: images.onBoard3, color: '#8e44ad' },
    { id: '8', title: 'Nuevos lanzamientos', image: images.onBoard4, color: '#3498db' },
    { id: '9', title: 'Música', image: images.onBoard1, color: '#ff4c4c' },
    { id: '10', title: 'Podcasts', image: images.onBoard2, color: '#1db954' },
    { id: '11', title: 'Eventos en vivo', image: images.onBoard3, color: '#8e44ad' },
    { id: '12', title: 'Nuevos lanzamientos', image: images.onBoard4, color: '#3498db' },
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
                        height: SIZES.height * 0.35,
                        resizeMode: "cover",
                        position: "absolute",
                        top: 0,

                    }}
                />
                {/* Animation */}
                <View
                    style={{
                        top: SIZES.height * 0.05,
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
            <Text style={{ ...FONTS.h3, marginTop: 40 }}>Afirmaciones</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <AffirmationCard
                        title={item.title}
                        image={item.image}
                        color={item.color}
                    //onPress={() => handlePress(item.title)}
                    />
                )}
                numColumns={2} // Configura dos columnas
                contentContainerStyle={{ paddingHorizontal: 10, }}
            />
        </View>
    )
}

export default Home
