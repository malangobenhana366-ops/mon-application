import { Client, Account } from "appwrite";

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1") // ton endpoint
    .setProject("68eedca800169d5e0fa4"); // ton Project ID

const account = new Account(client);

async function login() {
    const phone = document.getElementById("phone").value;
    try {
        const session = await account.createPhoneSession(phone);
        alert("Code envoyé sur ton téléphone !");
    } catch (error) {
        console.error(error);
        alert("Erreur de connexion : " + error.message);
    }
}

document.getElementById("loginBtn").addEventListener("click", login);