export default function QuoteGrid({ block }) {
  const items = block.items || [];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
      {items.map((text, i) => (
        <div
          key={i}
          className="rounded-[20px] bg-[rgba(29,67,85,0.05)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-4"
        >
          <p className="font-worksans text-sm text-black leading-[22px] tracking-[0.14px]">{text}</p>
        </div>
      ))}
    </div>
  );
}
