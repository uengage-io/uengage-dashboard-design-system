import { cva } from "class-variance-authority";

export const dropzoneVariants = cva(
  [
    "relative w-full flex flex-col items-center justify-center",
    "rounded-xl border-2 border-dashed transition-all duration-150",
    "cursor-pointer select-none outline-none",
    "focus-visible:ring-2 focus-visible:ring-[#007a4d] focus-visible:ring-offset-2",
  ],
  {
    variants: {
      size: {
        sm: "h-24 gap-1.5 px-3 py-3",
        md: "h-32 gap-2 px-4 py-5",
        lg: "h-44 gap-3 px-6 py-8",
      },
      state: {
        idle:     "border-gray-300 bg-gray-50 hover:border-[#007a4d] hover:bg-green-50/60",
        dragover: "border-[#007a4d] bg-green-50 ring-2 ring-[#007a4d]/20 ring-offset-0",
        error:    "border-red-400 bg-red-50/60",
        disabled: "cursor-not-allowed border-gray-200 bg-gray-50/80 opacity-50 pointer-events-none",
      },
    },
    defaultVariants: {
      size: "md",
      state: "idle",
    },
  }
);

export const iconWrapperVariants = cva(
  "flex items-center justify-center rounded-xl bg-gray-100 flex-shrink-0",
  {
    variants: {
      size: {
        sm: "w-8 h-8",
        md: "w-10 h-10",
        lg: "w-12 h-12",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export const avatarContainerVariants = cva(
  [
    "relative rounded-full overflow-hidden flex-shrink-0 transition-all duration-150",
    "focus-visible:ring-2 focus-visible:ring-[#007a4d] focus-visible:ring-offset-2",
  ],
  {
    variants: {
      size: {
        sm: "w-16 h-16",
        md: "w-20 h-20",
        lg: "w-28 h-28",
      },
      state: {
        empty:    "border-2 border-dashed border-gray-300 bg-gray-50 cursor-pointer hover:border-[#007a4d] hover:bg-green-50/60",
        filled:   "border border-gray-200 cursor-pointer",
        disabled: "border-2 border-dashed border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed pointer-events-none",
      },
    },
    defaultVariants: { size: "md", state: "empty" },
  }
);

export const ICON_SIZES: Record<string, number> = { sm: 14, md: 18, lg: 22 };
export const AVATAR_ICON_SIZES: Record<string, number> = { sm: 16, md: 20, lg: 26 };

export const PLACEHOLDER_TEXT: Record<string, string> = {
  image:  "Click or drag to upload image",
  file:   "Click or drag to upload file",
  avatar: "Upload photo",
  video:  "Click or drag to upload video",
};
