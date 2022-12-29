/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import socketIo from 'socket.io-client';
import { CartItem } from '../@types/CartItem';
import { ProductProps } from '../@types/Product';
import { Buttom } from '../components/Buttom';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Empty } from '../components/Icons/Empty';
import { Menu } from '../components/Menu';
import TableModal from '../components/TableModal';
import { Text } from '../components/Text';
import { api } from '../utils/api';

import { Category } from '../@types/Category';
import { OrderProps } from '../@types/Order';
import {
  CategoriesContainer,
  Container,
  Foonter,
  LoadingContainer,
  MenuContainer,
} from './styles';

export function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItens, setCartItens] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);

  // axios resquest api
  useEffect(() => {
    Promise.all([api.get('/products'), api.get('/categories')]).then(
      ([productsResponse, categoriesResponse]) => {
        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
        setIsLoading(false);
      }
    );
  }, []);

  // socket connection
  useEffect(() => {
    const socket = socketIo('http://192.168.1.142:3333', {
      transports: ['websocket'],
    });
    socket.on('orders@status', () => {
      api.get('/orders').then((response) => {
        setOrders(response.data);
        response.data.map((order: OrderProps) => {
          order.status === 'IN_PRODUCTION' &&
            alert(`Pedido da mesa ${order.table} em produção`);
          order.status === 'DONE' && alert(`Pedido da mesa ${order.table} pronto`)
          ;
        });
      });
    }
    );
  }, []);

  async function handleSelectCategory(categoryId: string) {
    const route = !categoryId
      ? '/products'
      : `/categories/${categoryId}/products`;

    setIsLoadingProducts(true);
    // await new Promise(resolve => setTimeout(resolve, 2000));
    const { data } = await api.get(route);
    setProducts(data);
    setIsLoadingProducts(false);
  }

  function handleSaveTable(table: string) {
    setIsTableModalVisible(false);
    // alert(table);
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItens([]);
  }

  function handleAddToCart(product: ProductProps) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }
    setCartItens((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        });
      }
      const newCartItems = [...prevState];
      newCartItems[itemIndex] = {
        ...newCartItems[itemIndex],
        quantity: newCartItems[itemIndex].quantity + 1,
      };
      return newCartItems;
    });
  }

  function handleRemoveFromCart(product: ProductProps) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }
    setCartItens((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      const item = prevState[itemIndex];
      const newCartItems = [...prevState];

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);
        return newCartItems;
      }
      newCartItems[itemIndex] = {
        ...newCartItems[itemIndex],
        quantity: newCartItems[itemIndex].quantity - 1,
      };
      return newCartItems;
    });
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />
        {!isLoading ? (
          <>
            <CategoriesContainer>
              <Categories
                onSelectCategory={handleSelectCategory}
                categories={categories}
              />
            </CategoriesContainer>
            {isLoadingProducts ? (
              <LoadingContainer>
                <ActivityIndicator size="large" color="#666" />
              </LoadingContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <MenuContainer>
                    <Menu products={products} onAddToCart={handleAddToCart} />
                  </MenuContainer>
                ) : (
                  <LoadingContainer>
                    <Empty />
                    <Text opacity={0.5} color="#666" style={{ marginTop: 12 }}>
                      Nenhum produto encontrado
                    </Text>
                  </LoadingContainer>
                )}
              </>
            )}
          </>
        ) : (
          <LoadingContainer>
            <ActivityIndicator size="large" color="#666" />
          </LoadingContainer>
        )}
      </Container>
      <Foonter>
        {/* <FooterContainer> */}
        {!selectedTable && (
          <Buttom
            onPress={() => setIsTableModalVisible(true)}
            disabled={isLoading}
          >
            Novo Pedido
          </Buttom>
        )}
        {selectedTable && (
          <Cart
            cartItems={cartItens}
            onAdd={handleAddToCart}
            onRemove={handleRemoveFromCart}
            onConfirmOrder={handleResetOrder}
            selectedTable={selectedTable}
          />
        )}
        {/* </FooterContainer> */}
      </Foonter>
      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
}
