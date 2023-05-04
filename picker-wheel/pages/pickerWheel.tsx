import React, { useEffect, useState } from 'react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import WheelComponent from '../components/WheelComponent'

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


    // fonction handleOnUpdateValues pour modifier les valeurs de chaque segment via son input qui lui est associé
    const handleOnUpdateValues = (newValue: string, index: number) => {
        setValueArray(prevValueArray => {
            const newValues = [...prevValueArray];
            newValues[index] = newValue;
            return newValues

        })
    }

    useEffect(() => {
        const getArray = localStorage.getItem('segment')
        if (getArray) {
            setValueArray(JSON.parse(getArray))
        }
    }, [])

    useEffect(() => {
        if (valueArray.length > 0) {
            localStorage.setItem('segment', JSON.stringify(valueArray))
            console.log(valueArray);
        } else {
            localStorage.removeItem('segment')
        }
    }, [valueArray])



    return (
        <main className='wheelPage'>
            < NavBar />
            <h1>Picker Wheel</h1>
            <div className='wheelPage__container'>
                <WheelComponent radius={200} values={valueArray} />
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
                                    name={`${valueArray.indexOf(segment)}`}
                                    type='text'
                                    value={segment}
                                    onChange={(e) => { handleOnUpdateValues(e.target.value, index) }}
                                />
                                <button onClick={() => { setValueArray(valueArray.filter((segment) => valueArray.indexOf(segment) !== index)) }} className="cross" type='button'>X</button>
                            </div>
                        ))
                    }
                </aside>
            </div>
            <Footer />
        </main >
    )
}