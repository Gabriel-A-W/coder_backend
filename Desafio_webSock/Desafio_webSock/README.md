# Desafio_webSock
- Se modifica la forma de creación de routers para crearse mediante funciones
- Agregado SessionManager para crear el middleware de sesiones y authguard (/sessions/SessionManager)
- Agregado UsersRouter para manejar el login/out (/routes/UsersRouter)
- Se agrega el middleware SessionManager.authGuard() en los path que requieren autenticacion.
- Se quitaron los archivos ejs y pug
