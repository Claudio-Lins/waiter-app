import { Platform } from 'react-native';
import styled from 'styled-components/native';

const isAndroid = Platform.OS === 'android';

export const CategoryButtom = styled.TouchableOpacity`
  align-items: center;
  margin-left: 16px;
`;

export const Icon = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: #fff;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, ${isAndroid ? 1 : 0.1});
  elevation: 2;
`;