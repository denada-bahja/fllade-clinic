import React from 'react'
import './ModalComp.css'

const ModalComp = ({ onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}><i class="fa-solid fa-xmark"></i></button>
        {children}
      </div>
    </div>
  )
}

export default ModalComp