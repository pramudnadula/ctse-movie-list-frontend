import styled from "styled-components";

export const Container = styled.View`
flex: 1;
background-color: #fff;
margin-top: 40px;
align-items:center;
width: 100%;
height: 100%;
`

export const ImageWrapper = styled.ImageBackground`
height: 100%;
width: 100%;
`

export const Back2 = styled.ImageBackground`
height: 100%;
width: 100%;
`
export const ContentWrapper = styled.View`
justify-content: center;
align-items: center;
width: 100%;
`

export const ContentWrapper2 = styled.View`
margin-top: 80px;
justify-content: center;
align-items: center;
width: 100%;
`

export const ContentWrapper3 = styled.View`
margin-top: 30px;
justify-content: center;
align-items: center;
width: 100%;
`

export const LogoWrapper = styled.View`
margin-top:200px;
`
export const LogoImage = styled.Image`
width: 200px;
z-index:3;
height: 200px;
`

export const LogoImage2 = styled.Image`
width: 200px;
height: 200px;
margin-top:100px;
`
export const HeaderRow = styled.View`
display: flex;
flex-direction: row;
margin-left: 60px;
justify-content: center;
align-items: center;
`

export const PostTitle = styled.Text`
font-size: 21px;
margin-left: 40px;
`

export const AllText = styled.Text`
font-size: 35px;
color: #0099FF;
`

export const AddButton = styled.TouchableOpacity`
align-self: flex-end;
margin-left: 30px;
`

export const Card = styled.View`
display:flex;
width: 100%;
margin-bottom: 10px;
border-bottom: 10px;
`

export const Car2 = styled.View`
background-color: #ccf5ff;
width: 100%;
margin-bottom: 10px;
border-bottom: 10px;
border-radius: 10px;
padding: 5px;
`


export const Card2 = styled.View`
background-color: #f8f8f8;
width: 90%;
margin-bottom: 8px;
border-radius: 30px;
`

export const CloseModal = styled.View`
width: 30px;
align-self: flex-end;
margin-bottom: 10px;
`

export const SendButton2 = styled.Pressable`
margin-top: 8px;
margin-left: 8px;
`

export const UserInfo = styled.View`
flex-direction: row;
padding: 15px;
justify-content: flex-start;
`

export const ImageBox = styled.View`
display: flex;
width: 100%;
flex-direction: row;
`

export const ImageBox2 = styled.View`
display: flex;
width: 100%;
flex-direction: column;
`

export const ImageBoxContent1 = styled.View`
flex: 1;
height: 240px;
`

export const Image1 = styled.Image`
height: 100%;
height: 100%;
margin: 4px;
`

export const Image2 = styled.Image`
height: 50%;
height: 50%;
margin: 2px;
`
export const ImageBoxContent2 = styled.View`
width: 50%;
display: flex;
height: 240px;
z-index:1;
flex-direction: column;
`


export const UserImage = styled.Image`
width: 40px;
height: 40px;
border-radius: 25px;
`

export const UserImage2 = styled.Image`
width: 30px;
height: 30px;
border-radius: 25px;
`

export const UserInfoText = styled.View`
flex-direction: column;
justify-content: center;
margin-left: 10px;
`

export const UserName = styled.Text`
font-size: 14px;
font-weight: bold;
color: white;
`
export const PostTime = styled.Text`
font-size: 12px;
color: #666;
`
export const PostText = styled.Text`
font-size: 16px;
color: #666;
padding-left: 15px;
padding-right: 15px;
margin-bottom:5px;
align-items: center;
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

export const CommentList = styled.View`
display: flex;
flex-direction: column;
`

export const Interactiontext = styled.Text`
font-size: 12px;
font-weight: bold;
color: #333;
margin-top: 5px;
color: ${props => props.active ? '#0099FF' : '#333'};
margin-left: 5px;
`

export const PopModal = styled.Modal`
width: 100%;
`

export const PopContent = styled.View`
width: 90%;
display: flex;
height: 90%;
padding: 10px;
margin: 8px;
border-radius: 10px;
flex-direction: column;
`

export const MainRow = styled.View`
display: flex;
width:100%;
justify-content: space-between;
flex-direction: row;
align-items: center;
`