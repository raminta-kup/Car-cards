// Sukurkite HTML formą, kurioje vartotojas galės įrašyti (į input laukelius): car brand, model, mileage, price ir image (url laukelis). Per konstruktorių, sukuriams objektas ir jis atvaizduojamas po forma (CSS rašykite CSS'e) Paspaudus ant automobilio nuotraukos- turi alert išmesti kainą.


const btn = document.getElementById("car-btn");

class Car {
    constructor(brand, model, mileage, price, url) {
        this.brand = brand;
        this.model = model;
        this.mileage = mileage;
        this.price = price;
        this.url = url;
    }
    showCar() {
        const carOutput = document.getElementById("car-output");
        const uList = document.createElement("ul");
        const img = document.createElement("img");
        const liBrand = document.createElement("li");
        const liPrice = document.createElement("li");
        const liModel = document.createElement("li");
        const liMileage = document.createElement("li");
        const listDiv = document.createElement("div");
        const carCardContainer = document.createElement("div");
        const removeBtnContainer = document.createElement("div");
        const removeBtn = document.createElement("button");

        carCardContainer.classList.add("card-container");
        listDiv.classList.add("list-container");
        liBrand.classList.add("brand-li");
        liModel.classList.add("model-li");
        liMileage.classList.add("mileage-li");
        liPrice.classList.add("price-li");
        removeBtnContainer.classList.add("remove-container");

        const mileageWithComa = this.mileage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const priceWithComa = this.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        carOutput.append(carCardContainer);
        carCardContainer.append(img);
        carCardContainer.append(listDiv);
        listDiv.appendChild(removeBtnContainer)
        removeBtnContainer.appendChild(removeBtn)
        listDiv.append(uList);
        uList.append(liBrand, liPrice, liModel, liMileage);

        removeBtn.textContent = "Remove";
        liBrand.textContent = `${this.brand}`;
        liPrice.textContent = `${priceWithComa}€`;
        liModel.textContent = `${this.model}`;
        liMileage.textContent = `${mileageWithComa} miles`;
        img.src = this.url;

        removeBtn.addEventListener("click", e => {
            e.preventDefault();
            carCardContainer.remove();
        });
        img.addEventListener("click", () => {
            alert(`This car costs ${priceWithComa}€`)
        });
    }

}


function submitForm(e) {
    e.preventDefault();

    const carForm = document.getElementById("car-form");
    const brand = document.getElementById("brand").value;
    const model = document.getElementById("model").value;
    const mileage = document.getElementById("mileage").value;
    const price = document.getElementById("price").value;
    const url = document.getElementById("img-url").value;
    const errorSpan = document.createElement("span");
    errorSpan.classList.add("error-span")
    

    if (mileage < 0 && price < 0) {
        errorSpan.textContent = "* Invalid mileage and price";
        carForm.append(errorSpan);
        // alert("Invalid mileage")
    } else if (mileage < 0) {
        errorSpan.textContent = "* Invalid mileage";
        carForm.append(errorSpan);
        // alert("invalid price")
    } else if(price < 0) {
        carForm.append(errorSpan);
        errorSpan.textContent = "* Invalid price";

    }else if (brand && model && mileage && price && url) {
        const car = new Car(brand, model, mileage, price, url);
        car.showCar();
        carForm.reset();
    } else {
        carForm.append(errorSpan);
        errorSpan.textContent = "* Not enough data";
    }

}



btn.addEventListener("click", submitForm);

