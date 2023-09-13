import React, { useState } from "react";

const NewsList = ({ articles }) => {
  const [isGridView, setIsGridView] = useState(false);

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const filteredArticles = articles.filter((article) => {
    return (
      article.author !== null &&
      article.content !== "[Removed]" &&
      article.description !== "[Removed]" &&
      article.publishedAt !== null &&
      article.source.name !== "[Removed]" &&
      article.title !== "[Removed]" &&
      article.urlToImage !== null
    );
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>News List</h2>
        <button className="btn btn-primary" onClick={toggleView}>
          {isGridView ? "List View" : "Grid View"}
        </button>
      </div>

      <div className={isGridView ? "row" : ""}>
        {filteredArticles.map((article) => (
          <div
            className={isGridView ? "col-md-6 mb-3" : ""}
            key={article.title}
          >
            {isGridView ? (
              <div className="card h-100">
                <div className="position-relative">
                  <img
                    src={article.urlToImage}
                    className="card-img-top rounded"
                    alt={article.title}
                  />
                  <div className="card mb-2">
                    <p className="card-text px-2 py-1 position-absolute">
                      {article.source.name}
                    </p>
                  </div>
                  <p className="card-text text-end">
                    <small className="text-muted">{`${new Date(
                      article.publishedAt
                    ).getHours()}:${new Date(
                      article.publishedAt
                    ).getMinutes()}`}</small>
                  </p>
                </div>
                <div className="card-body">
                  <h5 className="card-title">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none text-dark"
                    >
                      {article.title}
                    </a>
                  </h5>

                  <p className="card-text">{article.description}</p>
                </div>
              </div>
            ) : (
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4 col-12">
                    <img
                      src={article.urlToImage}
                      className="card-img rounded"
                      alt={article.title}
                    />
                  </div>
                  <div className="col-md-8 col-12">
                    <div className="card-body">
                      <h4 className="card-title">
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-decoration-none text-dark"
                        >
                          {article.title}
                        </a>
                      </h4>
                      <p className="card-text mr-2">
                        <small className="text-muted">
                          {" "}
                          {article.author},{" "}
                          {`${new Date(
                            article.publishedAt
                          ).getHours()}:${new Date(
                            article.publishedAt
                          ).getMinutes()}`}
                        </small>
                      </p>

                      <p className="card-text">{article.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
