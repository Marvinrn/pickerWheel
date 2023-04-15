import NavBar from '@/components/NavBar'
import React from 'react'

export default function PickerWheel() {
    return (
        <main className='wheelPage'>
            <NavBar />
            <div className='wheelPage__container'>
                <section className='wheelPage__wheelSide'>
                    <h1>Picker Wheel</h1>
                </section>
                <aside className='wheelPage__promptSide'>
                    <input
                        className='wheelPage__input'
                        type='text'
                        placeholder='Entrez votre texte'
                    />
                    <button type='submit'>+</button>
                </aside>
            </div>
        </main>
    )
}
