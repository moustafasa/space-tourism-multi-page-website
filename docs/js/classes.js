class apiConnect {
  constructor(page) {
    this.page = page;
  }
  async destination() {
    let data = await fetch("./data.json");

    console.log(await data.json());
  }
}
class template {
  constructor(data) {
    this.data = data;
  }
  destination() {}
}

let api = new apiConnect("home");
api.destination();
