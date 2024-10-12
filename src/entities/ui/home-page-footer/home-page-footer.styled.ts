import styled from 'styled-components';
import { Link } from 'shared/ui/link';

export const ContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #555;
  color: #fff;
  padding: 20px 0;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;

export const CopyAndLogoWrapperStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 1100px) {
    text-align: center;
    margin-bottom: 20px;
  }
`;

export const CopyStyled = styled.p`
  font-size: 14px;
  opacity: 0.6;
  align-self: center;
`;

export const BrandStyled = styled.p`
  font-size: 14px;
  opacity: 0.6;
  align-self: center;
`;

export const ListStyled = styled.ul`
  display: flex;
`;

export const ItemListStyled = styled.li`
  margin-left: 16px;

  @media (max-width: 1100px) {
    margin: 0 8px;
  }
`;

export const TelegramLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  & svg {
    font-size: 36px;
  }
`;

/*




.list {
    
}

.item {
   
}




@media (max-width: 1100px) {
    .container {
        flex-direction: column;
    }

    .copyAndLogo {
        text-align: center;
        margin-bottom: 20px;
    }

    .item {
        margin: 0 8px;
    }
}

*/
