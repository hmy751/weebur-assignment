"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useForm, FieldValues } from "react-hook-form";

import Search from "@/components/common/Search";

export default function SearchSection() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleSearch = (data: FieldValues) => {
    const term = data.searchQuery;

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="w-full">
      <form onSubmit={handleSubmit(handleSearch)}>
        <Search {...register("searchQuery")} />
      </form>
    </section>
  );
}
