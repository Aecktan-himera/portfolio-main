const forms = document.querySelectorAll("form");

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const body = {};

    formData.append("form", form.classList.value);

    formData.forEach((value, field) => {
      body[field] = value;
    });

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка сети: " + response.status);
        }
        return response.json();
      })
      .then((json) => {
        console.log(json);
        alert("Данные успешно отправлены!");
      })
      .catch((error) => {
        console.error(error);
        alert("Произошла ошибка при отправке: " + error.message);
      })
      .finally(() => {
        form.reset();
        console.log("Форма очищена");
      });
  });
});
