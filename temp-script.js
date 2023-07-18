const isOrganizationNameCorrect = (name1, name2) => {
  name1 = name1.toLowerCase().split(' ').sort();
  name2 = name2.toLowerCase().split(' ').sort();

  if (name1.length != name2.length) return false;

  for (let i = 0; i < name1.length; i++) {
    if (name1[i] != name2[i]) return false;
  }
  return true;
};
