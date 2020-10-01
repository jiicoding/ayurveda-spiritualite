import styled from "styled-components/native";
import { Dimensions } from "react-native";

export const Container = styled.View`
  width: 335px;
  height: 335px;
  background: #fff;
  margin: 10px 10px;
  border-radius: 14px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

export const Cover = styled.View`
  height: 260px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
  justify-content: flex-end;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

export const Logo = styled.Image`
  width: 48px;
  height: 48px;
  position: absolute;
  top: 90px;
  left: 50%;
  margin-left: -24px;
`;

export const Author = styled.Text`
  font-size: 13px;
  color: #b8bece;
  font-weight: 500;
  margin-top: 4px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #fff;
  font-weight: 600;
  margin-top: 4px;
  margin-left: 20px;
  margin-bottom: 20px;
  width: 170px;
`;

export const Subtitle = styled.Text`
  font-size: 15px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  margin-left: 20px;
`;

export const Content = styled.View`
  padding-left: 62px;
  justify-content: center;
  height: 75px;
`;

export const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  position: absolute;
  left: 20px;
  top: 20px;
  border-radius: 16px;
`;

export const Caption = styled.Text``;
