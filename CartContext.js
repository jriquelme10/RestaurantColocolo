import React, {createContext, useState} from 'react';
import { getProduct } from './services/ProductsService';
import axios from 'axios';
//import { getProduct } from './services/ProductsService.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const CartContext = createContext();
const URLPRODUCTOS = "http://192.168.0.114:8000/api/plato/${id}";
export function CartProvider(props,{route}) {
  const [items, setItems] = useState([]);
  const [productID,setProductID] = useState('');
  const [productt,setProductt] = useState([]);


  
  const readData2 = async () => {
    try {
      const value = await AsyncStorage.getItem(product);
      
      if (value !== null) {
        setProduct(value);
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };

  
  function addItemToCart(id) {
    const product = getProduct(id);
    setItems((prevItems) => {
      const item = prevItems.find((item) => (item.id == id));
      if(!item) {
          return [...prevItems, {
              id,
              qty: 1,
              productt,
              totalPrice: productt.price 
          }];
      }
      else { 
          return prevItems.map((item) => {
            if(item.id == id) {
              item.qty++;
              item.totalPrice += productt.price;
            }
            return item;
          });
      }
    });
    
      

    
    
  }

  function getItemsCount() {
      return items.reduce((sum, item) => (sum + item.qty), 0);
  }
  
  function getTotalPrice() {
      return items.reduce((sum, item) => (sum + item.totalPrice), 0);
  }  
  
  return (
    <CartContext.Provider 
      value={{items, setItems, getItemsCount, addItemToCart, getTotalPrice}}>
      {props.children}
    </CartContext.Provider>
  );
}

