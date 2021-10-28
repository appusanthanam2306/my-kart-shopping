import axios from "axios";

export function getItem() {
  return axios.get("/data/items.json");
}
