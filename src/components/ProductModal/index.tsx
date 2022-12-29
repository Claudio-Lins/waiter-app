import React from 'react';
import { FlatList, Modal } from 'react-native';
import { ProductProps } from '../../@types/Product';
import { formatCurrency } from '../../utils/formatCurrency';
import { Buttom } from '../Buttom';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import {
  CloseButtom,
  Foonter,
  FooterContainer,
  Header,
  Image,
  Ingredient,
  IngredientsContainer,
  ModalBody,
  Price
} from './styles';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: null | ProductProps;
  onAddToCart: (product: ProductProps) => void;
}

export function ProductModal({ visible, onClose, product, onAddToCart }: ProductModalProps) {
  if (!product) {
    return null;
  }

  function handleAddToCart() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    onAddToCart(product!);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <Image
        source={{
          uri: `http://192.168.1.142:3333/uploads/${product.imagePath}`,
        }}
      >
        <CloseButtom onPress={onClose}>
          <Close />
        </CloseButtom>
      </Image>
      <ModalBody>
        <Header>
          <Text size={24} weight="600">
            {product.name}
          </Text>
          <Text style={{ marginTop: 8 }} color="#666">
            {product.description}
          </Text>
        </Header>
        {product.ingredients.length > 0 && (
          <IngredientsContainer>
            <Text size={16} weight="600" color="#666">
            Ingredientes
            </Text>
            <FlatList
              data={product.ingredients}
              style={{ marginTop: 16 }}
              keyExtractor={(ingredient) => ingredient._id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item: ingredient }) => (
                <Ingredient>
                  <Text size={16} weight="600">
                    {ingredient.icon}
                  </Text>
                  <Text
                    color="#666"
                    size={14}
                    style={{
                      marginLeft: 8,
                    }}
                  >
                    {ingredient.name}
                  </Text>
                </Ingredient>
              )}
            />
          </IngredientsContainer>
        )}
      </ModalBody>
      <Foonter>
        <FooterContainer>
          <Price>
            <Text size={16} color="#666">Preço</Text>
            <Text size={20} weight="600">
              {formatCurrency(product.price)}
            </Text>
          </Price>
          <Buttom onPress={handleAddToCart}>Adicionar ao pedido</Buttom>
        </FooterContainer>
      </Foonter>
    </Modal>
  );
}
