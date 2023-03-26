import "./App.css";
import { useEffect, useState } from "react";

function App() {
  let [products, setProduct] = useState([]); // for setting products
  let [page, setPage] = useState(1);         // for products per page
  let [totalPages, setTotalPages]= useState(0); // for page limit

  function getData() {
    fetch(`https://dummyjson.com/products?limit=9&skip=${page * 9 - 9}`)
      .then((res) => {
        console.log(res.status);
        if (res.status !== 200) {
          throw new Error();
        } else {
          //extract data from res object
          return res.json();
        }
      })
      .then((data) => {
        if (data && data.products) {
          setProduct(data.products);
          setTotalPages(data.total / 10)
        }
      })
      .catch((err) => console.error(err.message));
  }

  useEffect(() => {
    getData();
  }, [page]);

  function selectPageHandler(selectedPage) {
    if(
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    )
    setPage(selectedPage);
  }
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.map((prod) => {
            return (
              <span className="products-single" key={products.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span className="products__title">{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span className={page > 1 ? "pagination-arrows": "pagination-arrows pagination__disabled"} toolTip="click"onClick={() => selectPageHandler(page - 1)}>
            <img
              src="https://img.icons8.com/emoji/48/null/left-arrow-emoji.png"
              alt="left-arrow"
            />
          </span>
          {[...Array(totalPages)].map((_, ind) => {
            return (
              <span
                className={page === ind + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHandler(ind + 1)}
                key={ind}
              >
                {ind + 1}
              </span>
            );
          })}
          <span className={page < totalPages ? "pagination-arrows": "pagination-arrows pagination__disabled"} onClick={() => selectPageHandler(page + 1)}>
            <img
              src="https://img.icons8.com/emoji/48/null/right-arrow-emoji.png"
              alt="right-arrow"
            />
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
