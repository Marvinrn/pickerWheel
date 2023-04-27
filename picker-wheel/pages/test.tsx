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

        let count = 0;
        let intervalId = setInterval(() => {
            segments.forEach((segment, index) => {
                const color = index === count % segments.length ? '#f4d03f' : segmentColors[index % segmentColors.length];
                segment.setAttribute('fill', color);
            });
            count++;
            if (count >= segments.length * 5 + targetIndex) {
                clearInterval(intervalId);
                segments.forEach((segment, index) => {
                    const color = index === targetIndex ? '#f4d03f' : segmentColors[index % segmentColors.length];
                    segment.setAttribute('fill', color);
                });
            }
        }, 100);
        console.log(targetValue);

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
                        const textRadius = radius * 0.7;
                        const textAngle = startAngle + (endAngle - startAngle) / 2;
                        const x = radius + textRadius * Math.cos(textAngle);
                        const y = radius + textRadius * Math.sin(textAngle);
                        const textAnchor = 'start';
                        const formattedValue = value.length > 15 ? `${value.slice(0, 15)}...` : value;
                        const isSelected = selectedValue === value;
                        const rotation = `rotate(${textAngle * 180 / Math.PI}, ${x}, ${y})`;
                        return (
                            <React.Fragment key={index}>
                                <path d={segmentPath} fill={isSelected ? '#f4d03f' : segmentColor} stroke="white" strokeWidth="3" />
                                <text
                                    className='wheelSide__values'
                                    x={x}
                                    y={y}
                                    dx={-formattedValue.length * 3}
                                    transform={`${rotation}`}
                                    fontSize={'0.9em'}
                                    textAnchor={textAnchor}
                                    fill={'white'}>
                                    {/* fill={isSelected ? 'black' : 'white'}> */}
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