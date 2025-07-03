import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductListScreen } from './src/screens/product-list-screen';
import { ProductDetailScreen } from './src/screens/product-detail-screen';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { productId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const linking = {
    prefixes: ['https://kirandev.com'],
    config: {
      screens: {
        ProductList: {
          path: 'products',
          parse: {
            // No parsing needed for product list
          },
        },
        ProductDetail: {
          path: 'products/:productId',
          parse: {
            productId: (productId: string) => parseInt(productId, 10),
          },
        },
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen
          name="ProductList"
          component={ProductListScreen}
          options={{ title: 'Products' }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{ title: 'Product Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
