"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useForm, FieldValues } from "react-hook-form";

export default function Search() {
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
    <form
      onSubmit={handleSubmit(handleSearch)}
      className="flex items-center w-full bg-white border border-gray-300 rounded-full shadow-sm"
    >
      <span className="pl-4 text-gray-400">Q</span>

      <input
        type="text"
        {...register("searchQuery")}
        placeholder="찾고 싶은 상품을 검색해보세요"
        className="flex-1 px-4 py-2 text-gray-700 placeholder-gray-400 bg-transparent outline-none"
      />

      <button
        type="submit"
        className="px-6 py-2 m-1 text-white bg-primary-blue rounded-full hover:bg-primary-blue/80 transition-colors"
      >
        검색
      </button>
    </form>
  );
}
