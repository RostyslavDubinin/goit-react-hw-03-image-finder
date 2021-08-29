import axios from "axios";

const fetchImages = ({
  searchQuery = "",
  currentPage = 1,
  authorization = "21961904-37dea9a1bda711bd2751c0404",
}) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=${authorization}&image_type=photo&orientation=horizontal&per_page=12`
    )
    .then((response) => response.data.hits);
};

export default { fetchImages };
