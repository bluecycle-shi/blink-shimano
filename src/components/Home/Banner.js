import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { fetchBanners } from '../../services/banners-api';
import { disconnect } from '../../utils';

const Banner = () => {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        fetchBanners()
            .then(result => {
                setBanners(result.data.Data.Dados)
            })
            .catch(reject => {
                disconnect();
            })
    }, [])

    const HaveLink = ({ banner }) => {
        if (banner.LinkRedirecionamento) {
            return (
                <a href={banner.LinkRedirecionamento}>
                    <img src={banner.LinkImagem} alt="" style={{ margin: 'auto' }} />
                </a>
            )
        }

        return <img src={banner.LinkImagem} alt="" style={{ margin: 'auto' }} />
    }

    const CustomPrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <button
                className={`btn btn--icon btn-left ${className}`}
                onClick={onClick}
                style={{ ...style }}
            >
                <span className="icon icon-chevron-left"></span>
            </button>
        )
    }
    const CustomNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <button
                className={`btn btn--icon btn-right ${className}`}
                onClick={onClick}
                style={{ ...style }}
            >
                <span className="icon icon-chevron-right"></span>
            </button>
        )
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        loop: true,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />
    };

    return (
        <>
            {banners &&
                <section className="container carrossel_principal">
                    <Slider {...settings}>
                        {banners.map((banner, index) => (
                            <div key={index} className="carrossel_principal--item">
                                <HaveLink banner={banner} />
                            </div>
                        ))}
                    </Slider>
                </section>
            }
        </>
    )
}

export default Banner;