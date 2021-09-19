import React from 'react';

const Modal = ({
  isOpen,
  isVoteSuccess,
  isReturningUser,
  data,
  onCloseModal,
  onVote,
}) => {
  return (
    <div
      className={`modal fade ${isOpen ? 'show' : ''}`}
      style={{
        display: `${isOpen ? 'block' : 'none'}`,
      }}
    >
      <div className="modal-body container">
        <div className="modal-content">
          {isReturningUser && (
            <>
              <div className="modal-header">
                <h5 className="modal-title">Gracias por tu apoyo!</h5>
                <button
                  type="button"
                  className="btn close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={onCloseModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="d-flex flex-column modal-dialog modal-dialog-centered">
                  <strong className="h2 mb-4">Ya votaste anteriormente!</strong>
                  <p>
                    Te recordamos que solo puedes votar una vez! <br />
                    Que gane el mejor!
                  </p>
                </div>
              </div>
            </>
          )}
          {!isReturningUser && (
            <>
              <div className="modal-header">
                <h5 className="modal-title">
                  {isVoteSuccess
                    ? 'Gracias por participar!'
                    : `Estas por votar el video de "${data.artist}"`}
                </h5>
                <button
                  type="button"
                  className="btn close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={onCloseModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {isVoteSuccess ? (
                  <div className="d-flex flex-column modal-dialog modal-dialog-centered">
                    <strong className="h2 mb-4">
                      Gracias por haber votado!
                    </strong>
                    <p>
                      Te recordamos que solo puedes votar una vez! <br />
                      Que gane el mejor!
                    </p>
                  </div>
                ) : (
                  data && (
                    <div className="video">
                      <iframe
                        width="100%"
                        height="315px"
                        src={data.url}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <div className="h3">{data.title}</div>
                      <div>{data.bio}</div>
                    </div>
                  )
                )}
              </div>
            </>
          )}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCloseModal}
            >
              {isReturningUser || isVoteSuccess ? 'Cerrar' : 'Cancelar'}
            </button>
            {!isVoteSuccess && !isReturningUser && (
              <button
                type="button"
                disabled={isVoteSuccess || isReturningUser}
                className="btn btn-primary"
                onClick={(e) => onVote(e, data)}
              >
                <strong>Votar +</strong>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
