// Script principal
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value.trim();
  const results = document.getElementById("propertiesList");

  if (query === "") {
    results.innerHTML = "<p>Veuillez entrer un lieu avant de rechercher.</p>";
    return;
  }

  // Simulation de résultats
  const fakeResults = [
    { name: "Maison moderne à " + query, price: "120 000 $" },
    { name: "Parcelle à vendre à " + query, price: "45 000 $" },
  ];

  // Affichage
  results.innerHTML = "";
  fakeResults.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("property-card");
    div.innerHTML = `
      <h3>${item.name}</h3>
      <p>Prix : ${item.price}</p>
    `;
    results.appendChild(div);
  });
});