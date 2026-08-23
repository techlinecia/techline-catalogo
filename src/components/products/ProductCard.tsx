"use client";

type ProductCardProps = {
  name: string;
  category: string;
  price: string;
  status: string;
  slug: string;
  badge?: string;
  image?: string;
  onClick?: () => void;
};

export default function ProductCard({
  name,
  category,
  price,
  status,
  badge,
  image,
  onClick,
}: ProductCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        w-full
        min-w-0
        overflow-hidden
        border
        border-white/10
        bg-[#10161a]
        text-left
        transition
        hover:border-cyan-400/40
        md:hover:-translate-y-1
      "
    >
      <div
        className="
          relative
          flex
          h-[125px]
          items-center
          justify-center
          overflow-hidden
          bg-[#0b0f12]
          sm:h-[155px]
          md:h-[210px]
        "
      >
        {badge && (
          <span
            className="
              absolute
              left-2
              top-2
              z-10
              max-w-[85%]
              bg-cyan-400
              px-2
              py-1
              text-[7px]
              font-black
              uppercase
              tracking-wide
              text-black
              sm:text-[8px]
              md:left-3
              md:top-3
              md:px-2.5
              md:text-[9px]
            "
          >
            {badge}
          </span>
        )}

        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <p
            className="
              px-2
              text-center
              text-[7px]
              tracking-[0.16em]
              text-zinc-600
              sm:text-[8px]
              md:text-[10px]
              md:tracking-[0.25em]
            "
          >
            IMAGEM DO PRODUTO
          </p>
        )}
      </div>

      <div className="p-3 md:p-4">
        <p
          className="
            truncate
            text-[8px]
            font-bold
            uppercase
            tracking-[0.15em]
            text-cyan-400
            md:text-[9px]
            md:tracking-[0.2em]
          "
        >
          {category}
        </p>

        <h3
          className="
            mt-1.5
            line-clamp-2
            min-h-[36px]
            text-[13px]
            font-bold
            leading-[1.35]
            text-white
            sm:text-sm
            md:mt-2
            md:min-h-[44px]
            md:text-lg
          "
        >
          {name}
        </h3>

        <div className="mt-2 flex min-w-0 items-center gap-1.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
          <span className="truncate text-[8px] text-emerald-400 sm:text-[9px] md:text-[10px]">
            {status}
          </span>
        </div>

        <div className="mt-3 flex items-end justify-between gap-2 md:mt-4">
          <p className="whitespace-nowrap text-base font-black text-white sm:text-lg md:text-xl">
            {price}
          </p>

          <span className="shrink-0 text-sm text-cyan-400 transition-transform group-hover:translate-x-1 md:text-lg">
            →
          </span>
        </div>
      </div>
    </button>
  );
}