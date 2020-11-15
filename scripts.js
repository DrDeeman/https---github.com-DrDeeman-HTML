let summar = 0;
//Данные переменные являются хранилищем индексов карточек и собственно, самих карточек
const mas_card = [
	{ img: "image/x.jpg", name: "FantasticFour", count_from: 6, count_to: 4 }, { img: "image/b.jpg", name: "Deadpool", count_from: 7, "count_to": 5 }, { img: "image/c.jpg", name: "Superman", count_from: 8, count_to: 6 }, { img: "image/v.jpg", name: "Batman", count_from: 5, count_to: 4 }, { img: "image/z.jpg", name: "spiderman", count_from: 7, count_to: 4 }
];
const min = Math.ceil(0);
const max = Math.floor(5);
let mas_index = [];
//хранилище товаров в корзине
let map_garbage = new Map();

function delete_product(ob) {
	//document.getElementsByClassName['popup'].getElementsByTageName('div')
	const t = document.getElementsByClassName('popup')[0];
	for (let i in t.children) {
		if (ob.parentElement == t.children[i]) {//Здесь получаю массив дивов в попапе для обнаружения, в каком диве была нажата кнопка
			//Если родительский див равен диву в массиве, то
			let index = 2;                    //индекс равен 2, т.к. не учитываем крестик выхода из попапа и заголовок
			map_garbage.forEach((value, key, map) => {//Затем циклом пробегаем по хранилищу корзины, порядок в корзине соответствует пордку в мапе

				if (index == i) {//Если индекс равен индексу дива
					if (value.col > 1) {//и количество товаров ондого вида больше 1, то просто уменьшаем количество
						--value.col;

						document.getElementsByClassName(key)[0].innerHTML = "<b>Количество товара</b>:" + value.col;

					} else {
						map_garbage.delete(key); //Или вырезаем все
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
function sum_write(t) {
	document.getElementsByClassName("count_pay")[0].innerHTML = ++summar;
	if (!map_garbage.has(t)) {//Если имя рандомной карточки не соответствует ключу в мапе, то
		mas_card.forEach((item, i, arr) => {//Добавляем товар извлекая его из общего набора
			if (t == item.name) {
				item.col = 1;//добавляем поле с количеством
				map_garbage.set(t, item);
				const button_stroke = `<button onclick='delete_product(this);'><img src='image/trash.png'</button>`;//Тут просто шаблонная строка

				document.getElementsByClassName('popup')[0].innerHTML += `<div class='create_div'>
	  <img src=${item.img} height='100%' width='15%'/>
	  <div class='cart_product'>
	  <p><b>Наименование товара</b>: комикс ${t}</p><p><b>Цена товара</b>: ${item.count_to}</p><p class=${item.name}><b>Количество товара</b>: ${item.col}</p>
	  </div>${button_stroke}
	  </div>`;

			}
		});

	} else {
		map_garbage.get(t).col += 1;
		document.getElementsByClassName(t)[0].innerHTML = "<b>Количество товара</b>:" + map_garbage.get(t).col;
	}
}


//Эта функция отвечает за рандомную генерацию товара из списка
function rand(id, d_id) {
	const r_z = Math.floor(Math.random() * (max - min)) + min;
	if (mas_index.indexOf(r_z) == -1) {
		mas_index.push(r_z);
		id.src = mas_card[r_z].img;
		d_id.innerHTML = '<p>Цена товара раньше: ' + mas_card[r_z].count_from + '$</p><p>Цена сейчас: ' + mas_card[r_z].count_to + '$</p>';
		return mas_card[r_z].name;
	} else return rand(id, d_id);

}

function visual_garbage() {
	document.getElementsByClassName('layer')[0].style.display = document.getElementsByClassName('loadbar')[0].style.display = 'block';
	let load = document.getElementsByClassName('loadbar')[0];
	let timer = 0;
	let timer_loadbar = setInterval(() => {
		if (load.value === load.max) load.value = 10;
		else load.value++;
		timer += 50;
	}, 50);
	let promise = new Promise(function (resolve, reject) {
		setTimeout(() => {
			clearInterval(timer_loadbar);
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

