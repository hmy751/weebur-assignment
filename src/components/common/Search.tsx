import { InputHTMLAttributes, Ref, forwardRef } from "react";

export default forwardRef(function Search(
  { ...props }: InputHTMLAttributes<HTMLInputElement>,
  ref: Ref<HTMLInputElement>
) {
  return (
    <div className="flex items-center w-full bg-white border border-gray-300 rounded-full shadow-sm">
      <span className="pl-4 text-gray-400">Q</span>

      <input
        ref={ref}
        type="text"
        {...props}
        placeholder="찾고 싶은 상품을 검색해보세요"
        className="flex-1 px-4 py-2 text-gray-700 placeholder-gray-400 bg-transparent outline-none"
      />

      <button
        type="submit"
        className="px-6 py-2 m-1 text-white bg-primary-blue rounded-full hover:bg-primary-blue/80 transition-colors"
      >
        검색
      </button>
    </div>
  );
});
