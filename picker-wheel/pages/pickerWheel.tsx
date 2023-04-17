import NavBar from '@/components/NavBar'
import React, { useEffect, useState } from 'react'


export default function PickerWheel() {
    const [item, setItem] = useState("")
    const [array, setArray] = useState<any[]>([])
    const segmentClr = ['#b20a2c', '#17202a', '#cf9ca6']

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
        console.log(array);
        console.log(item);


    }, [item, array])

    return (
        <main className='wheelPage'>
            <NavBar />
            <div className='wheelPage__container'>
                <section className='wheelPage__wheelSide'>
                    <h1>Picker Wheel</h1>
                    <div className='wheel__container'>
                        <div className='wheel__spinBtn'>spin</div>
                        <ul className='wheel__wheel'>
                            {
                                array?.map((segment, index) => (
                                    <li
                                        key={index}
                                        style={{
                                            backgroundColor: segmentClr[array.indexOf(segment) % segmentClr.length],
                                            transform: `rotate(${((array.indexOf(segment)) * 360) / array.length}deg) skewY(-60deg)`
                                        }}>
                                        <div className='wheel__values'>
                                            {segment.item}
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
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


//////////////////////////////////////////////////////////////////////////////////

// import NavBar from '@/components/NavBar'
// import React, { useEffect, useState } from 'react'


// export default function PickerWheel() {
//     const [item, setItem] = useState("")
//     const [array, setArray] = useState<any[]>([])
//     const segmentClr = ['#b20a2c', '#17202a', '#cf9ca6']

//     const handleOnSubmit = (e: any) => {
//         e.preventDefault()

//         const data = { item }
//         if (data) {
//             setArray((arr) => [...arr, data])
//             setItem('')

//         }
//     }

//     useEffect(() => {
//         localStorage.setItem('segment', JSON.stringify(array))
//         console.log(array);
//         console.log(item);


//     }, [item, array])


//     return (
//         <main className='wheelPage'>
//             <NavBar />
//             <div className='wheelPage__container'>
//                 <section className='wheelPage__wheelSide'>
//                     <h1>Picker Wheel</h1>
//                     <div className='wheel__container'>
//                         <div className='wheel__spinBtn'>spin</div>
//                         <ul className='wheel__wheel'>
//                             {
//                                 array?.map((segment, index) => (
//                                     <li
//                                         key={index}
//                                         style={{
//                                             backgroundColor: segmentClr[array.indexOf(segment) % segmentClr.length],
//                                             transform: array.length === 1 ?
//                                                 'rotate(0)'
//                                                 :
//                                                 `rotate(${((array.indexOf(segment)) * 360) / array.length}deg) skewY(-60deg)`,
//                                         }}>
//                                         <div className='wheel__values'>
//                                             {segment.item}
//                                         </div>
//                                     </li>
//                                 ))
//                             }
//                         </ul>
//                     </div>
//                 </section>
//                 <aside className='wheelPage__promptSide'>
//                     <form className='mainInput' onSubmit={handleOnSubmit} >
//                         <input
//                             required
//                             name="mainInput"
//                             className='wheelPage__input'
//                             type='text'
//                             placeholder='Entrez votre texte'
//                             value={item}
//                             onChange={(e) => setItem(e.target.value)}
//                         />
//                         <button type='submit'>+</button>
//                     </form>
//                     {
//                         array?.map((segment, index) => (
//                             <div key={index} className='secondaryInputs'>
//                                 <input
//                                     className='wheelPage__choiceInput'
//                                     type='text'
//                                     value={segment.item}
//                                     onChange={(e) => setItem(e.target.value)}
//                                 />
//                                 <button className="cross" type='button'>X</button>
//                             </div>
//                         ))
//                     }
//                 </aside>
//             </div>
//         </main>
//     )
// }



