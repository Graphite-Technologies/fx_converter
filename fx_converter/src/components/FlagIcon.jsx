export default function FlagIcon({ src, code, className = '' }) {
  return (
    <img
      className={`flag-icon ${className}`}
      src={src}
      alt={code ? `${code} flag` : ''}
      aria-hidden={code ? undefined : true}
      loading="lazy"
      width={20}
      height={14}
    />
  );
}