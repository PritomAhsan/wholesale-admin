"use client";

import Image from "next/image";
import Link from "next/link";
import { BRANDING } from "@/config/branding";

interface LogoProps {
  collapsed?: boolean;
}

export default function Logo({
  collapsed = false,
}: LogoProps) {
  return (
    <Link href="/">
      {collapsed ? (
        <Image
          src={BRANDING.logo.icon}
          alt={BRANDING.appName}
          width={32}
          height={32}
        />
      ) : (
        <>
          <Image
            className="dark:hidden"
            src={BRANDING.logo.light}
            alt={BRANDING.appName}
            width={133}
            height={40}
          />

          <Image
            className="hidden dark:block"
            src={BRANDING.logo.dark}
            alt={BRANDING.appName}
            width={133}
            height={40}
          />
        </>
      )}
    </Link>
  );
}