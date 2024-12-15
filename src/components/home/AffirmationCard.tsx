import { View, Text, Image, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import * as Haptics from "expo-haptics";

import { COLORS, icons, SIZES } from '@/src/constants';
import { Link } from 'expo-router';


interface AffirmationCardProps {
    affirmationFormat: "text" | "audio";
    title: string;
    image: any;
    color: string;
    onPress: () => void;
}

const AffirmationCard = ({ affirmationFormat, title, image, color, onPress }: AffirmationCardProps) => {
    return (
        <Link style={{ ...styles.card, backgroundColor: color }} href="/affirmationscroll" asChild>
            <TouchableOpacity
                /* style={({ pressed }) => [
                    styles.card,
                    { backgroundColor: color, opacity: pressed ? 0.8 : 1 },
                ]} */
               activeOpacity={0.8}
                onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    onPress();
                }}
            >
                <Text style={styles.title}>{title}</Text>
                <Image source={image} style={styles.image} />

                {/* Lock icon */}
                <View style={styles.lockIconContainer}>
                    <View style={styles.lockIconCircle}>
                        <Image source={icons.lock} style={{
                            width: 10,
                            height: 10,
                            tintColor: COLORS.primaryLighter
                        }} />
                    </View>
                </View>
                {/* affirmation Type */}
                <View style={styles.affirmationIconContainer}>
                    {affirmationFormat === "text" ? <Image source={icons.notebook} style={{
                        width: 23,
                        height: 23,

                    }} /> : <Image source={icons.headphones} style={{
                        width: 30,
                        height: 30,

                    }} />}
                </View>

            </TouchableOpacity>
        </Link>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1, // Ocupar espacio proporcionalmente
        marginVertical: 8,
        marginHorizontal: 4,
        height: SIZES.height * 0.13,
        borderRadius: 8,
        padding: 10,
        position: 'relative',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.secondaryLighter
    },
    title: {
        color: COLORS.secondary,
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
    },
    image: {
        width: SIZES.height < 1000 ? '50%' : '30%', // La imagen se adapta como porcentaje del contenedor
        height: undefined,
        aspectRatio: 1, // Mantener la proporción cuadrada
        position: 'absolute',
        bottom: -10, // Posición de la imagen en la parte inferior izquierda
        left: -10,
        transform: [{ rotate: '-15deg' }], // Rotar la imagen
        borderRadius: 8,
    },
    lockIconContainer: {
        position: 'absolute',
        top: 8,
        right: 8,
        opacity: 0.8,
    },
    lockIconCircle: {
        width: 18,
        height: 18,
        borderRadius: 16,
        backgroundColor: COLORS.secondaryLighter,
        justifyContent: 'center',
        alignItems: 'center',
    },
    affirmationIconContainer: {
        position: 'absolute',
        bottom: 8,
        right: 8,
    },
    affirmationIconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#4CAF50', // Verde para distinguir el ícono de afirmación
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AffirmationCard;
