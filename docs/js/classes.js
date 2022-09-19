class apiConnect {
  constructor() {
    this.choosed;
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
  async technology() {
    await this.#connect();
    this.final = this.data["technology"];
    return this.final;
  }
}
class template {
  static crewId = 0;
  static techId = 0;
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
    this.box.id = template.crewId;
    this.role = document.createElement("span");
    this.role.classList.add("role", ".f-600");
    this.name = document.createElement("h2");
    this.name.classList.add("name", "f-700");
    this.bio = document.createElement("p");
    this.bio.classList.add("bio", "f-400");
    this.img = document.createElement("img");
    this.img.classList.add("box");
    this.img.id = template.crewId++;
    // append elements
    this.box.append(this.role, this.name, this.bio);
    this.content.append(this.box);
    this.imgCont.append(this.img);

    // fill elements
    this.role.innerText = data.role;
    this.name.innerText = data.name;
    this.bio.innerText = data.bio;

    this.img.src = data.images.png;
  }
  technology(tech) {
    // get parent of boxes
    this.content = document.querySelector(".technology .tech");
    this.imgCont = document.querySelector(".technology .right");
    // create elements
    this.contBox = document.createElement("div");
    this.contBox.classList.add("box");
    this.contBox.id = template.techId;
    this.span = document.createElement("span");
    this.span.classList.add(".f-300", ".open-sent");
    this.name = document.createElement("h2");
    this.name.classList.add("f-700", "name");
    this.desc = document.createElement("p");
    this.desc.classList.add("f-400", "description");
    this.imgBox = document.createElement("div");
    this.imgBox.classList.add("box");
    this.imgBox.id = template.techId++;
    this.large = document.createElement("img");
    this.large.classList.add("large");
    this.mobile = document.createElement("img");
    this.mobile.classList.add("mobile");

    // append elements
    this.imgBox.append(this.large, this.mobile);
    this.contBox.append(this.span, this.name, this.desc);
    this.content.append(this.contBox);
    this.imgCont.append(this.imgBox);

    // fill element

    this.name.innerText = tech.name;
    this.large.src = tech.images.portrait;
    this.mobile.src = tech.images.landscape;
    this.desc.innerText = tech.description;
  }
}

export class add {
  constructor() {
    this.choosed;
    this.api = new apiConnect();
    this.template = new template();
  }
  async destination() {
    this.api.choosed = this.choosed;
    this.data = await this.api.destination();
    this.template.destination(this.data);
  }
  async crew() {
    template.crewId = 0;
    this.data = await this.api.crew();
    this.data.forEach((cr) => {
      this.template.crew(cr);
    });
  }
  async technology() {
    template.techId = 0;
    this.data = await this.api.technology();
    this.data.forEach((tech) => {
      this.template.technology(tech);
    });
  }
}
