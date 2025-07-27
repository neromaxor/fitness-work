import { useState } from "react";
import css from "./NutritionCalculator.module.css";
import productsDB from "./productsDB"; // шлях до твого productsDB.js

function NutritionCalculator() {
  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Фільтр продуктів
  const filteredProducts = productsDB.flatMap(cat =>
    cat.items
      .filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
      .map(item => ({ ...item, category: cat.category }))
  );

  const addProduct = (product) => {
    if (!selectedProducts.find(p => p.name === product.name)) {
      setSelectedProducts([...selectedProducts, { ...product, grams: 100 }]);
    }
    setSearch(""); // Очищення пошуку після додавання
  };

  
  const updateGrams = (name, grams) => {
    setSelectedProducts(
      selectedProducts.map(p =>
        p.name === name ? { ...p, grams: grams } : p
      )
    );
  };

  const removeProduct = (name) => {
    setSelectedProducts(selectedProducts.filter(p => p.name !== name));
  };

  // Підрахунок сумарних БЖУ та калорій
  const totals = selectedProducts.reduce(
    (acc, product) => {
      const factor = product.grams / 100;
      acc.protein += product.protein * factor;
      acc.fat += product.fat * factor;
      acc.carbs += product.carbs * factor;
      acc.kcal += product.kcal * factor;
      return acc;
    },
    { protein: 0, fat: 0, carbs: 0, kcal: 0 }
  );

  return (
    <div className={css.container}>
      
      <h2 className={css.title}>Підрахунок БЖУ та калорій</h2>

      {/* Пошук */}
      <input
        type="text"
        placeholder="Пошук продуктів..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={css.search}
      />

      {/* Результати пошуку */}
      {search && (
        <div className={css.results}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, idx) => (
              <div key={idx} className={css.resultItem}>
                <span>{product.name} ({product.category})</span>
                <button onClick={() => addProduct(product)}>Додати</button>
              </div>
            ))
          ) : (
            <p className={css.noResults}>Нічого не знайдено</p>
          )}
        </div>
      )}

      {/* Обрані продукти */}
      {selectedProducts.length > 0 && (
        <div className={css.selected}>
          <h3>Обрані продукти:</h3>
          {selectedProducts.map((p, idx) => (
            <div key={idx} className={css.productRow}>
              <span>{p.name}</span>
              <input
                type="number"
                value={p.grams}
                onChange={(e) => updateGrams(p.name, Number(e.target.value))}
              />
              <span>{((p.protein * p.grams) / 100).toFixed(1)} Б</span>
              <span>{((p.fat * p.grams) / 100).toFixed(1)} Ж</span>
              <span>{((p.carbs * p.grams) / 100).toFixed(1)} В</span>
              <span>{((p.kcal * p.grams) / 100).toFixed(1)} ккал</span>
              <button onClick={() => removeProduct(p.name)}>×</button>
            </div>
          ))}
        </div>
      )}

      {/* Підсумок */}
      {selectedProducts.length > 0 && (
        <div className={css.summary}>
          <h3>Підсумок:</h3>
          <p>Білки: {totals.protein.toFixed(1)} г</p>
          <p>Жири: {totals.fat.toFixed(1)} г</p>
          <p>Вуглеводи: {totals.carbs.toFixed(1)} г</p>
          <p>Калорії: {totals.kcal.toFixed(1)} ккал</p>
        </div>
      )}
    </div>
  );
}

export default NutritionCalculator;
