import React, { useEffect, useState } from 'react'
import { getCharacters } from '../../helpers/getCharacters';
import ButtonComponent from '../common/ButtonComponent';

const PaginationTable = () => {

  const [character, setCharacter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const fetchCharacters = async (page) => {
    const data = await getCharacters(page);
    setCharacter(data);
  }

  const handlePageClick = (page) => {
    setCurrentPage(page);
  }

  const renderCharacterRows = () => {
    if (character.results) {
      return character.results.map((item) => (
        <tr key={item.id} className='text-center h-[50px]'>
          <td className=''>
            <img src={item.image} alt='foto' />
          </td>
          <td>{item.name}</td>
          <td>{item.species}</td>
          <td>{item.gender}</td>
        </tr>
      )).slice((currentPage - 1) * 5, currentPage * 5); // Display only 5 rows per page
    }
    return null;
  }

  return (

    <div className='flex flex-col justify-center items-center'>

      <table className="w-1/2 text-sm text-left p-2 text-gray-500 dark:text-gray-400">
        <thead className='text-xl bg-slate-300'>
          <tr>
            <th className='p-2'>Image</th>
            <th className='p-2'>Name</th>
            <th className='p-2'>Species</th>
            <th className='p-2'>Gender</th>
          </tr>
        </thead>
        <tbody>
          {renderCharacterRows()}
        </tbody>
      </table>
      <div className="my-5">
        <ButtonComponent disabled={currentPage === 1} onClick={() => handlePageClick(currentPage - 1)} title='Previous' />
        <span className='text-sky-950'>Page {currentPage}</span>
        <ButtonComponent disabled={currentPage === (character.info ? character.info.pages : 1)}
          onClick={() => handlePageClick(currentPage + 1)} title='Next' />

      </div>
    </div>
  )
}

export default PaginationTable
