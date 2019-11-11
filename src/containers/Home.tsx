import React, { FC, useEffect, useState } from "react";
import {
  Container,
  CssBaseline,
  GridList,
  GridListTile,
  makeStyles,
  createStyles,
  Theme,
  Paper
} from "@material-ui/core";
import NoteCard from "../components/NoteCard";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      height: 140,
      width: 100
    },
    control: {
      padding: theme.spacing(2)
    }
  })
);

const Home: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state: any) => state.auth);
  const notes = useSelector((state: any) => state.note.list_data);

  useEffect(() => {
    async function onLoad() {
      if (!auth.isloggedin) {
        return;
      }
      try {
        dispatch({ type: 'FETCH_NOTE_LIST' });


      } catch (e) {
        alert(e);
      }

    }
    onLoad();
  }, []);




  const tileData = [
    {
      img: "",
      title: "Image",
      author: "author",
      cols: 2
    }
  ];

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.root}>
        {auth.isloggedin ? (
          <Grid container className={classes.root} spacing={1}>
            {
              notes.map((value: any, i: number) => {
                return <Grid item xs={3} key={i}>
                  < NoteCard data={value} />
                </Grid>
              })
            }

          </Grid>
        ) : (
            <h1>Your NOTE App</h1>
          )}
      </div>
    </Container>
  );
};

export default Home;
