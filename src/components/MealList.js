import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";

import { ScrollTop } from "primereact/scrolltop";

const MealList = () => {
  const [mealslist, setMealslist] = useState(null);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.name}`
      )
      .then((res) => {
        setMealslist(res.data);
        setLoading(false);
      });
  }, [params]);

  const handleClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className=" bg-info bg-opacity-25" style={{ minHeight: "87.3vh" }}>
      {loading && (
        <div
          className=" h-100 d-flex justify-content-center align-items-center"
          style={{ minHeight: "87.3vh" }}
        >
          <div>
            <div className="loader "></div>
            <div className=" text-center" style={{ marginLeft: "-11px" }}>
              loading
            </div>
          </div>
        </div>
      )}
      {!loading && (
        <div>
          <h3 className=" text-danger">{params.name} related Items</h3>
          <div className="pt-3 pb-4 ps-3 bg-opacity-25">
            {mealslist?.meals.length > 0 ? (
              <div>
                <div className="  d-none d-md-flex d-sm-none  d-lg-flex flex-wrap gap-4 rounded-2">
                  {mealslist?.meals.map((meal) => (
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
                <div className=" d-lg-none d-md-none pe-3   d-sm-flex flex-wrap gap-4 rounded-2">
                  {mealslist?.meals?.map((meal) => (
                    <ImageListItem
                      key={meal.idMeal}
                      style={{ width: "fit-content", cursor: "pointer" }}
                      onClick={() => {
                        handleClick(meal.idMeal);
                      }}
                      className="  mx-auto mb-3   w-100 max-w-custom-230px md:max-w-sm-custom lg:max-w-md-custom"
                    >
                      <img
                        srcSet={`${meal.strMealThumb}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`${meal.strMealThumb}?w=248&fit=crop&auto=format`}
                        alt={meal.strMeal}
                        loading="lazy"
                        className=" rounded-4"
                      />
                      <ImageListItemBar
                        className=" rounded-bottom-4"
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
              </div>
            ) : (
              <p>No meals found.</p>
            )}
          </div>
          <ScrollTop
            threshold={600}
            className="w-2rem rounded-circle h-2rem border-round bg-success shadow"
            icon="pi pi-angle-up text-white"
          />
        </div>
      )}
    </div>
  );
};

export default MealList;
