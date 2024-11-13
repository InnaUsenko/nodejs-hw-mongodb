const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isContactType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isContactType(contactType)) return contactType;
};

//IF WE NEED TO PARS NUMBER IN THE NEAREST FUTURE
// const parseNumber = (number) => {
//   const isString = typeof number === 'string';
//   if (!isString) return;

//   const parsedNumber = parseInt(number);
//   if (Number.isNaN(parsedNumber)) {
//     return;
//   }

//   return parsedNumber;
// };

const parseBool = (bool) => {
  const isString = typeof bool === 'string';
  if (!isString) return;

  switch (bool?.toLowerCase()?.trim()) {
    case 'true':
    case 't':
    case 'yes':
    case '1':
      return true;

    case 'false':
    case 'f':
    case 'no':
    case '0':
    case null:
    case undefined:
      return false;

    default:
      return;
  }
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedContactType = parseContactType(contactType);
  const parsedFavourite = parseBool(isFavourite);

  return {
    contactType: parsedContactType,
    isFavourite: parsedFavourite,
  };
};
