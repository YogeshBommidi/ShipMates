export const sliderSettings = {
  slidesPerView: 1,
  spaceBetween: 25,
  breakpoints: {
    1100: {
      slidesPerView: 4,
    },
    780: {
      slidesPerView: 3,
    },
    600: {
      slidesPerView: 2,
    },
    480: {
      slidesPerView: 1,
    },
  },
};

export const updateFavourities = (id, favourities) => {
  if (favourities?.includes(id)) {
    return favourities.filter((loadId) => loadId !== id);
  } else {
    return [...(favourities ?? []), id];
  }
};

export const checkFavourities = (id, favourities) => {
  return favourities?.includes(id) ? "#fa3e5f" : "white";
};


/**export const updateFavourities = (id, favourities) => {
  if (favourities.includes(id)) {
    return favourities.filter((resId) => resId !== id);
  } else {
    return [...favourities, id];
  }
}; */