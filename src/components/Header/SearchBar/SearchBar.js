import React, { useState, useRef, useEffect } from 'react';

const Search = (props) => {
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
                <label htmlFor="search" id="searchlabel" className="input-search">
                    <input
                        type="text"
                        id="search"
                        name="busca"
                        className="form-control"
                        placeholder="Qual produto você está procurando?"
                        value={busca}
                        onChange={handleChange}
                    />
                    <span className="fas fa-search icon-submit" onClick={handleSubmit}></span>
                </label>
            </fieldset>
        </form>
    );
}

export default Search;