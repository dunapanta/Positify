import { COLORS } from '@/src/constants';
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

export const AnimatedBackgroundOpacity = () => {
  const { height, width } = useWindowDimensions();
 
   const top1 = useSharedValue(0.1 * height);
   const top2 = useSharedValue(0.3 * height);
   const top3 = useSharedValue(0.5 * height);
 
   useEffect(() => {
     const options = {
       duration: 4000,
       easing: Easing.bezier(0.5, 0, 0.5, 1),
     };
     top1.value = withRepeat(withTiming(0.2 * height, options), -1, true);
     top2.value = withDelay(
       1000,
       withRepeat(withTiming(0.4 * height, options), -1, true)
     );
     top3.value = withDelay(
       2000,
       withRepeat(withTiming(0.6 * height, options), -1, true)
     );
   }, []);
 
   return (
     <View style={styles.container}>
       {/* Circles (concentrically) */}
       <Animated.View
         style={[styles.circle, {
           top: top1,
           left: (width - (width * 0.5)) / 2,
           backgroundColor: COLORS.weeklyColor20,
           width: '50%'
         }]} // Small circle
       />
       <Animated.View
         style={[styles.circle, {
           top: top2,
           left: (width - (width * 0.7)) / 2,
           backgroundColor: COLORS.weeklyColor21,
           width: '70%'
         }]} // Medium circle
       />
       <Animated.View
         style={[styles.circle, {
           top: top3,
           left: (width - (width * 0.9)) / 2,
           backgroundColor: COLORS.weeklyColor22,
           width: '90%'
         }]} // Large circle
       />
     </View>
   );
 }
 
 const styles = StyleSheet.create({
   container: {
     position: 'absolute',
     opacity: 0.3,
     top: 0,
     bottom: 0,
     left: 0,
     right: 0,
     justifyContent: 'center',
     alignItems: 'center',
   },
   circle: {
     position: 'absolute',
     aspectRatio: 1, // Ensure the circle is square
     borderRadius: 10000, // Make it fully round
     borderWidth: 0.5,
     borderColor: COLORS.secondaryLighter,
   },
 });