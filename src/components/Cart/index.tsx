import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../@types/CartItem';
import { ProductProps } from '../../@types/Product';
import { api } from '../../utils/api';
import { formatCurrency } from '../../utils/formatCurrency';
import { Buttom } from '../Buttom';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import OrderConfimedModal from '../OrderConfimedModal';
import { Text } from '../Text';
import {
  Actions,
  Image,
  Item,
  ProducDetails,
  ProductContainer,
  QuantityContainer,
  Sumary,
  TotalContainer,
} from './styles';

interface CartProps {
  cartItems: CartItem[];
  onAdd: (product: ProductProps) => void;
  onRemove: (product: ProductProps) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

export function Cart({ cartItems, onAdd, onRemove, onConfirmOrder, selectedTable }: CartProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderConfirmedModalVisible, setIsOrderConfirmedModalVisible] = useState(false);
  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  async function handleConfirmOrder() {
    setIsLoading(true);
    await api.post('/orders', {
      table: selectedTable,
      products: cartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity,
      }))
    });
    setIsLoading(false);

    setIsOrderConfirmedModalVisible(true); 
  }

  function handleOk() {
    onConfirmOrder();
    setIsOrderConfirmedModalVisible(false);
  }

  return (
    <>
      <OrderConfimedModal
        onOk={handleOk}
        visible={isOrderConfirmedModalVisible}
      />
      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          style={{ marginBottom: 16, maxHeight: 150 }}
          keyExtractor={(cartItem) => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.1.71:3333/uploads/${cartItem.product.imagePath}`,
                  }}
                />
                <QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>
                <ProducDetails>
                  <Text size={14} weight="600">
                    {cartItem.product.name}
                  </Text>
                  <Text size={14} color="#666" style={{ marginTop: 4 }}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </ProducDetails>
              </ProductContainer>
              <Actions>
                <TouchableOpacity 
                  onPress={() => onAdd(cartItem.product)} 
                  style={{ marginRight: 16 }}>
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => onRemove(cartItem.product)}
                >
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}
      <Sumary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">
            Total
              </Text>
              <Text size={20} weight="600">
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <>
              <Text color="#999">
            Seu carrinho está vazio
              </Text>
            </>
          )}
        </TotalContainer>
        <Buttom 
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
            Confirmar Pedido
        </Buttom>
      </Sumary>
    </>
  );
}
