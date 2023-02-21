import React, { useState, useEffect, lazy, Suspense } from "react";
import { useEvents } from "../../utils/helper";
import Hero from "./Hero";
import homeStyles from "../../styles/home.module.css";
import { EventCards } from "./EventCards";

export default function Home() {
  const { events, isError, isLoading } = useEvents();
  return (
    <div className={homeStyles.Home}>
      <Hero />
      {isError && <div>{isError}</div>}
      {!isLoading && <EventCards events={events} />}
    </div>
  );
}
