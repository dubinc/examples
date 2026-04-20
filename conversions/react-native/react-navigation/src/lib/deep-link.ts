export interface DeepLink {
  type: 'product';
  id: string;
}

export const parseDeepLink = (urlString: string): DeepLink | null => {
  try {
    const url = new URL(urlString);
    const pathComponents = url.pathname.split('/').filter(Boolean);

    let productId: string | null = null;

    const productIndex = pathComponents.findIndex(
      (component) => component === 'product'
    );

    if (productIndex !== -1 && productIndex + 1 < pathComponents.length) {
      productId = pathComponents[productIndex + 1] || null;
    } else {
      productId = pathComponents[pathComponents.length - 1] || null;
    }

    if (productId && productId.length > 0) {
      return {
        type: 'product',
        id: productId,
      };
    }

    return null;
  } catch (error) {
    console.error('Error parsing deep link:', error);
    return null;
  }
};
