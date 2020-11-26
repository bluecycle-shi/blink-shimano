import React from 'react';
import '../../scss/common.scss';
import '../../scss/tipbar.scss';

const TipBar = () => {
return (
<>
  <div className="box">
    <div className="container">
      <div className="row">
        <div className="col-md-3 col-12 d-flex flex-row align-items-center flex-wrap justify-content-center">
          <div className="tipBar">
            <div className="tipBar__icon"><i className="fas fa-box"></i></div>
            <div className="tipBar__texts">
              <p><strong>Flete gratis</strong></p>
              <p>Desde 1.500,00 BRL</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-12 d-flex flex-row align-items-center flex-wrap justify-content-center">
          <div className="tipBar">
            <div className="tipBar__icon"><i className="fas fa-box"></i></div>
            <div className="tipBar__texts">
              <p><strong>Flete gratis</strong></p>
              <p>Desde 1.500,00 BRL</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-12 d-flex flex-row align-items-center flex-wrap justify-content-center">
          <div className="tipBar">
            <div className="tipBar__icon"><i className="fas fa-box"></i></div>
            <div className="tipBar__texts">
              <p><strong>Flete gratis</strong></p>
              <p>Desde 1.500,00 BRL</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-12 d-flex flex-row align-items-center flex-wrap justify-content-center">
          <div className="tipBar">
            <div className="tipBar__icon"><i className="fas fa-box"></i></div>
            <div className="tipBar__texts">
              <p><strong>Flete gratis</strong></p>
              <p>Desde 1.500,00 BRL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>
);
}

export default TipBar;