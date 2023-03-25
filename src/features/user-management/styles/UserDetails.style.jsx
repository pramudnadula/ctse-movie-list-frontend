import styled from "styled-components";

export const UserImage = styled.Image`
	width: 200px;
	height: 200px;
	border-radius: 100px;
`;

export const ImageContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 20px;
`;

export const UserDetailsContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 20px;
`;

export const Details = styled.Text`
  font-weight: 600;
  font-size: 14px;
  padding: 10px;
  color: #fff;
`;