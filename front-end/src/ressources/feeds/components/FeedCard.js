import React from "react"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
});

export const FeedCard = ({feed}) => {
    const classes = useStyles();

    const getPicture = (content) => {
        let startOfPicture = content.indexOf('"https') + 1
        let split = content.slice(startOfPicture);
        let endOfPicture = split.indexOf('" class=');
        let picture = split.substr(0, endOfPicture);

        return picture
    }

    const getText = (content) => {
        let startOfContent = content.indexOf("<p>") + 3;
        let endOfContent = content.indexOf("</p>") - startOfContent;
        let text = content.substr(startOfContent, endOfContent);

        return text;
    }

    const getLink = (content) => {
        let startOfContent = content.indexOf("href=") + 6
        let split = content.slice(startOfContent);

        console.log(content)
        console.log("split here: ", split);

        
        let endOfContent = split.indexOf('">');

        return split.substr(0, endOfContent);
    }

    feed.picture = getPicture(feed.content)
    feed.text = getText(feed.content)
    feed.link = getLink(feed.content)


    return (
        <div>
            <Card className={classes.root}>
            <CardHeader
                title={feed.title}
                subheader={feed.author}
            />
            <CardMedia
                className={classes.media}
                component="img"
                src={feed.picture}
                title="picture"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {feed.text}
                </Typography>
            </CardContent>

            <CardActions>
                <Button size="small" href={feed.link}>
                    En savoir plus
                </Button>
            </CardActions>
            
            </Card>
        </div>
    );
}