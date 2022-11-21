/*
 * Copyright 2022 Patrick L. Branson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */

import React, { useCallback, useEffect, useState } from 'react'

import styles from '../styles/App.module.css'
import HangmanDrawing from './HangmanDrawing'
import HangmanWord from './HangmanWord'
import HangmanKeyboard from './HangmanKeyboard'

import words from '../assets/json/word-list.json'

function getRandomWord (): string {
  return words[Math.floor(Math.random() * words.length)]
}

export function App() {
  const [wordToGuess, setWordToGuess] = useState(getRandomWord)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter))
  
  const hasLost = incorrectLetters.length >= 6
  const hasWon = wordToGuess.split('').
    every((letter) => guessedLetters.includes(letter))
  
  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || hasLost || hasWon) {
        return
      }
      
      setGuessedLetters((currentLetters) => [...currentLetters, letter])
    },
    [guessedLetters, hasWon, hasLost],
  )
  
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const key = event.key
      
      if (!key.match(/^[a-z]$/)) {
        return
      }
      
      event.preventDefault()
      addGuessedLetter(key)
    }
    
    document.addEventListener('keypress', handler)
    
    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [guessedLetters])
  
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const key = event.key
      
      if (key !== 'Enter') {
        return
      }
      
      event.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getRandomWord())
    }
    
    document.addEventListener('keypress', handler)
    
    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [])
  
  return (
    <div className={styles.app}>
      <div style={{ fontSize: '2rem', textAlign: 'center' }}>
        {hasWon && 'Winner - Refresh to Try Again'}
        {hasLost && 'Nice Try - Refresh to Try Again'}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord reveal={hasLost} guessedLetters={guessedLetters} wordToGuess={wordToGuess} />
      <div style={{ alignSelf: 'stretch' }}>
        <HangmanKeyboard
          disabled={hasWon || hasLost}
          activeLetters={guessedLetters.filter(
            (letter) => wordToGuess.includes(letter))}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  )
}
