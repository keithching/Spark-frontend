import brandStyles from "../../styles/brand.module.css";
import Link from "next/link";

const Brand = () => {
  return (
    <nav className={brandStyles.brand}>
      <Link href="/">Spark</Link>
    </nav>
  );
};

export default Brand;
