import React, { useEffect, useState } from 'react'
import NavBar from '@/components/NavBar'




interface CircleProps {
    radius: number;
    values: number[];
}

const Circle: React.FC<CircleProps> = ({ radius, values }) => {
    const step = 360 / values.length;
    const segmentColors = ['#b20a2c', '#17202a', '#cf9ca6'];

    return (
        <svg width={400} height={400}>
            {values.map((value, index) => {
                const startAngle = (index * step - step / 2) * (Math.PI / 180);
                const endAngle = ((index + 1) * step - step / 2) * (Math.PI / 180);
                const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;
                const segmentPath = `
          M 200,200
          L ${200 + radius * Math.cos(startAngle)}, ${200 + radius * Math.sin(startAngle)}
          A ${radius},${radius} 0 ${largeArcFlag},1 ${200 + radius * Math.cos(endAngle)}, ${200 + radius * Math.sin(endAngle)}
          L 200,200
          Z
        `;
                const segmentColor = segmentColors[index % segmentColors.length];

                const x = 200 + (200 * 0.8) * Math.cos(startAngle + (endAngle - startAngle) / 2);
                const y = 200 + (200 * 0.8) * Math.sin(startAngle + (endAngle - startAngle) / 2);

                return (
                    <React.Fragment key={index}>
                        <path d={segmentPath} fill={segmentColor} />
                        <text x={x} y={y} textAnchor="middle" dominantBaseline="middle">
                            {value}
                        </text>
                    </React.Fragment>
                );
            })}
        </svg>
    );
};



export default function CoinFlip() {

    const [values, setValues] = useState<number[]>([]);
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = () => {
        setValues([...values, Number(inputValue)]);
        setInputValue("");
    };


    return (
        <main className='wheelPage'>
            <NavBar />
            <div className='wheelPage__container'>
                <section className='wheelPage__wheelSide'>
                    <h1>Picker Wheel</h1>
                    <div className='wheel__container'>
                        <div className='wheel__spinBtn'>spin</div>
                        <Circle radius={100} values={values} />
                    </div>
                </section>
                <aside className='wheelPage__promptSide'>
                    <div className='mainInput' >
                        <input type="number" value={inputValue} onChange={handleInputChange} />
                        <button onClick={handleButtonClick}>Ajouter</button>
                    </div>
                    {/* {
                        array?.map((segment, index) => (
                            <div key={index} className='secondaryInputs'>
                                <input
                                    className='wheelPage__choiceInput'
                                    type='text'
                                    value={segment.item}
                                    onChange={(e) => setItem(e.target.value)}
                                />
                                <button className="cross" type='button'>X</button>
                            </div>
                        ))
                    } */}
                </aside>
            </div>
        </main>
    )
}