// Importar las funciones necesarias desde Firebase

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";


// Inicializar servicios de autenticación
const firebaseConfig = {
    apiKey: "AIzaSyC0G_o7evcg32dV7vYlKf8fDCD7obKpB8k",
    authDomain: "login-e861f.firebaseapp.com",
    projectId: "login-e861f",
    storageBucket: "login-e861f.firebasestorage.app",
    messagingSenderId: "813775204071",
    appId: "1:813775204071:web:761915df76a75250dcfc42",
    measurementId: "G-RQXLT64WKZ"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();


function loginWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;

            console.log("Usuario autenticado con Google:", user);
            alert(`¡Bienvenido, ${user.displayName || "usuario"}!`);
            sessionStorage.setItem('username', user.displayName || user.email);
            window.location.href = 'logged.html';
        })
        .catch((error) => {
            console.error("Error en el inicio de sesión con Google:", error.message);
            alert(`Error: ${error.message}`);
        });
}


// Agregar evento de clic al botón de Google Login
const googleLoginButton = document.getElementById('Boton-googleLogin');
if (googleLoginButton) {
    googleLoginButton.addEventListener('click', loginWithGoogle);
}


function loginWithEmail() {
    const email = document.getElementById('username').value; // Asegúrate de que el ID sea correcto
    const password = document.getElementById('password').value; // Asegúrate de que el ID sea correcto
    

    // Verifica que los campos no estén vacíos
    if (!email || !password) {
        alert("Por favor, ingresa tu correo electrónico y contraseña.");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Inicio de sesión exitoso
        const user = userCredential.user;
        sessionStorage.setItem('username', email);
        console.log(`Inicio de sesión exitoso para: ${user.email}`);
        alert(`¡Bienvenido, ${user.email}!`);
        window.location.href = "logged.html"; // Redirige a la página principal
    })
    .catch((error) => {
        if (error.code === "auth/network-request-failed") {
            alert("Error de red. Por favor, verifica tu conexión a Internet.");
        } else if (error.code === "auth/user-not-found") {
            alert("El usuario no está registrado.");
        } else if (error.code === "auth/wrong-password") {
            alert("Contraseña incorrecta.");
        } else {
            alert(`Error: ${error.message}`);
        }
        console.error("Error al iniciar sesión:", error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const usernameElement = document.querySelector('h4'); // Selecciona el elemento donde se mostrará el nombre

    // Recuperar el correo electrónico del sessionStorage
    const email = sessionStorage.getItem('username');
    const userName = sessionStorage.getItem('username');
    if (email, userName) {
        // Extraer el nombre de usuario eliminando el dominio
        const username = email.split('@')[0];
        
        // Mostrar el nombre de usuario en el elemento <h2>
        usernameElement.textContent = `Hola, ${username}`;
    } else {
        // Si no hay correo almacenado, redirigir al inicio de sesión
        alert('No se encontró una sesión activa.');
        
    }
});



// Agregar el evento al botón de inicio de sesión
document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('Boton-login'); // Asegúrate de que el ID sea correcto
    if (loginButton) {
        console.log("Botón de inicio de sesión encontrado.");
        loginButton.addEventListener('click', loginWithEmail);
    } else {
        console.error("El botón de inicio de sesión no se encontró en el DOM.");
    }
});

document.addEventListener('DOMContentLoaded', function() {
    
    const registerButton = document.getElementById('Boton-register');

    
    registerButton.addEventListener('click', function() {
        // Redirige a register.html
        window.location.href = 'register.html';
    });
});


document.addEventListener('DOMContentLoaded', function() {
    
    const homeButton = document.getElementById('Boton-gotoLogin');

    
    homeButton.addEventListener('click', function() {
        
        window.location.href = 'index.html';
    });
});

const registerForm = document.getElementById('registerForm');
const saveButton = document.getElementById('Boton-saveRegister');

saveButton.addEventListener('click', (e) => {
    
    e.preventDefault();

    const email = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;

    // Llamar a la función para crear el usuario
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            alert(`¡Usuario registrado con éxito! Bienvenido, ${user.email}`);
            console.log("Usuario:", user);
        })
        .catch((error) => {
            console.error("Error al registrar el usuario:", error);
            alert(`Error: ${error.message}`);
        });
});

