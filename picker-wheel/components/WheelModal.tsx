import React, { useEffect, useRef } from 'react';

interface ModalProps {
    values: string[];
}

const WheelModal: React.FC<ModalProps> = ({ values }) => {
    return (
        <div className='wheelModal'>
            <div className='wheelModal__content'>
                <h2 className='wheelModal__title'>Le gagnant est :</h2>
                <div className='wheelModal__valueContainer'>
                    <p className='wheelModal__value'> value</p>
                </div>
                <div className='wheelModal__btnContainer'>
                    <button className='wheelModal__btn'>
                        fermer
                    </button>
                    <button className='wheelModal__btn'>
                        supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WheelModal;