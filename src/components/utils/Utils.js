import * as Data from './Data';

export const getFakultas = value => {
  if (Data.fakultas.has(value.substring(0,3))) {
    return Data.fakultas.get(value.substring(0,3))
  }
  else {
    return 'None'
  }
}

export const getListNamaFakultas = () => {
  var listnama = []
  Data.fakultas.forEach(
    (value, key, map) => listnama.push({'nama' : value, 'kode' : key})
  )
  return listnama
}

export const getListProdi = value => {
  return Data.prodi.get(value);
}