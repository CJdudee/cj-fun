'use client'

import React, { useEffect, useState } from 'react'

export default function page() {
const [ diceOne, setDiceOne ] = useState<number>()
const [ diceTwo, setDiceTwo ] = useState<number>()
// const rollArray: number[] = []
const [ rollArray, setRollArray ] = useState<number[]>([])

const [ gameWon , setGameWon ] = useState<boolean | null>(null)

const [ userMoney, setUserMoney] = useState(1000)

const [placedBet, setPlacedBet ] = useState(0)

useEffect(() => {
    if(gameWon === true && placedBet != 0) setUserMoney(userMoney + placedBet * 2)
}, [gameWon])

const handleRoll = () => {

    if(!rollArray.length && placedBet != 0) setUserMoney(userMoney - placedBet)

    const diceOne = Math.floor(Math.random() * 6 + 1)

    const diceTwo = Math.floor(Math.random() * 6 + 1)

    const sum = diceOne + diceTwo

    if (!rollArray.length && sum == 7 ||!rollArray.length && sum == 11) {
        setGameWon(true)
    }

    if (rollArray.length && sum == rollArray[0]) {
        setGameWon(true)
    }
    console.log(rollArray.length)
    if(rollArray.length != 0 && sum == 7 || rollArray.length && sum == 11) {
        setGameWon(false)
        console.log(rollArray.length, sum, 'what')
    }

    // setRollArray((prev) => ({
    //     ...prev,
    //     sum
    // }))
    rollArray.push(
        sum
    )
    //console.log(rollArray)

    setDiceOne(diceOne)
    setDiceTwo(diceTwo)
    

}

    const onPlacedBet = (amount: number) => {
        const checkIfBetAllowed = placedBet + amount

        if(checkIfBetAllowed > userMoney) return setPlacedBet(userMoney)

        setPlacedBet(checkIfBetAllowed)
    }

  return (
    <div className=''>
        <h2 className='text-center font-bold text-xl'>7 - 11</h2>

        <div className='mx-20  bg-purple-200 rounded-md p-10'>

            <div className='flex justify-evenly'>

                <p>Dice One = {diceOne}</p>
                <p>Dice Two = {diceTwo}</p>

                <button className={`${gameWon ? 'disabled:bg-green-300' : 'disabled:bg-red-300'} p-1  rounded-lg hover:bg-purple-400 bg-purple-300`} disabled={gameWon == true || gameWon == false} onClick={handleRoll}>Roll Dices</button>

            </div>

            {!rollArray.length && <p className='px-1 rounded-lg w-full text-center'>Amount placed: ${placedBet}</p>}

            {!rollArray.length ? 
            <div className='flex justify-evenly mt-4 py-1 mx-4 rounded bg-purple-400 text-gray-200 '>
                <p className=''>Cash: ${userMoney}</p>

                <button className=' hover:text-white px-1 rounded-md' onClick={() => {
                    onPlacedBet(50)
                }}>Bet: 50</button>

                <button className='hover:text-white px-1 rounded-md' onClick={() => { onPlacedBet(100)}}>Bet: 100</button>

                

                </div> 
                : 
                <div className='flex justify-evenly mt-2 bg-purple-400 text-white py-1 mx-4 rounded' >
                <p>Cash: ${userMoney}</p>
                <p>Amount placed: ${placedBet}</p>
                </div>
                }

            <div className='mt-2 flex justify-evenly'>
            {!rollArray.length && <button className='p-1 bg-purple-400 hover:bg-purple-300 rounded text-white' onClick={() => setPlacedBet(0)}>
                    Take bet back
                </button>}

                <button className='bg-purple-400 hover:bg-purple-300 p-1 rounded text-white' onClick={() => {
                if(rollArray.length && gameWon === null) setUserMoney(userMoney + placedBet)
                setRollArray([])
                setGameWon(null)
                setDiceOne(undefined)
                setDiceTwo(undefined)
                setPlacedBet(0)
            }}>Restart game</button>
            </div>

            {/* <div className='text-center'>

            <button onClick={() => {
                setRollArray([])
                setGameWon(null)
                setDiceOne(undefined)
                setDiceTwo(undefined)
                setPlacedBet(0)
            }}>Restart game</button>
            </div> */}
            
        </div>

        <div className='bg-purple-200 mx-20 my-4 rounded-lg px-2'>
            <ul className='flex gap-2'>
                <p>Number rolled: </p>
                {rollArray && rollArray.map((d: number, index) => {
                    return (
                        <li key={index}  className='font-bold'>{d}</li>
                    )
                })}
            </ul>

        </div>

        {gameWon != null && <div className='text-center text-blue-100 text-xl'>
                {gameWon ? <p>you won the game</p> : <p>you lost the game</p>}
            </div>}

        

        <p className='text-center font-bold text-xl'>number to hit: {rollArray[0] ? rollArray[0] : '7 or 11'}</p>
        
    </div>
  )
}
