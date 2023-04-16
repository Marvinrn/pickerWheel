import NavBar from '@/components/NavBar'
import WheelComponent from '@/components/WheelComponent'
import React, { useEffect, useState } from 'react'


export default function PickerWheel() {
    const [item, setItem] = useState("")
    const [array, setArray] = useState<any[]>([])

    const handleOnSubmit = (e: any) => {
        e.preventDefault()

        const data = { item }
        if (data) {
            setArray((arr) => [...arr, data])
            setItem('')

        }
    }

    useEffect(() => {
        localStorage.setItem('segment', JSON.stringify(array))

    }, [array])

    return (
        <main className='wheelPage'>
            <NavBar />
            <div className='wheelPage__container'>
                <section className='wheelPage__wheelSide'>
                    <h1>Picker Wheel</h1>
                    <WheelComponent />
                </section>
                <aside className='wheelPage__promptSide'>
                    <form className='mainInput' onSubmit={handleOnSubmit} >
                        <input
                            required
                            name="mainInput"
                            className='wheelPage__input'
                            type='text'
                            placeholder='Entrez votre texte'
                            value={item}
                            onChange={(e) => setItem(e.target.value)}
                        />
                        <button type='submit'>+</button>
                    </form>
                    {
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
                    }
                </aside>
            </div>
        </main>
    )
}
