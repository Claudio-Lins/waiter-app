/* eslint-disable react/react-in-jsx-scope */
import { ActivityIndicator } from 'react-native';
import { Text } from '../Text';
import { Container } from './styles';

interface ButtomProps {
  children: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function Buttom({ children, onPress, disabled, loading }: ButtomProps) {
  return (
    <Container onPress={onPress} disabled={disabled || loading}>
      {!loading && (
        <Text weight="600" color="#fff">
          {children}
        </Text>
      )}
      {loading && (
        <ActivityIndicator size="small" color="#fff" />
      )}
    </Container>
  );
}
