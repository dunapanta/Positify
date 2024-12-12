import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Platform, StatusBar } from 'react-native';
import * as Speech from 'expo-speech';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
//import { Audio } from 'expo-av'; // Para manejar la música (mp3)
import AnimatedBackground from '@/src/components/shared/AnimatedBackground';
import { COLORS } from '@/src/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
    player.volume = 0.5;
    player.loop = true;

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
            <View style={{ backgroundColor: "#faedde", opacity: 0.5 }}>
                <Text style={styles.text}>{item.title}</Text>
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

            {/* Botón de Play/Pause para el Texto a Voz */}
            <TouchableOpacity style={styles.globalButton} onPress={toggleSpeech}>
                <Text style={styles.globalButtonText}>
                    {isSpeechPlaying ? 'Pause Speech' : 'Play Speech'}
                </Text>
            </TouchableOpacity>

            {/* Botón de Play/Pause para la Música en la parte superior derecha */}
            <TouchableOpacity style={styles.musicButton} onPress={() => (player.playing ? player.pause() : player.play())}>
                <Text style={styles.musicButtonText}>
                    {status.playing ? 'Pause Music' : 'Play Music'}
                </Text>
            </TouchableOpacity>
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
    text: {
        fontSize: 24,
        color: '#000',
        textAlign: 'center',
        marginBottom: 30,
        fontWeight: 'bold',
    },
    globalButton: {
        position: 'absolute',
        bottom: 100,
        left: '10%',
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 5,
        zIndex: 2,
    },
    globalButtonText: {
        fontSize: 16,
        color: '#fff',
    },
    musicButton: {
        position: 'absolute',
        top: 50,  // Ajusta la posición del botón para que esté en la parte superior
        right: '10%',  // Colócalo a la derecha
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 5,
        zIndex: 2,
    },
    musicButtonText: {
        fontSize: 16,
        color: '#fff',
    },
});
