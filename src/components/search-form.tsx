import { useState, type FormEvent } from "react";

export function SearchForm({
  initial = "",
  onSearch,
  id = "animal-search",
}: {
  initial?: string;
  onSearch: (query: string) => void;
  id?: string;
}) {
  const [query, setQuery] = useState(initial);

  function submit(event: FormEvent) {
    event.preventDefault();
    onSearch(query.trim());
  }

  return (
    <form onSubmit={submit} className="flex min-w-0 gap-2">
      <label className="sr-only" htmlFor={id}>
        Search animals by name
      </label>
      <input
        id={id}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Type an animal"
        className="min-w-0 flex-1 rounded-card border-2 border-ink bg-sand px-3 py-2 text-base text-ink outline-none"
      />
      <button
        type="submit"
        className="shrink-0 rounded-card border-2 border-ink bg-sand px-3 py-2 text-sm font-extrabold tracking-wide text-ink"
      >
        SEARCH
      </button>
    </form>
  );
}
