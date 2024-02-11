'use client'
import { useSettings } from "@/components/SettingsContext";
import DashboardPage from "@/components/dashboard";
import useData from "@/hooks/useData";
import FuzzySearch from "fuzzy-search";
import { useEffect, useMemo } from "react";

export default function Home() {
  const { settings } = useSettings();
// 
	const { data, mutate } = useData(settings.timespan, '');

	const refreshData = async () => {
		mutate();
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (settings.paused) return;

			refreshData();
		}, 1000);
		return () => clearInterval(intervalId);
	}, [settings.paused]);

  let { events = [], urls = [] } = data ?? {};

	const filteredEvents = useMemo(() => {
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
