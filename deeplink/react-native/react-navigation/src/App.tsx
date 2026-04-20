import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Linking,
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dub from '@dub/react-native';
import React from 'react';

interface DeepLink {
  url: string;
  id: string;
}

export default function App() {
  const [deepLink, setDeepLink] = useState<DeepLink | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      // Initialize Dub
      dub.init({
        publishableKey: '<DUB_PUBLISHABLE_KEY>',
        domain: '<DUB_DOMAIN>',
      });

      // Check if this is first launch
      const storedFirstLaunch = await AsyncStorage.getItem('is_first_launch');
      const isFirst = storedFirstLaunch === null;

      if (isFirst) {
        trackOpen();
        await AsyncStorage.setItem('is_first_launch', 'false');
      }

      // Handle initial URL
      const url = await Linking.getInitialURL();
      if (url) {
        trackOpen(url);
      }
    };

    initializeApp();

    const linkingListener = Linking.addEventListener('url', (event) => {
      trackOpen(event.url);
    });

    return () => {
      linkingListener.remove();
    };
  }, []);

  // Step 1: Track the open
  // Call `dub.trackOpen` from useEffect only on the first launch and URL listener
  const trackOpen = async (deepLinkUrl?: string): Promise<void> => {
    console.log('Tracking open:', deepLinkUrl || '-');
    try {
      const response = await dub.trackOpen(deepLinkUrl);

      // Navigate to final link via link.url
      if (response?.link?.url) {
        setDeepLink({
          url: response.link.url,
          id: response.link.url,
        });
      }
    } catch (error) {
      console.error('Dub error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Text style={styles.title}>Dub deep linking demo</Text>

        <Text style={styles.deepLinkText}>
          Deep link: {deepLink?.url || '-'}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // For testing - you can manually trigger with a URL
            trackOpen('https://example.com/test');
          }}
        >
          <Text style={styles.buttonText}>Test Deep Link</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={deepLink !== null}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setDeepLink(null)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detail View</Text>
            <Text style={styles.modalText}>
              Navigated to: {deepLink?.url}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setDeepLink(null)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  deepLinkText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
