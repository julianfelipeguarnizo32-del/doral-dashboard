# 📊 DORAL STORE — Dashboard Automático
### Usuario: **julianfelipeguarnizo32**
### 🔗 URL final: **https://julianfelipeguarnizo32.github.io/doral-dashboard/**

> El dashboard se actualiza **automáticamente** en ~3 minutos cada vez que subes un Excel.

---

## 🚀 CONFIGURACIÓN INICIAL (una sola vez)

### Paso 1 — Crear el repositorio en GitHub

1. Inicia sesión en **github.com** con tu cuenta `julianfelipeguarnizo32`
2. Clic en **"+"** (arriba derecha) → **"New repository"**
3. **Repository name:** `doral-dashboard` ← exactamente este nombre
4. Visibilidad: **Public** ← necesario para GitHub Pages gratis
5. ✅ Marcar **"Add a README file"**
6. Clic en **"Create repository"**

---

### Paso 2 — Subir los archivos del proyecto

> ⚠️ **IMPORTANTE**: La carpeta `.github/workflows/` debe subirse correctamente para que la automatización funcione.

**Desde GitHub.com (sin instalar nada):**
1. Descarga y extrae el ZIP `doral-dashboard-github.zip`
2. En tu repositorio `doral-dashboard`, clic en **"Add file" → "Upload files"**
3. Arrastra **todos los archivos y carpetas** del ZIP extraído
4. Clic **"Commit changes"**

**Con Git en tu PC (recomendado):**
```bash
git clone https://github.com/julianfelipeguarnizo32/doral-dashboard.git
cd doral-dashboard
# Copia aquí todos los archivos del ZIP extraído
git add .
git commit -m "🎉 Setup inicial Doral Dashboard"
git push
```

---

### Paso 3 — Activar GitHub Pages

1. En tu repositorio → **Settings** (arriba derecha)
2. Menú izquierdo → **Pages**
3. Source: **"Deploy from a branch"**
4. Branch: **`gh-pages`** → **`/ (root)`**
5. Clic **Save**

✅ Tu dashboard estará disponible en:
```
https://julianfelipeguarnizo32.github.io/doral-dashboard/
```
> La primera vez puede tardar 5-10 minutos en activarse.

---

### Paso 4 — Activar permisos para Actions

1. **Settings** → **Actions** → **General**
2. En "Workflow permissions": seleccionar **Read and write permissions**
3. ✅ "Allow GitHub Actions to create and approve pull requests"
4. Clic **Save**

---

## 📤 CÓMO ACTUALIZAR EL DASHBOARD (uso diario)

### Método 1 — Desde GitHub.com (más fácil)

1. Abre tu repositorio en GitHub
2. Entra a la carpeta **`data/`**
3. Clic **Add file → Upload files**
4. Sube el nuevo Excel (ej: `ordenes_productos_20260315_230000.xlsx`)
5. Clic **Commit changes**
6. ¡Listo! En 2-3 minutos el dashboard se actualiza automáticamente

### Método 2 — Con Git en tu PC

```bash
cd doral-dashboard

# Copia el Excel a la carpeta data/
cp ~/Downloads/ordenes_productos_20260315_230000.xlsx data/

# Subir
git add data/
git commit -m "📊 Corte 15/03/2026"
git push
```

### Método 3 — Ejecución manual desde GitHub

1. Ve a **Actions** en tu repositorio
2. Selecciona **"Actualizar Dashboard Doral"**
3. Clic **"Run workflow"**
4. Opcionalmente escribe la descripción del corte
5. Clic **"Run workflow"** (verde)

---

## 📁 ESTRUCTURA DEL REPOSITORIO

```
doral-dashboard/
│
├── index.html                    ← Dashboard principal (se actualiza auto)
│
├── data/
│   ├── kpis.json                 ← Datos procesados (auto-generado)
│   └── ordenes_XXXXXX.xlsx       ← ← ← AQUÍ SUBES EL EXCEL
│
├── scripts/
│   └── procesar_excel.py         ← Script que procesa el Excel
│
└── .github/
    └── workflows/
        └── actualizar_dashboard.yml  ← Automatización GitHub Actions
```

