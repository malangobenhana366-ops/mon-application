import { Client, Account } from "appwrite";

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("68eedca800169d5e0fa4");

const account = new Account(client);

// Étape 1 : envoi du code SMS
async function login() {
    const phone = document.getElementById("phone").value;
    try {
        await account.createPhoneSession(phone);
        alert("Code envoyé sur ton téléphone !");
        document.getElementById("codeSection").style.display = "block";
    } catch (error) {
        console.error(error);
        alert("Erreur de connexion : " + error.message);
    }
}

// Étape 2 : vérification du code reçu
async function verifyCode() {
    const phone = document.getElementById("phone").value;
    const code = document.getElementById("code").value;
    try {
        await account.updatePhoneSession(phone, code);
        alert("Connexion réussie !");
        window.location.href = "home.html"; // redirection après connexion
    } catch (error) {
        console.error(error);
        alert("Code invalide : " + error.message);
    }
}

document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("verifyBtn").addEventListener("click", verifyCode);