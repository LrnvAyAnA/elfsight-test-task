import styled from 'styled-components';

export function FilterButton({ label = 'Кнопка', color = '#83BF46', onClick }) {
  return (
    <StyledButton $color={color} onClick={onClick}>
      {label}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  width: 85px;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid ${({ $color }) => $color};
  color: ${({ $color }) => $color};
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border 0.2s;
  background: transparent;
  &:hover {
    background: ${({ $color }) => $color};
    color: #fff;
    border: 1px solid ${({ $color }) => $color};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
