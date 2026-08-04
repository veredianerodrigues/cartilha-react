export default function Callout({ block }) {
  return (
    <div className="my-4 rounded-[24px] sm:rounded-[50px] bg-[rgba(29,67,85,0.05)] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-5 sm:p-8">
      {block.heading && (
        <p className="font-poppins font-bold text-brand-blue text-base mb-2">{block.heading}</p>
      )}
      <p className="font-worksans text-sm text-black leading-[22px] tracking-[0.14px] text-justify">
        {block.body}
      </p>
    </div>
  );
}
