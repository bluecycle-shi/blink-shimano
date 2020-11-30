import React, { useState, useEffect } from 'react';
import { fetchBanners } from '../../services/banners-api';
import { disconnect } from '../../utils';

const BannerInterno = (props) => {
    const [banners, setBanners] = useState([]);

    const nameHighlight = props.nameHighlight;

    useEffect(() => {
        const tag = nameHighlight;
        fetchBanners(tag)
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
                    <img src={banner.LinkImagem} alt="" />
                </a>
            )
        }

        return <img src={banner.LinkImagem} alt="" />
    }


    return (
        <>
            {banners.length > 0 && <div className="banner-interno">
                {banners.map((banner, index) => (
                    <div key={index} className="carrossel_principal--item">
                        <HaveLink banner={banner} />
                    </div>
                ))}
            </div>
            }
        </>
    )
}

export default BannerInterno;