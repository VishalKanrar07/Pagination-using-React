import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total / 10);
    }
  };
  console.log(products);

  useEffect(() => {
    fetchData();
  }, [page]);

  const selectPageHandler = (selectedPAge) => {
    if (
      selectedPAge >= 1 &&
      selectedPAge <= totalPages &&
      selectedPAge != page
    ) {
      setPage(selectedPAge);
    }
  };

  return (
    <div>
      {products.length > 1 && (
        <div className="products">
          {products.map((prod) => {
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
          {[...Array(totalPages)].map((_, idx) => {
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
            className={page < totalPages ? "" : "pagination__disable"}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
};

export default App;
