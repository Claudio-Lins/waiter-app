import React from 'react';
import { Modal, Platform } from 'react-native';
import { Text } from '../Text';
import { Button, MessageArea, ModalBody, ModalHeader, Overlay } from './styles';

interface ModalProps {
  visible: boolean;
  onClose?: () => void;
  setTable?: (table: string) => void;
  table: string;
  statusMessage: string;
}

export function StatusModal({visible, onClose, table, statusMessage}: ModalProps) {
  // const [table, setTable] = useState('');
  // const [statusMessage, setStatusMessage] = useState('');

  // function handleSaveTable() {
  //   setTable('');
  //   onClose();
  // }

  return (
    <Modal animationType="fade" transparent visible={visible} >
      <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ModalBody>
          <ModalHeader>
            <Text size={18} weight="600">Pedido da mesa</Text>
            <Text size={24} weight="600">{table}</Text>
          </ModalHeader>
          <MessageArea>
            <Text weight='700' size={22} style={{ textAlign: 'center' }} color="#0853dd">
              {statusMessage}
            </Text>
          </MessageArea>
          <Button onPress={onClose}>
            <Text color='#f6f6f6' weight='600'>
              Ok
            </Text>
          </Button>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
