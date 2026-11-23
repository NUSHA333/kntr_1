
/* ЗАДАНИЕ 1 */

const regExp = /^\d+$/;


const containsOnlyDigits = (str) => {
    return regExp.test(str);
};

console.log(containsOnlyDigits("12345"));
console.log(containsOnlyDigits("12a45"));


/* ЗАДАНИЕ 2 */

setInterval(() => {
    console.log("Прошла секунда");
}, 1000);


/* ЗАДАНИЕ 3 */

const count = () => {
    let i = 1;

    const interval = setInterval(() => {
        console.log(i);

        if (i === 10) {
            clearInterval(interval);
        }

        i++;
    }, 1000);
};

count();


/* ЗАДАНИЕ 4 */

let time = 10;
let timerInterval = null;

const timer = document.getElementById("timer");

document.getElementById("startBtn").addEventListener("click", () => {
    if (timerInterval !== null || time === 0) {
        return;
    }

    timerInterval = setInterval(() => {
        time--;

        timer.textContent = time;

        if (time === 0) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }, 1000);
});

document.getElementById("stopBtn").addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

document.getElementById("resetBtn").addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    time = 10;
    timer.textContent = time;
});


/* ЗАДАНИЕ 5 */

const colorBlock = document.getElementById("colorBlock");

colorBlock.addEventListener("click", () => {
    colorBlock.classList.toggle("active");
});


/* ЗАДАНИЕ 6 */

const xhr = new XMLHttpRequest();

xhr.open("GET", "test.json");

xhr.onload = function () {
    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log("Задание 6:", data);
    } else {
        console.log("Ошибка запроса");
    }
};

xhr.onerror = function () {
    console.log("Ошибка соединения");
};

xhr.send();


/* ЗАДАНИЕ 7 */

const loginInput = document.getElementById("loginInput");
const checkBtn = document.getElementById("checkBtn");
const userCard = document.getElementById("userCard");
const message = document.getElementById("message");

checkBtn.addEventListener("click", () => {
    const login = loginInput.value.trim();

    userCard.innerHTML = "";
    message.textContent = "";

    if (!login) {
        message.textContent = "Введите логин";
        return;
    }

    fetch("users.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Ошибка загрузки пользователей");
            }

            return response.json();
        })
        .then(users => {
            const user = users.find(item => item.login === login);

            if (user) {
                userCard.innerHTML = `
                    <h3>${user.login}</h3>
                    <p>Роль: ${user.role}</p>
                    <p>Email: ${user.email}</p>
                    <img src="${user.image}" alt="Фото пользователя">
                `;

                message.textContent = "Пользователь найден";
            } else {
                message.textContent = "Пользователь не найден";
            }
        })
        .catch(error => {
            message.textContent = "Ошибка запроса: " + error.message;
        });
});


/* ЗАДАНИЕ 8 */

const getUser = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Данные пользователя");
        }, 1000);
    });
};

const getPosts = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Посты пользователя");
        }, 2000);
    });
};

const getComments = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Комментарии пользователя");
        }, 3000);
    });
};

Promise.all([
    getUser(),
    getPosts(),
    getComments()
])
    .then(result => {
        console.log("Задание 8:", result);
    })
    .catch(error => {
        console.log("Ошибка:", error);
    });


/* ЗАДАНИЕ 9 */

const getUserData = async (id) => {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        if (!response.ok) {
            throw new Error("Пользователь не найден");
        }

        const data = await response.json();

        console.log("Задание 9:", data);

        return data;

    } catch (error) {
        console.log("Ошибка:", error.message);

    } finally {
        console.log("Запрос завершён");
    }
};

getUserData(1);


/* ЗАДАНИЕ 10 */

fetch("https://jsonplaceholder.typicode.com/photos", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        albumId: 1,
        title: "My photo",
        url: "https://example.com/photo.jpg",
        thumbnailUrl: "https://example.com/thumbnail.jpg"
    })
})
    .then(response => {
        if (!response.ok) {
            throw new Error("Ошибка отправки запроса");
        }

        return response.json();
    })
    .then(data => {
        console.log("Успешный запрос:", data);
    })
    .catch(error => {
        console.log("Ошибка:", error.message);
    });