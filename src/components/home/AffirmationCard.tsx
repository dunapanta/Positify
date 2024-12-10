import { COLORS, SIZES } from '@/src/constants';
import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

interface AffirmationCardProps {
    title: string;
    image: any;
    color: string;
}

const AffirmationCard = ({ title, image, color }: AffirmationCardProps) => {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.card,
                { backgroundColor: color, opacity: pressed ? 0.8 : 1 },
            ]}
            onPress={() => console.log('Card pressed')}
        >
            <Text style={styles.title}>{title}</Text>
            <Image source={image} style={styles.image} />
        </Pressable>
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
});

export default AffirmationCard;
