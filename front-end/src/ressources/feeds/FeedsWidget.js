import React from "react"
import Grid from '@material-ui/core/Grid';
import { useState, useEffect } from 'react';
import { Rss } from '../../services/Rss';
import { FeedCard } from './components/FeedCard';

export const Feeds = () => {
    const [feeds, setFeeds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            const feeds = await Rss.getCryptos();

            if (feeds)
            console.log(feeds)
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
                        return(
                            <Grid item xs={4} key={key} >
                                <Grid container justify="center">
                                    <FeedCard feed={feed}></FeedCard>
                                </Grid>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )
}