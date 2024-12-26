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

  // Función para renderizar el patrón con Triángulo de Reuleaux
  const renderPattern = (count: number) => {
    const elements = [];
    for (let i = 0; i < count; i++) {
      const angle = (360 / count) * i;
      const petalRadius = size / 2; // Radio del triángulo de Reuleaux
      const petalAngle = 120; // Ángulo de 120 grados para simular las curvas del triángulo de Reuleaux
      elements.push(
        <Animated.View
          key={i}
          style={[
            styles.petal,
            {
              backgroundColor: colors[i % colors.length],
              transform: [
                { rotate: `${angle}deg` },
                { translateY: -petalRadius },
              ],
              width: petalRadius * 2,
              height: petalRadius * 2,
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
      {/* Kaleidoscope 1: Amarillos pastel y naranja pastel */}
      <Kaleidoscope
        colors={['#FFEB3B', '#FFCC80', '#FFD54F', '#FFB74D']} // Colores amarillos y naranjas pastel
        size={width * 0.15}
        duration={16000} // Slower animation
        delay={0}
      />
      {/* Kaleidoscope 3: Verdes pastel */}
      <Kaleidoscope
        colors={['#00CED1A0', '#20B2AAA0', '#5F9EA0A0']} // Colores verdes pastel
        size={width * 0.35}
        duration={20000} // Slowest animation
        delay={4000}
      />
      {/* Kaleidoscope 2: Azules pastel y violetas pastel */}
      <Kaleidoscope
        colors={['#FF149380', '#FF69B480', '#FFB6C180']} // Colores azules y violetas pastel
        size={width * 0.25}
        duration={18000} // Slightly slower
        delay={2000}
      />
      {/* Kaleidoscope 1: Amarillos pastel y naranja pastel */}
      <Kaleidoscope
        colors={['#FADFC0E6', '#F9CEA3E6', '#FBE9D3E6']} // Colores amarillos y naranjas pastel
        size={width * 0.15}
        duration={16000} // Slower animation
        delay={0}
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
  petal: {
    position: 'absolute',
    borderRadius: 50, // Redondeo para simular el borde curvado
    backgroundColor: 'transparent',
    borderWidth: 4, // Grosor del borde
    borderColor: 'transparent', // Para que la parte de borde sea transparente
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    transformOrigin: 'center', // Asegura que las rotaciones sean alrededor del centro
  },
});
