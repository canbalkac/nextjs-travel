"use client";
import React, { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useHotelStore } from "@/stores/hotelStore";
import RentACarFilter from "./RentACarFilter";

const RentACarList = () => {
  const { error, fetchHotels, hotels, loading } = useHotelStore();

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const filters: filterValues = {
      rating: searchParams.get("rating") || "",
      priceMin: searchParams.get("priceMin") || "",
      priceMax: searchParams.get("priceMax") || "",
    };

    fetchHotels(filters);
  }, [searchParams, fetchHotels]);

  // {hotel.photos[0].slice(7, hotel.photos[0].length)}
  // this usage is wrong but i added path name into databases as /public/hotel1/1.jpg
  // so i had to slice the string
  // this is just testing project

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Hotels UseSearchParams and Zustand
      </h1>
      <RentACarFilter />
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((sklt, i) => (
            <Skeleton key={i} className="h-72 w-full rounded-lg" />
          ))}
        </div>
      )}
      {error && (
        <div className="text-center text-red-500 font-semibold">
          Something went wrong!
        </div>
      )}

      {!loading && !error && hotels.length === 0 && (
        <div className="text-center text-blue-500 font-semibold">
          No hotels found.
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="shadow-md">
              <CardHeader>
                <Image
                  src={hotel.photos[0].slice(7, hotel.photos[0].length)}
                  alt={hotel.name}
                  width={150}
                  height={150}
                  className="w-full h-48 object-cover rounded"
                />
                <CardTitle className="text-lg font-semibold mt-2">
                  {hotel.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{hotel.rating} *</p>
                <p className="text-gray-700">{hotel.description}</p>
                <p className="text-sm text-gray-500">{hotel.location}</p>
                <p className="text-lg font-bold">
                  ${hotel.pricePerNight} / night
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RentACarList;
