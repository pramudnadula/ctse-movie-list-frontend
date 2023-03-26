import styled from 'styled-components';

export const UserInfo = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
`;

export const UserInfoText = styled.View`
	flex-direction: column;
	justify-content: center;
	margin-left: 10px;
`;

export const UserImage = styled.Image`
	width: 40px;
	height: 40px;
	border-radius: 25px;
`;

export const MainRow = styled.View`
	display: flex;
	width: 100%;
	justify-content: space-between;
	flex-direction: row;
	align-items: center;
`;

export const UserName = styled.Text`
	font-size: 18px;
	font-weight: bold;
	color: #000;
`;

export const Row = styled.View`
	display: flex;
	width: 100%;
	margin-top: 10px;
	justify-content: flex-start;
`;

export const Details = styled.Text`
	font-weight: 500;
	font-size: 14px;
	padding: 10px;
`;
