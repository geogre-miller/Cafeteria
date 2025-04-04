const API_URL = "http://localhost:5000/places";

// ✅ Fetch danh sách địa điểm
export default async function getPlaces() {
  const res = await fetch(API_URL);
  return await res.json();
}

// ✅ Thêm địa điểm mới
export async function addPlace(place) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(place),
  });
  return await res.json();
}
