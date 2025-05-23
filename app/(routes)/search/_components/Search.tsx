"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const destination = searchParams.get("destination");
  const activity = searchParams.get("activity");
  const duration = searchParams.get("duration");
  const price = searchParams.get("price");

  return (
    <div>
      <p>
        <strong>Destination:</strong> {destination || "Not Specified"}
      </p>
      <p>
        <strong>Activity:</strong> {activity || "Not Specified"}
      </p>
      <p>
        <strong>Duration:</strong> {duration || "Not Specified"}
      </p>
      <p>
        <strong>Price:</strong> {price || "Not Specified"}
      </p>
    </div>
  );
};

export default Search;
