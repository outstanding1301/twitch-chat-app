import React from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components'

const Container = styled.div`
    position: relative;
    width: 151px;
    height: 151px;
    cursor: pointer;
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
`;
const Title = styled.div`
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: #333333CC;
    color: #FFFFFF;
    font-size: 18px;
    font-weight: bold;
`;

class ChannelCard extends React.Component {
    state = {
        hover: false
    }

    render() {
        const {channel} = this.props;
        return (
            <Container 
                onMouseEnter={()=>{this.setState({hover: true})}} 
                onMouseLeave={()=>{this.setState({hover: false})}}
                onClick={()=>{this.props.history.push('/@'+channel.username)}}>
                {this.state.hover && <Title>
                    {channel.nickname}
                </Title>}
                <Image
                    src={channel.profile_image_url}
                    alt={channel.nickname}
                />
            </Container>
        );
    }
}

export default withRouter(ChannelCard);
