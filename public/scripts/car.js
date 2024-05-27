class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
    console.log(this.capacity);
    return `
      <img src="${this.image}" alt="${this.manufacture}" class="w-full h-auto lg:h-[11rem] object-cover overflow-hidden pb-4">
      <p class="text-lg font-semibold">${this.type} ${this.model}</p>
      <p class="text-xl font-semibold"><b>Rp ${this.rentPerDay} / hari</b></p>
      <p>${this.description}</p>
      <p>Capacity: <b>${this.capacity}</b></p>
      <p>Transmission: <b>${this.transmission}</b></p>
      <p>Year: <b>${this.year}</b></p>
    `;
  }
}
