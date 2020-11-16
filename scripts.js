let summar = 0;
//Данные переменные являются хранилищем индексов карточек и собственно, самих карточек
const masCard = [
	{ img: "image/x.jpg", name: "FantasticFour", countFrom: 6, countTo: 4 }, { img: "image/b.jpg", name: "Deadpool", countFrom: 7, countTo: 5 }, { img: "image/c.jpg", name: "Superman", countFrom: 8, countTo: 6 }, { img: "image/v.jpg", name: "Batman", countFrom: 5, countTo: 4 }, { img: "image/z.jpg", name: "spiderman", countFrom: 7, countTo: 4 }
];
const min = Math.ceil(0);
const max = Math.floor(5);
let masIndex = [];
//хранилище товаров в корзине
let mapCount = new Map();

const deleteProduct = ob => {
	//document.getElementsByClassName['popup'].getElementsByTageName('div')
	const [t] = document.getElementsByClassName('popup');
	for (let i in t.children) {
		if (ob.parentElement == t.children[i]) {//Здесь получаю массив дивов в попапе для обнаружения, в каком диве была нажата кнопка
			//Если родительский див равен диву в массиве, то
			let index = 2;                    //индекс равен 2, т.к. не учитываем крестик выхода из попапа и заголовок
			mapCount.forEach((value, key) => {//Затем циклом пробегаем по хранилищу корзины, порядок в корзине соответствует пордку в мапе

				if (index == i) {//Если индекс равен индексу дива
					if (value.col > 1) {//и количество товаров ондого вида больше 1, то просто уменьшаем количество
						--value.col;

						document.getElementsByClassName(key)[0].innerHTML = `<b>Количество товара</b>:${value.col}`;

					} else {
						mapCount.delete(key); //Или вырезаем все
						ob.parentElement.remove();
					};
				};
				index++;
			});
		};

	};		//ob.parentElement.remove(); 
	summar--;
	document.getElementsByClassName("count_pay")[0].innerHTML = summar;
}
//Эта функция отвечает за динамическое добавление товара в корзину
const sumWrite = t => {
	document.getElementsByClassName("count_pay")[0].innerHTML = ++summar;
	if (!mapCount.has(t)) {//Если имя рандомной карточки не соответствует ключу в мапе, то
		masCard.forEach((item) => {//Добавляем товар извлекая его из общего набора
			if (t == item.name) {
				item.col = 1;//добавляем поле с количеством
				mapCount.set(t, item);
				const buttonStroke = `<button onclick='deleteProduct(this);'><img src='image/trash.png'</button>`;//Тут просто шаблонная строка

				document.getElementsByClassName('popup')[0].innerHTML += `<div class='create_div'>
	  <img src=${item.img} height='100%' width='15%'/>
	  <div class='cart_product'>
	  <p><b>Наименование товара</b>: комикс ${t}</p><p><b>Цена товара</b>: ${item.countTo}</p><p class=${item.name}><b>Количество товара</b>: ${item.col}</p>
	  </div>${buttonStroke}
	  </div>`;

			}
		});

	} else {
		mapCount.get(t).col += 1;
		document.getElementsByClassName(t)[0].innerHTML = "<b>Количество товара</b>:" + mapCount.get(t).col;
	}
}


//Эта функция отвечает за рандомную генерацию товара из списка
const rand =(id, dId)=> {
	const randZ = Math.floor(Math.random() * (max - min)) + min;
	if (masIndex.indexOf(randZ) == -1) {
		masIndex.push(randZ);
		id.src = masCard[randZ].img;
		dId.innerHTML = '<p>Цена товара раньше: ' + masCard[randZ].countFrom + '$</p><p>Цена сейчас: ' + masCard[randZ].countTo + '$</p>';
		return masCard[randZ].name;
	} else return rand(id, dId);

}

const visualCart = () => {
	document.getElementsByClassName('layer')[0].style.display = document.getElementsByClassName('loadbar')[0].style.display = 'block';
	let [load] = document.getElementsByClassName('loadbar');
	let timer = 0;
	let timerLoadBar = setInterval(() => {
		if (load.value === load.max) load.value = 10;
		else load.value++;
		timer += 50;
	}, 50);
	let promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			clearInterval(timerLoadBar);
			if (summar > 0) resolve("Товары есть"); else reject(new Error("Товаров нет"));
		}, 10000);
	});
	promise.finally(
		() => {
			load.style.display = 'none';
			load.value = 0;
		}
	)
	promise.then(
		result => document.getElementsByClassName('popup')[0].style.display = 'block',
		error => { alert(error); document.getElementsByClassName('layer')[0].style.display = 'none'; load.value = 0; }
	);



}

