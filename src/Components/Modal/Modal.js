import React from "react";
import ReactDom from 'react-dom'

import './modal.scss'

export default React.memo(function Modal({isOpen, children, onClose = ()=> {}}) {

  const body = document.querySelector('body');

  return ReactDom.createPortal(
      <div className={`modal ${isOpen ? ' active' : ''}`} onClick={() => onClose()}>
        <div className='modal__content' onClick={(e) => e.stopPropagation()}>
          <button className='modal__close' onClick={() => onClose()}>Х</button>
          {children}
        </div>
      </div>, body)

});
