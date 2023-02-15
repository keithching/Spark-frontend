import fullPageLoaderStyles from "../styles/fullPageLoader.module.css";
import { Loading } from "./Loading";

export default function FullPageLoader() {
  return <Loading className={fullPageLoaderStyles.container} />;
}
