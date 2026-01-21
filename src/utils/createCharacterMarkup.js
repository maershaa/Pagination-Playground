const createCharacterMarkup = ({
  _id,
  name,
  race,
  birth,
  death,
  hair,
  height,
  gender,
  spouse,
}) => {
  return `
  <li data-id="${_id}">
    <h2>${name}</h2>
    <p><strong>Race:</strong> ${race}</p>
    ${birth ? `<p><strong>Birth:</strong> ${birth}</p>` : ''}
    ${death ? `<p><strong>Death:</strong> ${death}</p>` : ''}
    ${hair ? `<p><strong>Hair:</strong> ${hair}</p>` : ''}
    ${height ? `<p><strong>Height:</strong> ${height}</p>` : ''}
    <p><strong>Gender:</strong> ${gender}</p>
    ${spouse ? `<p><strong>Spouse:</strong> ${spouse}</p>` : ''}
  </li>
`;
};
export{createCharacterMarkup}