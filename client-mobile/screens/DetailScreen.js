import { View, Text, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Swiper from 'react-native-swiper'
import LoadingModal from "../components/LoadingModal";

const GET_DETAIL = gql`
    query Product($slug: String) {
    product(slug: $slug) {
        name
        mainImg
        price
        Images {
        id
        ProductId
        imgUrl
        }
        id
        description
        Category {
        id
        name
        }
        user {
        username
        email
        }
    }
    }
`

export default function DetailScreen()
{
    const route = useRoute()
    const { loading, error, data } = useQuery(GET_DETAIL, {
        variables: { slug: route.params.slug }
    })

    if (loading)
    {
        return (
            <LoadingModal></LoadingModal>
        )
    }

    else
    {
        // console.log(data.product.Images)
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Swiper style={styles.imageCarousel} autoplay={true} showsButtons={true}>
                        <Image source={{ uri: data.product.mainImg }} style={styles.mainImage} resizeMode="contain" />
                        <Image source={{ uri: data.product.Images[0].imgUrl }} style={styles.carouselImage} resizeMode="contain" />
                        <Image source={{ uri: data.product.Images[1].imgUrl }} style={styles.carouselImage} resizeMode="contain" />
                        <Image source={{ uri: data.product.Images[2].imgUrl }} style={styles.carouselImage} resizeMode="contain" />
                    </Swiper>
                </View>
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{data.product.name}</Text>
                    <Text style={styles.cardSubtitle}>{data.product.Category.name}</Text>
                    <Text style={styles.cardDescription}>Price: {data.product.price} IDR</Text>
                    <Text style={styles.cardDescription}>{data.product.description}</Text>
                    <Text style={styles.cardDescription}>Added by: {data.product.user.email}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        height: 300,
    },
    imageCarousel: {
    },
    mainImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        padding: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardSubtitle: {
        fontSize: 16,
        color: '#888',
    },
    cardDescription: {
        marginTop: 8,
        fontSize: 14,
        color: '#555',
    },
});
