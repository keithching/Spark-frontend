import brandStyles from "../../styles/brand.module.css";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import classNames from "classnames";

// https://nextjs.org/docs/basic-features/font-optimization#single-page-usage
const dancingScript = Dancing_Script({ subsets: ["latin"] });

const Brand = () => {
  return (
    <nav
      className={classNames(brandStyles.brand, dancingScript.className)}
      data-cy="header-brand-nav"
    >
      <Link href="/">Spark</Link>
    </nav>
  );
};

export default Brand;
