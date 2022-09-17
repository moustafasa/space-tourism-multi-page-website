class apiConnect {
  constructor(choosed) {
    this.choosed = choosed;
  }
  async #connect() {
    this.response = await fetch("./data.json");
    this.data = await this.response.json();
  }
  async destination() {
    await this.#connect();
    this.final = this.data["destinations"].find(
      (ele) => ele.name.toLowerCase() === this.choosed.toLowerCase()
    );
    return this.final;
  }
  async crew() {
    await this.#connect();
    this.final = this.data["crew"];
    return this.final;
  }
}
class template {
  static id = 0;
  constructor() {}
  destination(data) {
    // get element from document
    this.imageEle = document.querySelector(".destination .left .img img");
    this.nameEle = document.querySelector(".destination .content .name");
    this.descEle = document.querySelector(".destination .content .description");
    this.distance = document.querySelector(
      ".destination .content .measures .distance .num"
    );
    this.travel = document.querySelector(
      ".destination .content .measures .travel-time .num"
    );
    // fill element with data
    this.imageEle.src = data.images.png;
    this.nameEle.innerText = data.name;
    this.descEle.innerText = data.description;
    this.distance.innerText = data.distance;
    this.travel.innerText = data.travel;
  }
  crew(data) {
    // get parent of boxes
    this.content = document.querySelector(".crew .info-cont");
    this.imgCont = document.querySelector(".crew .img");
    // create elements
    this.box = document.createElement("div");
    this.box.classList.add("box");
    this.box.id = template.id;
    this.role = document.createElement("span");
    this.role.classList.add("role", ".f-600");
    this.name = document.createElement("h2");
    this.name.classList.add("name", "f-700");
    this.bio = document.createElement("p");
    this.bio.classList.add("bio", "f-400");
    this.img = document.createElement("img");
    this.img.id = template.id++;
    // append elements
    this.box.append(this.role, this.name, this.bio);
    this.content.append(this.box);
    this.imgCont.append(this.img);

    // fill elements
    this.role.innerText = data.role;
    this.name.innerText = data.name;
    this.bio.innerText = data.bio;
    this.box.dataset.name = data.name;
    this.img.dataset.name = data.name;
    this.img.src = data.images.png;
  }
}

export class add {
  constructor(choosed) {
    this.choosed = choosed;
    this.api = new apiConnect(choosed);
    this.template = new template();
  }
  async destination() {
    this.data = await this.api.destination();
    this.template.destination(this.data);
  }
  async crew() {
    this.data = await this.api.crew();
    this.data.forEach((cr) => {
      this.template.crew(cr);
    });
  }
}
