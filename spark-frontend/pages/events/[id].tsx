import React from "react";
import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import Layout from "../../components/layout";
import { EventInformation } from "../../components/EventInformation";
import { EventFunctionalities } from "../../components/EventFunctionalities";
import { EventJoiners } from "../../components/EventJoiners";
import { EventPhotoDisplay } from "../../components/EventPhotoDisplay";
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
      <Event />
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
