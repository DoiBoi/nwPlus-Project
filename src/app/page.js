"use client";
import React from 'react';
import Map from './map';
import Navbar from './navbar';
import Button_filters from './button_filters';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col'>
      {/* logo, title, about the team */}
      <Navbar />

      {/* find a bathroom button, + settings/filters */}
      <div className='h-[300px] w-full'>
        <Button_filters />
      </div>

      {/* map space */}
      <div className='flex h-[500px] w-full m-4 items-center justify-center'>
        {/* Use fixed dimensions for the Map container */}
        <Map />
      </div>

      {/* extra options (eg. report an error) */}
    </main>
  );
}
