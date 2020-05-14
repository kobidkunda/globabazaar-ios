
import React from 'react';
import styled from 'styled-components/native';
import {BLUEDARK, BLUESLIGHT, DARKBLACK, WHITE} from '../Config/theme';

export const TEXTLLG = styled.Text`
  font-size: 25px
  font-family: 'MontserratBold'
  text-transform: uppercase
  color: ${BLUEDARK}
`;

export const TEXTLLGWHITE = styled.Text`
  font-size: 18px
  font-family: 'MontserratBold'
  text-transform: uppercase
  color: ${WHITE}
`;
export const TEXTSMWHITE = styled.Text`
  font-size: 10px
  font-family: 'MontserratMedium'
  text-transform: uppercase
  text-align:left
  color: ${WHITE}
`;

export const TEXTLG = styled.Text`
  font-size: 24px
  font-family: 'MontserratSemiBold'
  color: ${BLUEDARK}
`;

export const TEXTNL = styled.Text`
  font-size: 14px
  font-family: 'MontserratMedium'
  color: ${WHITE}
`;
export const TEXTNLBLACK = styled.Text`
  font-size: 18px
  font-family: 'MontserratBold'
  color: ${DARKBLACK}
`;
