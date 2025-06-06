"use client";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

const filterSchema = z.object({
  rating: z.string().optional(),
  priceMin: z.string().optional(),
  priceMax: z.string().optional(),
});

type filterValues = z.infer<typeof filterSchema>;

const TripList = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<filterValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      rating: "",
      priceMin: "",
      priceMax: "",
    },
  });

  const fetchHotels = (filters: filterValues = {}) => {
    setLoading(true);
    setError(false);
    let url = "/api/hotels";
    const params = new URLSearchParams();
    if (filters.rating) params.append("rating", filters.rating);
    if (filters.priceMin) params.append("priceMin", filters.priceMin);
    if (filters.priceMax) params.append("priceMax", filters.priceMax);

    url += "?" + params.toString();

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setHotels(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    const filters: filterValues = {
      rating: searchParams.get("rating") || "",
      priceMin: searchParams.get("priceMin") || "",
      priceMax: searchParams.get("priceMax") || "",
    };
    form.reset(filters);
    fetchHotels(filters);
  }, [searchParams]);

  // {hotel.photos[0].slice(7, hotel.photos[0].length)}
  // this usage is wrong but i added path name into databases as /public/hotel1/1.jpg
  // so i had to slice the string
  // this is just testing project

  function onSubmit(values: filterValues) {
    const params = new URLSearchParams();
    if (values.rating) params.set("rating", values.rating);
    if (values.priceMin) params.set("priceMin", values.priceMin);
    if (values.priceMax) params.set("priceMax", values.priceMax);
    router.push(`/trips?${params.toString()}`);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hotels UseSearchParams</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="e.g., 4.5"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priceMin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price Min</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price Min" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priceMax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price Max</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price Max" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="cursor-pointer">
            Submit
          </Button>
        </form>
      </Form>
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

export default TripList;
