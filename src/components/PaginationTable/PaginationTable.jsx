import React, { useEffect, useState } from 'react'
import { getCharacters } from '../../helpers/getCharacters';
import ButtonComponent from '../common/ButtonComponent';

const PaginationTable = () => {

  const [character, setCharacter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const fetchCharacters = async (page) => {
    setLoading(true);
    let nextPage = page;
    let data;
    do {
      data = await getCharacters(nextPage);
      if (data.results.length === 0 && data.info.prev !== null) {
        nextPage++;
      } else {
        setCharacter(data);
        setTotalPages(data.info ? data.info.pages : 1);
      }
    } while (data.results.length === 0 && nextPage <= totalPages);
    setCurrentPage(nextPage);
    setLoading(false);
  }

  const handlePageClick = (page) => {
    if (page === 0 && currentPage === 1) {
      setCurrentPage(1);
    } else if (page === totalPages + 1) {
      setCurrentPage(totalPages);
    } else {
      setCurrentPage(page)
    }
  }

  const renderCharacterRows = () => {
    if (character.results) {
      return character.results.map((item) => (
        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
          <td className='w-1/3'>
            <img src={item.image} alt='foto' />
          </td>
          <td>{item.name}</td>
          <td>{item.species}</td>
          <td>{item.gender}</td>
        </tr>
      ))
    }
    return null;
  }

  return (

    <div className='p-5 bg-gray-500 font-bold flex flex-col justify-center items-center'>

      <table className="text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
      {loading ? (
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-c-gray"></div>
      ) : (
        <div className="my-5 flex justify-center items-center">
          <ButtonComponent disabled={currentPage === 1} onClick={() => handlePageClick(currentPage - 1)} title='Previous' />
          <span className='text-sky-950 font-bold'>Page {currentPage} of {totalPages}</span>
          <ButtonComponent disabled={currentPage === (character.info ? character.info.pages : 1)}
            onClick={() => handlePageClick(currentPage + 1)} title='Next' />
        </div>
      )}
    </div>
  )
}

export default PaginationTable
