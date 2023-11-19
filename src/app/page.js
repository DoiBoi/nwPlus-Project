"use client";
import React from 'react';
import Map from './map';
import Navbar from './navbar';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col'>
      {/* logo, title, about the team */}
      <Navbar />


      {/* find a bathroom button, + settings/filters */}


      {/* map space */}
      <div id="map" className='flex h-[25%] w-[25%] m-[50px]'>
        <Map /> 
      </div>

      {/* extra options (eg. report an error) */}
    </main>
  )
}
