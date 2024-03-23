import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import "./Hero.css";
function Hero() {
    const carousel1Images = [
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028289/gym-hero/img1_tmr4ki.jpg",
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028292/gym-hero/img2_x3obia.jpg",
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028296/gym-hero/img3_beeypv.jpg",
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028300/gym-hero/img4_k0yke0.jpg",
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028302/gym-hero/img5_uid7rv.jpg",
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028306/gym-hero/img6_ulzyvb.jpg",
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028309/gym-hero/img8_grk8b6.jpg",
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028312/gym-hero/img9_funzay.jpg",
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028315/gym-hero/img10_idbwgd.jpg",
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028319/gym-hero/img12_y2rd5l.jpg",
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028279/gym-hero/img27_h9zbzo.jpg",
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028283/gym-hero/img28_yrmaxj.jpg"
    ];

    const carousel2Images = [
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028322/gym-hero/img13_jsmat6.jpg",
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028325/gym-hero/img14_svcqne.jpg",
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028329/gym-hero/img16_kadmp7.jpg",
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028332/gym-hero/img17_rtvlnr.jpg",
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028336/gym-hero/img18_cyq0bb.jpg",
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028339/gym-hero/img19_rytkfy.jpg",
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028343/gym-hero/img20_acsjo1.jpg",
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028346/gym-hero/img21_z5hrfp.jpg",
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028270/gym-hero/img22_nzxunt.jpg",
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028273/gym-hero/img24_rm8npz.jpg",
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028276/gym-hero/img26_fmohmj.jpg",
        "https://res.cloudinary.com/dejmsrjrx/image/upload/v1711028286/gym-hero/img29_aecrsk.jpg"
    ];

    return (
        <div className="carouselContainer">
            <Carousel data-bs-theme="dark" className="carousel" indicators={false}>
                {carousel1Images.map((image, index) => (
                    <Carousel.Item key={index} interval={3000}>
                        <div className="sliderImageContainer">
                            <img
                                className="sliderImage"
                                src={image}
                                alt={`Slide ${index + 1}`}
                            />
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>

            <Carousel data-bs-theme="dark" className="carousel" indicators={false}>
                {carousel2Images.map((image, index) => (
                    <Carousel.Item key={index} interval={3000}>
                        <div className="sliderImageContainer">
                            <img
                                className="sliderImage"
                                src={image}
                                alt={`Slide ${index + 1}`}
                            />
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}

export default Hero;
