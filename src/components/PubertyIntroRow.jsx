export default function PubertyIntroRow({ image, imageAlt, imageCaption, heading, headingAbove, body, citation, reverse = false }) {
  const imageEl = (
    <div>
      <div className="bg-[#f3e4de] rounded-[40px] overflow-hidden min-h-[200px]">
        <img src={image} alt={imageAlt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
      </div>
      {imageCaption && <p className="font-worksans text-xs text-brand-darker mt-2">{imageCaption}</p>}
    </div>
  );
  const textEl = (
    <div className="bg-[rgba(29,67,85,0.05)] rounded-[40px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.15)] p-6 flex flex-col justify-center">
      {heading && <p className="font-poppins font-semibold text-black text-lg mb-2">{heading}</p>}
      <p className="font-worksans text-sm text-black leading-[22px] tracking-[0.14px] text-justify">{body}</p>
      {citation && <p className="font-worksans text-xs uppercase tracking-wide text-brand-darker mt-2">{citation}</p>}
    </div>
  );

  return (
    <div className="mb-6">
      {headingAbove && (
        <p className="font-poppins font-bold text-black text-lg leading-tight mb-3">{headingAbove}</p>
      )}
      <div
        className={`grid grid-cols-1 gap-4 sm:gap-5 items-stretch ${
          reverse ? 'sm:grid-cols-[1fr_240px]' : 'sm:grid-cols-[240px_1fr]'
        }`}
      >
        {reverse ? (
          <>
            {textEl}
            {imageEl}
          </>
        ) : (
          <>
            {imageEl}
            {textEl}
          </>
        )}
      </div>
    </div>
  );
}
