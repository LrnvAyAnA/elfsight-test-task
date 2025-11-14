import styled from 'styled-components';
import { useState, useEffect, useCallback } from 'react';
import { FilterSelect } from './FilterSelect';
import { FilterInput } from './FilterInput';
import { FilterButton } from './FilterButton';
import { useData } from '../providers';
import axios from 'axios';
const API_URL = 'https://rickandmortyapi.com/api/character/';

export function Filters() {
  const { setApiURL, setActivePage } = useData();
  const [openSelectId, setOpenSelectId] = useState(null);
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [speciesLoading, setSpeciesLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    gender: '',
    species: '',
    name: '',
    type: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFilters({
      status: params.get('status') || '',
      gender: params.get('gender') || '',
      species: params.get('species') || '',
      name: params.get('name') || '',
      type: params.get('type') || ''
    });
  }, []);

  const STATUS_OPTIONS = ['Alive', 'Dead', 'Unknown'];
  const GENDER_OPTIONS = ['Male', 'Female', 'Genderless', 'Unknown'];
  useEffect(() => {
    async function fetchAllSpecies() {
      setSpeciesLoading(true);

      try {
        const cached = localStorage.getItem('allSpecies');
        if (cached) {
          setSpeciesOptions(JSON.parse(cached));
          setSpeciesLoading(false);

          return;
        }

        let allSpecies = [];
        let page = 1;
        let totalPages = 1;

        do {
          const { data } = await axios.get(`${API_URL}?page=${page}`);
          totalPages = data.info.pages;

          const pageSpecies = data.results.map((c) => c.species);
          allSpecies = allSpecies.concat(pageSpecies);

          page++;
        } while (page <= totalPages);

        const uniqueSpecies = Array.from(new Set(allSpecies)).sort();

        setSpeciesOptions(uniqueSpecies);
        localStorage.setItem('allSpecies', JSON.stringify(uniqueSpecies));
      } catch (err) {
        console.error('Не удалось загрузить species', err);
        setSpeciesOptions([]);
      } finally {
        setSpeciesLoading(false);
      }
    }

    fetchAllSpecies();
  }, []);
  const handleStatusChange = useCallback(
    (val) => setFilters((prev) => ({ ...prev, status: val })),
    []
  );

  const handleGenderChange = useCallback(
    (val) => setFilters((prev) => ({ ...prev, gender: val })),
    []
  );

  const handleSpeciesChange = useCallback(
    (val) => setFilters((prev) => ({ ...prev, species: val })),
    []
  );

  const handleNameChange = useCallback(
    (e) => setFilters((prev) => ({ ...prev, name: e.target.value })),
    []
  );

  const handleTypeChange = useCallback(
    (e) => setFilters((prev) => ({ ...prev, type: e.target.value })),
    []
  );

  const handleApply = useCallback(() => {
    const params = new URLSearchParams();
    if (filters.status) params.set('status', filters.status);
    if (filters.gender) params.set('gender', filters.gender);
    if (filters.species) params.set('species', filters.species);
    if (filters.name) params.set('name', filters.name);
    if (filters.type) params.set('type', filters.type);

    const newURL = `${API_URL}?${params.toString()}`;
    setApiURL(newURL);
    setActivePage(0);

    const newPath = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newPath);
  }, [filters, setApiURL, setActivePage]);

  const handleReset = useCallback(() => {
    setFilters({
      status: '',
      gender: '',
      species: '',
      name: '',
      type: ''
    });
    setApiURL(API_URL);
    setActivePage(0);
    window.history.replaceState({}, '', window.location.pathname);
  }, [setApiURL, setActivePage]);

  return (
    <FiltersContainer>
      <FilterSelect
        id="status"
        placeholder="Status"
        value={filters.status}
        onChange={handleStatusChange}
        options={STATUS_OPTIONS}
        openSelectId={openSelectId}
        setOpenSelectId={setOpenSelectId}
      />

      <FilterSelect
        id="gender"
        placeholder="Gender"
        value={filters.gender}
        onChange={handleGenderChange}
        options={GENDER_OPTIONS}
        openSelectId={openSelectId}
        setOpenSelectId={setOpenSelectId}
      />

      <FilterSelect
        id="species"
        placeholder={speciesLoading ? 'Loading...' : 'Species'}
        value={filters.species}
        onChange={handleSpeciesChange}
        options={speciesOptions}
        openSelectId={openSelectId}
        setOpenSelectId={setOpenSelectId}
      />

      <FilterInput
        placeholder="Name"
        value={filters.name}
        onChange={handleNameChange}
      />

      <FilterInput
        placeholder="Type"
        value={filters.type}
        onChange={handleTypeChange}
      />
      <ButtonsWrapper>
        <FilterButton color="#83BF46" label="Apply" onClick={handleApply} />
        <FilterButton color="#FF5152" label="Reset" onClick={handleReset} />
      </ButtonsWrapper>
    </FiltersContainer>
  );
}

const FiltersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 180px);
  grid-template-rows: auto auto auto;
  gap: 10px;
  justify-content: center;
  align-items: center;

  & > :nth-child(4) {
    grid-column: 1;
  }
  & > :nth-child(5) {
    grid-column: 2;
  }
  & > :nth-child(6) {
    grid-column: 3;
  }

  @media (max-width: 530px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    & > * {
      width: 240px;
    }
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  width: 240px;
  @media (max-width: 530px) {
    flex-direction: column;
    & > * {
      width: 100%;
    }
  }
`;
