export default function Paragraph({ block }) {
  return (
    <p className="font-worksans text-sm leading-[22px] tracking-[0.14px] text-black mb-4 text-justify">
      {block.body}
    </p>
  );
}
