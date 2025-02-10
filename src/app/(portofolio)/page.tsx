"use client"

import About from "@/components/landing/about";
import Hero from "@/components/landing/hero";
import Connection from "@/components/landing/connection";
import Service from "@/components/landing/service";
import Stack from "@/components/landing/stack";

export default function Home() {

  return (
    <>
      <Hero/>
      <About/>
      <Stack/>
      <Service/>
      <Connection/>
    </>
  );
}
