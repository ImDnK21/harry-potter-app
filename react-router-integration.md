# React Router DOM — Integración y Correcciones

**Proyecto:** Harry Potter App  
**Fecha:** 2026-04-17  
**Versión de React Router:** `react-router-dom ^7.14.1`

---

## Contexto

Se integró `react-router-dom` al proyecto pero se detectaron errores críticos en la implementación inicial. Este documento registra los problemas encontrados, las correcciones aplicadas y el porqué de cada decisión, basadas en la documentación oficial de React Router v7.

---

## Problemas Detectados

### Problema 1 — `BrowserRouter` no envolvía Header ni Footer (Crítico)

**Archivo:** `src/main.tsx`

**Código original:**
```tsx
<Header />
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</BrowserRouter>
<Footer />
```

**Por qué es un error:**  
`BrowserRouter` provee el contexto del router a todos sus descendientes. Cualquier componente fuera de él no puede acceder a ese contexto. Esto significa que `Header` y `Footer` no podían usar `Link`, `NavLink`, `useNavigate`, `useLocation` ni ningún hook de React Router. En la práctica, los links del Header no navegarían y cualquier intento de usar hooks del router lanzaría un error en runtime.

**Referencia oficial:**  
> "All router components must be rendered inside a router. If you try to render a `<Link>` outside of a router, you'll get an error."  
> — [React Router v7 Docs: Picking a Router](https://reactrouter.com/start/library/installation)

---

### Problema 2 — Navegación con `<span>` en lugar de `<NavLink>` (Crítico)

**Archivo:** `src/shared/header/Header.tsx`

**Código original:**
```tsx
<span className="active" onClick={() => setMenuOpen(false)}>HOME</span>
<span onClick={() => setMenuOpen(false)}>CHARACTERS</span>
<span onClick={() => setMenuOpen(false)}>SPELLS</span>
<span onClick={() => setMenuOpen(false)}>HOUSES</span>
```

**Por qué es un error:**  
Los `<span>` con `onClick` no hacen ninguna navegación real. Al hacer clic, se cierra el menú pero la URL no cambia ni se renderiza ninguna página nueva. Además:
- El `className="active"` estaba hardcodeado, lo que significa que HOME siempre se ve activo sin importar en qué ruta se esté.
- No son accesibles semánticamente (no son elementos de navegación).
- No permiten apertura en nueva pestaña ni otros comportamientos estándar de links.

---

### Problema 3 — API estilo v5 en un proyecto con React Router v7 (Recomendado)

**Código original:**
```tsx
import { Routes, Route, BrowserRouter } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</BrowserRouter>
```

**Por qué no es la forma recomendada:**  
Desde React Router v6.4 (y consolidado en v7), la API recomendada es `createBrowserRouter` + `RouterProvider`. Esta nueva API habilita:
- **Loaders y Actions**: carga de datos antes de renderizar la página
- **Mejor manejo de errores**: `errorElement` por ruta
- **Código dividido (lazy loading)**: `lazy()` por ruta
- **Fetchers y deferred data**: para UX más sofisticada

Usar `BrowserRouter` sigue funcionando (modo "library"), pero no aprovecha las capacidades del router moderno.

**Referencia oficial:**  
> "We recommend using `createBrowserRouter` for all new React Router web projects."  
> — [React Router v7 Docs: createBrowserRouter](https://reactrouter.com/start/library/installation)

---

### Problema 4 — Lógica de routing en `main.tsx` (Buena práctica)

**Por qué es un problema:**  
`main.tsx` es el punto de entrada de la aplicación. Su única responsabilidad debe ser montar el árbol React en el DOM. Mezclar la configuración del router, imports de páginas y componentes de layout hace que este archivo crezca sin control y sea difícil de mantener.

---

## Soluciones Aplicadas

### Solución 1 — Nuevo archivo `src/App.tsx`

**Archivo creado:** `src/App.tsx`

```tsx
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Header } from './shared/header/Header';
import { Footer } from './shared/footer/Footer';
import { Home } from './home/Home';

const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
    ],
  },
]);

export const App = () => <RouterProvider router={router} />;
```

**Por qué este enfoque:**

- **`createBrowserRouter`**: crea el router con la API moderna de v7. Toda la configuración de rutas vive en un solo lugar (array de objetos), lo que escala mucho mejor que JSX anidado.
- **`RouterProvider`**: es el proveedor que inyecta el contexto del router en todo el árbol. Al ser el componente raíz de `App`, garantiza que `Header` y `Footer` (y cualquier página) tengan acceso completo al router.
- **`Layout` con `<Outlet />`**: patrón de layout compartido. `Outlet` es el "slot" donde React Router inyecta el componente de la ruta activa. Esto garantiza que `Header` y `Footer` sean **siempre visibles** en todas las pantallas sin repetir código en cada página.

**Diagrama del árbol de componentes:**
```
App
└── RouterProvider
    └── Layout          ← siempre visible
        ├── Header      ← siempre visible
        ├── <Outlet />  ← cambia según la ruta: Home, Characters, Spells...
        └── Footer      ← siempre visible
```

---

### Solución 2 — `src/main.tsx` simplificado

**Archivo modificado:** `src/main.tsx`

**Antes:**
```tsx
import 'normalize.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Home } from './home/Home'
import { Header } from './shared/header/Header';
import { Footer } from './shared/footer/Footer';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    <Footer />
  </StrictMode>
)
```

**Después:**
```tsx
import 'normalize.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

**Por qué:** `main.tsx` ahora tiene una sola responsabilidad: montar `<App />` en el DOM. Toda la lógica de routing y layout está encapsulada en `App.tsx`.

---

### Solución 3 — `NavLink` en el Header

**Archivo modificado:** `src/shared/header/Header.tsx`

**Antes:**
```tsx
<span className="active" onClick={() => setMenuOpen(false)}>HOME</span>
<span onClick={() => setMenuOpen(false)}>CHARACTERS</span>
```

**Después:**
```tsx
<NavLink end to="/" onClick={() => setMenuOpen(false)}>HOME</NavLink>
<NavLink to="/characters" onClick={() => setMenuOpen(false)}>CHARACTERS</NavLink>
<NavLink to="/spells" onClick={() => setMenuOpen(false)}>SPELLS</NavLink>
<NavLink to="/houses" onClick={() => setMenuOpen(false)}>HOUSES</NavLink>
```

**Por qué `NavLink` y no `Link`:**  
`NavLink` es una extensión de `Link` que agrega automáticamente la clase CSS `active` al elemento cuando la ruta actual coincide con el `to` del link. Esto elimina la necesidad de gestionar manualmente el estado activo.

**Por qué `end` en HOME:**  
Sin `end`, el link de HOME (`/`) se marcaría como activo en **todas las rutas** porque `/` es prefijo de `/characters`, `/spells`, etc. El prop `end` le indica a `NavLink` que solo se active cuando la ruta es exactamente `/`.

**Referencia oficial:**  
> "The `end` prop changes the matching logic for the active and pending states to only match to the 'end' of the NavLink's `to` pattern."  
> — [React Router v7 Docs: NavLink](https://reactrouter.com/api/components/NavLink)

---

### Solución 4 — CSS actualizado para `<a>` tags

**Archivo modificado:** `src/shared/header/Header.css`

**Antes:**
```css
.header-routes{
    color: #4b0000;
    cursor: pointer;

    span:hover {
        text-decoration: underline;
    }
    .active {
        text-decoration: underline;
    }
}
```

**Después:**
```css
.header-routes{
    cursor: pointer;

    a {
        color: #4b0000;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
    a.active {
        text-decoration: underline;
    }
}
```

**Por qué:** `NavLink` renderiza un elemento `<a>` en el DOM, no un `<span>`. Los navegadores aplican estilos por defecto a `<a>` (color azul, subrayado). Se resetean esos estilos y se apunta al selector `a.active` para que coincida con la clase que `NavLink` agrega automáticamente.

---

## Resumen de Cambios

| Archivo | Acción | Motivo |
|---|---|---|
| `src/App.tsx` | Creado | Encapsula routing y layout compartido |
| `src/main.tsx` | Simplificado | Responsabilidad única: montar App en el DOM |
| `src/shared/header/Header.tsx` | Actualizado | `NavLink` reemplaza `span` para navegación real |
| `src/shared/header/Header.css` | Actualizado | Selectores `a` en lugar de `span` |

---

## Cómo agregar nuevas páginas

Con esta estructura, agregar una nueva página es simple:

1. Crear el componente en `src/<nombre-pagina>/<NombrePagina>.tsx`
2. Importarlo en `src/App.tsx`
3. Agregarlo al array de rutas:

```tsx
// src/App.tsx
import { Characters } from './characters/Characters';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/characters', element: <Characters /> }, // ← nueva ruta
    ],
  },
]);
```

El `Header` y `Footer` aparecerán automáticamente en la nueva página gracias al `Layout`.
