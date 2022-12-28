import styled from 'styled-components/native';

export const ModalBody = styled.View`
  flex: 1;
  background: #fafafa;
  padding: 32px 24px 0;
`;

export const Header = styled.View`

`;

export const Image = styled.ImageBackground`
  width: 100%;
  height: 200px;
`;

export const CloseButtom = styled.TouchableOpacity`
  position: absolute;
  width: 32px;
  height: 32px;
  top: 20px;
  right: 20px;
  background: #000;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  opacity: 0.7;
`;

export const IngredientsContainer = styled.View`
  margin-top: 32px;
`;

export const Ingredient = styled.View`
  flex-direction: row;
  align-items: center;
  border: 1px solid rgba(204, 204, 204, 0.3);
  border-radius: 8px;
  padding: 8px 16px;
  margin-bottom: 4px;
`;


export const Foonter = styled.View`
  min-height: 110px;
  background: #fff;
  padding: 16px 24px;
`;

export const FooterContainer = styled.SafeAreaView`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

export const Price = styled.View``;