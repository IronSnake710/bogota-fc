'use client';

import { cn } from '@/lib/utils/cn';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  tabs: FilterOption[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  filters?: {
    name: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
  }[];
}

export function FilterBar({ tabs, activeTab, onTabChange, filters }: FilterBarProps) {
  return (
    <div className="bg-white border border-border rounded-xl p-4 space-y-4">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              activeTab === tab.value
                ? 'bg-primary text-white'
                : 'bg-surface text-text-secondary hover:bg-surface-dark'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Additional Filters */}
      {filters && filters.length > 0 && (
        <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
          {filters.map((filter) => (
            <div key={filter.name} className="flex items-center gap-2">
              <label className="text-sm text-text-muted">{filter.name}:</label>
              <select
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                className="px-3 py-1.5 bg-surface border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary"
              >
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
