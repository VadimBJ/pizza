import Pizza from "./types/pizza";

export async function getAllPizzas(): Promise<Pizza[]> {
  const url = "https://pizza-and-desserts.p.rapidapi.com/pizzas";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0898302f93mshca3c33651d010f7p1fae3djsnca5f350249ff",
      "X-RapidAPI-Host": "pizza-and-desserts.p.rapidapi.com",
    },
  };
    const response = await fetch(url, options);
    return response.json();
}
