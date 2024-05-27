class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
  }

  async init() {
    // Get references to the input fields and the button
    this.driverTypeInput = document.getElementById("driver-type");
    this.dateInput = document.getElementById("date");
    this.timeInput = document.getElementById("time");
    this.amountInput = document.getElementById("amount");
    this.loadButton = document.getElementById("load-btn");

    this.driverTypeInput.addEventListener("input", this.checkInputs);
    this.dateInput.addEventListener("input", this.checkInputs);
    this.timeInput.addEventListener("input", this.checkInputs);
    this.amountInput.addEventListener("input", this.checkInputs);

    this.loadButton.disabled = true;

    this.loadButton.onclick = this.run;
  }

  //Check input for enable/disable of button
  checkInputs = () => {
    const driverType = this.driverTypeInput.value;
    const date = this.dateInput.value;
    const time = this.timeInput.value;

    if (driverType && date && time) {
      this.loadButton.disabled = false;
      this.loadButton.classList.add("bg-green-500","hover:bg-green-700");
      this.loadButton.classList.remove("bg-slate-600");
    } else {
      this.loadButton.disabled = true;
    }
  };

  run = async () => {
    await this.load();
    this.clear();
    Car.list.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      node.classList.add("inline-block", "flex", "flex-col", "w-full","lg:w-[33%]", "justify-between", "p-2", "h-[25rem]");
      this.carContainerElement.appendChild(node);
    });
  };

  async load() {
    const amount = this.amount;
    const date = this.date;
    const time = this.time;
    const filter = (car) => {
      const matchCapacity = !amount || car.capacity >= amount;

      const carDateTime = new Date(car.availableAt.toISOString());
      const inputDateTime = new Date(`${date}T${time}`);

      const matchDateTime = (!date && !time) || carDateTime > inputDateTime;
      const availability = car.available == true;

      return matchCapacity && matchDateTime && availability
    }

    const cars = await Binar.listCars(filter);
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
