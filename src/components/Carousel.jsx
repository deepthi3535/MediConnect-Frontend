import { useEffect, useState } from "react";

const slides = [
  {
    title: "Smarter patient care",
    text: "Track admissions, vitals and discharges in one place.",
    imageUrl:
      "https://images.pexels.com/photos/6129681/pexels-photo-6129681.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Connected doctors & nurses",
    text: "Keep the whole care team in sync with live updates.",
    imageUrl:
      "https://images.pexels.com/photos/6129509/pexels-photo-6129509.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Appointments that run on time",
    text: "Plan OPD, follow-ups and emergency slots effortlessly.",
    imageUrl:
      "https://images.pexels.com/photos/2324837/pexels-photo-2324837.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    title: "Clear and simple billing",
    text: "Generate accurate invoices and payment summaries.",
    imageUrl:
      "https://images.pexels.com/photos/4021779/pexels-photo-4021779.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

function Carousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <div className="carousel">
      <div className="carousel-media">
        <img src={slide.imageUrl} alt={slide.title} loading="lazy" />
      </div>
      <div className="carousel-copy">
        <h1>{slide.title}</h1>
        <p>{slide.text}</p>
      </div>
    </div>
  );
}

export default Carousel;
