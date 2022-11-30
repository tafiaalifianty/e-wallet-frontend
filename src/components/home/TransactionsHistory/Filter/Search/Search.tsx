import React, { useState } from 'react'
import * as S from './Search.style'
import { ReactComponent as SearchIcon } from '../../../../../assets/ic_search.svg'
import useDebounce from '../../../../../hooks/useDebounce'

interface SearchProps {
  handleChange: (val: string) => void
}

const Search = ({ handleChange }: SearchProps) => {
  const [search, setSearch] = useState<string>('')

  useDebounce(
    () => {
      handleChange(search)
    },
    [search],
    500
  )

  return (
    <S.Container>
      <SearchIcon />
      <S.Input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        placeholder='Search'
      />
    </S.Container>
  )
}

export default Search
