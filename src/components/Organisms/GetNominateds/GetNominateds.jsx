import { useEffect, useState, Fragment } from "react"
import { useSelector } from "react-redux"
import { map, filter } from "lodash"

// Layout
import { Container } from "@material-ui/core"
import { Text } from "src/components/Atoms"
import NominatedList from "src/components/Molecules/NominatedList"

// Styles
import { makeStyles } from "@material-ui/core/styles"
const styles = makeStyles(({ palette, breakpoints }) => ({
  root: {
    width: "100%",
    minHeight: "calc(100vh - 72px)",
    backgroundColor: palette.primary.main,

    [breakpoints.down("xs")]: {
      minHeight: "calc(100vh - 110px)",
    },
  },
  container: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  // Content
  content: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    flexDirection: "column",

    "& > h4": {
      color: palette.secondary.main,
      fontSize: 24,
      margin: "15px 0",
      fontWeight: "bold",
    },

    "& > p": {
      color: palette.secondary.main,
    },
  },
  category: {
    width: "100%",
    display: "grid",
    gridGap: "10px",
    gap: "10px",
    gridTemplateColumns: "33% 33% 33%",
    justifyContent: "space-between",

    [breakpoints.down("xs")]: {
      gridTemplateColumns: "49% 49%",
    },
  },
}))

const GetNominateds = ({ isNewVote, votes, handleAddVote, isWinners }) => {
  const classes = styles()
  const [nominateds, setNominateds] = useState([])
  const [resultsBool, setResultsBool] = useState(false)

  const fetchReady = useSelector((s) => s.generics.fetchReady)
  const nominatedsRedux = useSelector((s) => s.generics.nominateds)
  const categories = useSelector((s) => s.generics.categories)

  const getNominateds = async () => {
    const dataWinners = filter(nominatedsRedux, (n) => n.winner === true)

    setNominateds(isWinners ? dataWinners : nominatedsRedux)
    if (dataWinners.length > 0) setResultsBool(true)
  }

  useEffect(() => {
    getNominateds()
  }, [nominatedsRedux])

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="sm">
        <div className={classes.content}>
          {categories.length > 0 ? (
            <>
              {map(categories, (category) => (
                <Fragment key={category.id}>
                  <Text component="h4">Nominados a {category.name}</Text>
                  <div key={category.id} className={classes.category}>
                    {filter(
                      nominateds,
                      (nominated) => nominated.category === category.nameId
                    ).length > 0 ? (
                      filter(
                        nominateds,
                        (nominated) => nominated.category === category.nameId
                      ).map((nominated) => (
                        <NominatedList
                          nominated={nominated}
                          key={nominated.id}
                          isNewVote={isNewVote}
                          votes={votes}
                          handleAddVote={handleAddVote}
                          isWinners={isWinners}
                          resultsBool={resultsBool}
                        />
                      ))
                    ) : (
                      <>
                        {!fetchReady ? (
                          <>
                            {isWinners ? (
                              <Text>No hay ganadores a??n.</Text>
                            ) : (
                              <Text>Obteniendo nominados, espera...</Text>
                            )}
                          </>
                        ) : (
                          <Text>
                            Lo sentimos, ya se ha llegado al l??mite diario de
                            consultas a la p??gina, vuelve ma??ana para seguir
                            disfrutando.
                          </Text>
                        )}
                      </>
                    )}
                  </div>
                </Fragment>
              ))}
            </>
          ) : (
            <>
              {!fetchReady ? (
                <>
                  {isWinners ? (
                    <Text>No hay ganadores a??n.</Text>
                  ) : (
                    <Text>Obteniendo nominados, espera...</Text>
                  )}
                </>
              ) : (
                <Text>
                  Lo sentimos, ya se ha llegado al l??mite diario de consultas a
                  la p??gina, vuelve ma??ana para seguir disfrutando.
                </Text>
              )}
            </>
          )}
        </div>
      </Container>
    </div>
  )
}

export default GetNominateds
