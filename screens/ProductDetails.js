import React, {useEffect, useState, useContext} from 'react';
import {
  Text, 
  Image, 
  View, 
  ScrollView, 
  SafeAreaView, 
  Button,
  StyleSheet
  } from 'react-native';

//import { getProduct } from '../services/ProductsService.js';
import { CartContext } from '../CartContext';
import CustomButton from '../components/CustomButton.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const URLPRODUCTOS = "http://192.168.0.114:8000/api/plato/${id}";
export function ProductDetails({route,navigation}) {
  const { productId } = route.params;
  const [product, setProduct] = useState([]);
  const { addItemToCart } = useContext(CartContext);
  
  const getProduct = async () => {
    const { data } = await axios.get(URLPRODUCTOS);
    const { productos } = data;
    if(productos.id == productId)
    setProduct(productos);
  }


  const storeData = async () => {
    try {
      await AsyncStorage.setItem(productID,route.params.productId);
    } catch (e) {
      // saving error
    }
  }
  
  const storeData2 = async () => {
    try {
      await AsyncStorage.setItem(product,route.params.productId,route.params.name,route.params.price,route.params.description,route.params.image);
    } catch (e) {
      // saving error
    }
  }
  function onAddToCart() {
    addItemToCart(route.params.productId);
  }
  
  return (
    <SafeAreaView>
      <ScrollView>
        <Image
          style={styles.image}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{route.params.name}</Text>
          <Text style={styles.price}>$ {route.params.price}</Text>
          <Text style={styles.description}>{route.params.description}</Text>
          <CustomButton
            text={'Add to Cart'}
            onPress={onAddToCart}
       
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },

    btn:{
    
      width:'100%',
      padding: 15,
      marginVertical:3,
      alignItems: 'center',
      borderRadius:5,
  },
  
    elevation: 1,
    marginVertical: 20,
  },
  image: {
    height: 300,
    width: '100%'
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
    marginBottom: 16,
  },
});
