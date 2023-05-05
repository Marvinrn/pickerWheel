import React, { useEffect, useRef } from 'react';

type WheelModalProps = {
    modalIsClose: any
    value: string
    onDelete: (value: string) => void;
}

const WheelModal: React.FunctionComponent<WheelModalProps> = ({ modalIsClose, value, onDelete }) => {

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let handler = (event: any) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                modalIsClose(false)
            }
        }
        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [modalIsClose])

    const handleOnDelete = () => {
        onDelete(value)
        modalIsClose(false)
    }

    return (
        <div className='wheelModal'>
            <div ref={modalRef} className='wheelModal__content'>
                <h2 className='wheelModal__title'>Le gagnant est :</h2>
                <div className='wheelModal__valueContainer'>
                    <p className='wheelModal__value'> {value}</p>
                </div>
                <div className='wheelModal__btnContainer'>
                    <button className='wheelModal__btn' onClick={() => { modalIsClose(false) }}>
                        fermer
                    </button>
                    <button onClick={handleOnDelete} className='wheelModal__btn'>
                        supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WheelModal;
