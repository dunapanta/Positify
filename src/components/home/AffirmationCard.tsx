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
        margin: 5, // Separación entre las tarjetas
        height: 120,
        borderRadius: 8,
        padding: 10,
        position: 'relative',
        overflow: 'hidden',
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    image: {
        width: '40%', // La imagen se adapta como porcentaje del contenedor
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
