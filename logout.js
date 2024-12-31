import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";









document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM completamente cargado.");

    const logoutButton = document.getElementById('Boton-logout');

    if (logoutButton) {
        console.log("Botón de logout encontrado.");

        logoutButton.addEventListener('click', function () {
            console.log("Botón de logout presionado.");

            const auth = getAuth();
            signOut(auth)
                .then(() => {
                    console.log("Sesión cerrada exitosamente.");
                    alert("Has cerrado sesión correctamente.");
                    window.location.href = 'index.html'; // Redirige a index.html
                })
                .catch((error) => {
                    console.error("Error al cerrar sesión:", error.message);
                    alert(`Error al cerrar sesión: ${error.message}`);
                });
        });
    } else {
        console.error("El botón de logout no se encontró en el DOM.");
    }
});