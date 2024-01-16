import React from 'react'
import Card from 'react-bootstrap/Card';
import banner1 from './banner1.jpg';
import Products from './Products';

const Home = () => {
    return (
        <div className='home-banner'>
            <Card className="bg-dark text-dark border-0">
                <Card.Img src={banner1} alt="banner" />
                <Card.ImgOverlay>
                  <div className="container mt-5">
                  <Card.Title className='display-5 fw-bolder' style={{marginLeft:'88vh', marginTop:'35vh', fontStyle:'italic', fontFamily:'cursive', fontSize:'5vh'}}>One stop for all your solution...!</Card.Title>
                  </div>
                </Card.ImgOverlay>
            </Card>
        </div>
    )
}

export default Home