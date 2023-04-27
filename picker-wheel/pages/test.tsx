import React, { useState } from 'react'


interface CircleProps {
    radius: number;
    values: string[];
}


const WheelComponent: React.FC<CircleProps> = ({ radius, values }) => {

    const step = 360 / values.length;
    const segmentColors = ['#b20a2c', '#17202a', '#cf9ca6'];

    const [selectedValue, setSelectedValue] = useState('');

    const handleSpin = () => {

        const segments = document.querySelectorAll('.wheelSide__wheel path');

        const randomIndex = Math.floor(Math.random() * values.length);
        const targetValue = values[randomIndex];
        const targetIndex = values.indexOf(targetValue);
        setSelectedValue(targetValue);

        const cycles = 3; // Le nombre de tours complets que la roue doit effectuer
        const duration = 1000; // La durée totale en millisecondes que la roue doit tourner

        let count = 0;
        let intervalId = setInterval(() => {

            segments.forEach((segment, index) => {
                const color = index === count % segments.length ? '#ff6166' : segmentColors[index % segmentColors.length];
                segment.setAttribute('fill', color);
            });

            count++;

            // Calculer le moment où la roue doit s'arrêter
            const stopCount = segments.length * cycles + targetIndex;
            if (count >= stopCount) {
                clearInterval(intervalId);

                segments.forEach((segment, index) => {
                    const color = index === targetIndex ? '#ff6166' : segmentColors[index % segmentColors.length];
                    segment.setAttribute('fill', color);
                });
            }
        }, duration / (segments.length * cycles)); // La durée de chaque itération est calculée en fonction du nombre de segments et de la durée totale
    };

    return (
        <section className='wheelSide'>
            <div className='wheelSide__container'>

                <div className='wheelSide__spinBtn' onClick={handleSpin}>spin</div>


                <svg viewBox={`0 0 ${radius * 2} ${radius * 2}`} className='wheelSide__wheel'>
                    {values.map((value, index) => {

                        const startAngle = (index * step - step / 2) * (Math.PI / 180);
                        const endAngle = ((index + 1) * step - step / 2) * (Math.PI / 180);

                        const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;

                        const segmentPath = `
                        M ${radius},${radius}
                        L ${radius + radius * Math.cos(startAngle)}, ${radius + radius * Math.sin(startAngle)}
                        A ${radius},${radius} 0 ${largeArcFlag},1 ${radius + radius * Math.cos(endAngle)}, ${radius + radius * Math.sin(endAngle)}
                        L ${radius},${radius}
                        Z`;

                        const segmentColor = segmentColors[index % segmentColors.length];

                        const textRadius = radius * 0.65;
                        const textAngle = startAngle + (endAngle - startAngle) / 2;
                        const x = radius + textRadius * Math.cos(textAngle);
                        const y = radius + textRadius * Math.sin(textAngle) + 2;
                        const textAnchor = 'start';

                        const formattedValue = value.length > 15 ? `${value.slice(0, 15)}...` : value;

                        const isSelected = selectedValue === value;

                        const rotation = `rotate(${textAngle * 180 / Math.PI}, ${x}, ${y - 3})`;

                        return (
                            <React.Fragment key={index}>
                                <path d={segmentPath} fill={isSelected ? '#ff6166' : segmentColor} stroke="white" strokeWidth="3" />
                                <text
                                    className='wheelSide__values'
                                    x={x}
                                    y={y}
                                    dx={-formattedValue.length * 3}
                                    transform={`${rotation}`}
                                    fontSize={'0.85em'}
                                    textAnchor={textAnchor}
                                    fill={'white'}>
                                    {formattedValue}
                                </text>
                            </React.Fragment>
                        );
                    })}
                </svg>
            </div>
        </section>


    );
};

export default WheelComponent;
