import React, { useEffect, useState } from 'react'
import NavBar from '@/components/NavBar'

interface CircleProps {
    radius: number;
    values: string[];
}


const Circle: React.FC<CircleProps> = ({ radius, values }) => {
    const step = 360 / values.length;
    const segmentColors = ['#b20a2c', '#17202a', '#cf9ca6'];

    return (
        <svg width={radius * 2} height={radius * 2} className='wheel__wheel'>
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

                const textRadius = radius * 0.8;
                const textAngle = startAngle + (endAngle - startAngle) / 2;
                const x = 200 + textRadius * Math.cos(textAngle);
                const y = 200 + textRadius * Math.sin(textAngle);
                const textAnchor = 'start';

                return (
                    <React.Fragment key={index}>
                        <path d={segmentPath} fill={segmentColor} stroke="white" strokeWidth="3" />
                        <text
                            x={x}
                            y={y}
                            dx={-value.length * 3} // adjust position based on word length
                            transform={`rotate(${textAngle * 180 / Math.PI}, ${x}, ${y})`}
                            textAnchor={textAnchor}
                            fill='white'>
                            {value}
                        </text>
                    </React.Fragment>
                );
            })}
        </svg>
    );
};


export default function PickerWheel() {

    const [inputValue, setInputValue] = useState("")
    const [valueArray, setValueArray] = useState<string[]>([])

    const handleOnSubmit = (e: any) => {
        e.preventDefault()

        const data = { inputValue }
        if (data) {

            setValueArray([...valueArray, inputValue])
            setInputValue('')
        }
    }

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    useEffect(() => {
        localStorage.setItem('segment', JSON.stringify(valueArray))
        console.log(valueArray);
        console.log(inputValue);


    }, [inputValue, valueArray])

    return (
        <main className='wheelPage'>
            < NavBar />
            <div className='wheelPage__container'>
                <section className='wheelPage__wheelSide'>
                    <h1>Picker Wheel</h1>
                    <div className='wheel__container'>
                        <div className='wheel__spinBtn'>spin</div>
                        <Circle radius={200} values={valueArray} />
                    </div>
                </section>
                <aside className='wheelPage__promptSide'>
                    <form className='mainInput' onSubmit={handleOnSubmit} >
                        <input
                            required
                            name="mainInput"
                            className='wheelPage__input'
                            type='text'
                            placeholder='Entrez votre texte'
                            value={inputValue}
                            onChange={handleOnChange}
                        />
                        <button type='submit'>+</button>
                    </form>
                    {
                        valueArray?.map((segment, index) => (
                            <div key={index} className='secondaryInputs'>
                                <input
                                    className='wheelPage__choiceInput'
                                    type='text'
                                    value={segment}
                                    onChange={handleOnChange}
                                />
                                <button className="cross" type='button'>X</button>
                            </div>
                        ))
                    }
                </aside>
            </div>
        </main >
    )
}