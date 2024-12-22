import { useEffect } from 'react';
import { useWindowDimensions, View, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

// Definimos los tipos para las props del componente Kaleidoscope
interface KaleidoscopeProps {
  colors: string[]; // Array de colores
  size: number; // Tamaño del kaleidoscopio
  duration: number; // Duración de la animación
  delay: number; // Retraso antes de iniciar la animación
}

const Kaleidoscope = ({ colors, size, duration, delay }: KaleidoscopeProps) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    const animationOptions = {
      duration,
      easing: Easing.bezier(0.3, 0.1, 0.3, 1), // Más lento y suave
    };

    rotation.value = withDelay(
      delay,
      withRepeat(withTiming(360, animationOptions), -1, false)
    );
    scale.value = withRepeat(withTiming(1.3, animationOptions), -1, true);
  }, [duration, delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
  }));

  // Función para renderizar el patrón de triángulos
  const renderPattern = (count: number) => {
    const elements = [];
    for (let i = 0; i < count; i++) {
      const angle = (360 / count) * i;
      elements.push(
        <Animated.View
          key={i}
          style={[
            styles.triangle,
            {
              borderBottomColor: colors[i % colors.length],
              transform: [
                { rotate: `${angle}deg` },
                { translateY: -size / 2 },
              ],
              borderBottomWidth: size * 0.3,
              borderLeftWidth: size * 0.15,
              borderRightWidth: size * 0.15,
            },
          ]}
        />
      );
    }
    return elements;
  };

  return (
    <Animated.View style={[styles.pattern, animatedStyle, { width: size, height: size }]}>
      {renderPattern(12)}
    </Animated.View>
  );
};

// Componente principal que renderiza varios Kaleidoscopios
export const AnimatedBackgroundKaleidoscope = () => {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      {/* Kaleidoscope 1 */}
      <Kaleidoscope
        colors={['#FFB3BA', '#FFDFBA', '#FFFFBA']} // Pastel pink, peach, yellow
        size={width * 0.4}
        duration={16000} // Slower animation
        delay={0}
      />
      {/* Kaleidoscope 2 */}
      <Kaleidoscope
        colors={['#BAE1FF', '#BAFFC9', '#FFB3BA']} // Pastel blue, green, pink
        size={width * 0.6}
        duration={18000} // Slightly slower
        delay={2000}
      />
      {/* Kaleidoscope 3 */}
      <Kaleidoscope
        colors={['#E2BAFF', '#FFDFD3', '#D5BAFF']} // Pastel purple, coral, lilac
        size={width * 0.8}
        duration={20000} // Slowest animation
        delay={4000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF', // Pastel off-white background
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  pattern: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  triangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
