import React from 'react';
import logoVoto from '../../assets/logoVoto.svg';

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
      onClick={(e) => {
        onCloseModal(e);
      }}
    >
      <div className="modal-container">
        <div
          className="modal-content"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {isReturningUser && (
            <>
              <div
                className="modal-header"
                style={{ justifyContent: 'flex-end' }}
              >
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
                <div className="video">
                  <iframe
                    width="100%"
                    src={data.url}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="h3">{data.title}</div>
                  <div className="modal-bio">{data.bio}</div>
                </div>
              </div>
              <div className="modal-footer">
                <p style={{ fontSize: '24px', margin: '0', color: 'white' }}>
                  YA REGISTRAMOS TU VOTO ANTERIORMENTE!
                  <br />
                  VOLVÉ EL
                  <span style={{ color: '#C1272D' }}> 19 DE NOVIEMBRE </span>
                  PARA VER LOS RESULTADOS FINALES
                </p>
              </div>
            </>
          )}
          {!isReturningUser && (
            <>
              <div className="modal-header">
                <h5 className="modal-title">
                  {isVoteSuccess
                    ? 'Voto enviado correctamente'
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
                    <strong className="h2 mb-4">¡GRACIAS POR TU VOTO!</strong>
                    <img src={logoVoto} alt="logo voto" />
                    <p style={{ fontSize: '24px' }}>
                      VOLVÉ EL{' '}
                      <span style={{ color: '#C1272D' }}>19 DE NOVIEMBRE</span>
                      <br />
                      PARA VER LOS RESULTADOS FINALES
                    </p>
                  </div>
                ) : (
                  data && (
                    <div className="video">
                      <iframe
                        width="100%"
                        src={data.url}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <div className="h3">{data.title}</div>
                      <div className="modal-bio">{data.bio}</div>
                    </div>
                  )
                )}
              </div>
            </>
          )}
          <div className="modal-footer">
            {!isVoteSuccess && !isReturningUser && (
              <button
                type="button"
                disabled={isVoteSuccess || isReturningUser}
                className="vote-button btn btn-primary"
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
