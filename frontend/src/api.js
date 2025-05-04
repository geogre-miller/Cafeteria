const API_URL = "http://localhost:5000/places";

// ✅ Fetch danh sách địa điểm
export default async function getPlaces() {
  try {
    const res = await fetch(API_URL);
    console.log("Status:", res.status);

    if (!res.ok) {
      throw new Error(`Error fetching places: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    // Return the places array from the response
    return data.places || []; // Since our backend returns { success: true, places: [...] }
  } catch (error) {
    console.error("Fetch error:", error);
    return []; // Return empty array on error
  }
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
