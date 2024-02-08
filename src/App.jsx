import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://seagale.fr/api/products?ws_key=24UCBP8LSPL5EWHZVI2VDSZMRSU7EITZ&filter[active]=[1]&display=full&output_format=JSON')
      .then(response => {
        console.log(response.data);

        const sortedProducts = response.data.products.sort((a, b) => {
          const refA = a.reference.split('.');
          const refB = b.reference.split('.');

          if (refA[0] < refB[0]) return -1;
          if (refA[0] > refB[0]) return 1;

          if (parseInt(refA[1], 10) < parseInt(refB[1], 10)) return -1;
          if (parseInt(refA[1], 10) > parseInt(refB[1], 10)) return 1;

          return parseInt(refA[2], 10) - parseInt(refB[2], 10);
        });
        setProducts(sortedProducts); 
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
