# Metric-Imperial Converter (FCC Quality Assurance Project)

API que convierte unidades entre sistemas imperial y métrico (`gal`/`L`, `lbs`/`kg`, `mi`/`km`). Corresponde al proyecto "Metric-Imperial Converter" del certificado Quality Assurance de freeCodeCamp.

API that converts between imperial and metric units (`gal`/`L`, `lbs`/`kg`, `mi`/`km`). It implements the "Metric-Imperial Converter" project of the freeCodeCamp Quality Assurance certificate.

## Características / Features

- Convierte las seis conversiones del challenge: `gal→L`, `L→gal`, `mi→km`, `km→mi`, `lbs→kg`, `kg→lbs`.
- Soporta números enteros, decimales y fracciones (ej. `1/2`, `5.4/3`) en la query string.
- Acepta unidades en plural (`gals`, `L`, `miles`, `kms`, `lbs`, `kgs`) y distingue `l` (minúscula) de `L` (litro).
- Respuestas de error en texto plano, según exige el test suite de fCC.

- Covers all six conversions required by the challenge: `gal→L`, `L→gal`, `mi→km`, `km→mi`, `lbs→kg`, `kg→lbs`.
- Handles whole numbers, decimals and fractions (e.g. `1/2`, `5.4/3`) in the query string.
- Accepts plural units (`gals`, `L`, `miles`, `kms`, `lbs`, `kgs`) and distinguishes `l` (lowercase) from `L` (liter).
- Returns error responses as plain text, as required by the fCC test suite.

## Inicio rápido / Quick Start

```bash
npm install
cp sample.env .env
npm start
```

Luego abre `http://localhost:3000`.

Then open `http://localhost:3000`.

> El `sample.env` ya incluye `PORT=3000`. Para correr los tests, activa `NODE_ENV=test` en `.env`.
>
> `sample.env` already includes `PORT=3000`. To run the tests, enable `NODE_ENV=test` in `.env`.

## Configuración / Configuration

| Variable | Uso / Usage |
|----------|-------------|
| `PORT` | Puerto del servidor (por defecto `3000`) / Server port (default `3000`). |
| `NODE_ENV=test` | Activa el runner de tests y el endpoint `/_api/get-tests`, que freeCodeCamp usa para leer los resultados / Enables the test runner and the `/_api/get-tests` endpoint used by freeCodeCamp to read results. |

## API

El endpoint expone la conversión de unidades por query string. / The endpoint performs unit conversion via query string.

### `GET /api/convert?input=<valor><unidad>`

| Parámetro | Descripción |
|-----------|-------------|
| `input` | Valor seguido de unidad, ej. `3.1mi`, `1/2km`, `5.4/3lbs` |

| Parameter | Description |
|-----------|-------------|
| `input` | Value followed by unit, e.g. `3.1mi`, `1/2km`, `5.4/3lbs` |

Ejemplo de respuesta exitosa / Example success response:

```json
{"initNum":3.1,"initUnit":"mi","returnNum":4.98895,"returnUnit":"km","string":"3.1 miles converts to 4.98895 kilometers"}
```

| Campo / Field | Descripción |
|---------------|-------------|
| `initNum` | Número de entrada / Input number |
| `initUnit` | Unidad de entrada / Input unit |
| `returnNum` | Número convertido / Converted number |
| `returnUnit` | Unidad convertida / Converted unit |
| `string` | Descripción en lenguaje natural / Natural language description |

Divisiones válidas / Valid fractions:

- `input=5/4mi` → `initNum` es `1.25`
- `input=5//4mi` → error `invalid number`

### Errores / Errors

La API responde **texto plano** (no JSON), porque los asserts de fCC comparan con `response.text()`. / The API responds with **plain text** (not JSON), because fCC asserts compare with `response.text()`.

| Caso / Case | Respuesta / Response |
|-------------|----------------------|
| Sin número (ej. `input=mi`) / No number (e.g. `input=mi`) | `invalid number` |
| Sin unidad o unidad inválida / No unit or invalid unit | `invalid unit` |
| Ambos inválidos / Both invalid | `invalid number and unit` |
| Número inválido (ej. `1//2gal`) / Invalid number (e.g. `1//2gal`) | `invalid number` |

## Tests / Pruebas

```bash
npm test
```

Necesita `NODE_ENV=test` en `.env`. / Requires `NODE_ENV=test` in `.env`.

Resultado: **16 unit tests + 5 functional tests = 21 passing**.

Result: **16 unit tests + 5 functional tests = 21 passing**.

> freeCodeCamp lee los resultados vía `/_api/get-tests` cuando el servidor corre con `NODE_ENV=test`.
>
> freeCodeCamp reads the results via `/_api/get-tests` when the server runs with `NODE_ENV=test`.

## Estructura de archivos / File structure

| Archivo / File | Descripción |
|----------------|-------------|
| `server.js` | Arranque del servidor Express / Express server bootstrap. |
| `routes/api.js` | Endpoint `GET /api/convert` y manejo de errores / `GET /api/convert` endpoint and error handling. |
| `controllers/convertHandler.js` | Lógica de parseo de número/unidad, conversión y texto / Number/unit parsing, conversion and string logic. |
| `tests/1_unit-tests.js` | Unit tests de `convertHandler` / `convertHandler` unit tests. |
| `tests/2_functional-tests.js` | Functional tests del endpoint / Endpoint functional tests. |

## Notas técnicas / Technical notes

**ES:** `convertHandler.js` separa el número de la unidad con una expresión regular y resuelve fracciones y decimales en `getNum`. Los errores se envían con `res.send()` en texto plano para satisfacer los asserts de freeCodeCamp que usan `response.text()`. El `sample.env` trae `PORT=3000` y la variable `NODE_ENV=test` comentada, que al activarse puebla `/_api/get-tests`.

**EN:** `convertHandler.js` splits number and unit with a regular expression and resolves fractions/decimals in `getNum`. Errors are sent with `res.send()` as plain text to satisfy freeCodeCamp asserts that use `response.text()`. The `sample.env` ships with `PORT=3000` and a commented `NODE_ENV=test`, which when enabled populates `/_api/get-tests`.

## Enlaces / Links

- Challenge en freeCodeCamp: https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/metric-imperial-converter
- Repositorio GitHub: https://github.com/AMluisXVI/fcc-project-metric-imp-converter
