"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full items-center space-x-2">
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="ex. 올해 1~6월 평균 BOP-150N 단가랑 작년 같은 기간 비교해서 몇 % 차이야?"
          className="pl-12 h-14 text-base rounded-full shadow-lg focus-visible:shadow-xl transition-shadow placeholder:text-gray-310"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-shadow bg-primary text-primary-foreground"
      >
        검색
      </Button>
    </form>
  );
}
