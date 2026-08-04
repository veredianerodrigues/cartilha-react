export default function Heading({ block }) {
  return (
    <h3 className="font-poppins font-semibold text-brand-darker text-base sm:text-lg md:text-xl leading-snug mt-8 mb-2">
      {block.heading}
    </h3>
  );
}
