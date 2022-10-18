import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { getEventByEventId, getAllEventIds } from '../../utils/helper';
import eventStyles from '../../styles/event.module.css';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Layout from '../../components/layout';
import { parseISO, formatISO } from 'date-fns';

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
            <>
                <div className={eventStyles.Event}>
                    <div className={eventStyles.left}>
                        <h1>{eventData.title}</h1>
                        <section className={eventStyles.providerContainer}>
                            <div className={eventStyles.title}>Provider</div>
                            <div>{eventData.eventProvider}</div>
                        </section>
                        <section className={eventStyles.categoryContainer}>
                            <div className={eventStyles.title}>Category</div>
                            <div className={eventStyles.eventCategory}>{eventData.eventCategory}</div>
                        </section>
                        <section className={eventStyles.locationContainer}>
                            <div className={eventStyles.title}>Location</div>
                            <div>{eventData.location}</div>
                        </section>
                        <section className={eventStyles.dateContainer}>
                            <div className={eventStyles.title}>Date</div>
                            <div>
                                {formatISO(parseISO(eventData.dateStart), { representation: 'date' })} ~ {formatISO(parseISO(eventData.dateEnd), { representation: 'date' })}
                            </div> 
                        </section>
                    </div>
                    <div className={eventStyles.right}>
                        <div className={eventStyles["event-image"]}>
                            {eventData.imageURL && <Image 
                                src={eventData.imageURL} 
                                width={400}
                                height={400}
                                alt=""
                            />}
                        </div>
                    </div>
                </div>
                <div className={eventStyles.functions}>
                    <p>if user is a consumer: show options for add event to wishlist, join, favourite, etc</p>
                    <p>if user is a provider: show options for editing this event</p>
                </div>
            </>
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