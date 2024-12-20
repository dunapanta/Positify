import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, GestureResponderEvent } from "react-native";
import { Audio, AVPlaybackStatus } from "expo-av";
import { Svg, Circle } from "react-native-svg";
import AnimatedBackground from "@/src/components/shared/AnimatedBackground";

type SoundObject = Audio.Sound | null;

const HeadspacePlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const soundRef = useRef<SoundObject>(null);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);

  const RADIUS = 100; // Radio del círculo
  const STROKE_WIDTH = 25;
  const circumference = 2 * Math.PI * RADIUS; // Circunferencia del círculo

  useEffect(() => {
    loadAudio();
    return () => {
      soundRef.current?.unloadAsync();
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !dragging) {
      interval = setInterval(updateProgress, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, dragging]);

  const loadAudio = async () => {
    const { sound, status } = await Audio.Sound.createAsync(
      require("@/src/assets/audios/es_affirmation_general.mp3"),
      { shouldPlay: false }
    );
    soundRef.current = sound;
    const playbackStatus = await sound.getStatusAsync();
    if (playbackStatus.isLoaded) {
      setDuration(playbackStatus.durationMillis / 1000);
    }
  };

  const playPauseAudio = async () => {
    if (soundRef.current) {
      if (isPlaying) {
        await soundRef.current.pauseAsync();
      } else {
        await soundRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updateProgress = async () => {
    if (soundRef.current && !dragging) {
      const status = await soundRef.current.getStatusAsync();
      if (status.isLoaded) {
        setProgress(status.positionMillis / 1000);
      }
    }
  };

  const onSeek = async (newProgress: number) => {
    if (soundRef.current) {
      await soundRef.current.setPositionAsync(newProgress * 1000);
      setProgress(newProgress);
    }
  };

  const handleDragStart = () => setDragging(true);

  const handleDragMove = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    const centerX = RADIUS + STROKE_WIDTH;
    const centerY = RADIUS + STROKE_WIDTH;
    const dx = locationX - centerX;
    const dy = locationY - centerY;
    const angle = Math.atan2(dy, dx);
    const normalizedAngle = angle >= 0 ? angle : 2 * Math.PI + angle;
    const newProgress = (normalizedAngle / (2 * Math.PI)) * duration;
    setProgress(newProgress);
  };

  const handleDragEnd = () => {
    setDragging(false);
    onSeek(progress);
  };

  const getCircleProps = () => {
    const offset = circumference - (progress / duration) * circumference;
    return { strokeDasharray: `${circumference}`, strokeDashoffset: offset };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Básico</Text>
      <Text style={styles.subtitle}>Sesión 2</Text>
      <AnimatedBackground />

      <View
        style={styles.gestureArea}
        onStartShouldSetResponder={() => true}
        onResponderGrant={handleDragStart}
        onResponderMove={handleDragMove}
        onResponderRelease={handleDragEnd}
      >
        <Svg height={2 * (RADIUS + STROKE_WIDTH)} width={2 * (RADIUS + STROKE_WIDTH)}>
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
        <Text style={styles.playButtonText}>{isPlaying ? "||" : "▶"}</Text>
      </TouchableOpacity>

      <Text style={styles.progressText}>
        {Math.floor(progress / 60)}:{Math.floor(progress % 60).toString().padStart(2, "0")} / {Math.floor(duration / 60)}:{Math.floor(duration % 60).toString().padStart(2, "0")}
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
