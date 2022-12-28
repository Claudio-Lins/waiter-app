import styled from 'styled-components/native';

export const ProductCard = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  `;


export const ProductImage = styled.Image`
  width: 120px;
  height: 96px;
  border-radius: 16px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;


export const ProductDetails = styled.View`
  flex: 1;
  margin-left: 16px;
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: #e2e2e2;
  margin: 16px 0;
`;

export const AddToCartButton = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  bottom: 0;
`;