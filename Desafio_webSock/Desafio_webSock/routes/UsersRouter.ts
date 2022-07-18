import * as express  from 'express';
import { IUserData } from '../sessions/IUserData';

export function crearUserRouter() : express.Router
{
    const router = express.Router();


    router.use(express.urlencoded({ extended: true }));

    router.post("/login", (req, res) => {

        console.log(req.body);
        if (req.body.nombre) {
            
            req.session.userData = {
                nombre: req.body.nombre 
            };

            res.redirect("/");
        }
        else {
            res.redirect("/login");
        }


    });

    router.get("/logout",  (req, res) => {
          req.session.destroy((err) => {
              if (err)
                  console.log(err);
              else
                  res.redirect("/");
        });
    })

    return router;
}

  