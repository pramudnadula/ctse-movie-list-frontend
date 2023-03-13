import styled from "styled-components";

export const Container = styled.View`
flex: 1;
background-color: #fff;
margin-top: 40px;
align-items:center;
`

export const AddButton = styled.TouchableOpacity`
align-self: flex-end;
margin-right: 10px;
`

export const Card = styled.View`
background-color: #f8f8f8;
width: 100%;
margin-bottom: 10px;
border-bottom: 10px;
`

export const UserInfo = styled.View`
flex-direction: row;
padding: 15px;
justify-content: flex-start;
`

export const EventImage = styled.Image`
width: 300px;
height: 150px;
border-radius: 1px;
`
export const UserInfoText = styled.View`
flex-direction: column;
justify-content: center;
margin-left: 10px;
`

export const UserName = styled.Text`
font-size: 14px;
font-weight: bold;
`
export const PostTime = styled.Text`
font-size: 12px;
color: #666;
`
export const PostText = styled.Text`
font-size: 14px;
padding-left: 15px;
padding-right: 15px;
`

export const PostImg = styled.Image`
width: 100%;
height: 250px;
margin-top: 15px;
`
export const Divider = styled.View`
border-bottom-color:#dddddd;
border-bottom-width: 1px;
width: 90%;
align-self: center;
margin-top: 15px;
`

export const InteractionWrapper = styled.View`
flex-direction: row;
justify-content: space-around;
padding: 15px;
`
export const Interaction = styled.TouchableOpacity`
flex-direction:row;
justify-content: center;
border-radius:5px;
padding: 5px;
background-color: ${props => props.active ? '#2e64e515' : 'transparent'};
`

export const Interactiontext = styled.Text`
font-size: 12px;
font-weight: bold;
color: #333;
margin-top: 5px;
color: ${props => props.active ? '#2e64e5' : '#333'};
margin-left: 5px;
`