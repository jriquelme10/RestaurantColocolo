import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, StyleSheet,Image} from 'react-native';
import axios from 'axios';
import { Product } from '../components/Product.js';
//import { getProducts } from '../services/ProductsService.js';
const URLPRODUCTOS = "http://192.168.0.114:8000/api/platos";
export function ProductsList ({navigation}) {

  const [listProducts, setListProducts] = useState([]);


 /*function renderProduct({item: product}) {
    return (
      <Product {...product} 
      onPress={() => {
        navigation.navigate('ProductDetails', {
          productId: product.id,
        });
      }}
      />
    );
  }
  

  /*const [products, setProducts] = useState([]);
  
  useEffect(() => {
   setProducts(getProducts());
  });
  */

  const getProducts = async () => {
    const { data } = await axios.get(URLPRODUCTOS);
    const { productos } = data;
    setListProducts(productos);
  };
  useEffect(() => {
    getProducts();
  }, []);

  const renderItemProducts = ({ item: product}) => (
    <Product
      name={product.nombre}
      price={product.precio}
      image={{uri: product.image}}
      onPress={() => {
        navigation.navigate('ProductDetails', {
          productId: product.id,
        });
      }}
    />
  );

  return (
    <View>

     <FlatList
      style={styles.productsList}
      contentContainerStyle={styles.productsListContainer}
      keyExtractor={(item) => item.id.toString()}
      data={listProducts}
      renderItem={renderItemProducts}
    /> 
    </View>
    
  );
}

const styles = StyleSheet.create({
  productsList: {
    backgroundColor: '#eeeeee',
  },
  productsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
});
