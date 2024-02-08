import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://seagale.fr/api/products?ws_key=24UCBP8LSPL5EWHZVI2VDSZMRSU7EITZ&filter[active]=[1]&display=full&output_format=JSON')
      .then(response => {
        console.log(response.data); // Console log pour vérifier la réponse
        // Tri des produits par référence
        const sortedProducts = response.data.products.sort((a, b) => {
          const refA = a.reference.split('.');
          const refB = b.reference.split('.');
          // Comparaison des lettres
          if (refA[0] < refB[0]) return -1;
          if (refA[0] > refB[0]) return 1;
          // Si les lettres sont égales, comparaison du premier chiffre
          if (parseInt(refA[1], 10) < parseInt(refB[1], 10)) return -1;
          if (parseInt(refA[1], 10) > parseInt(refB[1], 10)) return 1;
          // Si les premiers chiffres sont égaux, comparaison du dernier chiffre
          return parseInt(refA[2], 10) - parseInt(refB[2], 10);
        });
        setProducts(sortedProducts); // Mise à jour des produits triés
      })
      .catch(error => console.error('Erreur lors de la récupération des données', error));
  }, []);

  const handleInputChange = (e, index, key) => {
    const newProducts = [...products];
    const { zone, famille, rang } = newProducts[index]; // Récupération des valeurs actuelles
    newProducts[index][key] = e.target.value;
    // Si la clé est 'zone', 'famille' ou 'rang', mettre à jour la référence
    if (key === 'zone' || key === 'famille' || key === 'rang') {
      newProducts[index].reference = `${newProducts[index].zone || zone}.${newProducts[index].famille || famille}.${newProducts[index].rang || rang}`;
      setProducts(newProducts); // Mise à jour des produits
    }
  };

  const handleBlur = () => {
    // Réorganiser les produits après modification
    const sortedProducts = products.sort((a, b) => {
      const refA = a.reference.split('.');
      const refB = b.reference.split('.');
      // Comparaison des lettres
      if (refA[0] < refB[0]) return -1;
      if (refA[0] > refB[0]) return 1;
      // Si les lettres sont égales, comparaison du premier chiffre
      if (parseInt(refA[1], 10) < parseInt(refB[1], 10)) return -1;
      if (parseInt(refA[1], 10) > parseInt(refB[1], 10)) return 1;
      // Si les premiers chiffres sont égaux, comparaison du dernier chiffre
      return parseInt(refA[2], 10) - parseInt(refB[2], 10);
    });
    setProducts([...sortedProducts]); // Mise à jour des produits triés
  };

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
                <td>
                  <input
                    type="text"
                    defaultValue={zone}
                    onBlur={(e) => {
                      const newZone = e.target.value;
                      const newProducts = [...products];
                      newProducts[index].reference = `${newZone}.${famille}.${rang}`;
                      setProducts(newProducts);
                      handleBlur();
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    defaultValue={famille}
                    onBlur={(e) => {
                      const newFamille = e.target.value;
                      const newProducts = [...products];
                      newProducts[index].reference = `${zone}.${newFamille}.${rang}`;
                      setProducts(newProducts);
                      handleBlur();
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    defaultValue={rang}
                    onBlur={(e) => {
                      const newRang = e.target.value;
                      const newProducts = [...products];
                      newProducts[index].reference = `${zone}.${famille}.${newRang}`;
                      setProducts(newProducts);
                      handleBlur();
                    }}
                  />
                </td>
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
