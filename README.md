# API REST de Artículos (Versión Avanzada) 🚀

Una API RESTful desarrollada con Node.js y Express para la gestión de un inventario de artículos. Esta versión incluye un frontend estático integrado, configuración de seguridad (CORS), middlewares personalizados y un sistema de registro (logging) de errores.

## 🛠️ Tecnologías y Stack

* **Entorno:** Node.js
* **Framework:** Express.js 5
* **ORM:** Sequelize
* **Base de Datos:** SQLite
* **Arquitectura:** 3 Capas (Router → Service → Model)

## ✨ Características Implementadas

* **Arquitectura Escalable:** Separación estricta de responsabilidades entre el enrutamiento (HTTP), la lógica de negocio (Servicios) y el acceso a datos (Modelos).
* **Frontend Integrado:** El servidor expone una página web estática interactiva (`/public`) consumiendo su propia API.
* **Seguridad y Accesibilidad:** Configuración de CORS mediante lista blanca para permitir el consumo seguro desde clientes específicos.
* **Middlewares Personalizados:** Interceptores de ruta para validación estricta de parámetros (ej. `validar-id`).
* **Manejo Centralizado de Errores:** Captura global de excepciones (500) con persistencia automática en un archivo `error.log` sin exponer datos sensibles al cliente. Prevención de caídas del proceso por promesas no resueltas.

## ⚙️ Instalación y Uso

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/tu-usuario/api_articulos_pro.git](https://github.com/tu-usuario/api_articulos_pro.git)
   cd api_articulos_pro
