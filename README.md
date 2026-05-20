# Proyecto Final - Automatización QA con Cypress

## 📌 Descripción

Este proyecto corresponde al Trabajo Práctico Final de Automatización QA utilizando **Cypress**.

El objetivo del proyecto es documentar y automatizar distintos casos de prueba funcionales y de API aplicando los conceptos vistos durante la cursada:

- Automatización Frontend (FE)
- Automatización API
- Cypress
- Page Object Model (POM)
- Custom Commands
- Assertions
- Manejo de fixtures y requests

---

# 👥 Integrantes del grupo

| Alumno | Casos asignados |
|---|---|
| Juan Yovera | Casos 4, 5 y 6 |
| Emmanuel Delorenzo | Casos 7, 8 y 9 |
| Paul Soria | Casos 10, 11 y 12 |
| Luka Reyes | Casos 13, 14 y 15 |

---

# 📋 Casos de prueba

## Casos grupales

Estos casos fueron proporcionados por la profesora y son responsabilidad de todo el grupo.

| Nº | Caso |
|---|---|
| 1 | Comprar carrito exitosamente y visualizar orden de compra |
| 2 | API \| Comprar carrito exitosamente |
| 3 | API \| Error al comprar carrito sin token |

⚠ **Estos casos no deben ser modificados.**

---

## Casos individuales

Cada alumno debe documentar y automatizar:

- 2 casos de API
  - 1 exitoso
  - 1 error
- 1 caso Frontend (FE)

---

# 🛠 Tecnologías utilizadas

- Cypress
- JavaScript
- Node.js
- Page Object Model (POM)

---

# 📂 Estructura del proyecto

```bash
cypress/
│
├── e2e/
│   ├── frontend/
│   └── api/
│
├── fixtures/
│
├── pages/
│
├── support/
│   ├── commands.js
│   └── e2e.js
│
└── reports/
