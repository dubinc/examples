import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductListScreen } from './src/screens/product-list-screen';
import { ProductDetailScreen } from './src/screens/product-detail-screen';
import { Linking } from 'react-native';

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

  useEffect(() => {
    const handleDeepLink = (event: { url: string }) => {
      console.log('[DeepLink] Received via event listener:', event.url);
    };

    const logInitialUrl = async () => {
      const initialUrl = await Linking.getInitialURL();

      if (initialUrl) {
        console.log('[DeepLink] Initial URL (cold start):', initialUrl);
      }
    };

    // Cold start
    logInitialUrl();

    // Runtime
    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, []);

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
