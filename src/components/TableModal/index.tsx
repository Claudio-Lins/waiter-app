import React, { useState } from 'react';
import { Modal, Platform, TouchableOpacity } from 'react-native';
import { Buttom } from '../Buttom';
import { Close } from '../Icons/Close';
import { Text } from '../Text';
import { Input, ModalBody, ModalForm, ModalHeader, Overlay } from './styles';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export default function TableModal({visible, onClose, onSave}: ModalProps) {
  const [table, setTable] = useState('');

  function handleSaveTable() {
    setTable('');
    onSave(table);
    onClose();
  }

  return (
    <Modal animationType="fade" transparent visible={visible} >
      <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ModalBody>
          <ModalHeader>
            <Text weight="600">Informe a mesa</Text>
            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </ModalHeader>
          <ModalForm>
            <Input
              placeholder="Número da Mesa"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              onChangeText={setTable}
            />
            <Buttom
              disabled={!table}
              onPress={handleSaveTable}
            >Salvar
            </Buttom>
          </ModalForm>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
