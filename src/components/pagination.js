import React from "react";
import "../styles/paginations.css";
function Pagination({
  phonesPerPage,
  totalPhones,
  currentPage,
  clickPageHandler,
}) {
  const pageNumbers = [];
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 0 && i <= Math.ceil(totalPhones / phonesPerPage))
      pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers[0] > 1 && (
          <div className="pagination">
            <li className="page" onClick={() => clickPageHandler(1)}>
              1
            </li>
            {pageNumbers[0] > 2 && <li className="page-dots">...</li>}
          </div>
        )}
        {pageNumbers.map((page) => {
          return (
            <li
              key={page}
              className={page === currentPage ? "current-page" : "page"}
              onClick={() => clickPageHandler(page)}
            >
              {page}
            </li>
          );
        })}
        {pageNumbers[pageNumbers.length - 1] <
          Math.ceil(totalPhones / phonesPerPage) && (
          <div className="pagination">
            {pageNumbers[pageNumbers.length - 1] + 1 <
              Math.ceil(totalPhones / phonesPerPage) && (
              <li className="page-dots">...</li>
            )}
            <li
              className="page"
              onClick={() =>
                clickPageHandler(Math.ceil(totalPhones / phonesPerPage))
              }
            >
              {Math.ceil(totalPhones / phonesPerPage)}
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
}

export default Pagination;
