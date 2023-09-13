import React, { useEffect, useState } from "react";
import NewsList from "./NewsList";
import { getNewsArticles } from "../api"; 

function NewsPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
 
    async function fetchArticles() {
      try {
        const data = await getNewsArticles();
        setArticles(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    }
    fetchArticles();
  }, []);

  return (
    <div>
      <NewsList articles={articles} />
     </div>
  );
}

export default NewsPage;
