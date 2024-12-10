import React from 'react'
import { View, Text, StatusBar, Image } from 'react-native'
import Lottie from "lottie-react-native";

import { COLORS, FONTS, images, SIZES } from '@/src/constants'
import { WeeklyCard, WelcomeText } from '@/src/components/home';

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

        </View>
    )
}

export default Home
