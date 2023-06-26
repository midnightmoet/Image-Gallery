const buttonEl = document.getElementById("btn");
const errorMessageEl = document.getElementById("errorMessage");
const galleryEl = document.getElementById("gallery");


async function fetchImage() {
  const inputValue = document.getElementById("input").value;

  if (inputValue > 10 || inputValue < 1) {
    errorMessageEl.style.display = "block";
    errorMessageEl.innerText = "Number should be between 0 and 11,try again";
    return;
  }

  images = "";

//   try get the images from the api
  try {
    buttonEl.style.display = "none";
    const loading = `<img src="loading.svg" />`;
    galleryEl.innerHTML = loading;
    await fetch(
      `https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(
        Math.random() * 1000
      )}&client_id=PC0Ofe5oVY3Y1cHKi2Ot-wWRHVeS92AU_r9C-s2dgEo`
    ).then((res) =>
      res.json().then((data) => {
        if (data) {
          data.forEach((pic) => {
            images += `
            <img src=${pic.urls.small} alt="image"/>
            `;
            galleryEl.style.display = "block";
            galleryEl.innerHTML = images;
            buttonEl.style.display = "block";
            errorMessageEl.style.display = "none";
          });
        }
      })
    );
// if there is an error, display the error message
  } catch (error) {
    console.log(error);
    errorMessageEl.style.display = "block";
    errorMessageEl.innerHTML = "An error happened, try again later";
    buttonEl.style.display = "block";
    galleryEl.style.display = "none";
  }
}

buttonEl.addEventListener("click", fetchImage);