"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { features } from "@/data/features";

const HeroSection = () => {
  const imageRef = useRef(null);

  // Scroll tilt effect
  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      if (!imageElement) return;

      if (window.scrollY > 100) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full pt-28 pb-24 px-4 md:px-6 overflow-hidden">

      {/* MAIN HERO CONTENT */}
      {/* <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10"> */}

        {/* LEFT SIDE
        <div className="space-y-8 text-left">
          <h1 className="text-5xl md:text-6xl font-bold gradient-title animate-gradient">
            Your AI Career Coach
          </h1>

          <p className="text-muted-foreground md:text-xl max-w-[550px]">
            Personalized guidance and AI-powered tools for job success.
          </p>

          <div className="flex gap-4">
            <Link href="/dashboard">
              <Button size="lg">Get Started</Button>
            </Link>

            <Link href="#features">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div> */}

        {/* RIGHT SIDE – BENTO GRID */}
        
        <div
  
  id="features"
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-11 w-full"
>
          {features.slice(0, 6).map((feature, index) => {
            const gridSpans = [
              
              "row-span-2",
              "row-span-2",
              "row-span-2",
              "row-span-2",
              "row-span-2",
              "row-span-2",
              
            ];

            return (
              <Link
                key={index}
                href={feature.href}
                className={`${gridSpans[index]} group`}
              >
                <Card className="relative h-full min-h-[260px] overflow-hidden border-none shadow-xl transition-all duration-300 hover:scale-[1.03] bg-slate-900 cursor-pointer">

                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${feature.image})`,
                      filter: "brightness(0.90)",
                    }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  <CardContent className="relative z-10 h-full p-4 flex flex-col justify-end text-white">
                    <div className="mb-2 w-fit p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                      {feature.icon}
                    </div>

                    <h3 className="text-lg font-semibold">
                      {feature.title}
                    </h3>

                    <p className="text-xs text-gray-300 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      {/* </div> */}

      {/* 3D DASHBOARD IMAGE */}
      <div className="hero-image-wrapper mt-16 md:mt-20 relative z-0">
        <div ref={imageRef} className="hero-image">
          <Image
            src="/bann.jpeg"
            width={1280}
            height={720}
            alt="Dashboard Preview"
            className="rounded-xl shadow-2xl border mx-auto"
            priority
          />
        </div>
      </div>

    </section>
  );
};

export default HeroSection;