import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { getEventByEventId, getAllEventIds } from '../../utils/helper';
import eventStyles from '../../styles/event.module.css';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Layout from '../../components/layout';

export default function Event({
    eventData
}: {
    eventData: {
        title: string
        eventProvider: string
        eventCategory: string
        location: string
        dateStart: string
        dateEnd: string
        imageURL: string
    }
}) {
    return (
        <Layout>
            <Head>
                <title>{eventData.title}</title>
            </Head>
            <div className={eventStyles.Event}>
                <>
                    <div className={eventStyles.left}>
                        <h1>{eventData.title}</h1>
                        <div>{eventData.eventProvider}</div>
                        <div>{eventData.eventCategory}</div>
                        <div>{eventData.location}</div>
                        <div>{eventData.dateStart} ~ {eventData.dateEnd}</div> 
                    </div>
                    <div className={eventStyles.right}>
                        <div className={eventStyles["event-image"]}>
                            {eventData.imageURL && <Image 
                                src={eventData.imageURL} 
                                width={200}
                                height={200}
                                alt=""
                            />}
                        </div>
                    </div>
                </>
            </div>
        </Layout>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllEventIds();
    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const eventData = await getEventByEventId(params.id as string);
    return {
        props: {
            eventData,
        },
    }
}