import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { ScrollTop } from "primereact/scrolltop";

const Searchpage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [meals, setMeals] = useState([]); // Initialize as an empty array

  useEffect(() => {
    setLoading(true);
    if (query) {
      // Only make request if query exists
      axios
        .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then((res) => {
          setMeals(res.data.meals || []); // Set meals or empty array if no meals found
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching meals:", error);
        });
    }
  }, [query]); // Dependency array should only include `query`

  const handleClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div
      className="pt-3 pb-4 ps-3 bg-info bg-opacity-25"
      style={{ minHeight: "87.3vh" }}
    >
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
          {meals.length > 0 ? (
            <div>
              <div className="  d-none d-md-flex d-sm-none  d-lg-flex flex-wrap gap-4 rounded-2">
                {meals.map((meal) => (
                  <ImageListItem
                    key={meal.idMeal}
                    style={{ width: "245px", cursor: "pointer" }}
                    onClick={() => {
                      handleClick(meal.idMeal);
                    }}
                    className=" rounded-2"
                  >
                    <img
                      className=" rounded-4 "
                      srcSet={`${meal.strMealThumb}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      src={`${meal.strMealThumb}?w=248&fit=crop&auto=format`}
                      alt={meal.strMeal}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      className=" rounded-bottom-4"
                      title={meal.strMeal}
                      // subtitle={item.author}
                      actionIcon={
                        <IconButton
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-label={`info about ${meal.strMeal}`}
                        ></IconButton>
                      }
                    />
                  </ImageListItem>
                ))}
              </div>
              <div className=" d-lg-none d-md-none pe-3    d-sm-flex flex-wrap gap-4 rounded-2">
                {meals.map((meal) => (
                  <ImageListItem
                    key={meal.idMeal}
                    style={{ maxWidth: "330px", cursor: "pointer" }}
                    onClick={() => {
                      handleClick(meal.idMeal);
                    }}
                    className=" rounded-2 mx-auto mb-3  rounded-circle"
                  >
                    <img
                      srcSet={`${meal.strMealThumb}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      src={`${meal.strMealThumb}?w=248&fit=crop&auto=format`}
                      alt={meal.strMeal}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={meal.strMeal}
                      actionIcon={
                        <IconButton
                          className="pe-3"
                          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                          aria-label={`info about ${meal.strMeal}`}
                        ></IconButton>
                      }
                    />
                  </ImageListItem>
                ))}
              </div>
              <ScrollTop
                threshold={600}
                className="w-2rem rounded-circle h-2rem border-round bg-success shadow"
                icon="pi pi-angle-up text-white"
              />
            </div>
          ) : (
            <p>No meals found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Searchpage;
