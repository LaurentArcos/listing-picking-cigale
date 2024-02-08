import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://seagale.fr/api/products?ws_key=24UCBP8LSPL5EWHZVI2VDSZMRSU7EITZ&filter[active]=[1]&display=full&output_format=JSON')
      .then(response => {
        console.log(response.data); 
        setProducts(response.data.products); 
      })
      .catch(error => console.error('Erreur lors de la récupération des données', error));
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Modèles</th>
            <th>Liste Donnée</th>
            <th>Zone</th>
            <th>Famille</th>
            <th>Rang</th>
            <th>Code</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {

            const [zone, famille, rang] = product.reference.split('.');

            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name[0].value}</td> 
                <td>{index + 1}</td>
                <td>{zone}</td>
                <td>{famille}</td>
                <td>{rang}</td>
                <td>{product.reference}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;