import Head from "next/head";
import React from "react";
import { getEventByEventId, getAllEventIds } from "../../utils/helper";
import { EventInformation } from "../../components/event/EventInformation";
import { EventPhotoDisplay } from "../../components/EventPhotoDisplay";
import { EventFunctionalities } from "../../components/EventFunctionalities";
import eventStyles from "../../styles/event.module.css";
import { GetStaticProps, GetStaticPaths } from "next";
import Layout from "../../components/layout";

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
          <EventInformation eventData={eventData} />
          <EventFunctionalities eventData={eventData} />
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
