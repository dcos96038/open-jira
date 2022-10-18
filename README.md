# NextJS OpenJira

Para correr localmente se necesita la base de datos =>
```
docker-compose up -d
```

* -d significa: __detach__

DB URL:
```
mongodb://localhost:27017/entriesdb
```

## Configurar variables de entorno:
```
MONGO_URL=
```

## Llenar la base de datos con informacion de prueba:

Ejecutar:
```
  http://localhost:3000/api/seed
```