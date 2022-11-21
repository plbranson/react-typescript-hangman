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

import React from 'react'

import styles from '../styles/HangmanWord.module.css'

type HangmanWordProps = {
  guessedLetters: string[]
  wordToGuess: string
  reveal?: boolean
}

export default function HangmanWord ({
  guessedLetters, wordToGuess, reveal = false,
}: HangmanWordProps): JSX.Element {
  return (<div className={styles.wordLine}>
      {wordToGuess.split('').
        map((letter, index) => (
          <span style={{ borderBottom: '1rem solid black' }} key={index}>
          <span
            style={{
              visibility: guessedLetters.includes(letter) || reveal
                ? 'visible'
                : 'hidden',
              color: !guessedLetters.includes(letter) && reveal
                ? 'red'
                : 'black',
            }}
          >
            {letter}
          </span>
        </span>))}
    </div>)
}
