import Categories from "@/components/Categories";
import Header from "@/components/Header";
import ProductsSection from "@/components/ProductsSection";
import PromoSlides from "@/components/PromoSlides";

export default function Home() {
  return (
    <>
      <Header />
      <Categories
        categories={[
          {
            id: 1,
            name: "Water Purifiers",
            urlSlug: "/category/category1",
            image:
              "https://cdn.discordapp.com/attachments/1125984275158806658/1230171640168448030/Water-Purifier-PNG-Image-HD.png?ex=6632599e&is=661fe49e&hm=40ff4882476626e76cb075e632c0b5f7bebd26224b79ca08509ec7ffa04e2258&",
          },
          {
            id: 2,
            name: "Chimneys",
            urlSlug: "/category/category1",
            image:
              "https://cdn.discordapp.com/attachments/1125984275158806658/1230172617281896529/DH-CH902B-1.png?ex=66325a87&is=661fe587&hm=1941c8ee4218fbb89162cc5730ef7bd09001c7d81b1df8f7a0c16ceabf1da6b5&",
          },
          {
            id: 2,
            name: "Chimneys",
            urlSlug: "/category/category1",
            image:
              "https://cdn.discordapp.com/attachments/1125984275158806658/1230172617281896529/DH-CH902B-1.png?ex=66325a87&is=661fe587&hm=1941c8ee4218fbb89162cc5730ef7bd09001c7d81b1df8f7a0c16ceabf1da6b5&",
          },
          {
            id: 2,
            name: "Chimneys",
            urlSlug: "/category/category1",
            image:
              "https://cdn.discordapp.com/attachments/1125984275158806658/1230172617281896529/DH-CH902B-1.png?ex=66325a87&is=661fe587&hm=1941c8ee4218fbb89162cc5730ef7bd09001c7d81b1df8f7a0c16ceabf1da6b5&",
          },
          {
            id: 2,
            name: "Chimneys",
            urlSlug: "/category/category1",
            image:
              "https://cdn.discordapp.com/attachments/1125984275158806658/1230172617281896529/DH-CH902B-1.png?ex=66325a87&is=661fe587&hm=1941c8ee4218fbb89162cc5730ef7bd09001c7d81b1df8f7a0c16ceabf1da6b5&",
          },
          {
            id: 2,
            name: "Chimneys",
            urlSlug: "/category/category1",
            image:
              "https://cdn.discordapp.com/attachments/1125984275158806658/1230172617281896529/DH-CH902B-1.png?ex=66325a87&is=661fe587&hm=1941c8ee4218fbb89162cc5730ef7bd09001c7d81b1df8f7a0c16ceabf1da6b5&",
          },
        ]}
      ></Categories>
      <PromoSlides />
      <ProductsSection
        className="m-4 sm:m-6"
        products={[
          {
            name: "Kent Grand with Alkaline Filter",
            description: `Multiple Purification By RO + U F+ TDS Control + UV in Tank + Alkaline. Makes Water 100% pure. Retains Essential Minerals. Makes Water Alkaline. UV LED Light in Storage Tank. High Purification & Storage Capacity. World's Best Quality Certifications. Most Trusted & Awarded 1 Year Warranty`,
            images: [
              "https://www.cgdigital.com.np/api/images/products/l6S0CK_1701674274-GRAND%20MINERAL%20RO%20WITH%20ALKALINE%20FILTER.jpg",
            ],
            urlSlug: "kent-grand-with-alkaline",
            price: 28_490,
            stock: 13,
            id: 123,
            categoryId: 345,
          },
          {
            name: "Kent Grand with Alkaline Filter",
            description: `Multiple Purification By RO + U F+ TDS Control + UV in Tank + Alkaline. Makes Water 100% pure. Retains Essential Minerals. Makes Water Alkaline. UV LED Light in Storage Tank. High Purification & Storage Capacity. World's Best Quality Certifications. Most Trusted & Awarded 1 Year Warranty`,
            images: [
              "https://www.cgdigital.com.np/api/images/products/l6S0CK_1701674274-GRAND%20MINERAL%20RO%20WITH%20ALKALINE%20FILTER.jpg",
            ],
            urlSlug: "kent-grand-with-alkaline",
            price: 28_490,
            stock: 13,
            id: 123,
            categoryId: 345,
          },
          {
            name: "Kent Grand with Alkaline Filter",
            description: `Multiple Purification By RO + U F+ TDS Control + UV in Tank + Alkaline. Makes Water 100% pure. Retains Essential Minerals. Makes Water Alkaline. UV LED Light in Storage Tank. High Purification & Storage Capacity. World's Best Quality Certifications. Most Trusted & Awarded 1 Year Warranty`,
            images: [
              "https://www.cgdigital.com.np/api/images/products/l6S0CK_1701674274-GRAND%20MINERAL%20RO%20WITH%20ALKALINE%20FILTER.jpg",
            ],
            urlSlug: "kent-grand-with-alkaline",
            price: 28_490,
            stock: 13,
            id: 123,
            categoryId: 345,
          },
          {
            name: "Kent Grand with Alkaline Filter",
            description: `Multiple Purification By RO + U F+ TDS Control + UV in Tank + Alkaline. Makes Water 100% pure. Retains Essential Minerals. Makes Water Alkaline. UV LED Light in Storage Tank. High Purification & Storage Capacity. World's Best Quality Certifications. Most Trusted & Awarded 1 Year Warranty`,
            images: [
              "https://www.cgdigital.com.np/api/images/products/l6S0CK_1701674274-GRAND%20MINERAL%20RO%20WITH%20ALKALINE%20FILTER.jpg",
            ],
            urlSlug: "kent-grand-with-alkaline",
            price: 28_490,
            stock: 13,
            id: 123,
            categoryId: 345,
          },
          {
            name: "Kent Grand with Alkaline Filter",
            description: `Multiple Purification By RO + U F+ TDS Control + UV in Tank + Alkaline. Makes Water 100% pure. Retains Essential Minerals. Makes Water Alkaline. UV LED Light in Storage Tank. High Purification & Storage Capacity. World's Best Quality Certifications. Most Trusted & Awarded 1 Year Warranty`,
            images: [
              "https://www.cgdigital.com.np/api/images/products/l6S0CK_1701674274-GRAND%20MINERAL%20RO%20WITH%20ALKALINE%20FILTER.jpg",
            ],
            urlSlug: "kent-grand-with-alkaline",
            price: 28_490,
            stock: 0,
            id: 123,
            categoryId: 345,
          },
        ]}
      />
    </>
  );
}
