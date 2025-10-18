import { Client, Account, Databases } from "appwrite";

// 🔹 Configuration du client Appwrite
const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("68eedca800169d5e0fa4");

const account = new Account(client);
const databases = new Databases(client);

// -----------------------------
// 🔐 Sélection des éléments HTML
// -----------------------------
const loginBtn = document.getElementById("loginBtn");
const verifyBtn = document.getElementById("verifyBtn");
const logoutBtn = document.getElementById("logoutBtn");
const phoneInput = document.getElementById("phone");
const otpInput = document.getElementById("otp");
const verifySection = document.getElementById("verifySection");
const dashboard = document.getElementById("dashboard");
const propertiesDiv = document.getElementById("properties");

// -----------------------------
// 🔹 Étape 1 : Demande du code OTP
// -----------------------------
loginBtn.addEventListener("click", async () => {
  const phone = phoneInput.value.trim();
  if (!phone) {
    alert("Veuillez entrer votre numéro de téléphone.");
    return;
  }

  try {
    // Envoi du code OTP
    await account.createPhoneToken("unique()", phone);
    alert("✅ Code envoyé par SMS !");
    document.querySelector(".auth-section").style.display = "none";
    verifySection.style.display = "block";
  } catch (error) {
    console.error(error);
    alert("❌ Erreur lors de l'envoi du code OTP : " + error.message);
  }
});

// -----------------------------
// 🔹 Étape 2 : Vérification du code OTP
// -----------------------------
verifyBtn.addEventListener("click", async () => {
  const phone = phoneInput.value.trim();
  const otp = otpInput.value.trim();

  if (!otp) {
    alert("Veuillez entrer le code reçu par SMS.");
    return;
  }

  try {
    // Vérification du code OTP
    await account.updatePhoneSession(phone, otp);
    alert("✅ Connexion réussie !");
    verifySection.style.display = "none";
    dashboard.style.display = "block";

    // Charger les propriétés (exemple)
    loadProperties();
  } catch (error) {
    console.error(error);
    alert("❌ Code invalide ou expiré : " + error.message);
  }
});

// -----------------------------
// 🔹 Déconnexion
// -----------------------------
logoutBtn.addEventListener("click", async () => {
  try {
    await account.deleteSession("current");
    alert("Vous êtes déconnecté.");
    dashboard.style.display = "none";
    document.querySelector(".auth-section").style.display = "block";
  } catch (error) {
    console.error(error);
    alert("Erreur lors de la déconnexion.");
  }
});

// -----------------------------
// 🔹 Exemple de chargement des données
// -----------------------------
async function loadProperties() {
  try {
    const response = await databases.listDocuments(
      "votre_database_id",   // 🔹 Remplace par ton ID de base de données
      "votre_collection_id"  // 🔹 Remplace par ton ID de collection
    );

    if (response.total === 0) {
      propertiesDiv.innerHTML = "<p>Aucune propriété disponible.</p>";
    } else {
      propertiesDiv.innerHTML = response.documents
        .map(
          (doc) => `
          <div class="property">
            <h3>${doc.nom || "Sans nom"}</h3>
            <p>${doc.description || "Pas de description"}</p>
          </div>
        `
        )
        .join("");
    }
  } catch (error) {
    console.error(error);
    propertiesDiv.innerHTML = "<p>Erreur lors du chargement des propriétés.</p>";
  }
}