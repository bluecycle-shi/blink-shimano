import React, { useState, useEffect, createElement } from 'react';
// import { Link } from 'react-router-dom';
import { fetchBanners } from '../../services/banners-api';
// import { disconnect } from '../../utils';

const BannerAD = () => {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        const position = 'Meio';
        fetchBanners('', position)
            .then(result => {
                if (result.data.Data) {
                    setBanners(result.data.Data.Dados)
                }
            })
            /* Deixado somente 1 disconnect */
            // .catch(reject => {
            //     disconnect();
            // })
    }, [])

    const HaveLink = ({ banner }) => {
        if (banner.LinkRedirecionamento) {
            return (
                createElement('a', { href: banner.LinkRedirecionamento }, <img src={banner.LinkImagem} alt="" />)
            )
        }

        return (
            <img src={banner.LinkImagem} alt="" />
        )
    }

    return (
        <section style={{ marginBottom: '37px', textAlign: 'center' }}>
            {banners.map((banner, index) => (
                <div key={index} className="banner_ad--item">
                    <HaveLink banner={banner} />
                </div>
            ))
            }
        </section >
    )
}

export default BannerAD;