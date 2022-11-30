import React, { ChangeEvent } from 'react'
import * as S from './Dropdown.style'

export interface DropdownOptions {
  value: any
  text: string
}

interface DropdownProps {
  options: DropdownOptions[]
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Dropdown = ({ options, onChange }: DropdownProps) => {
  const renderOptions = () => {
    return options.map((option) => (
      <S.Option
        key={option.value}
        value={option.value}
      >
        {option.text}
      </S.Option>
    ))
  }
  return <S.Select onChange={onChange}>{renderOptions()}</S.Select>
}

export default Dropdown
