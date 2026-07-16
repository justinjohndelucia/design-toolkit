import './CategoryChips.css';

interface CategoryChipsProps {
  categories: string[];
  active: string;
  onSelect: (category: string) => void;
}

export function CategoryChips({ categories, active, onSelect }: CategoryChipsProps) {
  return (
    <div className="dos-chips hide-scrollbar">
      {categories.map((name) => (
        <button
          key={name}
          type="button"
          className={`dos-chip${name === active ? ' dos-chip--active' : ''}`}
          onClick={() => onSelect(name)}
        >
          {name}
        </button>
      ))}
    </div>
  );
}
