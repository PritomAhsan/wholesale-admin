"use client";
import React from "react";
import Image from "next/image";

import { useAuthContext } from "@/context/AuthContext";
import { UserCircleIcon } from "@/icons";

export default function UserMetaCard() {
  const { user } = useAuthContext();

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-white/5">
          {user?.avatar ? (
            <Image
              width={80}
              height={80}
              src={user.avatar}
              alt={user?.full_name || "User"}
              className="h-full w-full object-cover"
            />
          ) : (
            <UserCircleIcon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
          )}
        </div>
        <div>
          <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
            {user?.full_name || "—"}
          </h4>
          <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
            {user?.roles?.[0] && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.roles[0]}
              </p>
            )}
            {user?.roles?.[0] && user?.email && (
              <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
            )}
            {user?.email && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.email}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
