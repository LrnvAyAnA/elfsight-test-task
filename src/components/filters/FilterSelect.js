import { useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';

export function FilterSelect({
  id,
  placeholder,
  value,
  onChange,
  options = [],
  openSelectId,
  setOpenSelectId
}) {
  const open = openSelectId === id;

  const handleToggleOpen = useCallback(
    (e) => {
      e.stopPropagation();
      setOpenSelectId(open ? null : id);
    },
    [open, id, setOpenSelectId]
  );

  const handleSelectOption = useCallback(
    (option) => {
      onChange(option);
      setOpenSelectId(null);
    },
    [onChange, setOpenSelectId]
  );

  const handleOptionClick = useCallback(
    (opt) => () => handleSelectOption(opt),
    [handleSelectOption]
  );

  const handleClear = useCallback(
    (e) => {
      e.stopPropagation();
      onChange('');
    },
    [onChange]
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.filter-select-${id}`)) {
        setOpenSelectId(null);
      }
    };
    window.addEventListener('click', handleClickOutside);

    return () => window.removeEventListener('click', handleClickOutside);
  }, [id, setOpenSelectId]);

  return (
    <SelectWrapper className={`filter-select-${id}`}>
      <InputArea $active={open} onClick={handleToggleOpen}>
        <span style={{ color: value ? '#fff' : 'rgba(179, 179, 179, 1)' }}>
          {value || placeholder}
        </span>
        {value ? <ClearIcon onClick={handleClear} /> : <Chevron $open={open} />}
      </InputArea>

      {open && (
        <OptionsList>
          {options.map((opt) => (
            <Option
              key={opt}
              onClick={handleOptionClick(opt)}
              $selected={opt === value}
            >
              {opt}
            </Option>
          ))}
        </OptionsList>
      )}
    </SelectWrapper>
  );
}

const SelectWrapper = styled.div`
  position: relative;
  width: 180px;
  font-family: Arial, sans-serif;
`;

const InputArea = styled.div`
  padding: 8px 12px;
  border: 1px solid rgba(131, 191, 70, 1);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  color: rgba(179, 179, 179, 1);
  align-items: center;
  background: ${({ $active }) => ($active ? '#334466' : '#263750')};
  &:hover {
    background: #334466;
  }
`;

const OptionsList = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  max-height: 180px;
  overflow-y: auto;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  z-index: 10;
`;

const Option = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  font-weight: ${({ $selected }) => ($selected ? 'bold' : 'normal')};
  &:hover {
    background: rgba(130, 191, 70, 0.2);
  }
`;
const ClearIcon = styled.div`
  position: relative;
  width: 10px;
  height: 20px;
  cursor: pointer;
  margin-left: 8px;

  &:before,
  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 12px;
    height: 2px;
    background: #fff;
    transform-origin: center;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }

  &:hover:before,
  &:hover:after {
    background: #83bf46;
  }
`;

const Chevron = styled.div`
  width: 7px;
  height: 7px;
  border-right: 2px solid #b1b1b1;
  border-bottom: 2px solid #b1b1b1;
  transform: rotate(45deg);
  transition: transform 0.2s;
  ${({ $open }) =>
    $open &&
    css`
      transform: rotate(-135deg);
      border-right: 2px solid #fff;
      border-bottom: 2px solid #fff;
    `}
`;
