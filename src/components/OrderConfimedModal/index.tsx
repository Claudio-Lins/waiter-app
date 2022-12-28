import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Modal } from 'react-native';
import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';
import { ModalContainer, OkButtom } from './styles';

interface OrderConfimedModalProps {
  visible: boolean;
  onOk: () => void;
}

export default function OrderConfimedModal({
  visible,
  onOk,
}: OrderConfimedModalProps) {
  return (
    <Modal 
      animationType="fade" 
      transparent={false} 
      visible={visible}
    >
      <StatusBar style='light' />
      <ModalContainer>
        <CheckCircle />
        <Text color="#fff" size={20} weight="600" style={{ marginTop: 12 }}>
          Pedido confirmado!
        </Text>
        <Text color="#fff" style={{ marginTop: 4 }}>
          O pedido já entrou em fase de produção
        </Text>
        <OkButtom
          onPress={onOk}
        >
          <Text color='#d73035' weight='600'>
            Ok
          </Text>
        </OkButtom>
      </ModalContainer>
    </Modal>
  );
}
