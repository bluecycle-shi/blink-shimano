import React, { useState, useRef, useEffect } from 'react';

const SearchBarResponsive = (props) => {
    const [busca, setBusca] = useState("");

    const latestProps = useRef(props);

    useEffect(() => { latestProps.current = props; });

    const handleChange = (e) => {
        setBusca(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        window.location.href = '/busca?t=' + busca;
        return false;
    }

    return (
        <form className="header_search" onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor="search2" className="input-search">
                    <input 
                        type="text" 
                        id="search2" 
                        name="busca" 
                        className="form-control" 
                        placeholder="Procurar um produto"
                        value={busca}
                        onChange={handleChange}
                    />
                    <span className="fas fa-search" onClick={handleSubmit}></span>
                </label>
            </fieldset>
        </form>
    )
}

export default SearchBarResponsive;