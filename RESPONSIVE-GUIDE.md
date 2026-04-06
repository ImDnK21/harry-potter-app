# Guia Completa de Responsive Design

## Cambios Realizados en Este Proyecto

### 1. `src/index.css` - Estilos Globales
- **CSS Custom Properties**: Se agregaron variables de color (`--color-bg`, `--color-dark-red`, etc.) para mantener consistencia.
- **`html { overflow-x: hidden }`**: Previene scroll horizontal accidental en mobile.
- **`img { max-width: 100%; height: auto }`**: Safety net global para que ninguna imagen cause overflow.

### 2. `src/shared/header/Header.tsx` + `Header.css` - Menu Hamburguesa
- **Nuevo estado `menuOpen`**: Controla la visibilidad del menu en mobile.
- **Componentes MUI**: Se importaron `IconButton`, `MenuIcon` y `CloseIcon` para el boton hamburguesa.
- **`<nav className="mobile-nav">`**: Envuelve las rutas y el boton login; en desktop se muestra inline, en mobile se oculta/muestra con clase `.open`.
- **Hover mejorado**: Se reemplazo el `font-size` en hover (causaba layout shift) por `text-decoration: underline`.
- **Padding reducido**: De `3rem` fijo a responsive (`0.8rem 1.2rem` mobile, `1rem 2rem` tablet).
- **`flex-wrap: wrap`**: Permite que el menu se expanda debajo del header en mobile.

### 3. `src/home/Home.css` - Pagina Principal
- **Hero image**: Altura responsive (`35vh` mobile, `45vh` tablet, `60vh` desktop).
- **News sections**: `flex-direction: column` en mobile para apilar imagen + texto verticalmente.
- **Imagenes de noticias**: Altura adaptativa (`200px` mobile, `240px` tablet, `280px` desktop).
- **`.body-text-new`**: `width: 100%` en mobile (antes 80% fijo).
- **`.section-two-img img`**: Corregido de `width: 93%` a `100%` para consistencia.
- **Separator line**: Ahora usa `width: min(200px, 50%)` para adaptarse a pantallas pequenas.
- **Curiosities cards**: `min-width: 100%` en mobile para stack vertical completo.
- **Padding general**: Reducido en mobile (`1rem`) y tablet (`1.5rem`).
- **`clamp()` en titulos**: `.urgent-section-tittle` ahora usa `clamp(1.1rem, 3vw, 1.5rem)`.

### 4. `src/shared/footer/Footer.css` - Footer
- **Stack vertical en mobile**: `flex-direction: column` con `text-align: center`.
- **`height: auto`**: Reemplaza el `height: 100px` fijo en mobile.
- **Bug fix**: `h3 { height: 10px }` cambiado a `height: auto` (el texto se cortaba).
- **Font-sizes reducidos**: `0.8rem` en mobile para mejor proporcion.

### 5. `src/home/Home.tsx` - Fix Pre-existente
- **`class` -> `className`**: Corregido en 3 `<span>` de Material Symbols (error de TypeScript).

---

## Breakpoints Utilizados

| Nombre  | Rango           | Media Query                                        |
|---------|-----------------|----------------------------------------------------|
| Mobile  | 0 - 767px       | `@media (max-width: 767px)`                        |
| Tablet  | 768px - 1023px  | `@media (min-width: 768px) and (max-width: 1023px)`|
| Desktop | 1024px+         | Estilos base (sin media query)                     |

### Breakpoints Estandar de la Industria

```
320px   - Moviles pequenos (iPhone SE)
375px   - Moviles medianos (iPhone 12/13/14)
390px   - Moviles grandes (iPhone 14 Pro)
428px   - Moviles extra grandes (iPhone 14 Pro Max)
768px   - Tablets (iPad Mini, iPad)
1024px  - Tablets landscape / Laptops pequenos
1280px  - Laptops
1440px  - Desktops
1920px  - Desktops grandes
```

---

## Buenas Practicas de Responsive Design

### 1. Mobile-First vs Desktop-First

**Mobile-First (Recomendado)**:
```css
/* Estilos base = mobile */
.container {
    padding: 1rem;
    flex-direction: column;
}

/* Se agregan estilos para pantallas mas grandes */
@media (min-width: 768px) {
    .container {
        padding: 2rem;
        flex-direction: row;
    }
}
```

**Desktop-First (Lo que usamos aqui)**:
```css
/* Estilos base = desktop */
.container {
    padding: 3rem;
    flex-direction: row;
}

/* Se sobreescriben para pantallas mas pequenas */
@media (max-width: 767px) {
    .container {
        padding: 1rem;
        flex-direction: column;
    }
}
```

