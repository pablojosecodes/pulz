'use client'
import { useSettings } from "@/components/SettingsContext";
import DashboardPage from "@/components/dashboard";
import { Button } from "@/components/ui/button";
import useData from "@/hooks/useData";
import FuzzySearch from "fuzzy-search";
import Image from "next/image";
import { useEffect, useMemo } from "react";

export default function Home() {
  const { settings, setSettings } = useSettings();
// 
	const { data, mutate } = useData(settings.timespan, '');

	const refreshData = async () => {
		mutate();
	};

	// Refresh data loop
	useEffect(() => {
		const intervalId = setInterval(() => {
			if (settings.paused) return;

			refreshData();
		}, 5000);
		return () => clearInterval(intervalId);
	}, [settings.paused]);


  let { events = [], urls = [] } = data ?? {};

	const filteredEvents = useMemo(() => {
    console.log("settings.filter")
    console.log(settings.filter)
    console.log("data")
    console.log(data)
    console.log("events")
    console.log(events)
		if (settings.filter && events) {
			const searcher = new FuzzySearch(events, ['url', 'type'], {
				caseSensitive: false,
				sort: true,
			});

			return searcher.search(settings.filter);
		}

		return events;
	}, [settings.filter, events]);

  return (
    <DashboardPage filteredEvents={filteredEvents} data={data} />
  );
}
