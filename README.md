# Mi Reserva — API y cliente

## Backend (Spring Boot)

- Puerto por defecto: `8081`
- Endpoints: `GET/POST /reservas`, `DELETE /reservas/{id}`
- Requiere PostgreSQL (ver `src/main/resources/application.properties`)

```bash
./mvnw spring-boot:run
```

## Frontend (React + Vite)

```bash
cd frontend
cp .env.example .env   # Windows: copy .env.example .env
npm install
npm run dev
```

La aplicación web consume la API configurada en `VITE_API_BASE_URL`.
