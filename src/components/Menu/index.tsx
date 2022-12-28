/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { FlatList } from 'react-native';
import { ProductProps } from '../../@types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { Text } from '../Text';
import {
  AddToCartButton,
  ProductCard,
  ProductDetails,
  ProductImage,
  Separator,
} from './styles';

interface MenuProps {
  onAddToCart: (product: ProductProps) => void;
  products: ProductProps[];
}



export function Menu({onAddToCart, products}: MenuProps) {
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | ProductProps>(null);

  function handleOpenModal(product: ProductProps) {
    setIsProductModalVisible(true);
    setSelectedProduct(product);
  }
  return (
    <>
      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={(product) => product._id}
        ItemSeparatorComponent={Separator}
        renderItem={({ item: product }) => (
          <ProductCard onPress={() => handleOpenModal(product)}>
            <ProductImage
              source={{
                uri: `http://192.168.1.71:3333/uploads/${product.imagePath}`
              }}
            />
            <ProductDetails>
              <Text weight="600">{product.name}</Text>
              <Text color="#666" size={14} style={{ marginVertical: 8 }}>
                {product.description}
              </Text>
              <Text size={14} weight="600">
                {formatCurrency(product.price)}
              </Text>
            </ProductDetails>
            <AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </AddToCartButton>
          </ProductCard>
        )}
      />
      <ProductModal
        visible={isProductModalVisible}
        onAddToCart={onAddToCart}
        onClose={() => setIsProductModalVisible(false)} product={selectedProduct}      />
    </>
  );
}
