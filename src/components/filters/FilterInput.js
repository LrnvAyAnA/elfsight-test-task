import { useState, useCallback } from 'react';
import styled from 'styled-components';

export function FilterInput({
  placeholder = 'Введите значение',
  value,
  onChange
}) {
  const [active, setActive] = useState(false);

  const handleFocus = useCallback(() => setActive(true), []);
  const handleBlur = useCallback(() => setActive(false), []);

  return (
    <StyledInput
      $active={active}
      value={value}
      onChange={onChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
    />
  );
}
const StyledInput = styled.input`
  width: 180px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid rgba(131, 191, 70, 1);
  outline: none;
  background: ${({ $active }) => ($active ? '#334466' : '#263750')};
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: Arial, sans-serif;
  cursor: text;
  transition: background 0.2s, color 0.2s;
  font-size: 16px;
  line-height: 20px;
  &::placeholder {
    color: #b3b3b3;
    opacity: 1;
  }

  &:hover {
    background: #334466;
  }
`;
