import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function CustomCard({ title, description, imageUrl, slug })
{
    const navigation = useNavigation();

    const handlePress = () =>
    {
        navigation.navigate('Detail', { slug: slug })
    }

    return (
        <TouchableOpacity onPress={handlePress}>
            <View style={styles.card}>
                <Image source={{ uri: imageUrl }} style={styles.cardImage} />
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{title}</Text>
                    <Text style={styles.cardDescription}>{description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#333',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
    },
    cardImage: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    cardContent: {
        padding: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardDescription: {
        marginTop: 8,
        fontSize: 14,
        color: '#555',
    },
});

