import React, {useState, useEffect} from 'react';
import './App.css';



function App() {
    let arr = ["А", "Сервер", "Не", "Прислал", "Слова"];
    const [userWord, setUserWord] = useState(''); // Значение поля ввода
    const [baseWords, setBaseWords] = useState([]); // Массив слов, подходящий под ввод


    useEffect(() => {
        loadWords();
    });


    //Функция подгрузки массива слов
    const loadWords = async function() {
        try {
            let res = await fetch('http://127.0.0.1:3010/words', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            //Избавляемся от промиса
            let data = await res.json();
            //Сохраняем полученные данные
            arr = data.data;
        }
        catch (error) {
            console.log(error);
        }
    }


    //Функция выбора слова из подсказок
    const onChoiceWord = (e) => {
        //Устанавливаем выбранное слово в поле ввода
        setUserWord(e.currentTarget.innerHTML);
        //Обнуляем подсказки
        setBaseWords([]);
    }


    //Функция при изменении значения поля ввода
    const onChangeInput = (e) => {

        //Сохраняем новое значение, отсекая пробелы
        let newValue = e.target.value.trim();
        setUserWord(newValue);

        //Фильтруем на наличие совпадений
        if (newValue != '' && arr != null) {
            //Сохраняем ввод с низким регистром, чтобы не пересчитывать
            let newValue_lower = newValue.toLowerCase();

            setBaseWords(
                //Отсекаем неподходящие варианты
                //Проходим один раз, поэтому O[n]
                arr.filter(word =>
                (word.toLowerCase().indexOf(newValue_lower) != -1))

                //Сортируем по наибольшему соответствию вводу

                //Приходится проходить второй раз для сортировки, поэтому O[n^2],
                //но это не точно, т.к. при увеличении строки ввода, уменьшается и количество подходящих слов
                .sort((a,b) => {
                    if (a.toLowerCase().indexOf(newValue_lower)
                        < b.toLowerCase().indexOf(newValue_lower)) return -1;
                    else if (a.toLowerCase().indexOf(newValue_lower)
                             > b.toLowerCase().indexOf(newValue_lower)) return 1;
                    else return 0;
                })
                //Собираем в теговый массив
                .map(
                    (word, index) =>
                        <p key={index} onClick={onChoiceWord}>{word}</p>
                )
            );
        }
        //Скрываем дропдаун при пустом поле ввода
        else {
            setBaseWords([]);
        }
    }


    return (
        <div className="App">
            <div className="main">
                <p>Введите слово</p>

                <div className="inputField">
                    <input placeholder="Проверка" value={userWord} onChange={onChangeInput}/>
                    {baseWords.length != 0 &&
                        <div className="inputField_dropDown">
                            {baseWords}
                        </div>
                    }
                </div>

            </div>
        </div>
    );
}

export default App;
