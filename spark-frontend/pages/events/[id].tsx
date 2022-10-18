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
                        <div className={eventStyles.providerTitle}>Provider</div>
                        <div className={eventStyles.providerContent}>{eventData.eventProvider}</div>
                        <div className={eventStyles.categoryTitle}>Category</div>
                        <div className={eventStyles.categoryContent}>{eventData.eventCategory}</div>
                        <div className={eventStyles.locationTitle}>Location</div>
                        <div className={eventStyles.locationContent}>{eventData.location}</div>
                        <div className={eventStyles.dateTitle}>Date</div>
                        <div className={eventStyles.dateContent}>
                            {formatISO(parseISO(eventData.dateStart), { representation: 'date' })} ~ {formatISO(parseISO(eventData.dateEnd), { representation: 'date' })}
                        </div> 
                        {/* <div className={eventStyles.interestedTitle}>Interested</div>
                        <div className={eventStyles.interestedContent}>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div className={eventStyles.functions}>
                            <button>Add to List</button>
                            <button>Chat</button>
                        </div> */}
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