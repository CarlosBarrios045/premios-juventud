export default [
  // type: restricted
  {
    pathname: "/iniciar-sesion",
    type: "restricted",
  },
  {
    pathname: "/crear-cuenta",
    type: "restricted",
  },
  // type: public
  {
    pathname: "/",
    type: "public",
  },
  {
    pathname: "/nominados/[id]",
    type: "public",
  },
  {
    pathname: "/ganadores",
    type: "public",
  },
  {
    pathname: "/votar",
    type: "public",
  },
  // type: private
  {
    pathname: "/crear-nominado",
    type: "private",
  },
]
