const http = require('http');
const server = http.createServer();

let arr = ["Вентиль",
           "Желток",
           "Молоко",
           "Скафандр",
           "Нафталин",
           "Басурманин",
           "Ангар",
           "Коньк",
           "Брелок",
           "Княжество",
           "Карусель",
           "Марля",
           "Пономарь",
           "Обшивка",
           "Виселица",
           "Автоинспектор",
           "Фуражка",
           "Победа",
           "Контора",
           "Экран",
           "Этажерка",
           "Лилипут",
           "Капкан",
           "Оракул",
           "Панцирь",
           "Копирка",
           "Грядка",
           "Вакса",
           "Перо",
           "Мастика",
           "Оливка",
           "Бульдог",
           "Коромысло",
           "Кабинетик",
           "Огурец",
           "Казино",
           "Орхидея",
           "Раб",
           "Кинооператор",
           "Оранжерея",
           "Гиппопотам",
           "Деталь",
           "Небо",
           "Фляга",
           "Гамбургер",
           "Зебра",
           "Кинохроника",
           "Сарафан",
           "Доза",
           "Клюква",
           "Апартамент",
           "Абак",
           "Вагон",
           "Сиденье",
           "Канзас",
           "Кодекс",
           "Вентилятор",
           "Ведро",
           "Куба",
           "Лак",
           "Сарай",
           "Бланк",
           "Голубь",
           "Зрачок",
           "Закон",
           "Кафтан",
           "Кинозал",
           "Устрица",
           "Землянка",
           "Бегемот",
           "Автовышка",
           "Кофеин",
           "Фельдшер",
          ];

let data = {
    data: arr,
}

server.on('request', (req, res) => {
    try {
        if (req.url == '/words') {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
            res.writeHead(200, {
                'Content-Type': 'application/json',
            });
            res.end(JSON.stringify(data));
        }
        else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
            res.writeHead(400, {
                'Content-Type': 'text/plain',
            });
            res.end('400 Bad Request');
        }
    }
    catch (error) {
        console.log(error);
    }
});

server.listen(3010, () => console.log('Successful'));
