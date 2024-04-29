export const getCharacters = async (page) => {
  const url  = `https://rickandmortyapi.com/api/character?page=${page}`;
  const resp = await fetch(url);
  const characterData = await resp.json();

  return characterData;
}