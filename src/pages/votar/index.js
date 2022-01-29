import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { forEach } from "lodash"
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core"
// Layout
import { Button } from "src/components/Atoms"

import { getCollectionsFirebase } from "src/lib/db"

// Styles
import { makeStyles } from "@material-ui/core/styles"
const styles = makeStyles(({ palette, breakpoints }) => ({
  root: {
    minHeight: "calc(100vh - 72px)",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: palette.primary.main,

    [breakpoints.down("xs")]: {
      minHeight: "calc(100vh - 110px)",
    },
  },
  container: {
    marginTop: 40,
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },
  buttons: {
    marginTop: 20,
    display: "flex",
    width: "100%",

    "& button:first-child": {
      marginRight: 10,
    },
  },
  head: {
    backgroundColor: palette.primary.light,
    color: palette.secondary.main,
  },
}))

const VotePage = () => {
  const classes = styles()
  const [votes, setVotes] = useState([])

  const { push } = useRouter()

  const getNominateds = async () => {
    const dataV = await getCollectionsFirebase("votes")

    setVotes(dataV)
  }

  useEffect(() => {
    getNominateds()
  }, [])

  const handleClick = async () => {
    try {
      const allVotes = []
      forEach(votes, (v) => allVotes.push(...v.votes))

      console.log({ allVotes })

      forEach(allVotes, (v) => console.log(v))
      // await updateDoc()
    } catch (error) {
      console.error("Update doc ->", error)
    }
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell>Nombres de votantes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {votes.length > 0 ? (
                votes.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    No hay votantes aún.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.buttons}>
          <Button
            onClick={() => push("/nuevo-voto")}
            color="secondary"
            variant="contained"
          >
            Nuevo voto
          </Button>

          {votes.length > 2 ? ( // FIXME: 5
            <Button onClick={handleClick} color="secondary" variant="contained">
              Generar resultado
            </Button>
          ) : (
            <Button
              onClick={() => {}}
              disabled
              color="secondary"
              variant="contained"
            >
              Deben haber al menos 5 votantes para generar un resultado
            </Button>
          )}
        </div>
      </Container>
    </div>
  )
}

export default VotePage
