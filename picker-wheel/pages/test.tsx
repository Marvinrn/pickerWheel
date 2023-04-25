// import React, { useState, useRef } from 'react'

// interface CircleProps {
//     radius: number;
//     values: string[];
// }

// const WheelComponent: React.FC<CircleProps> = ({ radius, values }) => {
//     const step = 360 / values.length;
//     const segmentColors = ['#b20a2c', '#17202a', '#cf9ca6'];
//     const [spinValue, setSpinValue] = useState(Math.ceil(Math.random() * 3600));
//     const wheelRef = useRef<SVGSVGElement>(null);

//     const handleSpin = () => {
//         const newSpinValue = spinValue + Math.ceil(Math.random() * 3600);
//         setSpinValue(newSpinValue);
//         if (wheelRef.current) {
//             wheelRef.current.style.transition = 'transform 5s ease-in-out';
//             wheelRef.current.style.transform = `rotate(${newSpinValue}deg)`;
//             setTimeout(() => {
//                 wheelRef.current!.style.transition = 'none';
//                 const remainder = newSpinValue % 360;
//                 const normalizedValue = remainder < 0 ? 360 + remainder : remainder;
//                 setSpinValue(normalizedValue);
//             }, 5000);
//         }

//         console.log(spinValue);

//     };

//     return (
//         <section className='wheelSide'>
//             <div className='wheelSide__container'>
//                 <div className='wheelSide__spinBtn' onClick={handleSpin}>spin</div>
//                 <svg viewBox={`0 0 ${radius * 2} ${radius * 2}`} className='wheelSide__wheel' ref={wheelRef}>
//                     {values.map((value, index) => {
//                         const startAngle = (index * step - step / 2) * (Math.PI / 180);
//                         const endAngle = ((index + 1) * step - step / 2) * (Math.PI / 180);
//                         const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;
//                         const segmentPath = `
//                             M ${radius},${radius}
//                             L ${radius + radius * Math.cos(startAngle)}, ${radius + radius * Math.sin(startAngle)}
//                             A ${radius},${radius} 0 ${largeArcFlag},1 ${radius + radius * Math.cos(endAngle)}, ${radius + radius * Math.sin(endAngle)}
//                             L ${radius},${radius}
//                             Z`;
//                         const segmentColor = segmentColors[index % segmentColors.length];
//                         const textRadius = radius * 0.7;
//                         const textAngle = startAngle + (endAngle - startAngle) / 2;
//                         const x = radius + textRadius * Math.cos(textAngle);
//                         const y = radius + textRadius * Math.sin(textAngle);
//                         const textAnchor = 'start';
//                         const formattedValue = value.length > 15 ? `${value.slice(0, 15)}...` : value;
//                         return (
//                             <React.Fragment key={index}>
//                                 <path d={segmentPath} fill={segmentColor} stroke="white" strokeWidth="3" />
//                                 <text
//                                     className='wheelSide__values'
//                                     x={x}
//                                     y={y}
//                                     dx={-formattedValue.length * 3}
//                                     transform={`rotate(${textAngle * 180 / Math.PI}, ${x}, ${y})`}
//                                     fontSize={'0.9em'}
//                                     textAnchor={textAnchor}
//                                     fill='white'>
//                                     {formattedValue}
//                                 </text>
//                             </React.Fragment>
//                         );
//                     })}
//                 </svg>
//             </div>
//         </section>
//     );
// };
// export default WheelComponent;

import React, { useState, useRef } from 'react'

interface CircleProps {
    radius: number;
    values: string[];
}

const WheelComponent: React.FC<CircleProps> = ({ radius, values }) => {
    const step = 360 / values.length;
    const segmentColors = ['#b20a2c', '#17202a', '#cf9ca6'];
    const [spinValue, setSpinValue] = useState(Math.ceil(Math.random() * 3600));
    const wheelRef = useRef<SVGSVGElement>(null);

    const handleSpin = () => {
        const randomValue = Math.ceil(Math.random() * 3600);
        const totalSpin = 5 * 360; // Spin 5 times
        const spinAdjustment = 360 - (spinValue % 360); // How much more the wheel needs to spin to reach a multiple of 360 degrees
        const newSpinValue = spinValue + spinAdjustment + totalSpin + randomValue; // Add random value to final spin value
        setSpinValue(newSpinValue);

        if (wheelRef.current) {
            wheelRef.current.style.transition = 'transform 5s ease-in-out';
            wheelRef.current.style.transform = `rotate(${360 + newSpinValue}deg)`; // Always rotate clockwise
            setTimeout(() => {
                wheelRef.current!.style.transition = 'none';
                const remainder = newSpinValue % 360;
                const normalizedValue = remainder < 0 ? 360 + remainder : remainder;
                setSpinValue(normalizedValue);
            }, 5000);
        }
        console.log(spinValue);
    };



    return (
        <section className='wheelSide'>
            <div className='wheelSide__container'>
                <div className='wheelSide__spinBtn' onClick={handleSpin}>spin</div>
                <svg viewBox={`0 0 ${radius * 2} ${radius * 2}`} className='wheelSide__wheel' ref={wheelRef}>
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
                        return (
                            <React.Fragment key={index}>
                                <path d={segmentPath} fill={segmentColor} stroke="white" strokeWidth="3" />
                                <text
                                    className='wheelSide__values'
                                    x={x}
                                    y={y}
                                    dx={-formattedValue.length * 3}
                                    transform={`rotate(${textAngle * 180 / Math.PI}, ${x}, ${y})`}
                                    fontSize={'0.9em'}
                                    textAnchor={textAnchor}
                                    fill='white'>
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
