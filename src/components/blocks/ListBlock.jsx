export default function ListBlock({ block }) {
  const items = block.items || [];
  return (
    <ul className="my-4 space-y-3 list-none">
      {items.map((text, i) => (
        <li
          key={i}
          className="font-worksans text-sm text-black leading-[22px] tracking-[0.14px] pl-4 border-l-2 border-brand-blue"
        >
          {text}
        </li>
      ))}
    </ul>
  );
}
