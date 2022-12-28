import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../Text';
import { Container, OrderHeader, Table } from './styles';

interface HeaderProps {
  selectedTable: string;
  onCancelOrder: () => void;
}

export function Header({selectedTable, onCancelOrder}: HeaderProps) {
  return (
    <Container>
      {!selectedTable ? (
        <>
          <Text size={14} opacity={0.9}>
        Bem-vindo(a) ao
          </Text>
          <Text size={24} weight="700">
        WAITER<Text size={24}>APP</Text>
          </Text>
        </> 
      ) : (
        <OrderHeader>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <Text size={24} weight='600'> 
        Pedido
            </Text>
            <TouchableOpacity onPress={onCancelOrder}>
              <Text size={14} color='#d73035' weight='600'>
              Cancelar pedido
              </Text>
            </TouchableOpacity> 
          </View>
          <Table>
            <Text size={14} color='#666'>
              Mesa  <Text size={16} weight="600">
                {selectedTable}
              </Text>
            </Text> 
          </Table>
        </OrderHeader>
      )}
    </Container>
  );
}
