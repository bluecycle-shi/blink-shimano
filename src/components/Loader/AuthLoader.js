import React from 'react';

export const AuthLoader = () => {
    return (
        <>
            <div className="d-flex justify-content-center">
                <div className="spinner-grow text-danger my-5" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-warning my-5" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow text-primary my-5" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <p>Direcionando para a loja...</p>
            </div>
        </>
    )
}