import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from "react-native";
import { Svg, Circle } from "react-native-svg";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import AnimatedBackground from "@/src/components/shared/AnimatedBackground";

const RADIUS = 100;
const STROKE_WIDTH = 25;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const HeadspacePlayer: React.FC = () => {
  const player = useAudioPlayer(require("@/src/assets/audios/es_affirmation_general.mp3"));
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    player.play();
  }, []);

  const playPauseAudio = () => {
    player.playing ? player.pause() : player.play();
  };

  const handleSeek = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    const centerX = RADIUS + STROKE_WIDTH;
    const centerY = RADIUS + STROKE_WIDTH;

    const dx = locationX - centerX;
    const dy = locationY - centerY;

    const angle = Math.atan2(dy, dx);
    const normalizedAngle = angle >= 0 ? angle : 2 * Math.PI + angle;
    const progress = (normalizedAngle / (2 * Math.PI)) * player.duration;

    //const newTime = player.duration * progress;
    player.seekTo(progress);
  };

  const getCircleProps = () => {
    const progress = player.currentTime / player.duration || 0;
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
      <Text style={styles.title}>Básico</Text>
      <Text style={styles.subtitle}>Sesión 2</Text>
      <AnimatedBackground />

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

      <Text style={styles.progressText}>
        {formatTime(player.currentTime)} / {formatTime(player.duration)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FDE4D5" },
  title: { fontSize: 24, fontWeight: "bold", color: "#4A4A4A" },
  subtitle: { fontSize: 18, color: "#7D7D7D", marginBottom: 20 },
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
});

export default HeadspacePlayer;
