import React from "react";
import Title from "../components/Title";
import { assets } from "./../assets/assets";
import NewsLetter from "./../components/NewsLetter";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-gray-300 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px] hero-section hero-luxury"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            We are an online store built with one simple goal: to make shopping
            easy, reliable, and enjoyable. Our carefully selected products are
            chosen for quality, value, and everyday usefulness. From browsing to
            checkout, we focus on providing a smooth experience and customer
            support you can trust.
          </p>
          <p>
            Founded with a passion for convenience and innovation, our eCommerce
            store brings together trending and trusted products in one place. We
            work hard to offer fair prices, fast delivery, and a shopping
            experience that puts customers first. Whether you’re shopping for
            yourself or someone else, we’re here to help you find exactly what
            you need.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Our mission is to provide high-quality products at affordable prices
            while delivering a simple, secure, and satisfying online shopping
            experience. We aim to build long-term relationships with our
            customers by focusing on trust, transparency, and continuous
            improvement.
          </p>
        </div>
      </div>
      <div className="text-2xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col  md:flex-row text-sm mb-20">
        <div className="border border-gray-300 px-8 md:px-12 py-8 sm:py-16 flex flex-col gap-5">
          <b className="text-base">Quality assurance </b>
          <p className="text-gray-600 text-base">
            We are committed to maintaining the highest standards of quality.
            Every product is carefully reviewed and tested to ensure it meets
            our expectations before reaching our customers. We work closely with
            trusted suppliers to deliver reliable, durable, and authentic
            products you can shop with confidence.
          </p>
        </div>
        <div className="border text-base border-gray-300 px-8 md:px-12 py-8 sm:py-16 flex flex-col gap-5">
          <b className="text-base">Convenience </b>
          <p className="text-gray-600">
            We make online shopping simple and hassle-free. With an easy-to-use
            website, secure payment options, and fast delivery, you can shop
            anytime, anywhere. Our goal is to save you time while offering a
            seamless experience that fits your lifestyle.
          </p>
        </div>
        <div className="border text-base border-gray-300 px-8 md:px-12 py-8 sm:py-16 flex flex-col gap-5">
          <b className="text-base">Exceptional Customer Service </b>
          <p className="text-gray-600">
            Our customers are at the heart of everything we do. Our support team
            is always ready to assist you with questions, concerns, or order
            updates. We strive to provide prompt, friendly, and helpful service
            to ensure a smooth and satisfying shopping experience from start to
            finish.
          </p>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default About;
