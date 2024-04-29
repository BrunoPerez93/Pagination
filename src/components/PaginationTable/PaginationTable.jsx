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
        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td className='w-1/3'>
            <img src={item.image} alt='foto' />
          </td>
          <td>{item.name}</td>
          <td>{item.species}</td>
          <td>{item.gender}</td>
        </tr>
      )).slice((currentPage - 1) * 5, currentPage * 5);
    }
    return null;
  }

  return (

    <div className='relative overflow-x-auto p-5 bg-red-500 font-bold'>

      <table className="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
      <div className="my-5 flex justify-center items-center">

        <ButtonComponent disabled={currentPage === 1} onClick={() => handlePageClick(currentPage - 1)} title='Previous' />
        <span className='text-sky-950 font-bold'>Page {currentPage}</span>
        <ButtonComponent disabled={currentPage === (character.info ? character.info.pages : 1)}
          onClick={() => handlePageClick(currentPage + 1)} title='Next' />

      </div>
    </div>
  )
}

export default PaginationTable
