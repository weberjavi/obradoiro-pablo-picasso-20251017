# Guía de Despliegue - GitHub Pages

Esta guía te ayudará a desplegar tanto el demo interactivo como las slides del taller a GitHub Pages.

## 🚀 Despliegue Rápido

### Opción 1: Despliegue Automático (Recomendado)

1. **Habilita GitHub Pages en tu repositorio:**
   - Ve a Settings → Pages
   - Selecciona "Deploy from a branch"
   - Elige la rama `gh-pages`
   - Guarda los cambios

2. **Haz push de los cambios:**
   ```bash
   git add .
   git commit -m "Add workshop content"
   git push origin main
   ```

3. **GitHub Actions se encargará del resto:**
   - El workflow se ejecutará automáticamente
   - Construirá el demo y desplegará todo
   - Estará disponible en unos minutos

### Opción 2: Despliegue Manual

1. **Instala dependencias:**
   ```bash
   yarn install:demo
   ```

2. **Ejecuta el despliegue:**
   ```bash
   yarn deploy
   ```

3. **Verifica el despliegue:**
   - Ve a Settings → Pages en tu repositorio
   - Verifica que la rama `gh-pages` esté seleccionada
   - Espera unos minutos para que se actualice

## 🔧 Configuración Técnica

### Estructura de Despliegue

```
gh-pages/
├── index.html          # Página principal con enlaces
├── [demo files]        # Archivos del demo React
└── slides/             # Presentación HTML
    ├── index.html
    ├── big.css
    ├── big.js
    └── themes/
```

### URLs de Acceso

Una vez desplegado, el contenido estará disponible en:

- **Página principal**: `https://[usuario].github.io/obradoiro-pablo-picasso-20251017/`
- **Demo interactivo**: `https://[usuario].github.io/obradoiro-pablo-picasso-20251017/`
- **Presentación**: `https://[usuario].github.io/obradoiro-pablo-picasso-20251017/slides/`

## 🛠️ Solución de Problemas

### Error: "gh-pages branch not found"
```bash
# Crea la rama gh-pages manualmente
git checkout --orphan gh-pages
git rm -rf .
git commit --allow-empty -m "Initial gh-pages commit"
git push origin gh-pages
git checkout main
```

### Error: "Build failed"
```bash
# Limpia e instala dependencias
cd demo
rm -rf node_modules
yarn install
yarn build
```

### Error: "Permission denied"
```bash
# Asegúrate de tener permisos de escritura
git remote -v
# Verifica que tienes acceso de push al repositorio
```

## 📝 Notas Importantes

1. **Base Path**: El demo está configurado con `base: '/obradoiro-pablo-picasso-20251017/'` en `vite.config.ts`

2. **Rama gh-pages**: GitHub Pages usa esta rama para servir el contenido

3. **Actualizaciones**: Cada push a `main` activará un nuevo despliegue automático

4. **Cache**: Puede tomar unos minutos para que los cambios se reflejen debido al cache de GitHub Pages

## 🔄 Flujo de Trabajo Recomendado

1. Desarrolla localmente con `yarn dev`
2. Haz commit y push a `main`
3. GitHub Actions desplegará automáticamente
4. Verifica el resultado en la URL de GitHub Pages
5. Si hay problemas, revisa los logs en Actions

## 📞 Soporte

Si encuentras problemas:

1. Revisa los logs de GitHub Actions
2. Verifica que todas las dependencias estén instaladas
3. Asegúrate de que el repositorio tenga permisos correctos
4. Consulta la documentación de GitHub Pages