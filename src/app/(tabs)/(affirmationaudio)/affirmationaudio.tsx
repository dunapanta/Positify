import React, { useEffect } from "react";
import { router, useFocusEffect } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent, StatusBar } from "react-native";
import { Svg, Circle } from "react-native-svg";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AnimatedBackground from "@/src/components/shared/AnimatedBackground";
import { COLORS, icons, SIZES } from "@/src/constants";
import { IconButton } from "@/src/components/shared";

const RADIUS = 100;
const STROKE_WIDTH = 25;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const HeadspacePlayer: React.FC = () => {
  const player = useAudioPlayer(require("@/src/assets/audios/es_affirmation_general.mp3"));
  const status = useAudioPlayerStatus(player);

  const { top } = useSafeAreaInsets();

  useEffect(() => {
    player.play();
  }, []);

  const playPauseAudio = () => {
    player.playing ? player.pause() : player.play();
  };

  const restartAudio = () => {
    player.seekTo(0);
    player.play();
  };

  const handleSeek = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    const centerX = RADIUS + STROKE_WIDTH;
    const centerY = RADIUS + STROKE_WIDTH;

    const dx = locationX - centerX;
    const dy = locationY - centerY;

    const angle = Math.atan2(dy, dx);
    const normalizedAngle = angle >= 0 ? angle : 2 * Math.PI + angle;
    const progress = (normalizedAngle / (2 * Math.PI)) * status.duration;

    //const newTime = player.duration * progress;
    player.seekTo(progress);
  };

  const getCircleProps = () => {
    const progress = status.currentTime / status.duration || 0;
    const offset = CIRCUMFERENCE - progress * CIRCUMFERENCE;
    return { strokeDasharray: `${CIRCUMFERENCE}`, strokeDashoffset: offset };
  };

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.primaryLighter}
      />
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
          top: "5%",
          marginTop: top,
          left: '7%',
        }}
        onPress={() => {
          Haptics.selectionAsync()
          router.back();
        }}
        icon={icons.back}
      />

      <View style={styles.gestureArea}>
        <Svg
          height={2 * (RADIUS + STROKE_WIDTH)}
          width={2 * (RADIUS + STROKE_WIDTH)}
          onPressIn={handleSeek}
        >
          <Circle
            cx={RADIUS + STROKE_WIDTH}
            cy={RADIUS + STROKE_WIDTH}
            r={RADIUS}
            stroke="lightgray"
            strokeWidth={STROKE_WIDTH}
            fill="none"
          />
          <Circle
            cx={RADIUS + STROKE_WIDTH}
            cy={RADIUS + STROKE_WIDTH}
            r={RADIUS}
            stroke="orange"
            strokeWidth={STROKE_WIDTH}
            fill="none"
            {...getCircleProps()}
          />
        </Svg>
      </View>

      <TouchableOpacity style={styles.playButton} onPress={playPauseAudio}>
        <Text style={styles.playButtonText}>{player.playing ? "||" : "▶"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.restartButton} onPress={restartAudio}>
        <Text style={styles.restartButtonText}>Reiniciar</Text>
      </TouchableOpacity>

      <Text style={styles.progressText}>
        {formatTime(status.currentTime)} / {formatTime(status.duration)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.primaryLighter },
  gestureArea: { position: "relative" },
  playButton: {
    position: "absolute",
    top: "42%",
    backgroundColor: "black",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  playButtonText: { color: "white", fontSize: 24, fontWeight: "bold" },
  progressText: { marginTop: 20, fontSize: 16, color: "#4A4A4A" },
  restartButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#FFA500",
    borderRadius: 5,
  },
  restartButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
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

export default HeadspacePlayer;