> **Consejo**: Mobile-first es la mejor practica porque:
> - Fuerza a priorizar contenido esencial
> - Los dispositivos moviles cargan solo los estilos que necesitan
> - Es mas facil agregar complejidad que quitarla

### 2. Unidades Relativas vs Absolutas

| Unidad   | Uso Recomendado                          | Ejemplo                        |
|----------|------------------------------------------|--------------------------------|
| `rem`    | Font-sizes, padding, margin, gaps        | `font-size: 1.2rem`           |
| `em`     | Padding/margin relativo al font-size     | `padding: 0.5em 1em`          |
| `%`      | Anchos de contenedores                   | `width: 100%`                 |
| `vw/vh`  | Elementos que dependen del viewport      | `height: 50vh`                |
| `px`     | Bordes, sombras, valores muy pequenos    | `border: 1px solid`           |
| `ch`     | Ancho maximo de texto (legibilidad)      | `max-width: 65ch`             |

**Evita**: Usar `px` para font-sizes, padding, margin y anchos de contenedores.

### 3. Funciones CSS Modernas para Responsive

#### `clamp(min, preferred, max)`
Valor fluido que se adapta automaticamente:
```css
/* Font-size que va de 1.5rem a 3rem, escalando con el viewport */
font-size: clamp(1.5rem, 4vw, 3rem);

/* Padding que se adapta */
padding: clamp(1rem, 3vw, 3rem);
```

#### `min()` y `max()`
```css
/* Ancho maximo de 1180px pero nunca mas del 100% */
width: min(100%, 1180px);

/* Padding minimo de 1rem */
padding: max(1rem, 2vw);
```

#### Container Queries (CSS Moderno)
Responden al tamano del contenedor padre, no del viewport:
```css
.card-container {
    container-type: inline-size;
}

@container (min-width: 400px) {
    .card {
        flex-direction: row;
    }
}
```

### 4. Flexbox para Layouts Responsive

```css
/* Patron basico: items que se apilan en mobile */
.container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.item {
    flex: 1;
    min-width: 280px; /* Se apilan cuando no caben */
}
```

**Propiedades clave**:
- `flex-wrap: wrap` - Permite que los items salten a la siguiente linea
- `flex: 1` - Los items crecen para llenar el espacio
- `min-width` - Define cuando un item debe saltar de linea
- `gap` - Espacio entre items (reemplaza margin hacks)

### 5. CSS Grid para Layouts Responsive

```css
/* Grid que se adapta automaticamente */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
}
```

- `auto-fit` + `minmax()` = grid automaticamente responsive sin media queries
- Ideal para grids de cards, galerias de imagenes, etc.

### 6. Imagenes Responsive

```css
/* Regla global esencial */
img {
    max-width: 100%;
    height: auto;
}

/* Para imagenes de fondo con aspect-ratio consistente */
.hero-img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
}
```

**En HTML**:
```html
<!-- Diferentes tamanos segun el viewport -->
<img
    src="image-800.jpg"
    srcset="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
    alt="Descripcion"
    loading="lazy"
/>
```

- `loading="lazy"` - Carga la imagen solo cuando esta cerca del viewport
- `srcset` + `sizes` - El navegador elige la imagen optima
- `aspect-ratio` - Previene layout shift mientras la imagen carga

### 7. Tipografia Responsive

```css
/* Sistema completo con clamp() */
:root {
    --fs-sm: clamp(0.8rem, 1.5vw, 0.95rem);
    --fs-base: clamp(1rem, 2vw, 1.1rem);
    --fs-lg: clamp(1.2rem, 2.5vw, 1.5rem);
    --fs-xl: clamp(1.8rem, 4vw, 3rem);
    --fs-xxl: clamp(2.5rem, 5vw, 4.5rem);
}

h1 { font-size: var(--fs-xxl); }
h2 { font-size: var(--fs-xl); }
h3 { font-size: var(--fs-lg); }
p  { font-size: var(--fs-base); }
small { font-size: var(--fs-sm); }
```

### 8. Navegacion Mobile

**Patrones comunes**:

1. **Hamburger Menu** (lo que implementamos aqui):
   - Boton hamburguesa visible solo en mobile
   - Menu desplegable con `display: none/flex`
   - Simple y efectivo para pocas rutas

2. **Bottom Navigation** (apps nativas):
   ```css
   .bottom-nav {
       position: fixed;
       bottom: 0;
       width: 100%;
       display: flex;
       justify-content: space-around;
   }
   ```

3. **Drawer/Sidebar** (MUI Drawer):
   ```tsx
   import Drawer from '@mui/material/Drawer';
   <Drawer open={menuOpen} onClose={() => setMenuOpen(false)}>
       {/* contenido del menu */}
   </Drawer>
   ```

---

## Librerias y Herramientas Recomendadas

