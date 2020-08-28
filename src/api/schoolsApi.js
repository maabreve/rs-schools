import { handleResponse, handleError } from "./apiUtils";

const baseUrl = process.env.API_URL + "/schools/";

const markers = [{
    ID: 1,
    lat: -30.0441,
    lng: -51.2194,
    time: new Date(),
    nome: 'Escola 1',
    email: 'escola1@gmail.com',
    site: 'www.escola1.com.br',
    endereco: 'PCA GARIBALDI',
    numero: '1',
    bairro: 'AZENHA'
  },
  {
    ID: 2,
    lat: -30.07,
    lng: -51.1562,
    time: new Date(),
    nome: 'Escola 2',
    email: 'escola2@gmail.com',
    site: 'www.escola2.com.br',
    endereco: 'RUA VINTE E QUATRO DE OUTUBRO',
    numero: '211',
    bairro: 'INDEPENDÊNCIA'
  },
  {
    ID: 3,
    lat: -29.9804,
    lng: -51.1855,
    time: new Date(),
    nome: 'Escola 3',
    email: 'escola3@gmail.com',
    site: 'www.escola3.com.br',
    endereco: 'PCA JAYME TELLES',
    numero: '1',
    bairro: 'SANTANA'
  }
];

export const getSchools = async () => {
  return new Promise(resolve => setTimeout(() => {
    resolve(markers)

  }, 2000));

  // return fetch(baseUrl)
  //   .then(handleResponse)
  //   .catch(handleError);
}
