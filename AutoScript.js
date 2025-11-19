
    // Получение всех пользователей
        async function getCars() {
            // отправляет запрос и получаем ответ
            const response = await fetch("/api/cars", {
                method: "GET",
                headers: { "Accept": "application/json" }
            });
            // если запрос прошел нормально
            if (response.ok === true) {
                // получаем данные
                const cars = await response.json();
                const rows = document.querySelector("tbody");
                rows.innerHTML = ""; // Очищаем таблицу перед добавлением
                // добавляем полученные элементы в таблицу
                cars.forEach(car => rows.append(row(car)));
            }
        }
        // Получение одного автомобиля
        async function getCar(id) {
            const response = await fetch(`/api/cars/${id}`, {
                method: "GET",
                headers: { "Accept": "application/json" }
            });
            if (response.ok === true) {
                const car = await response.json();
                document.getElementById("car_idCar").value = car.id;
                document.getElementById("brandCar").value = car.brand;
                document.getElementById("modelCar").value = car.model;
                document.getElementById("yearCar").value = car.year;
                document.getElementById("colorCar").value = car.color;
                document.getElementById("priceCar").value = car.price;
                document.getElementById("milageCar").value = car.milage;
                document.getElementById("vinCar").value = car.vin;
                document.getElementById("availableCar").value = car.available;
            }
            else {
                // если произошла ошибка, получаем сообщение об ошибке
                const error = await response.json();
                console.log(error.message);// и выводим его на консоль
                alert("Ошибка" + error.message) 
            }
        }
        // Добавление пользователя
        async function createCar(brandCar, modelCar,
             yearCar, colorCar, priceCar, milageCar,
              vinCar, availableCar) {
  
            const response = await fetch("/api/cars", {
                method: "POST",
                headers: { "Accept": "application/json",
                     "Content-Type": "application/json" },
                body: JSON.stringify({
                    brand: brandCar,
                    model: modelCar,
                    year: yearCar,
                    color: colorCar,
                    price : priceCar,
                    milage : parseInt(milageCar, 0.0),
                    vin : vinCar,
                    available : availableCar === "true" || availableCar === true

                })
            });
            if (response.ok === true) {
                const car = await response.json();
                document.querySelector("tbody").append(row(car));
            }
            else {
                const error = await response.json();
                console.log(error.message);
                alert("Ошибка" + error.message)
            }
        }
        // Изменение автомобиля
        async function editCar(car_idCar, brandCar, modelCar, yearCar, colorCar, priceCar, milageCar, vinCar, availableCar) {
            const response = await fetch(`/api/cars/${car_idCar}`, {
                method: "PUT",
                headers: { "Accept": "application/json", "Content-Type": "application/json" },
                body: JSON.stringify({
                    id : car_idCar,
                    brand: brandCar,
                    model: modelCar,
                    year: yearCar,
                    color: colorCar,
                    price : priceCar,
                    milage : parseInt(milageCar, 0.0),
                    vin : vinCar,
                    available : availableCar,
                })
            });
            if (response.ok === true) {
                const user = await response.json();
                document.querySelector(`tr[data-rowid='${car.id}']`).replaceWith(row(car));
            }
            else {
                const error = await response.json();
                console.log(error.message);
            }
        }
        // Удаление пользователя
        async function deleteCar(id) {
            const response = await fetch(`/api/cars/${id}`, {
                method: "DELETE",
                headers: { "Accept": "application/json" }
            });
            if (response.ok === true) {
                const user = await response.json();
                document.querySelector(`tr[data-rowid='${car.id}']`).remove();
            }
            else {
                const error = await response.json();
                console.log(error.message);
            }
        }
  
        // сброс данных формы после отправки
        function reset() {
            document.getElementById("car_idCar").value = 
            document.getElementById("brandCar").value = 
            document.getElementById("modelCar").value = 
            document.getElementById("yearCar").value = 
            document.getElementById("colorCar").value = 
            document.getElementById("priceCar").value = 
            document.getElementById("milageCar").value =
            document.getElementById("vinCar").value =
            document.getElementById("availableCar").value = "";
        } 
        // создание строки для таблицы
        function row(car) {
  
            const tr = document.createElement("tr");
            tr.setAttribute("data-rowid", car.id);
  
            const brandTd = document.createElement("td");
            brandTd.append(car.brand);
            tr.append(brandTd);
  
            const modelTd = document.createElement("td");
            modelTd.append(car.model);
            tr.append(modelTd);

            const yearTd = document.createElement("td");
            yearTd.append(car.year);
            tr.append(yearTd);

            const colorTd = document.createElement("td");
            colorTd.append(car.color);
            tr.append(colorTd);

            const priceTd = document.createElement("td");
            priceTd.append(car.price);
            tr.append(priceTd);

            const milageTd = document.createElement("td");
            milageTd.append(car.milage);
            tr.append(milageTd);

            const vinTd = document.createElement("td");
            vinTd.append(car.vin);
            tr.append(vinTd);

            const availableTd = document.createElement("td");
            availableTd.append(car.available);
            tr.append(availableTd);
  
            const linksTd = document.createElement("td");
  
            const editLink = document.createElement("button"); 
            editLink.append("Изменить");
            editLink.addEventListener("click", async() => await getCar(car.id));
            linksTd.append(editLink);
  
            const removeLink = document.createElement("button"); 
            removeLink.append("Удалить");
            removeLink.addEventListener("click", async () => await deleteUser(car.id));
  
            linksTd.append(removeLink);
            tr.appendChild(linksTd);
  
            return tr;
        }
        // сброс значений формы
        document.getElementById("resetBtn").addEventListener("click", () =>  reset());
  
        // отправка формы
        document.getElementById("saveBtn").addEventListener("click", async () => {
             car_idCar, brandCar, modelCar, yearCar, colorCar, priceCar, milageCar, vinCar, availableCar
            const id = document.getElementById("car_idCar").value;
            const brand = document.getElementById("brandCar").value;
            const model = document.getElementById("modelCar").value;
            const year = document.getElementById("yearCar").value;
            const color = document.getElementById("colorCar").value;
            const price = document.getElementById("priceCar").value;
            const milage = document.getElementById("milageCar").value;
            const vin = document.getElementById("vinCar").value;
            const available = document.getElementById("availableCar").value;

            if (id === "")
                await createCar(brand, model, year, color, price, milage, vin, available);
            else
                await editCar(id, brand, model, year, color, price, milage, vin, available);
            reset();
        });
  
        // загрузка пользователей
        getCars();
   