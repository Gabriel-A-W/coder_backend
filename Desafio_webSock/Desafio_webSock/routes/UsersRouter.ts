import * as express  from 'express'; 
import { IAuthManager } from '../sessions/AuthManager';
 
export function crearUserRouter(auth: IAuthManager) : express.Router
{
    const router = express.Router();

    const redirectIfAuthed = auth.authGuard({successRedirect:"/"});

    router.use(express.static('public'));
    router.use(express.urlencoded({ extended: true }));

    //login
    router.get("/login", redirectIfAuthed, (req, res ) => { 
        res.render("login", { errm: req.query.errm });
    });

    //register
    router.get("/register", redirectIfAuthed, (req, res) => {
        res.render("register", { errm: req.query.errm });
    });

    router.post("/login", auth.authenticate({ successRedirect: "/", failureRedirect:`./login?errm=${encodeURI("Usuario o clave invalido")}`}));    
    router.post("/register", redirectIfAuthed, auth.register({successRedirect:"/", failureRedirect:"./register"}));
    router.post("/logout", auth.logOut({ successRedirect: "./login" }));

    return router;
}

  