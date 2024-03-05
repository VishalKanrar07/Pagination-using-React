import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };
  console.log(products);

  useEffect(() => {
    fetchData();
  }, []);

  const selectPageHandler = (selectedPAge) => {
    if (
      selectedPAge >= 1 &&
      selectedPAge <= products.length / 10 &&
      selectedPAge != page
    ) {
      setPage(selectedPAge);
    }
  };

  return (
    <div>
      {products.length > 1 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span className="products__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disable"}
            onClick={() => selectPageHandler(page - 1)}
          >
            ◀️
          </span>
          {[...Array(products.length / 10)].map((_, idx) => {
            return (
              <span
                className={page === idx + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(idx + 1)}
                key={idx}
              >
                {idx + 1}
              </span>
            );
          })}
          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < products.length / 10 ? "" : "pagination__disable"}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
};

export default App;
