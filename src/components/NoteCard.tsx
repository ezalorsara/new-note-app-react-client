import React, { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Storage } from 'aws-amplify';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    marginTop: 20
  },
  media: {
    height: 140,
  },
});

const NoteCard: FC<{ data: any }> = (props) => {
  const classes = useStyles();
  const [imgUrl, setImgUrl] = useState("https://via.placeholder.com/150");

  function deleteHandle() {

  }

  useEffect(() => {

    if (props.data.attachment) {
      Storage.vault.get(props.data.attachment).then(data => {
        setImgUrl(data.toString());
      }, err => {
        console.log("Error!");
      });
    }

  }, []);


  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imgUrl}
          title="File Attached"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.data.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="primary" onClick={deleteHandle}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default NoteCard;