// screens/ProductDetailScreen.tsx
import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../lib/auth';
import { API } from '../lib/api';
import type { Product } from '../lib/api';
import type { RootStackParamList } from '../App';
import dub from '@dub/react-native';
import React from 'react';

type ProductDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProductDetail'
>;

type ProductDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetail'
>;

const { width } = Dimensions.get('window');
const api = new API();

export default function ProductDetailScreen() {
  const navigation = useNavigation<ProductDetailScreenNavigationProp>();
  const route = useRoute<ProductDetailScreenRouteProp>();
  const { isAuthenticated, currentUser } = useAuth();
  const [product, setProduct] = useState<Product | null>(
    route.params?.product || null
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(!route.params?.product);

  const loadProduct = useCallback(
    async (productId: string): Promise<void> => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const fetchedProduct = await api.fetchProduct(productId);
        setProduct(fetchedProduct);
      } catch (error) {
        Alert.alert('Error', 'Failed to load product');
        navigation.goBack();
      } finally {
        setIsLoading(false);
      }
    },
    [navigation]
  );

  useEffect(() => {
    if (!product && route.params?.productId) {
      loadProduct(route.params.productId);
    }
  }, [product, route.params, loadProduct]);

  const handlePurchase = async (): Promise<void> => {
    if (!product) return;

    if (!isAuthenticated || !currentUser) {
      navigation.navigate('Auth');
      return;
    }

    try {
      try {
        await dub.trackSale({
          customerExternalId: currentUser.id.toString(),
          amount: Math.round(product.price * 100),
          currency: 'usd',
          eventName: 'Purchase',
        });
      } catch (error) {
        // Sale tracking failed but purchase can still proceed
      }
      Alert.alert('Success', 'Purchase completed!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to complete purchase');
    }
  };

  const renderStars = (rating: number) => {
    const stars: React.ReactNode[] = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Text
          key={i}
          style={[
            styles.star,
            { color: i < Math.floor(rating) ? '#FFD700' : '#DDD' },
          ]}
        >
          ★
        </Text>
      );
    }
    return stars;
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading Product...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setSelectedImageIndex(index);
          }}
        >
          {product.images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={styles.productImage}
              resizeMode="contain"
            />
          ))}
        </ScrollView>
        <View style={styles.imageIndicator}>
          {product.images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === selectedImageIndex ? '#007AFF' : '#DDD',
                },
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>

        <View style={styles.ratingContainer}>
          <View style={styles.stars}>
            {renderStars(product.rating)}
            <Text style={styles.ratingText}>({product.rating.toFixed(1)})</Text>
          </View>
          <Text
            style={[
              styles.stock,
              { color: product.stock > 10 ? '#4CAF50' : '#FF9800' },
            ]}
          >
            {product.stock} in stock
          </Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          {product.discountPercentage > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {Math.round(product.discountPercentage)}% OFF
              </Text>
            </View>
          )}
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Brand</Text>
            <Text style={styles.infoValue}>{product.brand || '-'}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Category</Text>
            <Text style={styles.infoValue}>
              {product.category.charAt(0).toUpperCase() +
                product.category.slice(1)}
            </Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <TouchableOpacity
          style={styles.purchaseButton}
          onPress={handlePurchase}
        >
          <Text style={styles.purchaseButtonText}>Purchase Product</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '500',
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FF4444',
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  productImage: {
    width: width,
    height: 300,
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 14,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  stock: {
    fontSize: 14,
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  discountBadge: {
    backgroundColor: '#FF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 16,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  purchaseButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  purchaseButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
