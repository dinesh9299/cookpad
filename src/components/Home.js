import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ScrollTop } from "primereact/scrolltop";

const Home = () => {
  const [list, setList] = useState(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const desktopScrollRef = useRef(null); // Separate ref for desktop
  const mobileScrollRef = useRef(null); // Separate ref for mobile
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [categoriesData, setCategoriesData] = useState({
    chicken: null,
    dessert: null,
    lamb: null,
    miscellaneous: null,
    pasta: null,
    pork: null,
    seafood: null,
    side: null,
    starter: null,
    vegan: null,
    vegetarian: null,

    beef: null,
    breakfast: null,
    goat: null,
  });

  const fetchCategoryData = (category) => {
    setLoading(true);
    return axios
      .get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((res) => {
        setCategoriesData((prevData) => ({
          ...prevData,
          [category.toLowerCase()]: res.data,
        }));
        setLoading(false);
      });
  };

  useEffect(() => {
    const categories = [
      "chicken",
      "dessert",
      "lamb",
      "Miscellaneous",
      "pasta",
      "pork",
      "seafood",
      "side",
      "Starter",
      "Vegan",
      "Vegetarian",

      "Beef",
      "Breakfast",
      "Goat",
    ];

    // Fetch all categories data
    const fetchAllCategories = async () => {
      await Promise.all(
        categories.map((category) => fetchCategoryData(category))
      );
    };

    fetchAllCategories();
  }, []);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((res) => {
        setList(res.data);
      });
  }, []);

  const checkScrollPosition = (container) => {
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      const isAtEnd =
        container.scrollWidth - container.clientWidth === container.scrollLeft;
      setShowRightArrow(!isAtEnd);
    }
  };

  // Attach scroll event listeners to desktop scroll container
  useEffect(() => {
    const desktopContainer = desktopScrollRef.current;
    if (desktopContainer) {
      desktopContainer.addEventListener("scroll", () =>
        checkScrollPosition(desktopContainer)
      );
    }

    return () => {
      if (desktopContainer) {
        desktopContainer.removeEventListener("scroll", () =>
          checkScrollPosition(desktopContainer)
        );
      }
    };
  }, []);

  // Function to scroll left (for desktop)
  const scrollLeft = () => {
    if (desktopScrollRef.current) {
      desktopScrollRef.current.scrollBy({
        left: -200, // Adjust the scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  // Function to scroll right (for desktop)
  const scrollRight = () => {
    if (desktopScrollRef.current) {
      desktopScrollRef.current.scrollBy({
        left: 200, // Adjust the scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  const handleCategory = (name) => {
    navigate(`/meals/${name}`);
  };

  const handleMeal = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className=" bg-info bg-opacity-25 w-100 p-2  ">
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
          <div
            className="categoryscroll d-none d-lg-flex d-md-flex d-sm-none overflow-auto gap-3 position-relative"
            ref={desktopScrollRef} // Attach ref to desktop scroll container
            style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
          >
            {list?.categories?.map((category) => (
              <div key={category.idCategory} style={{ cursor: "pointer" }}>
                <img
                  className="rounded-circle"
                  onClick={() => {
                    handleCategory(category.strCategory);
                  }}
                  src={category.strCategoryThumb}
                  alt="category"
                  width={"100px"}
                  height={"100px"}
                />
                <div className="text-center" style={{ fontSize: "12px" }}>
                  {category.strCategory}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile categories */}
          <div
            className="categoryscroll d-flex d-lg-none d-md-none overflow-auto gap-3 position-relative"
            ref={mobileScrollRef} // Attach ref to mobile scroll container
            style={{ scrollBehavior: "smooth", whiteSpace: "nowrap" }}
          >
            {list?.categories?.map((category) => (
              <div key={category.idCategory} style={{ cursor: "pointer" }}>
                <img
                  className="rounded-circle"
                  onClick={() => {
                    handleCategory(category.strCategory);
                  }}
                  src={category.strCategoryThumb}
                  alt="category"
                  width={"60px"}
                  height={"60px"}
                />
                <div className="text-center" style={{ fontSize: "12px" }}>
                  {category.strCategory}
                </div>
              </div>
            ))}
          </div>

          {/* Left arrow for desktop */}
          {showLeftArrow && (
            <button
              className="d-none d-lg-block carousel-control-prev text-dark"
              type="button"
              style={{
                position: "absolute",
                fontSize: "40px",
                top: "-55%",
                left: "0",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                marginLeft: "-60px",
              }}
              onClick={scrollLeft}
            >
              &#10094;
            </button>
          )}

          {/* Right arrow for desktop */}
          {showRightArrow && (
            <button
              className="d-none  d-lg-block carousel-control-next text-dark"
              type="button"
              style={{
                fontSize: "40px",
                position: "absolute",
                top: "16%",
                right: "0 ",
                height: "70px",
                width: "50px",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                marginLeft: "200px",
              }}
              onClick={scrollRight}
            >
              &#10095;
            </button>
          )}

          {Object.entries(categoriesData).map(([key, value]) => (
            <div>
              <div
                key={key}
                className=" d-none d-sm-none d-md-block d-lg-block mt-4 bg-light px-2 pb-4"
              >
                <h2 className="mb-2">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </h2>
                <div className="d-flex flex-wrap gap-3 categoryscroll">
                  {value?.meals?.map((meal) => (
                    <div
                      key={meal.idMeal}
                      className="ms-2    shadow rounded-2 px-3 pt-3 text-center"
                      style={{ cursor: "pointer" }} // Set a fixed width for consistent layout
                      onClick={() => handleMeal(meal.idMeal)}
                    >
                      <img
                        className="mb-1 rounded-3"
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        width={"165px"}
                        height={"170px"}
                      />
                      <div
                        className="text-start fw-bold mt-2"
                        style={{
                          fontSize: "15px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          maxWidth: "160px",
                        }}
                      >
                        {meal.strMeal}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/*mobile */}
              <div
                key={key}
                className=" d-sm-block d-md-none d-lg-none mt-4 bg-light px-2 pb-4"
              >
                <h2 className="mb-2">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </h2>
                <div className="d-flex flex-wrap gap-3 categoryscroll">
                  {value?.meals?.map((meal) => (
                    <div
                      className=" w-100 h-100 shadow-sm rounded-2 text-center w-100 max-w-custom-230px md:max-w-sm-custom lg:max-w-md-custom"
                      key={meal.idCategory}
                      style={{ cursor: "pointer", width: "fit-content" }}
                    >
                      <img
                        className=" rounded-3 w-100 h-100"
                        // onClick={() => {
                        //   handleCategory(category.strCategory);
                        // }}
                        src={meal.strMealThumb}
                        alt="category"
                        // width={"300px"}
                        // height={"300px"}
                      />
                      <div
                        className=" h-100  text-start fw-bold mt-2"
                        style={{
                          fontSize: "15px",
                          overflow: "hidden", // Hide overflow
                          whiteSpace: "nowrap", // Prevent text wrapping
                          textOverflow: "ellipsis", // Add ellipsis
                          maxWidth: "300px", // Set a max width
                        }}
                      >
                        {meal.strMeal}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
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

export default Home;
