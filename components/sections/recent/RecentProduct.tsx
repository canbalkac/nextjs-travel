"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { packages } from "@/constants";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"; // bu emblayı npm i yapmak lazım
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const RecentProduct = () => {
  return (
    <div>
      <Carousel
        opts={{ align: "start", loop: true }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="container mx-auto px-10 lg:px-36"
      >
        <CarouselContent>
          {packages.map((product, index) => (
            <CarouselItem key={index} className="lg:basis-1/2 xl:basis-1/4">
              <div className="p-3">
                <Card className="shadow-lg">
                  <CardHeader className="relative">
                    <Image
                      width={500}
                      height={500}
                      src={product.image}
                      alt={product.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {product.discount && (
                      <Badge className="absolute top-4 left-4 bg-blue-500 text-white text-sm px-2 hover:bg-blue-600">
                        {product.discount}
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg h-[60px]">
                      {product.title}
                    </CardTitle>
                    <CardDescription className="flex items-center text-sm text-gray-500 mt-2">
                      <MapPin />
                      {product.location}
                    </CardDescription>
                    <CardDescription className="flex items-center text-sm text-gray-500 mt-2">
                      <Clock />
                      {product.duration}
                    </CardDescription>
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <span className="text-orange-500 font-bold text-xl">
                          {product.price}
                        </span>
                        {product.oldPrice && (
                          <span className="text-gray-400 line-through ml-2">
                            {product.oldPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
};

export default RecentProduct;
