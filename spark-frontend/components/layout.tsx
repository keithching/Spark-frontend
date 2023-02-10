import Header from "./header/Header";
import Footer from "./Footer";
import layoutStyles from "../styles/layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={layoutStyles.layout}>
      <Header />
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
