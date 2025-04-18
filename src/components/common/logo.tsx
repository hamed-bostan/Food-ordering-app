type LogoProps = {
  size: string;
};

export default function Logo({ size }: LogoProps) {
  return (
    <img
      className={size}
      src="assets/images/icons/Logo.png"
      alt="Tarkhineh logo"
    />
  );
}
