import { View, Text, Button, FlatList } from "react-native";
import { useQuery, gql } from '@apollo/client';
import { useEffect } from "react";
import LoadingModal from "../components/LoadingModal";
import CustomCard from "../components/Card";

const GET_USERS = gql`
  query Users {
  users {
    _id
    username
    email
    phoneNumber
    address
  }
}
`;
const GET_PRODUCTS = gql`
  query Products {
    products {
      mainImg
      name
      id
      description,
      slug
    }
}
`


export default function HomeScreen()
{

  const { loading, error, data } = useQuery(GET_PRODUCTS)

  if (loading)
  {
    // console.log("loading...")
    return (
      <LoadingModal></LoadingModal>
    )
  }

  else
  {
    // console.log(data.products)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          data={data.products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CustomCard
              title={item.name}
              description={item.description}
              imageUrl={item.mainImg}
              slug={item.slug}
            />
          )}
        />
      </View>
    );
  }
}