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
      <Button_filters />

      {/* map space */}
      <div className='flex h-[25%] w-[25%] m-[50px]'>
        <Map /> 
      </div>

      {/* extra options (eg. report an error) */}
    </main>
  )
}
