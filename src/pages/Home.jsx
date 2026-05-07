import { Box } from "@mui/material";
import ProductCarousel from "../components/ProductCarousel"
import ProductsSection from "../components/ProductsSection";
import About from "../components/About";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Box id="home">
        <ProductCarousel />
      </Box>

      <Box id="products">
        <ProductsSection />
      </Box>

      <Box id="about">
        <About />
      </Box>

      <Box id="contact">
        <Footer />
      </Box>
    </>
  );
}

export default Home;
