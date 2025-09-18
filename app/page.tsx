"use client"

import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import Link from "next/link";



export default function Home() {
  const { user } = useUserContext()

  return (
    <div className="flex">
      {/* { user.name} */}
    </div>
  );
}
