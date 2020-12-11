import React, { useContext } from "react"
import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from 'react';
import { Rss } from '../../services/Rss';
import { FeedCard } from './components/FeedCard';
import { LimitContext } from "../../context/limitContext";

export const Feeds = () => {
    const [feeds, setFeeds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {limit} = useContext(LimitContext);

    useEffect(() => {
        async function getData() {
            const feeds = await Rss.getCryptos();

            if (feeds)
                setFeeds(feeds.data.items);

            setIsLoading(false);
        }
        if (isLoading === true)
            getData()
    })

    return (
        <div>
            <Grid container alignItems="center" justify="center" spacing={2}>
                {
                    feeds.map((feed, key) => {
                        if (limit.feedLimit && key < limit.feedLimit) {
                            return(
                                <Grid item xs={4} key={key} >
                                    <Grid container justify="center">
                                        <FeedCard feed={feed}></FeedCard>
                                    </Grid>
                                </Grid>
                            )
                        } else {
                            return (<div></div>)
                        }
                    })
                }
            </Grid>
        </div>
    )
}