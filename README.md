# Taller de Visualización de Datos Geoespaciales

Este repositorio contiene el material para el taller de visualización de datos geoespaciales dirigido a egresados de la escuela de diseño.

## 📁 Estructura del Proyecto

- **`demo/`** - Aplicación interactiva de demostración construida con React + Vite
- **`slides/`** - Presentación en HTML usando Big.js
- **`deploy.sh`** - Script de despliegue manual
- **`.github/workflows/`** - Configuración de despliegue automático

## 🚀 Despliegue a GitHub Pages

### Opción 1: Despliegue Manual

```bash
# Instalar dependencias
yarn install:demo

# Desplegar todo (demo + slides)
yarn deploy

# O desplegar solo el demo
yarn deploy:demo

# O desplegar solo las slides
yarn deploy:slides
```

### Opción 2: Despliegue Automático

El repositorio está configurado con GitHub Actions para despliegue automático:

1. Haz push a la rama `main`
2. GitHub Actions construirá y desplegará automáticamente
3. El contenido estará disponible en `https://[usuario].github.io/obradoiro-pablo-picasso-20251017/`

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias del demo
yarn install:demo

# Ejecutar demo en modo desarrollo
yarn dev

# Construir demo para producción
yarn build

# Previsualizar build de producción
yarn preview
```

## 📊 Contenido del Taller

### Demo Interactivo
- Aplicación React con MapLibre GL
- Visualizaciones geoespaciales interactivas
- Ejemplos prácticos de uso

### Presentación
- 15 diapositivas en español
- Principios de diseño para visualización geoespacial
- Herramientas y tecnologías
- Casos de estudio y mejores prácticas

## 🌐 URLs de Despliegue

Una vez desplegado, el contenido estará disponible en:

- **Página principal**: `https://[usuario].github.io/obradoiro-pablo-picasso-20251017/`
- **Demo interactivo**: `https://[usuario].github.io/obradoiro-pablo-picasso-20251017/`
- **Presentación**: `https://[usuario].github.io/obradoiro-pablo-picasso-20251017/slides/`

## 🔧 Configuración Técnica

- **Demo**: React 19 + Vite + MapLibre GL + TypeScript
- **Slides**: HTML + Big.js + CSS personalizado
- **Despliegue**: GitHub Pages + GitHub Actions
- **Base path**: Configurado para `/obradoiro-pablo-picasso-20251017/`

## 📝 Notas de Despliegue

- El script `deploy.sh` maneja tanto el demo como las slides
- Las slides se copian directamente al directorio de despliegue
- Se crea un `index.html` principal que enlaza a ambos contenidos
- El despliegue usa la rama `gh-pages` de GitHub