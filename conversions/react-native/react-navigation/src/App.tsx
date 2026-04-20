import { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Linking,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProductsScreen from './screens/products';
import ProductDetailScreen from './screens/product-detail';
import AuthScreen from './screens/auth';
import { AuthProvider } from './lib/auth';
import { type Product } from './lib/api';
import { parseDeepLink } from './lib/deep-link';
import dub from '@dub/react-native';
import React from 'react';

export type RootStackParamList = {
  Products: undefined;
  ProductDetail: { product?: Product; productId?: string };
  Auth: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const navigationRef = useRef<any>(null);

  useEffect(() => {
    const cleanup = initializeApp();
    return () => {
      cleanup.then((cleanupFn) => cleanupFn?.());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeApp = async (): Promise<(() => void) | undefined> => {
    // Initialize Dub
    dub.init({
      publishableKey: '<DUB_PUBLISHABLE_KEY>',
      domain: '<DUB_DOMAIN>',
    });

    // Check if this is first launch
    const isFirstLaunch = await AsyncStorage.getItem('is_first_launch');
    // const isFirstLaunch = null;

    if (isFirstLaunch === null) {
      await handleFirstLaunch();
      await AsyncStorage.setItem('is_first_launch', 'false');
    } else {
      // Handle deep links
      const url = await Linking.getInitialURL();

      if (url) {
        await handleDeepLink(url);
      }
    }

    setIsReady(true);

    const linkingListener = Linking.addEventListener('url', (event) => {
      handleDeepLink(event.url);
    });

    return () => {
      linkingListener.remove();
    };
  };

  const handleFirstLaunch = async (): Promise<void> => {
    try {
      const response = await dub.trackOpen();

      if (response?.link?.url) {
        const deepLink = parseDeepLink(response.link.url);
        if (deepLink?.type === 'product') {
          navigationRef.current.navigate('ProductDetail', {
            productId: deepLink.id,
          });
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to handle first launch', [
        {
          text: 'OK',
        },
      ]);
    }
  };

  const handleDeepLink = async (url: string): Promise<void> => {
    try {
      const response = await dub.trackOpen(url);

      if (response?.link?.url) {
        const deepLink = parseDeepLink(response.link.url);

        if (deepLink?.type === 'product') {
          // Navigate to ProductDetail screen with productId
          if (navigationRef.current) {
            navigationRef.current.navigate('ProductDetail', {
              productId: deepLink.id,
            });
          } else {
            // If navigation is not ready, set initial route
            navigationRef.current.navigate('ProductDetail', {
              productId: deepLink.id,
            });
          }
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to handle deep link', [
        {
          text: 'OK',
        },
      ]);
    }
  };

  if (!isReady) {
    return <></>; // Or a loading screen
  }

  return (
    <AuthProvider>
      <NavigationContainer ref={navigationRef}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <Stack.Navigator
            initialRouteName="Products"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#f8f9fa',
              },
              headerTintColor: '#000',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen
              name="Products"
              component={ProductsScreen}
              options={{ title: 'Products' }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetailScreen}
              options={{ title: 'Product Details' }}
            />

            <Stack.Screen
              name="Auth"
              component={AuthScreen}
              options={{
                title: 'Sign In',
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
