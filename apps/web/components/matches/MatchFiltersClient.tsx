'use client';

import { useRouter } from 'next/navigation';
import { FilterBar } from '@/components/shared/FilterBar';

interface FilterOption {
  value: string;
  label: string;
}

interface MatchFiltersClientProps {
  tabs: FilterOption[];
  activeTab: string;
  competitionOptions: FilterOption[];
  seasonOptions: FilterOption[];
  selectedCompetition: string;
  selectedSeason: string;
}

export function MatchFiltersClient({
  tabs,
  activeTab,
  competitionOptions,
  seasonOptions,
  selectedCompetition,
  selectedSeason,
}: MatchFiltersClientProps) {
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    router.push(`/partidos?tab=${tab}&competicion=${selectedCompetition}&temporada=${selectedSeason}`);
  };

  const handleCompetitionChange = (value: string) => {
    router.push(`/partidos?tab=${activeTab}&competicion=${value}&temporada=${selectedSeason}`);
  };

  const handleSeasonChange = (value: string) => {
    router.push(`/partidos?tab=${activeTab}&competicion=${selectedCompetition}&temporada=${value}`);
  };

  return (
    <FilterBar
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
      filters={[
        {
          name: 'Competición',
          options: competitionOptions,
          value: selectedCompetition,
          onChange: handleCompetitionChange,
        },
        {
          name: 'Temporada',
          options: seasonOptions,
          value: selectedSeason,
          onChange: handleSeasonChange,
        },
      ]}
    />
  );
}
