import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { getEventByEventId, getAllEventIds } from '../../utils/helper';
import eventStyles from '../../styles/event.module.css';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import Layout from '../../components/layout';
import { parseISO, formatISO } from 'date-fns';
import { useCart } from '../../utils/store';

export default function Event({
    eventData
}: {
    eventData: {
        id: number
        title: string
        eventProvider: string
        eventCategory: string
        location: string
        dateStart: string
        dateEnd: string
        imageURL: string
    }
}) {
    // use zustand cart store
    const eventCartStore = useCart((state) => state.events);
    const addToEvents = useCart((state) => state.addToEvents);
    const removeFromEvents = useCart((state) => state.removeFromEvents);
    const updateCounter = useCart((state) => state.updateCounter);

    // used during pre-rendering and the first render in the browser
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [eventCart, setEventCart] = useState([]);

    // https://github.com/pmndrs/zustand/discussions/855
    // https://nextjs.org/docs/messages/react-hydration-error
    // called during hydration, which has access to the window object localStorage method
    useEffect(() => {
        setEventCart(eventCartStore);
    }, [eventCartStore]);

    useEffect(() => {
        if (eventCartStore.includes(eventData.id)) {
            setIsClicked(true);
        } else {
            setIsClicked(false);
        }
    }, [eventCartStore, eventData]);

    const handleAddToCartClick = () => {
        if (eventCartStore.includes(eventData.id)) {
            removeFromEvents(eventData.id);
        } else {
            addToEvents(eventData.id);
        }
        updateCounter();
    }

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
                        <button 
                            onClick={handleAddToCartClick}
                            className={!isClicked? eventStyles["add-to-cart"]: eventStyles["added-to-cart"]}
                        >
                            {!isClicked? "add to cart": "added to cart"}
                        </button>
                        <div>Cart: {eventCart}</div>
                    </div>
                    <div className={eventStyles.right}>
                        {eventData.imageURL && <Image 
                            src={eventData.imageURL} 
                            className={eventStyles["event-image"]}
                            width={400}
                            height={400}
                            alt=""
                        />}
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