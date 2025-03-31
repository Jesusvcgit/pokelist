import React from "react";

const Modal = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{item.name}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {item.sprites && (
              <img
                src={item.sprites}
                alt={item.name}
                className="img-fluid mb-3"
              />
            )}
            <table className="table table-bordered mt-3">
              <tbody>
                {Object.entries(item).map(([key, value]) =>
                  key !== "name" && key !== "sprites" ? (
                    <tr key={key}>
                      <td><strong>{key.replace(/_/g, " ")}</strong></td>
                      <td>{Array.isArray(value) ? value.join(", ") : value.toString()}</td>
                    </tr>
                  ) : null
                )}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
