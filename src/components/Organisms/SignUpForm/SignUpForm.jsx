import { useFormik } from "formik"

// Layout
import { Text, Input, Button, Link, Paper } from "src/components/Atoms"

// Validations
import useValidations from "src/hooks/useValidations"
import useValidationsInput from "src/hooks/useValidationsInput"

// Auth
import { useAuth } from "src/lib/auth"

// Styles
import { makeStyles } from "@material-ui/core/styles"
const styles = makeStyles(({ palette, breakpoints, fonts }) => ({
  content: {
    height: "100%",
    borderRadius: 0,
    padding: 20,
    backgroundColor: palette.primary.main,
  },
  title: {
    marginTop: 70,
    fontSize: 34,
    textAlign: "center",
    fontWeight: "bold",

    [breakpoints.down("sm")]: {
      marginTop: 0,
    },
  },
  form: {
    padding: "0 35px",
    display: "flex",
    flexDirection: "column",

    [breakpoints.down("sm")]: {
      padding: "0 85px",
    },

    [breakpoints.down("xs")]: {
      padding: "0 15px",
    },
  },
  contentLinks: {
    display: "flex",
    width: "100%",
    justifyContent: "center",

    "& > a": {
      color: palette.secondary.main,
    },
  },
  button: {
    marginTop: 20,
    marginBottom: 16,
    height: 44,
  },
}))

const SignUpForm = () => {
  const classes = styles()

  // Validations
  const { SignUpSchema } = useValidations()
  const { funcIsError, funcIsTextError } = useValidationsInput()

  // Func SignUp
  const { signUp: SignUpFirebase } = useAuth()

  const {
    handleSubmit,
    errors,
    values,
    handleChange,
    touched,
    setErrors,
  } = useFormik({
    initialValues: { name: "", dni: "", email: "", password: "" },
    onSubmit: async (values) => {
      const { success, message } = await SignUpFirebase(values)
      if (!success) {
        setErrors(message)
      }
    },
    validationSchema: SignUpSchema,
  })

  return (
    <Paper className={classes.content}>
      <Text component="h1" className={classes.title}>
        Crea tu cuenta
      </Text>

      <form onSubmit={handleSubmit} className={classes.form}>
        <Input
          name="name"
          label="Nombres y apellidos"
          value={values.name}
          onChange={handleChange}
          error={funcIsError(errors.name, touched.name)}
          helperText={funcIsTextError(errors.name, touched.name)}
          color="secondary"
        />
        <Input
          name="dni"
          label="DNI"
          value={values.dni}
          onChange={handleChange}
          error={funcIsError(errors.dni, touched.dni)}
          helperText={funcIsTextError(errors.dni, touched.dni)}
          color="secondary"
        />
        <Input
          name="email"
          label="Correo electr??nico"
          value={values.email}
          onChange={handleChange}
          error={funcIsError(errors.email, touched.email)}
          helperText={funcIsTextError(errors.email, touched.email)}
          color="secondary"
        />
        <Input
          name="password"
          type="password"
          label="Contrase??a"
          value={values.password}
          onChange={handleChange}
          error={funcIsError(errors.password, touched.password)}
          helperText={funcIsTextError(errors.password, touched.password)}
          color="secondary"
        />
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          className={classes.button}
        >
          Crear cuenta
        </Button>

        <div className={classes.contentLinks}>
          <Link href="/iniciar-sesion">
            ??Ya tienes cuenta?, inicia sesi??n aqu??
          </Link>
        </div>
      </form>
    </Paper>
  )
}

export default SignUpForm
