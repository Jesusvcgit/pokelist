# Pokelist

Este proyecto es una aplicación web desarrollada en React que permite explorar diferentes datos de la PokéAPI, incluyendo información sobre Pokémon, objetos, movimientos, habilidades, especies, tipos y más.

## Tecnologías utilizadas

- **React**: Biblioteca principal para la construcción de la interfaz de usuario.
- **React Query (@tanstack/react-query)**: Manejo de estados asincrónicos y almacenamiento en caché de datos obtenidos de la API.
- **CSS**: Para el diseño y estilos de la aplicación.

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Jesusvcgit/pokelist.git
   cd pokelist
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación:
   ```bash
   npm run dev
   ```

## Características

- Selección de diferentes tipos de datos de la PokéAPI.
- Traducción de nombres según el idioma seleccionado (Español, Inglés, Francés, Alemán).
- Modal para mostrar detalles de cada elemento.
- Carga progresiva de datos con paginación.
- Indicadores de carga con un spinner.

## Estructura del Proyecto

```
/src
│── assets/
│   ├── api/                 # Módulo para las llamadas a la API
│   ├── componentes/         # Componentes reutilizables (Modal, Spinner)
│── App.jsx                  # Componente principal de la aplicación
│── index.jsx                # Punto de entrada de la aplicación
│── App.css                  # Estilos generales
```

## Uso

1. Selecciona una categoría de datos en el desplegable.
2. Cambia el idioma si deseas ver nombres traducidos.
3. Haz clic en un elemento para ver detalles en un modal.
4. Usa el botón "Siguiente página" para cargar más resultados.

## API utilizada

Este proyecto usa la [PokéAPI](https://pokeapi.co/) para obtener datos sobre el universo de Pokémon.
