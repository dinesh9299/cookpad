import axios from "axios";
import { ScrollTop } from "primereact/scrolltop";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Details = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`)
      .then((res) => {
        setDetails(res.data);
        setLoading(false);
      });
  }, [params]);

  return (
    <div className="p-1 bg-info bg-opacity-25">
      {loading && (
        <div
          className=" h-100 d-flex justify-content-center align-items-center"
          style={{ minHeight: "87.3vh" }}
        >
          <div>
            <div class="loader "></div>
            <div className=" text-center" style={{ marginLeft: "-11px" }}>
              loading
            </div>
          </div>
        </div>
      )}
      {!loading && (
        <div>
          {details?.meals?.map((item) => {
            // Extract the video ID from the YouTube URL
            const videoId = item.strYoutube.split("v=")[1];
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;

            // Create an array of ingredients and measurements
            const ingredients = [];
            for (let i = 1; i <= 20; i++) {
              const ingredient = item[`strIngredient${i}`];
              const measurement = item[`strMeasure${i}`];
              if (ingredient && ingredient.trim()) {
                ingredients.push({ ingredient, measurement });
              }
            }

            return (
              <div key={item.idMeal} className=" ">
                <div>
                  <h3 className="text-center text-danger fw-bold mb-2">
                    {item.strMeal}
                  </h3>
                  <div className="text-center d-none d-sm-none d-md-block d-lg-block">
                    {/* Embed YouTube video using iframe */}
                    <iframe
                      className="rounded-4"
                      src={embedUrl}
                      width={"700px"}
                      height={"400px"} // Adjust height as needed
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={item.strMeal}
                    ></iframe>
                  </div>
                  <div className="text-center d-lg-none d-md-none d-sm-block">
                    {/* Embed YouTube video using iframe */}
                    <iframe
                      className="rounded-4"
                      src={embedUrl}
                      width={"330px"}
                      height={"400px"} // Adjust height as needed
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={item.strMeal}
                    ></iframe>
                  </div>
                </div>
                <div className="   ">
                  <div>
                    <h3 className=" mb-3">Ingredients</h3>
                    <ol className=" d-lg-flex d-md-flex flex-wrap gap-5 text-dark">
                      {ingredients.map((ing, index) => (
                        <li key={index}>
                          {ing.measurement} {ing.ingredient}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="  w-100  mt-4">
                    <h3>Instructions</h3>
                    <div
                      className=" ps-2 text-secondary instructions text-start"
                      style={{ wordBreak: "all" }}
                    >
                      {item.strInstructions}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <ScrollTop
        threshold={600}
        className="w-2rem rounded-circle h-2rem border-round bg-success shadow"
        icon="pi pi-angle-up text-white"
      />
    </div>
  );
};

export default Details;
