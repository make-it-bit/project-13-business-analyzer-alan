const isOrganizationNameCorrect = (name1, name2) => {
  name1 = name1.toLowerCase().split(' ').sort();
  name2 = name2.toLowerCase().split(' ').sort();

  if (name1.length != name2.length) return false;

  if (name1.includes('as') && name2.includes('aktsiaselts')) {
    // 'as' and 'aktsiselts' are considered the same
    name1.splice(name1.indexOf('as'), 1);
    name2.splice(name2.indexOf('aktsiaselts'), 1);
  }

  if (name1.includes('aktsiaselts') && name2.includes('as')) {
    name1.splice(name1.indexOf('aktsiaselts'), 1);
    name2.splice(name2.indexOf('as'), 1);
  }

  if (name1.includes('oü') && name2.includes('osaühing')) {
    // 'oü' and 'osaühing' are considered the same
    name1.splice(name1.indexOf('oü'), 1);
    name2.splice(name2.indexOf('osaühing'), 1);
  }

  if (name1.includes('osaühing') && name2.includes('oü')) {
    name1.splice(name1.indexOf('osaühing'), 1);
    name2.splice(name2.indexOf('oü'), 1);
  }

  console.log(name1);
  console.log(name2);

  for (let i = 0; i < name1.length; i++) {
    if (name1[i] != name2[i]) return false;
  }
  return true;
};

isOrganizationNameCorrect('mate as', 'aktsiaselts mate'); // --> true
isOrganizationNameCorrect('selver food oü', 'selver food osaühing'); // --> true
