let summar = 0;
    //Данные переменные являются хранилищем индексов карточек и собственно, самих карточек
    let mas_num = [];
    let mas_card = [
      { img: "image/x.jpg", name: "Fantastic Four", count_from: 6, count_to: 4 }, { img: "image/b.jpg", name: "Deadpool", count_from: 7, "count_to": 5 }, { img: "image/c.jpg", name: "Superman", count_from: 8, count_to: 6 }, { img: "image/v.jpg", name: "Batman", count_from: 5, count_to: 4 }, { img: "image/z.jpg", name: "spiderman", count_from: 7, count_to: 4 }
    ];
    let min = Math.ceil(0);
    let max = Math.floor(5);
    let r_z;
    let mas_index = [];
    //Эта функция отвечает за динамическое добавление товара в корзину
    function sum_write(t) {
      document.getElementsByClassName("count_pay")[0].innerHTML = ++summar;
      let div = document.createElement('div');
      div.className = 'create_div';
      let button = document.createElement('button');
      button.onclick = function () { this.parentElement.remove(); summar--; document.getElementsByClassName("count_pay")[0].innerHTML = summar; };
      button.innerHTML = 'Удалить';
      div.innerHTML = "<img src=" + mas_card[mas_num[t]].img + " height='100%' width='15%'/><div class='cart_product'><p><b>Наименование товара</b>:комикс " + mas_card[mas_num[t]].name + "</p><p><b>Цена товара</b>:" + mas_card[mas_num[t]].count_to + "</p></div>";
      div.appendChild(button);
      document.getElementsByClassName('popup')[0].appendChild(div);
    }

    //function For_Date(){
    //let d = new Date();
    //let sd = document.getElementById("ss");
    //let ds = "Регистрация. Сегодня:"+d.getDate()+' '+mas_Month[d.getMonth()]+' '+d.getFullYear()+' '+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
    //sd.textContent = ds;
    //};


    //Эта функция отвечает за рандомную генерацию товара из списка
    function rand(id, d_id) {
      r_z = Math.floor(Math.random() * (max - min)) + min;
      if (mas_index.indexOf(r_z) != -1) rand(id, d_id); else {
        mas_index.push(r_z);
        id.src = mas_card[r_z].img;
        d_id.innerHTML = '<p>Цена товара раньше: ' + mas_card[r_z].count_from + '$</p><p>Цена сейчас: ' + mas_card[r_z].count_to + '$</p>';
        mas_num.push(r_z);
      }
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
        () => load.style.display = 'none'
      )
      promise.then(
        result => document.getElementsByClassName('popup')[0].style.display = 'block',
        error => { alert(error); document.getElementsByClassName('layer')[0].style.display = 'none'; load.value = 0; }
      );



    }

