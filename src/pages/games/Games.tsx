import LoadingOverlay from '../../components/common/LoadingOverlay'
import Box from '../../components/games/Box'
import Header from '../../components/home/Header'
import { shuffleArray } from '../../helpers/array'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import useAppSelector from '../../hooks/useAppSelector'
import React, { useEffect, useState } from 'react'
import { getProfile } from '../../store/slices/authSlice'
import { topUp } from '../../store/slices/transactionSlice'
import GameValue from '../../types/GameValue'
import * as S from './Games.style'

const globalGameValues: GameValue[] = [
  { id: 1, value: 50000, isOpen: false, isChosen: false },
  { id: 2, value: 55000, isOpen: false, isChosen: false },
  { id: 3, value: 50000, isOpen: false, isChosen: false },
  { id: 4, value: 75000, isOpen: false, isChosen: false },
  { id: 5, value: 1000000, isOpen: false, isChosen: false },
  { id: 6, value: 50000, isOpen: false, isChosen: false },
  { id: 7, value: 50000, isOpen: false, isChosen: false },
  { id: 8, value: 55000, isOpen: false, isChosen: false },
  { id: 9, value: 250000, isOpen: false, isChosen: false },
]

const Game = () => {
  const dispatch = useAppDispatch()
  const { loading: authLoading, error: authError } = useAppSelector((state) => state.auth)
  const { loading: transactionLoading, error: transactionError } = useAppSelector(
    (state) => state.transactions
  )

  const [gameValues, setGameValues] = useState<GameValue[]>(shuffleArray(globalGameValues))
  const [chances, setChances] = useState<number>(3)

  useEffect(() => {
    if (chances === 0) {
      handleNoChancesLeft()
    }
  }, [chances])

  const handleClick = (i: number) => {
    if (gameValues[i].isOpen) return
    if (chances === 0) return
    const tempValues = [...gameValues]
    tempValues[i].isOpen = true
    tempValues[i].isChosen = true
    setGameValues(tempValues)
    setChances(chances - 1)
  }

  const handleNoChancesLeft = () => {
    const totalPrize = gameValues
      .filter((val) => val.isChosen)
      .reduce((prev, curr) => prev + curr.value, 0)
    const tempValues = [...gameValues]
    for (let i = 0; i < tempValues.length; i++) {
      tempValues[i].isOpen = true
    }
    setGameValues(tempValues)

    dispatch(
      topUp({
        source_of_fund_id: 3,
        amount: totalPrize,
      })
    ).then(() => {
      dispatch(getProfile())
    })
  }

  const renderBoxes = () => {
    return gameValues.map((gameValue, idx) => (
      <Box
        gameValue={gameValue}
        key={gameValue.id}
        handleClick={() => handleClick(idx)}
      />
    ))
  }

  return (
    <>
      {(authLoading || transactionLoading) && <LoadingOverlay />}
      {(authError || transactionError) && (
        <S.ErrorContainer>{authError ?? transactionError}</S.ErrorContainer>
      )}
      {!authLoading && !transactionLoading && !authError && !transactionError && (
        <S.Container>
          <Header />
          <S.ContentContainer>
            <S.TitleContainer>
              <h1>Games</h1>
              <span>
                {chances > 0
                  ? 'Choose random box below to get reward!'
                  : 'Not enough chance :( Please go back tomorrow'}
              </span>
              <span>Chance: {chances}</span>
            </S.TitleContainer>
            <S.BoxesContainer>{renderBoxes()}</S.BoxesContainer>
          </S.ContentContainer>
        </S.Container>
      )}
    </>
  )
}

export default Game
