"use client";
import React from "react";
import Map from "./map";
import Navbar from "./navbar";
import Button_filters from "./button_filters";
import Report from "./report";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* logo, title, about the team */}
      <Navbar />

      {/* find a bathroom button, + settings/filters */}
      <Button_filters />
      
      {/* Use fixed dimensions for the Map container */}
      <Map />

      {/* extra options (eg. report an error) */}
      <div className="flex h-[15%] w-[15%] justify-end ml-auto mr-0">
        <Report />
      </div>
    </main>
  );
}
