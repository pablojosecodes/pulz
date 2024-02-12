'use client'
import { SettingsProvider, useSettings } from "@/util/SettingsContext";
import useData from "@/hooks/useData";
import FuzzySearch from "fuzzy-search";

import Dashboard from "@/components/dashboard";
import { useEffect, useMemo } from "react";


export default function Home() {

	// Settings and data
	const { settings } = useSettings();
	const { data, mutate } = useData(settings.timespan, '');

	// Updating data
	const refreshData = async () => {
		mutate();
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			if (settings.paused) return;
			refreshData();
		}, 100000);
		return () => clearInterval(intervalId);
	}, [settings.paused]);

	// Data -> Events
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

	// The page
	return (

		<Dashboard filteredEvents={filteredEvents} />
	);
}
