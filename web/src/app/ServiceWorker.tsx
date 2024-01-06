"use client";

import * as React from "react";

const unregisterServiceWorkers = async () => {
  const registrations = await navigator.serviceWorker.getRegistrations();
  registrations.forEach((registration) => {
    registration.unregister();
  });
};

/**
 * This code deletes any pre-existing service worker.
 * It's needed because a previous version of the site registered one via gatsby-plugin-offline.
 * If we don't uninstall the SW for these users, they'll never get newer versions of the site.
 */
export const ServiceWorker = () => {
  React.useEffect(() => {
    console.log("dealing with SW");
    unregisterServiceWorkers();
  }, []);

  return null;
};
