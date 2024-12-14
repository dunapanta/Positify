import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Platform, StatusBar } from 'react-native';
import * as Speech from 'expo-speech';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import * as Haptics from "expo-haptics";
//import { Audio } from 'expo-av'; // Para manejar la música (mp3)
import AnimatedBackground from '@/src/components/shared/AnimatedBackground';
import { COLORS, FONTS, icons, SIZES } from '@/src/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton } from '@/src/components/shared';
import { router } from 'expo-router';

const { height, width } = Dimensions.get("window");

const frases = [
    { id: "1", title: "Esta es la frase número uno." },
    { id: "2", title: "Aquí está la segunda frase." },
    { id: "3", title: "Frase número tres, disfrútala." },
    { id: "4", title: "La cuarta frase llega ahora." },
    { id: "5", title: "Y aquí está la quinta frase." },
];

export default function App() {
    const [currentPhrase, setCurrentPhrase] = useState(frases[0]);
    const [isSpeechPlaying, setIsSpeechPlaying] = useState(true);
    const [sound, setSound] = useState(); // Para la música
    //const [isMusicPlaying, setIsMusicPlaying] = useState(false); // Control del estado de la música
    const player = useAudioPlayer(require('@/src/assets/audios/somemightsay.m4a')); // Cambia esto por la ubicación correcta de tu archivo mp3
    const status = useAudioPlayerStatus(player);
    const flatListRef = useRef(null);
    const { top } = useSafeAreaInsets();
    player.volume = 0.4;
    player.loop = true;
    //console.log(status);

    useEffect(() => {
        player.play();
        /* return () => {
            player.remove();
        }; */
    }, []);
    //console.log("player", player);
    //console.log("player.playing", player.playing);

    let voice =
        Platform.OS === "ios"
            ? "com.apple.voice.compact.es-MX.Paulina"
            : "es-us-x-esd-network";

    if (Platform.OS === "ios") {
        voice = "com.apple.voice.compact.es-MX.Paulina";
    } else {
        voice = "es-us-x-esd-network"; //only for android
    }


    // Función para controlar el Text-to-Speech
    const speak = (text: string) => {
        Speech.stop();
        Speech.speak(text, { voice: voice, volume: 6 });
    };

    const toggleSpeech = () => {
        if (isSpeechPlaying) {
            Speech.stop();
        } else {
            speak(currentPhrase.title);
        }
        setIsSpeechPlaying(!isSpeechPlaying);
    };

    // Funciones para controlar la música
    /* const playPauseMusic = async () => {
        if (isMusicPlaying) {
            await sound.stopAsync();
        } else {
            const { sound: playbackObject } = await Audio.Sound.createAsync(
                require('@/assets/music/somemightsay.m4a'), // Cambia esto por la ubicación correcta de tu archivo mp3
                { shouldPlay: true, isLooping: true } // Habilita el loop de la canción
            );
            setSound(playbackObject);
            playbackObject.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    // Si la canción termina, reiniciar desde el principio
                    playbackObject.replayAsync();
                }
            });
        }
        setIsMusicPlaying(!isMusicPlaying);
    }; */

    const handleViewableItemsChanged = ({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            const phrase = viewableItems[0].item;
            setCurrentPhrase(phrase);
            if (isSpeechPlaying) {
                speak(phrase.title); // Reproduce automáticamente solo si está en modo Play
            }
        }
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.page}>
            <View style={{ backgroundColor: "#faeddeDD", borderRadius: 10, borderWidth: 0.5 }}>
                <Text style={{ ...FONTS.usernameText, marginVertical: 13, marginHorizontal: 10 }}>{item.title}</Text>
            </View>
        </View>
    );

    return (
        <View style={{
            ...styles.container, marginTop: Platform.OS === "android" ? top
                : 0
        }}>
            <StatusBar
                translucent
                barStyle="dark-content"
                backgroundColor={COLORS.primaryLighter}
            />
            {/* Animación de Fondo */}
            <AnimatedBackground />
            {/* Back button */}
            <IconButton
                iconStyle={{
                    width: 25,
                    height: 25,
                }}
                containerStyle={{
                    ...styles.optionContainer,
                    //backgroundColor: isSpeechPlaying ? COLORS.primaryDark : COLORS.primaryLighter,
                    marginTop: top,
                    left: '7%',
                }}
                onPress={() => {
                    Haptics.selectionAsync()
                    router.back();
                }}
                icon={icons.back}
            />


            <Text style={{ ...FONTS.affirmationHeader, marginTop: top + 13, marginBottom: 3, position: "absolute", width: "100%", textAlign: "center", color: COLORS.secondary }}>Relationships and Connection</Text>

            {/* FlatList con Frases */}
            <FlatList
                ref={flatListRef}
                data={frases}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={handleViewableItemsChanged}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                style={styles.flatlist}
            />

            {/* Speach Play/Pause */}
            <IconButton
                icon={icons.speak}
                onPress={() => {
                    Haptics.selectionAsync()
                    toggleSpeech();
                }}
                onLongPress={() => Haptics.selectionAsync()}
                containerStyle={{
                    ...styles.optionContainer,
                    backgroundColor: isSpeechPlaying ? COLORS.primaryDark : COLORS.primaryLighter,
                    marginTop: top + 50,
                }}
                iconStyle={{
                    width: 25,
                    height: 25,
                }}
            />

            {/* Music Play/Pause */}
            <IconButton
                icon={icons.musicnote}
                onPress={() => {
                    Haptics.selectionAsync()
                    player.playing ? player.pause() : player.play()
                }}
                onLongPress={() => Haptics.selectionAsync()}
                containerStyle={{
                    ...styles.optionContainer,
                    backgroundColor: player.playing ? COLORS.primaryDark : COLORS.primaryLighter,
                    marginTop: top + 100,
                }}
                iconStyle={{
                    width: 25,
                    height: 25,
                }}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primaryLighter,
    },
    flatlist: {
        flex: 1,
        zIndex: 1,
    },
    page: {
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backContainer: {
        position: 'absolute',
        //top: 50,  // Ajusta la posición del botón para que esté en la parte superior
        right: '10%',
        width: 43,
        height: 43,
        backgroundColor: COLORS.primaryLight,
        borderRadius: SIZES.radius * 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.secondaryDarker,
        zIndex: 10,
    },
    optionContainer: {
        position: 'absolute',
        //top: 50,  // Ajusta la posición del botón para que esté en la parte superior
        right: '10%',
        width: 40,
        height: 40,
        backgroundColor: COLORS.primaryLight,
        borderRadius: SIZES.radius * 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.secondaryDarker,
        zIndex: 10,
    },
});
