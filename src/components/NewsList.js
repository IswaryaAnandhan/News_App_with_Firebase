import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { db } from "../firebase";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";

const NewsList = ({ articles }) => {
  const [isGridView, setIsGridView] = useState(false);
  const [favorites, setFavorites] = useState([]);
  
// Function to add an article to the user's favorites
const addFavoriteArticle = async (userId, article) => {
  try {
    const favoritesRef = collection(db, `favorites`);
    await addDoc(favoritesRef, article);
  } catch (error) {
    console.error("Error adding favorite article: ", error);
  }
};

// Function to remove an article from the user's favorites
 const removeFavoriteArticle = async (userId, articleId) => {
  try {
    const articleRef = doc(db, `favorites/${userId}/articles/${articleId}`);
    await deleteDoc(articleRef);
  } catch (error) {
    console.error("Error removing favorite article: ", error);
  }
};

  const toggleFavorite = (article) => {
    // Check if the article is already in favorites
    const isFavorite = favorites.some((fav) => fav.title === article.title);

    if (isFavorite) {
      // If it's a favorite, remove it
      removeFavoriteArticle(article);
      setFavorites(favorites.filter((fav) => fav.title !== article.title));
    } else {
      // If it's not a favorite, add it
      addFavoriteArticle(article);
      setFavorites([...favorites, article]);
    }
  };
  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const filteredArticles = articles.filter((article) => {
    return (
      article.author !== null &&
      article.description !== "[Removed]" &&
      article.publishedAt !== null &&
      article.source.name !== "[Removed]" &&
      article.title !== "[Removed]" 
    );
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>World News App</h2>
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
                <FontAwesomeIcon
                    icon={faHeart}
                    className={`position-absolute top-0 end-0 m-2 ${
                      favorites.some((fav) => fav.title === article.title)
                        ? "text-danger"
                        : "text-secondary"
                    }`}
                    onClick={() => toggleFavorite(article)}
                  />
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
                  <FontAwesomeIcon
                      icon={faHeart}
                      className={`position-absolute top-0 end-0 m-2 ${
                        favorites.some((fav) => fav.title === article.title)
                          ? "text-danger"
                          : "text-secondary"
                      }`}
                      onClick={() => toggleFavorite(article)}
                    />
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
