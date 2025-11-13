import React from 'react'
import { createPortal } from 'react-dom'

export default function Modal({
    title,
    content,
    show,
    onClose,
    onConfirm,
    confirmText = 'Conferma'
}) {
    if (!show) return null

    return createPortal(
        <div
            className="modal fade show"
            style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
            tabIndex="-1"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Chiudi"
                        ></button>
                    </div>

                    <div className="modal-body">
                        {content}
                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Annulla
                        </button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')
    )
}