### Frameworks CSS con Responsive Built-in

| Libreria           | Descripcion                                    | Ideal Para                     |
|--------------------|------------------------------------------------|-------------------------------|
| **Tailwind CSS**   | Utility-first, responsive con prefijos (`md:`) | Desarrollo rapido, equipos    |
| **MUI (Material UI)** | Componentes React con responsive built-in  | Apps React complejas          |
| **Chakra UI**      | Componentes con props responsive               | React, DX excelente           |
| **Bootstrap**      | Grid system clasico, componentes               | Prototipos rapidos            |
| **Mantine**        | Componentes React modernos                     | React, TypeScript first       |

### Tailwind CSS - Ejemplo Responsive
```html
<div class="flex flex-col md:flex-row gap-4 p-4 md:p-8">
    <div class="w-full md:w-1/3">Sidebar</div>
    <div class="w-full md:w-2/3">Content</div>
</div>
```
Prefijos: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px), `2xl:` (1536px)

### MUI - Sistema Responsive
```tsx
import { useMediaQuery, useTheme } from '@mui/material';

// Hook para detectar breakpoint
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('md'));

// Grid responsive
<Grid container spacing={2}>
    <Grid size={{ xs: 12, md: 6, lg: 4 }}>Card</Grid>
</Grid>

// Props responsive con sx
<Box sx={{
    padding: { xs: 1, sm: 2, md: 3 },
    fontSize: { xs: '0.9rem', md: '1.1rem' },
    display: { xs: 'none', md: 'block' }
}}>
```

### Herramientas de Testing

- **Chrome DevTools** (F12 > Toggle Device Toolbar): Simula diferentes dispositivos
- **Firefox Responsive Design Mode** (Ctrl+Shift+M): Similar a Chrome
- **BrowserStack**: Testing en dispositivos reales (de pago)
- **Responsively App**: Abre multiples viewports simultaneamente (gratis)

---

## Estructura Recomendada para Nuevos Proyectos

### Checklist Antes de Empezar

1. **Viewport meta tag** en `index.html`:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
   ```

2. **Reset CSS** (normalize.css o CSS reset moderno):
   ```css
   *, *::before, *::after {
       box-sizing: border-box;
       margin: 0;
       padding: 0;
   }
   ```

3. **Reglas base responsive**:
   ```css
   html { overflow-x: hidden; }
   img { max-width: 100%; height: auto; }
   ```

4. **Sistema de tipografia con `clamp()`** definido desde el inicio.

5. **Breakpoints definidos** como variables o constantes del proyecto.

6. **Mobile-first approach**: Empezar disenando y desarrollando para mobile.

### Estructura CSS Recomendada

```
src/
  styles/
    variables.css      /* Custom properties: colores, tipografia, spacing */
    reset.css          /* Box-sizing, margin reset */
    global.css         /* Estilos base del body, tipografia */
  components/
    Header/
      Header.tsx
      Header.css       /* Estilos mobile-first con media queries al final */
```

### Patron Mobile-First por Componente

```css
/* 1. Estilos base (mobile) */
.component {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
}

/* 2. Tablet */
@media (min-width: 768px) {
    .component {
        flex-direction: row;
        padding: 1.5rem;
        gap: 1.5rem;
    }
}

/* 3. Desktop */
@media (min-width: 1024px) {
    .component {
        padding: 2rem;
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }
}
```

---

## Errores Comunes a Evitar

1. **Usar `px` para todo**: Usa `rem`, `%`, `vw`, `clamp()`.
2. **Olvidar `box-sizing: border-box`**: Sin esto, padding se suma al ancho.
3. **Alturas fijas (`height: 500px`)**: Usa `min-height` o `auto`.
4. **No usar `flex-wrap`**: Los items se desbordan en mobile.
5. **Hover effects que cambian tamano**: Causa layout shift; usa `color`, `opacity`, `text-decoration`.
6. **Padding excesivo en mobile**: `3rem` en un telefono de 320px es demasiado.
7. **No testear en dispositivos reales**: Los emuladores no capturan todo.
8. **Ignorar landscape mode**: Algunos usuarios rotan su telefono.
9. **Texto demasiado pequeno en mobile**: Minimo `16px` (1rem) para texto de cuerpo.
10. **Touch targets pequenos**: Botones y links deben tener minimo `44x44px` de area clickeable.

---

## Recursos para Seguir Aprendiendo

- [MDN - Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [web.dev - Responsive Design](https://web.dev/learn/design/)
- [CSS-Tricks - A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS-Tricks - A Complete Guide to CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Every Layout](https://every-layout.dev/) - Patrones de layout intrinsecos
- [Utopia](https://utopia.fyi/) - Calculadora de tipografia y spacing fluido
