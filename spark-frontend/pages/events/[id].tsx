import React from "react";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import Layout from "../../components/layout";
import { EventInformation } from "../../components/event/EventInformation";
import { EventFunctionalities } from "../../components/event/EventFunctionalities";
import { EventJoiners } from "../../components/event/EventJoiners";
import { EventPhotoDisplay } from "../../components/event/EventPhotoDisplay";
import { getEventByEventId, getAllEventIds } from "../../utils/helper";
import eventStyles from "../../styles/event.module.css";

export default function Event({
  eventData,
}: {
  eventData: {
    id: number;
    title: string;
    eventProvider: string;
    eventCategory: string;
    location: string;
    dateStart: string;
    dateEnd: string;
    imageURL: string;
  };
}) {
  const Event = () => {
    return (
      <div className={eventStyles.Event}>
        <div className={eventStyles.left}>
          <div className={eventStyles.leftTop}>
            <EventInformation eventData={eventData} />
          </div>
          <div className={eventStyles.leftMid}>
            <EventFunctionalities eventData={eventData} />
          </div>
          <div className={eventStyles.leftBot}>
            <EventJoiners eventData={eventData} />
          </div>
        </div>
        <div className={eventStyles.right}>
          <EventPhotoDisplay {...eventData} />
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <Head>
        <title>{eventData.title}</title>
      </Head>
      <section className={eventStyles.container}>
        <Event />
      </section>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllEventIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const eventData = await getEventByEventId(params.id as string);
  return {
    props: {
      eventData,
    },
  };
};