---

## ⚙️ CÓMO FUNCIONA

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  1. Subes Excel          GitHub detecta cambio          │
│     a data/         ──►  en la carpeta data/            │
│                                                         │
│  2. GitHub Actions       Python procesa el Excel        │
│     se activa       ──►  calcula todos los KPIs         │
│                                                         │
│  3. Genera              data/kpis.json                  │
│     JSON            ──►  con todos los indicadores      │
│                                                         │
│  4. Inyecta             Dashboard HTML                  │
│     datos           ──►  se actualiza automáticamente   │
│                                                         │
│  5. Publica             GitHub Pages                    │
│     online          ──►  URL pública disponible         │
│                                                         │
│           ⏱️ Todo en ~2-3 minutos                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🔍 VER EL PROGRESO

Mientras se ejecuta la actualización:
1. Ve a tu repositorio
2. Clic en **Actions**
3. Verás el workflow ejecutándose en tiempo real
4. Al terminar verás el resumen con los KPIs procesados

---

## ❓ PREGUNTAS FRECUENTES

**¿Cuánto tiempo tarda en actualizarse?**
Entre 2 y 4 minutos desde que subes el Excel.

**¿Puedo subir varios Excel a la vez?**
Sí, pero solo se procesará el más reciente (por fecha de modificación).

**¿El Excel anterior se borra?**
No, todos quedan guardados en `data/`. Puedes borrarlos manualmente si quieres ahorrar espacio.

**¿Funciona con cualquier Excel exportado de la plataforma?**
Sí, mientras tenga las mismas columnas (ID, FECHA, ESTATUS, TOTAL DE LA ORDEN, etc.).

**¿El dashboard es público?**
Sí, cualquier persona con la URL puede verlo. Si quieres privacidad, necesitas un repositorio privado + GitHub Pages Pro (de pago).

**¿Qué pasa si hay un error?**
Recibirás un email de GitHub notificando el fallo. Ve a Actions para ver el detalle del error.

---

## 📞 COLUMNAS REQUERIDAS EN EL EXCEL

El script espera estas columnas (las mismas del sistema actual):

| Columna | Descripción |
|---------|-------------|
| `ID` | Identificador único del pedido |
| `FECHA` | Fecha del pedido |
| `ESTATUS` | Estado del pedido |
| `TOTAL DE LA ORDEN` | Valor facturado |
| `PRECIO FLETE` | Costo de envío |
| `TRANSPORTADORA` | Empresa transportadora |
| `DEPARTAMENTO DESTINO` | Departamento destino |
| `CIUDAD DESTINO` | Ciudad destino |
| `NOVEDAD` | Texto de la novedad (si aplica) |
| `FECHA DE NOVEDAD` | Fecha de la novedad |
| `FUE SOLUCIONADA LA NOVEDAD` | SI / NO |
| `TIENDA` | Nombre de la tienda |
| `CANTIDAD` | Unidades del pedido |
| `FECHA GUIA GENERADA` | Fecha de despacho |

---

*Generado automáticamente — DORAL STORE Dashboard System*

---

## 🔗 LINKS DIRECTOS (guárdalos)

| Recurso | URL |
|---------|-----|
| 🌐 **Dashboard** | https://julianfelipeguarnizo32.github.io/doral-dashboard/ |
| 📁 **Repositorio** | https://github.com/julianfelipeguarnizo32/doral-dashboard |
| ⚙️ **Actions** | https://github.com/julianfelipeguarnizo32/doral-dashboard/actions |
| 📤 **Subir Excel** | https://github.com/julianfelipeguarnizo32/doral-dashboard/upload/main/data |
| ⚙️ **Settings Pages** | https://github.com/julianfelipeguarnizo32/doral-dashboard/settings/pages |

